import { NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  allocateBundles,
  discountSplitFor,
  getProduct,
  isSourced,
  mergeLines,
} from "@/lib/products";
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
      tax_behavior: "exclusive";
      unit_amount: number;
      product_data: {
        name: string;
        description: string;
        metadata: Record<string, string>;
      };
    };
  }[] = [];
  let subtotal = 0;

  // The bundle discounts are decided HERE, from the keys the cart contains —
  // never from anything the client claims. Same rule as pricing: the browser
  // sends keys and quantities, the server decides what they cost.
  //
  // mergeLines() collapses repeated keys and clamps quantities before anything
  // reads them, and the billing loop below runs over the MERGED list rather
  // than the raw one. It used to run over the raw one while the discount was
  // computed from a deduplicated view, which meant a cart that listed braid
  // twice could collect the discount on both lines.
  const merged = mergeLines(lines);
  if (merged.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }
  const awards = allocateBundles(merged);

  for (const line of merged) {
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

    const qty = line.qty;

    const push = (quantity: number, unit: number, bundleName: string | null) => {
      if (quantity <= 0) return;
      subtotal += unit * quantity;
      items.push({
        quantity,
        price_data: {
          currency: "usd",
          // Explicit rather than relying on the account default. USD prices on
          // this site are what the customer sees on the product page; tax goes
          // on top of that, never inside it.
          tax_behavior: "exclusive",
          unit_amount: Math.round(unit * 100),
          product_data: {
            name: bundleName ? `${product.name} (${bundleName})` : product.name,
            description: product.tagline,
            metadata: { product_key: product.key },
          },
        },
      });
    };

    // How many of THIS line belong to a complete kit, and to which one. The
    // rest are a normal purchase at the normal price.
    //
    // The discounted unit price used to be applied to the whole line, so a
    // cart with the bundle plus two spare spools of braid got 12% off all
    // three spools. Splitting the line is the only honest way to express "one
    // at the kit price, two at full" through Stripe's API — and now that kits
    // share parts, a single spool can only ever appear in one slice, because
    // the allocator spent that unit when it awarded the kit.
    let discounted = 0;
    for (const slice of discountSplitFor(product.key, merged)) {
      const take = Math.min(slice.qty, qty - discounted);
      push(take, slice.unit, slice.bundleName);
      discounted += take;
    }
    push(qty - discounted, product.price, null);
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
        product_keys: merged.map((l) => l.key).join(","),
        ship_zone: zone.id,
        // Every kit earned, with its set count. Stripe caps a metadata value
        // at 500 characters; seven kits at once cannot reach that, and the
        // slice is there so a future eighth can't silently fail the session.
        bundle: awards
          .map((a) => (a.sets > 1 ? `${a.name} ×${a.sets}` : a.name))
          .join(", ")
          .slice(0, 480),
      },
      return_url: `${base}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      // The statement descriptor is set at the ACCOUNT level in Stripe as
      // "THEANGLERSTORE", which is what a customer needs to recognize on a
      // card statement. We deliberately do NOT set statement_descriptor_suffix
      // here: Stripe concatenates the account's shortened descriptor with the
      // suffix, so a suffix of "ANGLERSTORE" would render as
      // "THEANGLER ANGLERSTORE" — redundant, and near the 22-character limit.
      //
      // The description below is internal: it shows on the payment in the
      // Stripe dashboard, not on the customer's statement.
      payment_intent_data: {
        description: `TheAnglerStore order, ${merged.length} item${merged.length === 1 ? "" : "s"}`,
      },
      // Stripe Tax. Calculation happens only where we hold a registration —
      // Stripe's own wording: "Without a registration in the customer's
      // location, the calculation returns zero tax." So this is safe to leave
      // on: it collects California tax once the CA registration is live at
      // dashboard.stripe.com/tax/locations, and quietly returns zero
      // everywhere else rather than over-collecting from people we have no
      // obligation to.
      //
      // NOT tax advice. Nexus rules change with volume and with where stock
      // ships from — get proper advice before assuming California is the only
      // state that will ever apply.
      automatic_tax: { enabled: true },
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
            // California taxes shipping on physical goods in most cases;
            // letting Stripe decide is the point of enabling Tax at all.
            tax_behavior: "exclusive",
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
