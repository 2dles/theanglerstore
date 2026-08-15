/**
 * BUNDLE DISCOUNT TESTS.
 *
 * Run with:  npx tsx src/lib/bundle.test.ts
 *
 * These exist because the discount was wrong in production in a way that lost
 * money on every order: it took 12% off every unit of every component, so
 * adding the bundle and bumping braid to qty 3 turned a $12.33 discount into
 * $20.72. The original cases below are exactly the ones the audit reproduced
 * in a browser, plus the boundary cases that broke it.
 *
 * The suite grew when one bundle became seven. Kits deliberately share parts —
 * braid is in four of them — which introduces a failure mode the single-bundle
 * code could not have: DOUBLE DISCOUNTING, where one spool of braid completes
 * two kits and gets 12% taken off it twice. Everything under "OVERLAP" is
 * about that, and the invariant it protects is stated once here:
 *
 *     No unit is ever discounted more than once, and the discount the cart
 *     displays is the discount Stripe is billed, to the cent.
 */
import {
  BUNDLES,
  type Bundle,
  type CartLine,
  allocateBundles,
  awardSaving,
  bundleDiscountAmount,
  bundleItems,
  bundleListPrice,
  bundlePrice,
  bundleUnitPrice,
  cartEarnsBundle,
  discountSplitFor,
  getProduct,
  isSourced,
  mergeLines,
} from "@/lib/products";

let failures = 0;

function check(name: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${name}` +
      (ok
        ? ""
        : `\n        expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`),
  );
}

function ok(name: string, condition: boolean, detail = "") {
  if (!condition) failures++;
  console.log(`${condition ? "PASS" : "FAIL"}  ${name}${condition ? "" : `\n        ${detail}`}`);
}

const cents = (n: number) => Math.round(n * 100);
const oneOfEach = (b: Bundle): CartLine[] =>
  bundleItems(b).map((p) => ({ key: p.key, qty: 1 }));

/**
 * One unit of every DISTINCT product across these kits.
 *
 * Deliberately not mergeLines(kits.flatMap(oneOfEach)) — that SUMS, so a key
 * in four kits comes out at qty 4 and every kit is trivially payable. The
 * interesting cart is the one where a shared spool of braid exists exactly
 * once and the kits have to compete for it.
 */
const unionOnce = (bs: readonly Bundle[]): CartLine[] => [
  ...new Set(bs.flatMap((b) => bundleItems(b).map((p) => p.key))),
].map((key) => ({ key, qty: 1 }));
const perSet = (b: Bundle) =>
  Math.round(
    bundleItems(b).reduce(
      (s, p) => s + (p.price - bundleUnitPrice(p.price, b.discount)),
      0,
    ) * 100,
  ) / 100;

/**
 * What /api/checkout will actually bill, reimplemented from the same public
 * functions the route uses. If this and bundleDiscountAmount ever disagree,
 * the cart is quoting a price the customer will not be charged.
 */
function serverSubtotal(lines: CartLine[]): number {
  const merged = mergeLines(lines);
  let total = 0;
  for (const line of merged) {
    const price = getProduct(line.key)?.price ?? 0;
    let discounted = 0;
    for (const slice of discountSplitFor(line.key, merged)) {
      const take = Math.min(slice.qty, line.qty - discounted);
      total += take * slice.unit;
      discounted += take;
    }
    total += (line.qty - discounted) * price;
  }
  return Math.round(total * 100) / 100;
}

function grossOf(lines: CartLine[]): number {
  return (
    Math.round(
      mergeLines(lines).reduce(
        (s, l) => s + (getProduct(l.key)?.price ?? 0) * l.qty,
        0,
      ) * 100,
    ) / 100
  );
}

console.log(`${BUNDLES.length} bundles defined\n`);

// ─────────────────────────────────────────────────────────────────────────────
// SHAPE. A malformed bundle is a pricing bug waiting to happen, and these are
// the checks that catch a bad edit before anything downstream sees it.
// ─────────────────────────────────────────────────────────────────────────────
check(
  "bundle ids are unique",
  new Set(BUNDLES.map((b) => b.id)).size,
  BUNDLES.length,
);
check(
  "bundle names are unique",
  new Set(BUNDLES.map((b) => b.name)).size,
  BUNDLES.length,
);

for (const b of BUNDLES) {
  const missing = b.keys.filter((k) => !getProduct(k));
  ok(`${b.id}: every key resolves to a product`, missing.length === 0, `missing: ${missing.join(", ")}`);

  const unsourced = b.keys.filter((k) => {
    const p = getProduct(k);
    return p && !isSourced(p);
  });
  ok(
    `${b.id}: every key is sourced`,
    unsourced.length === 0,
    `unsourced: ${unsourced.join(", ")}`,
  );

  ok(
    `${b.id}: no key appears twice`,
    new Set(b.keys).size === b.keys.length,
    `keys: ${b.keys.join(", ")}`,
  );
  ok(
    `${b.id}: minItems is reachable and leaves a real kit`,
    b.minItems >= 3 && b.minItems <= b.keys.length,
    `minItems ${b.minItems} against ${b.keys.length} keys`,
  );
  ok(
    `${b.id}: discount is between 5% and 20%`,
    b.discount >= 0.05 && b.discount <= 0.2,
    `discount ${b.discount}`,
  );

  // The price shown must be built from per-unit rounded figures, never from a
  // percentage of the total. The two differ by a cent often enough to matter.
  const naive = Math.round(bundleListPrice(b) * (1 - b.discount) * 100) / 100;
  const built = bundlePrice(b);
  ok(
    `${b.id}: kit price is summed per unit, not taken off the total`,
    cents(built) ===
      bundleItems(b).reduce(
        (c, p) => c + cents(bundleUnitPrice(p.price, b.discount)),
        0,
      ),
    `built ${built} vs naive ${naive}`,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE KIT. The original 2025 regressions, now run against every bundle
// rather than the one that happened to exist when they were written.
// ─────────────────────────────────────────────────────────────────────────────
for (const b of BUNDLES) {
  const base = oneOfEach(b);
  const value = perSet(b);

  check(`${b.id}: one of each earns the kit`, cartEarnsBundle(base), true);
  check(`${b.id}: one of each = 1 set`, allocateBundles(base)[0]?.sets, 1);
  check(`${b.id}: one of each discount`, bundleDiscountAmount(base), value);

  // The bug the audit reproduced: extra units of ONE member must not inflate
  // the discount. Nine spools of braid and one of everything else is one kit
  // plus eight spare spools.
  const inflated = base.map((l, i) => (i === 0 ? { ...l, qty: 9 } : l));
  check(
    `${b.id}: 9 of one member is still one kit's worth of discount`,
    bundleDiscountAmount(inflated),
    value,
  );

  const two = base.map((l) => ({ ...l, qty: 2 }));
  check(`${b.id}: two of everything = 2 sets`, allocateBundles(two)[0]?.sets, 2);
  check(
    `${b.id}: two sets = double the discount`,
    bundleDiscountAmount(two),
    Math.round(2 * value * 100) / 100,
  );

  // Drop enough members to go under minItems, and the kit must vanish rather
  // than pay out on a partial cart.
  const short = base.slice(0, b.minItems - 1);
  check(
    `${b.id}: below minItems earns nothing`,
    bundleDiscountAmount(short),
    0,
  );
}

