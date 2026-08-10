import type { Product } from "@/lib/products";
import { FLAT_SHIPPING, FREE_SHIPPING_OVER } from "@/lib/stripe";

/**
 * SHIPPING ZONES
 * ==============
 *
 * The store is being built to sell worldwide, but "worldwide" is a supplier
 * capability before it is a checkout setting. This module is the single place
 * that decides where we ship, what it costs, and how long it takes — so the
 * policy page, the Product schema, and the Stripe session can never disagree
 * with each other.
 *
 * WHY INTERNATIONAL IS OFF TODAY
 * ------------------------------
 * Two hard blockers, both real, neither solvable in code:
 *
 *   1. No supplier can fulfil it. CWR ships from Bayville NJ and Tampa FL and
 *      quotes domestic flat rates only. Burch is Florence AL, domestic. Neither
 *      publishes an international rate card, and international freight on a
 *      7-foot surf rod is dimensional-weight punishment — easily $120+ to
 *      Europe on a $159 rod.
 *   2. Printful is the one genuinely global option (EU, UK, Canada, Japan,
 *      Australia fulfilment, printed locally), but it only fulfils apparel, and
 *      we have no apparel SKUs yet.
 *
 * So the honest state is: tackle is US-only because our distributors are, and
 * apparel will be global the day the apparel line exists. That is what the
 * policy page says, because it is true.
 *
 * TURNING A ZONE ON
 * -----------------
 * Set `enabled: true` and replace the placeholder rate. Do not guess the rate.
 * Pull the real number from Printful's shipping rate table for that region at
 * the weight of a packed tee or hoodie, add a buffer for the Stripe cross-border
 * fee (an extra 1.5% on international cards, plus 1% if currency-converted),
 * and use that. Under-pricing international shipping is the single fastest way
 * to turn a $28 tee into a $9 loss.
 *
 * Nothing else needs to change. The checkout, the policy page, and the
 * structured data all read from this table.
 */

export type ZoneId = "us" | "ca" | "eu-uk" | "row";

export interface ShippingZone {
  id: ZoneId;
  label: string;
  /** ISO-3166-1 alpha-2, passed straight to Stripe's allowed_countries. */
  countries: string[];
  /** Order subtotal at or above which shipping is free. null = never free. */
  freeOver: number | null;
  flat: number;
  /** Business days, door to door. */
  transit: { min: number; max: number };
  enabled: boolean;
  /** Shown on the policy page when the zone is off. */
  blockedReason?: string;
}

export const ZONES: ShippingZone[] = [
  {
    id: "us",
    label: "United States",
    countries: ["US"],
    freeOver: FREE_SHIPPING_OVER,
    flat: FLAT_SHIPPING,
    transit: { min: 2, max: 7 },
    enabled: true,
  },
  {
    id: "ca",
    label: "Canada",
    countries: ["CA"],
    freeOver: null,
    flat: 0, // PLACEHOLDER — set from Printful's Canada rate before enabling.
    transit: { min: 6, max: 12 },
    enabled: false,
    blockedReason:
      "Opens with the apparel line — Printful fulfils Canadian orders from within North America.",
  },
  {
    id: "eu-uk",
    label: "Europe & United Kingdom",
    countries: [
      "GB", "IE", "FR", "DE", "ES", "IT", "NL", "BE", "AT", "DK",
      "SE", "NO", "FI", "PT", "PL", "CZ", "GR",
    ],
    freeOver: null,
    flat: 0, // PLACEHOLDER — set from Printful's EU rate before enabling.
    transit: { min: 7, max: 14 },
    enabled: false,
    blockedReason:
      "Opens with the apparel line — Printful prints in the EU, so these are local deliveries rather than transatlantic freight.",
  },
  {
    id: "row",
    label: "Australia, New Zealand & Japan",
    countries: ["AU", "NZ", "JP"],
    freeOver: null,
    flat: 0, // PLACEHOLDER — set from Printful's APAC rate before enabling.
    transit: { min: 8, max: 16 },
    enabled: false,
    blockedReason:
      "Opens with the apparel line — Printful has fulfilment in Japan and Australia.",
  },
];

export const US_ZONE = ZONES[0];

export function enabledZones(): ShippingZone[] {
  return ZONES.filter((z) => z.enabled);
}

export function shipsInternationally(): boolean {
  return enabledZones().some((z) => z.id !== "us");
}

/** Resolve a country code to its zone. Unknown or unserved → undefined. */
export function zoneForCountry(country: string): ShippingZone | undefined {
  const cc = country.trim().toUpperCase();
  return ZONES.find((z) => z.enabled && z.countries.includes(cc));
}

/**
 * Which products a zone can actually receive.
 *
 * Tackle is bound to our US distributors. Apparel is print-on-demand and
 * fulfilled regionally, so it travels. Derived from category rather than a
 * per-product flag so a new apparel SKU is international by default and a new
 * rod is not — the safe direction for each.
 */
export function shippableToZone(product: Product, zone: ShippingZone): boolean {
  if (zone.id === "us") return true;
  return product.category.toLowerCase() === "apparel";
}

/** Shipping charge for a subtotal in a zone. Server-side only — never trusted from the client. */
export function rateFor(zone: ShippingZone, subtotal: number): number {
  if (zone.freeOver !== null && subtotal >= zone.freeOver) return 0;
  return zone.flat;
}

/** Every country we will accept an address for, across all live zones. */
export function allowedCountries(): string[] {
  return enabledZones().flatMap((z) => z.countries);
}
