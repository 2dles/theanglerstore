import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { sendOrderEmail } from "@/lib/notify";

export const runtime = "nodejs";
// Stripe signature verification needs the raw body — never cache this route.
export const dynamic = "force-dynamic";

/**
 * Fulfillment trigger.
 *
 * On checkout.session.completed we email the operator everything needed to
 * place the supplier order by hand: line items, quantities, the shipping
 * address, the amount collected, and the UTM attribution.
 *
 * Stripe's own "successful payment" notification should ALSO be switched on in
 * the dashboard as a backstop — if this webhook ever fails silently, that email
 * is what stops an order being missed.
 */
export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 503 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret missing." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(raw, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "bad signature";
    console.error("[webhook] signature verification failed:", message);
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    // Acknowledge everything else so Stripe stops retrying.
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    const stripe = getStripe();
    // The session object on the event doesn't include line items — fetch them.
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
    });

    await sendOrderEmail({
      sessionId: session.id,
      email: session.customer_details?.email ?? null,
      name: session.customer_details?.name ?? null,
      phone: session.customer_details?.phone ?? null,
      amountTotal: session.amount_total ?? 0,
      amountSubtotal: session.amount_subtotal ?? 0,
      shippingCost: session.shipping_cost?.amount_total ?? 0,
      currency: (session.currency ?? "usd").toUpperCase(),
      // `collected_information.shipping_details` is where Checkout puts the
      // shipping address; fall back to the customer's own address if absent.
      address:
        session.collected_information?.shipping_details?.address ??
        session.customer_details?.address ??
        null,
      shipName:
        session.collected_information?.shipping_details?.name ??
        session.customer_details?.name ??
        null,
      items: lineItems.data.map((li) => ({
        description: li.description ?? "(unnamed item)",
        quantity: li.quantity ?? 1,
        amountTotal: li.amount_total ?? 0,
      })),
      metadata: session.metadata ?? {},
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[webhook] fulfillment email failed:", message);
    // Return 500 so Stripe retries — a missed order email means a missed order.
    return NextResponse.json({ error: "Notification failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
