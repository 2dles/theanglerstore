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
 * Shipping economics — derived from the August 2026 sourcing research.
 *
 * Under manual dropship every order carries a fixed drag of roughly $4.29:
 * the cheapest verified flat-rate inbound freight ($3.99 from our highest-volume
 * supplier) plus Stripe's $0.30 fixed leg. On a $12.99 hook pack that drag is a
 * third of revenue, so free shipping on everything would sell several SKUs at a
 * loss.
 *
 * $5.95 collected below $49 covers the inbound with a small buffer; above $49
 * the basket absorbs it comfortably (inbound lands near 8% of revenue). The
 * threshold is set at $49 rather than $59 deliberately — see SOURCING.md.
 */
export const FREE_SHIPPING_OVER = 49;
export const FLAT_SHIPPING = 5.95;