check("empty cart = no discount", bundleDiscountAmount([]), 0);
check("empty cart earns nothing", cartEarnsBundle([]), false);
check(
  "a cart of one unrelated product earns nothing",
  bundleDiscountAmount([{ key: "cooler", qty: 1 }]),
  0,
);
check(
  "a product in no kit never gets a discounted slice",
  discountSplitFor("cooler", [{ key: "cooler", qty: 1 }]),
  [],
);

// ─────────────────────────────────────────────────────────────────────────────
// OVERLAP. The failure mode that only exists once there is more than one kit.
// ─────────────────────────────────────────────────────────────────────────────

// Find two kits that genuinely share a member. If the catalog is ever edited
// so that none do, say so loudly rather than silently skipping the tests that
// matter most — a green run that tested nothing is worse than a red one.
let pair: { a: Bundle; b: Bundle; shared: string[] } | null = null;
for (let i = 0; i < BUNDLES.length && !pair; i++) {
  for (let j = i + 1; j < BUNDLES.length && !pair; j++) {
    const shared = BUNDLES[i].keys.filter((k) => BUNDLES[j].keys.includes(k));
    if (shared.length > 0) pair = { a: BUNDLES[i], b: BUNDLES[j], shared };
  }
}
ok(
  "at least two kits share a member (otherwise these tests prove nothing)",
  pair !== null,
);

