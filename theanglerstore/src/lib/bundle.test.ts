/**
 * BUNDLE DISCOUNT TESTS.
 *
 * Run with:  npx tsx src/lib/bundle.test.ts
 *
 * These exist because the discount was wrong in production in a way that lost
 * money on every order: it took 12% off every unit of every component, so
 * adding the bundle and bumping braid to qty 3 turned a $12.33 discount into
 * $20.72. The cases below are exactly the ones the audit reproduced in a
 * browser, plus the boundary cases that broke it.
 */
import {
  BUNDLE,
  bundleDiscountAmount,
  bundleItems,
  bundleSets,
  cartEarnsBundle,
  discountedUnitsFor,
} from "@/lib/products";

let failures = 0;

function check(name: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${name}` +
      (ok ? "" : `\n        expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`),
  );
}

const KEYS = bundleItems().map((p) => p.key);
const ONE_OF_EACH = KEYS.map((key) => ({ key, qty: 1 }));
const setValue = bundleItems().reduce((s, p) => s + p.price, 0);
// Per-set saving computed the way the checkout actually charges it: round
// each component's discounted price to the cent, then sum the differences.
const perSet =
  Math.round(
    bundleItems().reduce(
      (s, p) => s + (p.price - Math.round(p.price * (1 - BUNDLE.discount) * 100) / 100),
      0,
    ) * 100,
  ) / 100;

console.log(
  `bundle = ${KEYS.join(", ")}\nset value $${setValue.toFixed(2)}, ` +
    `discount ${Math.round(BUNDLE.discount * 100)}% = $${perSet.toFixed(2)} per set\n`,
);

// ── the case that was correct before, and must stay correct ────────────────
check("bundle alone earns the discount", cartEarnsBundle(KEYS), true);
check("bundle alone = 1 set", bundleSets(ONE_OF_EACH), 1);
check("bundle alone discount", bundleDiscountAmount(ONE_OF_EACH), perSet);

// ── the bug the audit reproduced ───────────────────────────────────────────
const plusTwoBraid = ONE_OF_EACH.map((l) =>
  l.key === KEYS[0] ? { ...l, qty: 3 } : l,
);
check("bundle + 2 extra of one component is still 1 set", bundleSets(plusTwoBraid), 1);
check(
  "bundle + 2 extra does NOT inflate the discount",
  bundleDiscountAmount(plusTwoBraid),
  perSet,
);

const plusThreeBraid = ONE_OF_EACH.map((l) =>
  l.key === KEYS[0] ? { ...l, qty: 4 } : l,
);
check("qty 4 of one component is still 1 set", bundleDiscountAmount(plusThreeBraid), perSet);

// ── multiple complete sets ─────────────────────────────────────────────────
const twoOfEach = KEYS.map((key) => ({ key, qty: 2 }));
check("two of everything = 2 sets", bundleSets(twoOfEach), 2);
check(
  "two sets = double the discount",
  bundleDiscountAmount(twoOfEach),
  Math.round(2 * perSet * 100) / 100,
);

const twoSetsPlusExtra = KEYS.map((key, i) => ({ key, qty: i === 0 ? 9 : 2 }));
check("nine of one, two of the rest = 2 sets", bundleSets(twoSetsPlusExtra), 2);

// ── incomplete cart earns nothing ──────────────────────────────────────────
const missingOne = ONE_OF_EACH.slice(1);
check("missing a component earns no bundle", cartEarnsBundle(missingOne.map((l) => l.key)), false);
check("missing a component = 0 sets", bundleSets(missingOne), 0);
check("missing a component = no discount", bundleDiscountAmount(missingOne), 0);
check("empty cart = no discount", bundleDiscountAmount([]), 0);

// ── the split the checkout route relies on ─────────────────────────────────
check(
  "one unit of braid is at bundle price when 3 are in the cart",
  discountedUnitsFor(KEYS[0], plusTwoBraid),
  1,
);
check(
  "a non-bundle product never gets bundle units",
  discountedUnitsFor("cooler", ONE_OF_EACH),
  0,
);

// ── cart total must equal what the split line items add up to ──────────────
function serverSubtotal(lines: { key: string; qty: number }[]): number {
  const earns = cartEarnsBundle(lines.map((l) => l.key));
  let total = 0;
  for (const line of lines) {
    const p = bundleItems().find((x) => x.key === line.key);
    const price = p?.price ?? 0;
    const bundled = earns ? Math.min(line.qty, discountedUnitsFor(line.key, lines)) : 0;
    total += bundled * (Math.round(price * (1 - BUNDLE.discount) * 100) / 100);
    total += (line.qty - bundled) * price;
  }
  return Math.round(total * 100) / 100;
}
for (const [name, lines] of [
  ["bundle alone", ONE_OF_EACH],
  ["bundle + 2 braid", plusTwoBraid],
  ["two sets", twoOfEach],
] as const) {
  const gross = lines.reduce(
    (s, l) => s + (bundleItems().find((x) => x.key === l.key)?.price ?? 0) * l.qty,
    0,
  );
  const cart = Math.round((gross - bundleDiscountAmount([...lines])) * 100) / 100;
  check(`Stripe line items equal the cart total — ${name}`, serverSubtotal([...lines]), cart);
}

console.log(failures === 0 ? "\nAll bundle tests passed." : `\n${failures} FAILED`);
if (failures > 0) process.exit(1);
