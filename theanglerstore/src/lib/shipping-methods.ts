import { FREE_SHIPPING_OVER } from "@/lib/stripe";

/**
 * SHIPPING METHODS
 * ================
 *
 * What the customer picks at checkout, and how long each one actually takes.
 *
 * WHY THIS EXISTS
 * ---------------
 * The store quoted one delivery window because it bought one service. Our
 * first real order took nine business days to California, which got the whole
 * catalogue re-quoted from 3-7 to 3-10 business days. That was the right
 * change but the wrong diagnosis: nine days was not what the supply chain can
 * do, it was what the CHEAPEST OF FOUR SERVICES does. CWR's order form offers
 * four flat rates, we picked the $9.95 one, and then published its transit
 * time as though it were a fact about the business.
 *
 * A customer who needs a rod for Saturday's tide does not want our cheapest
 * option quoted at them as the only option. They want to be shown the price of
 * going faster and allowed to decide. So the window a product page quotes is
 * now explicitly the ECONOMY window, and the faster services are offered at
 * checkout at what they cost.
 *
 * PRICING
 * -------
 * Every method is CWR's flat rate plus $3.00. That is the same convention the
 * single flat rate already used ($9.95 freight, $12.95 charged): it covers
 * Stripe's 30c fixed fee, their 2.9% of the shipping line itself, and leaves a
 * little for the handling we do. Marking shipping up further is how a store
 * gets a reputation for shipping-fee games, and marking it up less means the
 * fast options lose money on every order.
 *
 * The free-shipping threshold applies to ECONOMY ONLY. An upgrade is charged
 * in full even on a large order, because we pay CWR in full for it. Crediting
 * the economy rate against a Two Day upgrade would mean charging $15.00 for a
 * service that costs us $24.95.
 *
 * TRANSIT TIMES ARE DOOR TO DOOR
 * ------------------------------
 * They include the day the distributor takes to pick and hand over, because
 * that is the number a customer actually experiences. Measured handling on our
 * one real order was one business day; the ranges below allow two, since an
 * order placed after CWR's afternoon cutoff does not go out that day.
 *
 * DO NOT INVENT A NUMBER HERE. Every window below is either measured
 * (economy) or comes from the service's own name (two-day, overnight). The one
 * method we cannot honestly quote is disabled rather than estimated, which is
 * the same rule the international zones follow in shipping-zones.ts.
 */

export type MethodId = "economy" | "standard" | "two-day" | "overnight";

export interface ShippingMethod {
  id: MethodId;
  label: string;
  /** What the customer pays. CWR's flat rate plus $3.00. */
  price: number;
  /** Business days DOOR TO DOOR, including the distributor's handling day. */
  transit: { min: number; max: number };
  /** Does the free-shipping threshold apply to this method? Economy only. */
  freeOverThreshold: boolean;
  enabled: boolean;
  /** Why it's off. Shown on the policy page. */
  blockedReason?: string;
  /** One line on the policy page, in the customer's terms. */
  note: string;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "economy",
    label: "Economy",
    price: 12.95,
    // MEASURED, and the range is geography rather than uncertainty.
    //
    // Ordered Mon 10 Aug 2026, shipped Tue 11 Aug, arrived Sat 22 Aug in
    // California: 1 business day of handling, 8 of transit, 9 door to door.
    // CWR ships from New Jersey and Florida, so 3 to 7 is a fair figure for
    // most of the country and the 10 is what the West Coast actually gets.
    //
    // Keep the MAX at 10 even though the copy leads with 3 to 7. This number
    // feeds schema.org and the Stripe delivery estimate, and those two should
    // state the worst case we have actually seen, not the common one. The
    // place to be reassuring is the prose; the place to be conservative is the
    // machine-readable promise a buyer can hold us to.
    transit: { min: 3, max: 10 },
    freeOverThreshold: true,
    enabled: true,
    note:
      "Free over $" +
      FREE_SHIPPING_OVER +
      ", and 3 to 7 business days to most of the country. The West Coast is the exception: our distributor is on the East Coast, so a parcel crossing the whole country can take up to 10. Fine if you are stocking up rather than fishing this weekend.",
  },
  {
    id: "standard",
    label: "Standard",
    price: 16.95,
    // PLACEHOLDER. Not shown to anyone while enabled is false.
    transit: { min: 0, max: 0 },
    freeOverThreshold: false,
    enabled: false,
    blockedReason:
      "CWR sells this at $13.95 but publishes no transit time for it, and we have not run an order on it yet. Quoting a guess here is exactly the mistake that put nine days behind a seven-day promise. Place one order on Standard, log it in SHIPPING-OBSERVED.md, then set the window from what actually happened and switch this on.",
    note: "",
  },
  {
    id: "two-day",
    label: "Two-day",
    price: 27.95,
    // The service is named for its transit leg, so the only estimate here is
    // the handling day either side of it: 1-2 days to leave, 2 in the air.
    transit: { min: 3, max: 4 },
    freeOverThreshold: false,
    enabled: true,
    note: "Two days in transit once it leaves the warehouse. The one to pick if you are fishing next weekend.",
  },
  {
    id: "overnight",
    label: "Overnight",
    price: 52.95,
    // Same reasoning: overnight is one night in transit, plus the handling day.
    transit: { min: 2, max: 3 },
    freeOverThreshold: false,
    enabled: true,
    note: "Order before the early afternoon and it moves the same day. Expensive, and occasionally worth it.",
  },
];

export function enabledMethods(): ShippingMethod[] {
  return SHIPPING_METHODS.filter((m) => m.enabled);
}

/** The method quoted on product pages and in Product schema. */
export function defaultMethod(): ShippingMethod {
  return enabledMethods()[0] ?? SHIPPING_METHODS[0];
}

export function methodById(id: string): ShippingMethod | undefined {
  return SHIPPING_METHODS.find((m) => m.id === id && m.enabled);
}

/**
 * What we charge for a method on a given subtotal.
 *
 * Server-side truth. The browser picks a method inside Stripe's own UI from
 * options WE built, so it can never invent a rate — but this is the function
 * that decides, and it is never fed a price from the client.
 */
export function priceForMethod(
  method: ShippingMethod,
  subtotal: number,
): number {
  if (method.freeOverThreshold && subtotal >= FREE_SHIPPING_OVER) return 0;
  return method.price;
}
