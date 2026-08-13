import type { Product } from "@/lib/products";
import {
  enabledZones,
  rateFor,
  shippableToZone,
} from "@/lib/shipping-zones";

/**
 * Structured-data helpers for Product JSON-LD.
 *
 * Google Search Console flagged three things on 2026-08-07:
 *   · CRITICAL     missing "image"
 *   · non-critical missing "shippingDetails" in offers
 *   · non-critical missing "hasMerchantReturnPolicy" in offers
 *
 * It also flagged missing "aggregateRating" and "review". We deliberately do
 * NOT add those. Inventing ratings for a store that has never taken an order
 * is fabricated review content — against Google's policy, and dishonest to
 * anyone reading the SERP. They get added when real customers leave real
 * reviews, and not before.
 *
 * Everything below is generated from the same constants the storefront and
 * checkout use, so the schema cannot drift from what we actually charge.
 */

const SITE = "https://theanglerstore.com";

/**
 * Product image.
 *
 * Products sourced from CWR carry their licensed dealer photography, served
 * from productimageserver.com — we hold a CWR dealer account and their
 * program provides those images for dealer storefronts.
 *
 * Anything without supplier photography falls back to its OpenGraph card: a
 * real, stable, branded 1200×630 PNG generated at build from the live
 * catalog. It always matches the current name and price and never 404s.
 *
 * Google accepts an array and prefers the first, so the real photograph
 * leads and the OG card stays as a fallback.
 */
export function productImages(product: Product): string[] {
  const og = `${SITE}/products/${product.key}/opengraph-image`;
  if (!product.image) return [og];
  // Supplier images are absolute URLs; our own files are site-relative.
  const primary = product.image.startsWith("http")
    ? product.image
    : `${SITE}${product.image}`;
  return [primary, og];
}

/**
 * Parse "2–5 business days" into transit bounds.
 * `shipsIn` is quoted door-to-door, so we hand one day of it to handlingTime
 * and the rest to transit — that keeps the total honest rather than inflating
 * the estimate by stacking handling on top of the number the customer sees.
 */
function transitDays(shipsIn: string): { min: number; max: number } {
  const m = shipsIn.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (!m) return { min: 2, max: 7 };
  return {
    min: Math.max(1, Number(m[1]) - 1),
    max: Math.max(1, Number(m[2]) - 1),
  };
}

/**
 * OfferShippingDetails — one entry per live zone this product can reach.
 *
 * Driven by src/lib/shipping-zones.ts, the same table the checkout prices
 * from, so the schema cannot advertise a destination we would refuse at
 * checkout. Today that resolves to the US only; the day an apparel SKU and a
 * live international zone exist, apparel products emit both automatically and
 * tackle keeps emitting one.
 *
 * Returns a single object rather than a one-element array when there's only
 * one zone — Google accepts either, and the flat form is easier to read in
 * the Rich Results test.
 */
export function shippingDetails(product: Product) {
  const transit = transitDays(product.shipsIn);

  const entries = enabledZones()
    .filter((zone) => shippableToZone(product, zone))
    .map((zone) => {
      const rate = rateFor(zone, product.price);
      // The US zone's transit is per-product (parsed from shipsIn); other
      // zones are supplier-regional, so the zone's own window is the honest one.
      const window =
        zone.id === "us" ? transit : { min: zone.transit.min, max: zone.transit.max };

      // What we actually charge depends on the ORDER total, not this
      // product's price — "free over $75, $12.95 below that". Asserting a
      // flat 12.95 was a claim the storefront contradicts two inches away on
      // the same page, and it is the number a shopping surface would quote.
      //
      // So: a product that clears the threshold on its own ships free, and
      // says so exactly. Anything below it is genuinely a range, because a
      // second item in the basket can take it to zero — and MonetaryAmount
      // min/max is how schema.org expresses a range honestly.
      const freeAlone = rate === 0;
      const shippingRate = freeAlone
        ? { "@type": "MonetaryAmount", value: 0, currency: "USD" }
        : {
            "@type": "MonetaryAmount",
            minValue: 0,
            maxValue: rate,
            currency: "USD",
          };

      return {
        "@type": "OfferShippingDetails",
        shippingRate,
        shippingDestination: zone.countries.map((cc) => ({
          "@type": "DefinedRegion",
          addressCountry: cc,
        })),
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: window.min,
            maxValue: window.max,
            unitCode: "DAY",
          },
        },
      };
    });

  return entries.length === 1 ? entries[0] : entries;
}

/**
 * MerchantReturnPolicy — mirrors /returns exactly.
 *
 * 30 days, by mail, customer covers return postage on a change-of-mind
 * return. We do not claim free returns, because we don't offer them.
 */
export function returnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "US",
    returnPolicyCategory:
      "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 30,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
    merchantReturnLink: `${SITE}/returns`,
  };
}
