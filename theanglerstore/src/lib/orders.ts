import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { inboundFreight, supplierCost } from "@/lib/supplier";
import { PRODUCTS } from "@/lib/products";
import { STORE_ID } from "@/app/api/checkout/route";

export { isStripeConfigured };

/**
 * Orders, read live from Stripe.
 *
 * There is no orders database — Stripe is the system of record. At this
 * volume a live read per page load is fine and it can never drift out of
 * sync with what actually got paid. If order counts ever reach the hundreds
 * per month, cache this or mirror it into a table.
 */

export interface AdminOrder {
  id: string;
  created: Date;
  total: number; // cents
  name: string | null;
  email: string | null;
  city: string;
  utmSource: string | null;
  utmMedium: string | null;
  items: { description: string; quantity: number; key: string | null }[];
  /** Dealer cost of the goods, USD. Server-side only — see src/lib/supplier.ts. */
  cost: number;
  /** What's left after goods, inbound freight and Stripe's cut. USD. */
  net: number;
}

export async function recentOrders(days = 30): Promise<AdminOrder[]> {
  if (!isStripeConfigured()) return [];

  try {
    const stripe = getStripe();
    const since = Math.floor((Date.now() - days * 86_400_000) / 1000);

    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      created: { gte: since },
      expand: ["data.line_items"],
    });

    return sessions.data
      .filter(
        (s) =>
          s.payment_status === "paid" &&
          // The Stripe account is shared with other sites — only ours.
          s.metadata?.store === STORE_ID,
      )
      .map((s) => {
        const addr =
          s.collected_information?.shipping_details?.address ??
          s.customer_details?.address ??
          null;

        // Stripe stores the line description, not our product key, so map back
        // by name. metadata.product_keys is the fallback for older sessions and
        // for anything whose display name has since been edited.
        const metaKeys = (s.metadata?.product_keys ?? "")
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean);

        const items = (s.line_items?.data ?? []).map((li, idx) => {
          const desc = li.description ?? "(item)";
          const byName = PRODUCTS.find(
            (p) => desc === p.name || desc.startsWith(p.name),
          );
          return {
            description: desc,
            quantity: li.quantity ?? 1,
            key: byName?.key ?? metaKeys[idx] ?? null,
          };
        });

        const cost = supplierCost(items);
        const gross = (s.amount_total ?? 0) / 100;
        const net =
          gross - cost - inboundFreight(items) - (gross * 0.029 + 0.3);

        return {
          id: s.id,
          created: new Date(s.created * 1000),
          total: s.amount_total ?? 0,
          name:
            s.collected_information?.shipping_details?.name ??
            s.customer_details?.name ??
            null,
          email: s.customer_details?.email ?? null,
          city: [addr?.city, addr?.state].filter(Boolean).join(", ") || "—",
          utmSource: s.metadata?.utm_source || null,
          utmMedium: s.metadata?.utm_medium || null,
          items,
          cost,
          net,
        };
      })
      .sort((a, b) => b.created.getTime() - a.created.getTime());
  } catch (err) {
    console.error("[orders] Stripe read failed:", err);
    return [];
  }
}
