/**
 * Per-product margin for everything we list, not just the kits.
 *
 * The bundle script proves a kit clears its floor. It says nothing about a
 * single-item order, which is how most first orders arrive. This checks each
 * sourced product on its own: what we take, what it costs us, what the card
 * costs, and what is left.
 */
import { PRODUCTS, isSourced } from "../src/lib/products";
import { supplierFor, supplierIdOf, SUPPLIERS } from "../src/lib/supplier";
import { FREE_SHIPPING_OVER } from "../src/lib/stripe";

const FLAT = 12.95;
let bad = 0, thin = 0;
const rows: string[] = [];

for (const p of PRODUCTS) {
  if (!isSourced(p)) continue;
  const s = supplierFor(p.key);
  if (!s) { console.log(`NO SUPPLIER ROW  ${p.key}`); bad++; continue; }
  const collected = p.price >= FREE_SHIPPING_OVER ? 0 : FLAT;
  const revenue = p.price + collected;
  const freight = SUPPLIERS[supplierIdOf(p.key) ?? "cwr"].freight;
  const fee = revenue * 0.029 + 0.3;
  const net = revenue - s.cost - freight - fee;
  if (net < 0) { bad++; rows.push(`LOSS  ${net.toFixed(2)}  ${p.key}  price ${p.price} cost ${s.cost}`); }
  else if (net < 3) { thin++; rows.push(`THIN  ${net.toFixed(2)}  ${p.key}  price ${p.price} cost ${s.cost}`); }
}
rows.sort();
for (const r of rows) console.log(r);
console.log(`\n${PRODUCTS.filter(isSourced).length} sourced products checked. ${bad} losing money, ${thin} under $3 net.`);
if (bad > 0) process.exit(1);
