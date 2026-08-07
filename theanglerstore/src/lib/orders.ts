import { getStripe, isStripeConfigured } from "@/lib/stripe";
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
  items: { description: string; quantity: number }[];
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
          items: (s.line_items?.data ?? []).map((li) => ({
            description: li.description ?? "(item)",
            quantity: li.quantity ?? 1,
          })),
        };
      })
      .sort((a, b) => b.created.getTime() - a.created.getTime());
  } catch (err) {
    console.error("[orders] Stripe read failed:", err);
    return [];
  }
}
