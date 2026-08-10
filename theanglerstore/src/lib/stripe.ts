import Stripe from "stripe";

/**
 * Lazily constructed so `next build` succeeds without STRIPE_SECRET_KEY set.
 * The key is only needed at request time.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it in Vercel → Settings → Environment Variables (see .env.example).",
    );
  }

  cached = new Stripe(key, { typescript: true });
  return cached;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/**
 * Shipping economics — corrected 10 Aug 2026 against CWR's real rate card.
 *
 * Under manual dropship every order carries a fixed drag of roughly $4.29:
 * the cheapest verified flat-rate inbound freight ($3.99 from our highest-volume
 * supplier) plus Stripe's $0.30 fixed leg. On a $12.99 hook pack that drag is a
 * third of revenue, so free shipping on everything would sell several SKUs at a
 * loss.
 *
 * The earlier $5.95 was an estimate made before we had dealer access. CWR's
 * actual cheapest inbound freight is $9.95, so $5.95 lost $4 on every order
 * below the threshold. Across 995 in-stock fishing SKUs, moving to $9.95
 * takes the count clearing 25% margin at honest retail from 228 to 471.
 *
 * REVISED AGAIN 10 Aug 2026, after auditing real street prices for all 60
 * products. CWR's List Price field turned out to be fiction on marine
 * hardware — the flush-mount rod holder listed at $159.99 sells for $44.99 —
 * so the catalog was repriced to what customers actually pay. At those
 * prices, gross margin before freight is a healthy 29.6% median and nothing
 * is loss-making, but the $9.95 inbound freight was eating all of it:
 *
 *   basket    old policy ($9.95 under $49)    new ($12.95 under $75)
 *   1 item              20.7%                        25.6%
 *   2 items             13.6%                        26.8%
 *
 * The 2-item hole was self-inflicted: a $69 order cleared the old $49
 * threshold, so we shipped it free and absorbed the whole $9.95. $12.95 is
 * the real freight plus Stripe's fixed 30c, and $75 is where a basket can
 * actually carry it.
 */
export const FREE_SHIPPING_OVER = 75;
export const FLAT_SHIPPING = 12.95;