if (pair) {
  const { a, b, shared } = pair;
  console.log(`\n  overlap pair: ${a.id} + ${b.id}, sharing ${shared.join(", ")}\n`);

  // One of every member of BOTH kits, so each shared item is present exactly
  // once. Only one kit can be awarded, because the other would need a second
  // unit of the shared part that isn't in the cart.
  const union = unionOnce([a, b]);
  const awards = allocateBundles(union);
  check(
    "one shared unit awards exactly one kit",
    awards.length,
    1,
  );
  ok(
    "the kit awarded is the one that saves more",
    awardSaving(awards[0]) >= Math.min(perSet(a), perSet(b)),
    `awarded ${awards[0]?.name} for ${awardSaving(awards[0])}`,
  );
  check(
    "the discount is one kit's, not two",
    bundleDiscountAmount(union),
    Math.max(perSet(a), perSet(b)),
  );

  // Double up the shared parts and both kits become payable.
  const doubled = union.map((l) =>
    shared.includes(l.key) ? { ...l, qty: l.qty + 1 } : l,
  );
  check("doubling the shared parts awards both kits", allocateBundles(doubled).length, 2);
  check(
    "both kits = both discounts",
    bundleDiscountAmount(doubled),
    Math.round((perSet(a) + perSet(b)) * 100) / 100,
  );

  // THE INVARIANT. Across every award, the units claimed for a shared key can
  // never exceed what is in the cart.
  for (const lines of [union, doubled]) {
    for (const line of lines) {
      const claimed = discountSplitFor(line.key, lines).reduce(
        (s, sl) => s + sl.qty,
        0,
      );
      ok(
        `no double discount on ${line.key} (claimed ${claimed} of ${line.qty})`,
        claimed <= line.qty,
      );
    }
  }
}

// A cart holding one of EVERY product in EVERY kit at once: the worst case for
// the allocator, and the one where a naive implementation pays out on all seven.
const everything = unionOnce(BUNDLES);
{
  const awards = allocateBundles(everything);
  console.log(
    `\n  one of everything: ${awards.map((x) => x.name).join(", ") || "no kits"}\n`,
  );
  for (const line of everything) {
    const claimed = discountSplitFor(line.key, everything).reduce(
      (s, sl) => s + sl.qty,
      0,
    );
    ok(
      `one-of-everything: ${line.key} claimed ${claimed}× against qty ${line.qty}`,
      claimed <= line.qty,
    );
  }
  check(
    "one-of-everything: award savings sum to the cart discount",
    Math.round(awards.reduce((s, x) => s + awardSaving(x), 0) * 100) / 100,
    bundleDiscountAmount(everything),
  );
}

// Same cart with three of everything, so several kits are payable more than once.
{
  const triple = everything.map((l) => ({ ...l, qty: 3 }));
  const awards = allocateBundles(triple);
  for (const line of triple) {
    const claimed = discountSplitFor(line.key, triple).reduce(
      (s, sl) => s + sl.qty,
      0,
    );
    ok(
      `three-of-everything: ${line.key} claimed ${claimed}× against qty 3`,
      claimed <= 3,
    );
  }
  ok(
    "three-of-everything awards more than one-of-everything",
    awards.reduce((s, x) => s + x.sets, 0) >=
      allocateBundles(everything).reduce((s, x) => s + x.sets, 0),
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DETERMINISM. The cart page and the checkout route both call the allocator.
// If it can return two different answers for the same cart, one of them is a
// price the customer did not agree to.
// ─────────────────────────────────────────────────────────────────────────────
{
  const shuffled = [...everything].reverse();
  check(
    "cart line order does not change the award",
    allocateBundles(shuffled).map((a) => `${a.id}:${a.sets}`),
    allocateBundles(everything).map((a) => `${a.id}:${a.sets}`),
  );
  check(
    "repeated calls agree",
    bundleDiscountAmount(everything),
    bundleDiscountAmount([...everything]),
  );
  // Duplicate lines for the same key must not buy a second discount.
  const dup = [...everything, ...everything];
  check(
    "a key listed twice is merged, not discounted twice",
    bundleDiscountAmount(dup),
    bundleDiscountAmount(everything.map((l) => ({ ...l, qty: l.qty * 2 }))),
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THE MONEY. Whatever the allocator decides, the Stripe line items and the
// cart total have to be the same number.
// ─────────────────────────────────────────────────────────────────────────────
const CASES: [string, CartLine[]][] = [
  ...BUNDLES.map(
    (b) => [`${b.id} alone`, oneOfEach(b)] as [string, CartLine[]],
  ),
  ...BUNDLES.map(
    (b) =>
      [`${b.id} ×2`, oneOfEach(b).map((l) => ({ ...l, qty: 2 }))] as [
        string,
        CartLine[],
      ],
  ),
  ["one of everything", everything],
  ["three of everything", everything.map((l) => ({ ...l, qty: 3 }))],
  [
    "everything plus an unrelated cooler",
    [...everything, { key: "cooler", qty: 1 }],
  ],
  ["a lopsided cart", everything.map((l, i) => ({ ...l, qty: (i % 4) + 1 }))],
];

for (const [name, lines] of CASES) {
  const cart = Math.round((grossOf(lines) - bundleDiscountAmount(lines)) * 100) / 100;
  check(`Stripe line items equal the cart total — ${name}`, serverSubtotal(lines), cart);
}

console.log(failures === 0 ? "\nAll bundle tests passed." : `\n${failures} FAILED`);
if (failures > 0) process.exit(1);
