import { Resend } from "resend";
import { getProduct } from "@/lib/products";
import {
  INBOUND_FREIGHT,
  quickAddLines,
  supplierCost,
  supplierFor,
} from "@/lib/supplier";

/**
 * Order notification email.
 *
 * Fulfillment is manual by design at launch: every paid order produces one
 * email containing everything needed to place the supplier order by hand.
 * Resend's free tier covers far more volume than a new store will produce.
 *
 * If RESEND_API_KEY is absent we log the order and return without throwing —
 * a missing email key must never cause the webhook to 500 in a loop. Stripe's
 * own payment notification is the backstop in that case.
 */

export interface OrderAddress {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

export interface OrderEmail {
  sessionId: string;
  email: string | null;
  name: string | null;
  phone: string | null;
  amountTotal: number;
  amountSubtotal: number;
  shippingCost: number;
  currency: string;
  address: OrderAddress | null;
  shipName: string | null;
  items: { description: string; quantity: number; amountTotal: number }[];
  metadata: Record<string, string>;
}

const money = (cents: number, currency: string) =>
  `${(cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: currency === "USD" ? "USD" : currency,
  })}`;

function formatAddress(a: OrderAddress | null, name: string | null): string {
  if (!a) return "⚠️ NO SHIPPING ADDRESS ON SESSION — check the Stripe dashboard.";
  return [
    name,
    a.line1,
    a.line2,
    [a.city, a.state, a.postal_code].filter(Boolean).join(", "),
    a.country,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Map a Stripe line description back to our product key where we can. */
function keyFor(description: string): string | null {
  const match = description.trim().toLowerCase();
  for (const k of [
    "surf-rod",
    "inshore-combo",
    "braided-line",
    "fluoro-leader",
    "circle-hooks",
    "carolina-kit",
    "swimbait-kit",
    "jig-assort",
    "landing-net",
    "sand-spike",
    "pliers",
    "tackle-bag",
    "cooler",
    "headlamp",
  ]) {
    const p = getProduct(k);
    if (p && p.name.trim().toLowerCase() === match) return k;
  }
  return null;
}

export async function sendOrderEmail(order: OrderEmail): Promise<void> {
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "orders@theanglerstore.com";
  const apiKey = process.env.RESEND_API_KEY;

  const lineKeys = order.items.map((i) => ({
    key: keyFor(i.description),
    quantity: i.quantity,
  }));

  const itemLines = order.items
    .map((i) => {
      const key = keyFor(i.description);
      const sup = key ? supplierFor(key) : undefined;
      return `  • ${i.quantity} × ${i.description}${
        sup ? `\n      CWR SKU ${sup.sku}  ·  mfg ${sup.mfgPart}  ·  cost ${money(Math.round(sup.cost * 100), order.currency)} ea` : key ? `  [key: ${key}]` : ""
      }  —  ${money(i.amountTotal, order.currency)}`;
    })
    .join("\n");

  // Paste-and-go for CWR's "Quick Add (SKU/MFG #/UPC)" box, so placing the
  // supplier order is a paste rather than a search.
  const quickAdd = quickAddLines(lineKeys);
  const cost = supplierCost(lineKeys);
  const stripeFee = (order.amountTotal / 100) * 0.029 + 0.3;
  const net = order.amountTotal / 100 - cost - INBOUND_FREIGHT - stripeFee;
  const netPct = order.amountTotal > 0 ? (net / (order.amountTotal / 100)) * 100 : 0;

  const text = `NEW PAID ORDER — place the supplier order now.

ITEMS TO ORDER
${itemLines}
${quickAdd.length ? `
PASTE INTO CWR → Quick Add (SKU/MFG #/UPC)
${quickAdd.map((l: string) => `  ${l}`).join("\n")}
` : ""}
WHAT YOU MAKE (estimate)
  Goods cost   ${money(Math.round(cost * 100), order.currency)}
  Inbound      ${money(Math.round(INBOUND_FREIGHT * 100), order.currency)}
  Stripe fee   ${money(Math.round(stripeFee * 100), order.currency)}
  Net          ${money(Math.round(net * 100), order.currency)}  (${netPct.toFixed(0)}%)

SHIP TO
${formatAddress(order.address, order.shipName)}

CUSTOMER
  ${order.name ?? "—"}
  ${order.email ?? "—"}${order.phone ? `\n  ${order.phone}` : ""}

MONEY
  Subtotal   ${money(order.amountSubtotal, order.currency)}
  Shipping   ${money(order.shippingCost, order.currency)}
  Total paid ${money(order.amountTotal, order.currency)}

ATTRIBUTION
  source   ${order.metadata.utm_source || "direct"}
  medium   ${order.metadata.utm_medium || "—"}
  landing  ${order.metadata.landing_path || "—"}

Stripe session: ${order.sessionId}
Dashboard: https://dashboard.stripe.com/payments

— Next step: open SOURCING.md, place each line with its supplier, ship to the
  address above, then email the customer their tracking number.`;

  const rows = order.items
    .map((i) => {
      const key = keyFor(i.description);
      const sup = key ? supplierFor(key) : undefined;
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee"><strong>${i.quantity} ×</strong> ${i.description}${
          sup
            ? `<br><span style="color:#888;font-family:monospace;font-size:12px">CWR ${sup.sku} · mfg ${sup.mfgPart} · cost $${sup.cost.toFixed(2)} ea</span>`
            : key
              ? ` <span style="color:#888;font-family:monospace;font-size:12px">${key}</span>`
              : ""
        }</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">${money(i.amountTotal, order.currency)}</td>
      </tr>`;
    })
    .join("");

  const html = `<div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:640px;margin:0 auto;color:#111">
  <h2 style="margin:0 0 4px">New paid order</h2>
  <p style="margin:0 0 20px;color:#666">Place the supplier order now.</p>

  <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#666">Items to order</h3>
  <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>

  <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#666">Ship to</h3>
  <pre style="margin:0;font-family:ui-monospace,monospace;font-size:14px;background:#f6f8fa;padding:12px 14px;border-radius:8px;white-space:pre-wrap">${formatAddress(order.address, order.shipName)}</pre>

  <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#666">Customer</h3>
  <p style="margin:0;font-size:14px">${order.name ?? "—"}<br>${order.email ?? "—"}${order.phone ? `<br>${order.phone}` : ""}</p>

  <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#666">Money</h3>
  <table style="font-size:14px">
    <tr><td style="padding:2px 16px 2px 0;color:#666">Subtotal</td><td>${money(order.amountSubtotal, order.currency)}</td></tr>
    <tr><td style="padding:2px 16px 2px 0;color:#666">Shipping</td><td>${money(order.shippingCost, order.currency)}</td></tr>
    <tr><td style="padding:2px 16px 2px 0;color:#666"><strong>Total paid</strong></td><td><strong>${money(order.amountTotal, order.currency)}</strong></td></tr>
  </table>

  <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#666">Attribution</h3>
  <p style="margin:0;font-size:14px;font-family:ui-monospace,monospace">
    source: ${order.metadata.utm_source || "direct"}<br>
    medium: ${order.metadata.utm_medium || "—"}<br>
    landing: ${order.metadata.landing_path || "—"}
  </p>

  <p style="margin:28px 0 0;font-size:12px;color:#888">
    Stripe session ${order.sessionId} ·
    <a href="https://dashboard.stripe.com/payments">Open dashboard</a>
  </p>
</div>`;

  if (!apiKey || !to) {
    console.warn(
      "[notify] RESEND_API_KEY or ORDER_NOTIFICATION_EMAIL missing — order logged only.",
    );
    console.info(text);
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `🎣 New order — ${money(order.amountTotal, order.currency)} — ${order.items.length} item${order.items.length === 1 ? "" : "s"}`,
    text,
    html,
  });

  if (error) throw new Error(`Resend: ${error.message}`);
}
