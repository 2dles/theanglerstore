import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getProduct, isSourced } from "@/lib/products";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import {
  rateFor,
  shippableToZone,
  zoneForCountry,
} from "@/lib/shipping-zones";
import type { Attribution } from "@/lib/attribution";

export const runtime = "nodejs";

/**
 * Identifies this storefront inside a Stripe account that is shared with other
 * sites. Written into every session's metadata, and checked by the webhook so
 * we only send order emails for OUR orders. Do not change without changing the
 * matching constant in src/app/api/webhooks/stripe/route.ts.
 */
export const STORE_ID = "theanglerstore";

interface Body {
  lines?: { key: string; qty: number }[];
  attribution?: Attribution;
  /** ISO-3166-1 alpha-2 destination. Defaults to US. */
  country?: string;
}

function siteUrl(req: Request): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/$/, "");
  const origin = req.headers.get("origin");
  if (origin) return origin;
  return "https://theanglerstore.com";
}

/**
 * Creates an EMBEDDED Stripe Checkout session and returns its client_secret.
 * The buyer completes payment inside theanglerstore.com — no redirect off-site.
 */
export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Checkout is not configured yet. Set STRIPE_SECRET_KEY to take live orders.",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const lines = Array.isArray(body.lines) ? body.lines : [];
  if (lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // ── Destination. The zone decides the rate, the transit estimate, and which
  //    countries Stripe will accept an address for. Resolved here rather than
  //    inside the Stripe frame because embedded Checkout fixes shipping options
  //    at session creation — we have to know the zone before we build it.
  const requested = String(body.country ?? "US");
  const zone = zoneForCountry(requested);
  if (!zone) {
    return NextResponse.json(
      {
        error:
          "We can't ship to that country yet. Right now we deliver within the United States only.",
      },
      { status: 400 },
    );
  }

  // ── Price server-side from our own catalog. A price from the client is
  //    never trusted; the client only ever sends keys and quantities.
  const items: {
    quantity: number;
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: {
        name: string;
        description: string;
        metadata: Record<string, string>;
      };
    };
  }[] = [];
  let subtotal = 0;

  for (const line of lines) {
    const product = getProduct(String(line.key));
    if (!product) {
      return NextResponse.json(
        { error: `We no longer carry "${line.key}".` },
        { status: 400 },
      );
    }
    // Placeholder products with no supplier behind them can never be paid for,
    // no matter how the request reaches us. Belt and braces: the UI hides them
    // and removes the buy button, and this refuses them anyway.
    if (!isSourced(product)) {
      return NextResponse.json(
        {
          error: `${product.name} isn't available to order yet. Take it out of your cart and the rest will go through.`,
        },
        { status: 400 },
      );
    }

    if (!shippableToZone(product, zone)) {
      return NextResponse.json(
        {
          error: `${product.name} can only be shipped within the United States. Our tackle suppliers are US distributors; apparel travels, tackle doesn't.`,
        },
        { status: 400 },
      );
    }

    const qty = Math.min(Math.max(Math.floor(Number(line.qty) || 0), 1), 99);
    subtotal += product.price * qty;

    items.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.name,
          description: product.tagline,
          metadata: { product_key: product.key },
        },
      },
    });
  }

  const shipping = rateFor(zone, subtotal);
  const attribution = body.attribution ?? {};
  const base = siteUrl(req);

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      line_items: items,
      // Attribution rides into the payment record so revenue traces back to the
      // exact USTideCharts surface that produced it.
      metadata: {
        store: STORE_ID,
        utm_source: attribution.utm_source ?? "direct",
        utm_medium: attribution.utm_medium ?? "",
        utm_campaign: attribution.utm_campaign ?? "",
        landing_path: attribution.landing_path ?? "",
        referrer: (attribution.referrer ?? "").slice(0, 400),
        product_keys: lines.map((l) => l.key).join(","),
        ship_zone: zone.id,
      },
      return_url: `${base}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      // What the customer sees on their card statement. Without this they see
      // the Stripe account's legal name, don't recognise it, and file a
      // chargeback — the single most common avoidable dispute for a new store.
      payment_intent_data: {
        statement_descriptor_suffix: "ANGLERSTORE",
        description: `TheAnglerStore order — ${lines.length} item${lines.length === 1 ? "" : "s"}`,
      },
      automatic_tax: { enabled: false },
      // Only the resolved zone's countries are accepted, so a buyer can correct
      // a typo in their address without escaping the rate they were quoted.
      shipping_address_collection: {
        allowed_countries:
          zone.countries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection["allowed_countries"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name:
              shipping === 0 ? "Free shipping" : "Standard shipping",
            fixed_amount: {
              amount: Math.round(shipping * 100),
              currency: "usd",
            },
            delivery_estimate: {
              minimum: { unit: "business_day", value: zone.transit.min },
              maximum: { unit: "business_day", value: zone.transit.max },
            },
          },
        },
      ],
    });

    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Stripe did not return a client secret." },
        { status: 502 },
      );
    }
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed.";
    console.error("[checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
