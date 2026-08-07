import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import {
  getStripe,
  isStripeConfigured,
  FREE_SHIPPING_OVER,
  FLAT_SHIPPING,
} from "@/lib/stripe";
import type { Attribution } from "@/lib/attribution";

export const runtime = "nodejs";

interface Body {
  lines?: { key: string; qty: number }[];
  attribution?: Attribution;
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

  const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : FLAT_SHIPPING;
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
        utm_source: attribution.utm_source ?? "direct",
        utm_medium: attribution.utm_medium ?? "",
        utm_campaign: attribution.utm_campaign ?? "",
        landing_path: attribution.landing_path ?? "",
        referrer: (attribution.referrer ?? "").slice(0, 400),
        product_keys: lines.map((l) => l.key).join(","),
      },
      return_url: `${base}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: false },
      shipping_address_collection: { allowed_countries: ["US"] },
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
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 9 },
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
