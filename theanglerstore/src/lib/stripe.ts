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
 * Above $49 the basket absorbs the freight; below it the customer pays what
 * shipping actually costs. See SOURCING-REALITY.md §3 for the full maths.
 */
export const FREE_SHIPPING_OVER = 49;
export const FLAT_SHIPPING = 9.95;
