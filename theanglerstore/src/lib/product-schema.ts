import type { Product } from "@/lib/products";
import { FLAT_SHIPPING, FREE_SHIPPING_OVER } from "@/lib/stripe";

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
 * We have no supplier photography yet, but we do have a real, stable,
 * branded 1200×630 PNG per product — the OpenGraph card generated at build
 * from the live catalog. It is a genuine image of the product's listing, it
 * always matches the current name and price, and it never 404s.
 *
 * When licensed photography arrives and `product.image` is set, that becomes
 * the primary image and the OG card stays as a secondary. Google accepts an
 * array and prefers the first.
 */
export function productImages(product: Product): string[] {
  const og = `${SITE}/products/${product.key}/opengraph-image`;
  return product.image ? [`${SITE}${product.image}`, og] : [og];
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
 * OfferShippingDetails.
 *
 * Rate is per-product and truthful: anything at or above the free-shipping
 * threshold ships free on its own, anything below carries the flat rate if
 * bought alone. That is exactly what the cart charges.
 */
export function shippingDetails(product: Product) {
  const rate = product.price >= FREE_SHIPPING_OVER ? 0 : FLAT_SHIPPING;
  const transit = transitDays(product.shipsIn);

  return {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: rate,
      currency: "USD",
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "US",
    },
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
        minValue: transit.min,
        maxValue: transit.max,
        unitCode: "DAY",
      },
    },
  };
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
