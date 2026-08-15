/**
 * BUNDLE MARGIN GUARD.
 *
 * Run with:  npm run bundles:margin
 * (which is `tsx --conditions=react-server`, because supplier.ts is
 * server-only and that condition is how Node resolves the marker package to
 * its no-op build instead of the module that throws.)
 *
 * WHY THIS EXISTS
 *
 * A bundle is the only place on this site where a plausible-looking edit can
 * quietly sell at a loss. Nothing on the bundle page says what the parts cost,
 * the discount is a single innocuous number, and swapping one member for
 * another changes the economics far more than it changes the copy.
 *
 * Under dropship every order carries a fixed drag: inbound freight (~$9.95,
 * once per supplier the order touches) plus Stripe's 2.9% + 30c. Below
 * FREE_SHIPPING_OVER the flat shipping charge recovers that freight. Above it,
 * we stop charging and eat the whole thing — so a kit priced just over the
 * threshold carries about $14 of cost before it has sold anything.
 *
 * That is not hypothetical. Of the first seven kits drafted for this store,
 * three came in well under the benchmark:
 *
 *     bay-jetty      $101.60 sale  →  $6.04
 *     bass-day        $95.88 sale  →  $7.65
 *     salmon-troll    $76.52 sale  →  $2.24
 *
 * All three looked completely reasonable on the page; the salmon kit was
 * clearing $75 by a dollar and a half and giving away the shipping to do it.
 * They were rebuilt around higher-margin parts until they cleared, and this
 * script is what says so.
 *
 * THE FLOOR
 *
 * $10 net per kit, which is roughly what the original single Surf Starter made
 * ($11.27 on a $90.38 sale). It is not a target — it is the line under which a
 * kit is not worth packing. Raise it when there is real order data.
 *
 * This is intentionally NOT part of `npm test`: it reads dealer cost, and the
 * standing rule is that dealer cost never leaves the server. It is a
 * pre-ship check, run by a human, on the machine that already has the data.
 */
import { BUNDLES, bundleItems, bundleUnitPrice } from "../src/lib/products";
import { inboundFreight, supplierFor } from "../src/lib/supplier";
import { FLAT_SHIPPING, FREE_SHIPPING_OVER } from "../src/lib/stripe";

const STRIPE_PCT = 0.029;
const STRIPE_FIXED = 0.3;

/** Net profit floor, in dollars, per complete kit. */
const FLOOR = 10;

let failures = 0;
const rows: string[] = [];

for (const b of BUNDLES) {
  const items = bundleItems(b);
  const missingCost = items.filter((p) => !supplierFor(p.key));

  const list = items.reduce((s, p) => s + p.price, 0);
  const sale = items.reduce(
    (s, p) => s + bundleUnitPrice(p.price, b.discount),
    0,
  );
  const cost = items.reduce((s, p) => s + (supplierFor(p.key)?.cost ?? 0), 0);
  const freight = inboundFreight(items.map((p) => ({ key: p.key, quantity: 1 })));
  // Under dropship the supplier ships direct, so inboundFreight() IS the
  // delivery cost — there is no second outbound leg. What changes above the
  // threshold is that we stop CHARGING for it: FLAT_SHIPPING exists to recover
  // that same freight, and free shipping means we eat it. Stripe's percentage
  // applies to the shipping line too, since the customer pays it.
  const collected = sale >= FREE_SHIPPING_OVER ? 0 : FLAT_SHIPPING;
  const stripe = (sale + collected) * STRIPE_PCT + STRIPE_FIXED;
  const profit = sale + collected - cost - freight - stripe;

  const bad = missingCost.length > 0 || profit < FLOOR;
  if (bad) failures++;

  rows.push(
    `${bad ? "FAIL" : "ok  "}  ${b.id.padEnd(14)}` +
      ` list $${list.toFixed(2).padStart(7)}` +
      ` sale $${sale.toFixed(2).padStart(7)}` +
      ` cost $${cost.toFixed(2).padStart(7)}` +
      ` frt $${freight.toFixed(2).padStart(5)}` +
      ` fee $${stripe.toFixed(2).padStart(5)}` +
      ` ship +$${collected.toFixed(2).padStart(5)}` +
      ` → $${profit.toFixed(2).padStart(6)}` +
      (missingCost.length
        ? `\n        NO DEALER COST: ${missingCost.map((p) => p.key).join(", ")}`
        : ""),
  );
}

console.log(
  `Bundle margin, floor $${FLOOR.toFixed(2)} net per kit ` +
    `(shipping charged below $${FREE_SHIPPING_OVER}, absorbed above)\n`,
);
console.log(rows.join("\n"));
console.log(
  failures === 0
    ? `\nAll ${BUNDLES.length} bundles clear the floor.`
    : `\n${failures} bundle(s) below the floor. Fix the composition or the discount before shipping.`,
);
if (failures > 0) process.exit(1);
