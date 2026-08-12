"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCart, type CartLine } from "./CartProvider";
import { read } from "@/lib/attribution";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

/**
 * The payment frame.
 *
 * Mounted only once the cart has hydrated and is non-empty, so the lazy
 * useState initializer captures a stable snapshot of the cart at mount. That
 * snapshot is what `fetchClientSecret` sends — meaning a later cart change
 * can't retrigger it and tear down the Stripe iframe mid-transaction.
 */
function CheckoutFrame({ initialLines }: { initialLines: CartLine[] }) {
  const [frozen] = useState(initialLines);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: frozen, attribution: read() ?? {} }),
      });
      const data = (await res.json()) as {
        clientSecret?: string;
        error?: string;
      };
      if (!res.ok || !data.clientSecret) {
        throw new Error(data.error ?? "Could not start checkout.");
      }
      return data.clientSecret;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
      throw err;
    }
  }, [frozen]);

  if (error) {
    return (
      <div className="card mt-8 p-8">
        <h2 className="font-semibold text-[#f87171]">Checkout error</h2>
        <p className="mt-2 leading-relaxed text-ink-dim">{error}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try again
          </button>
          <Link href="/cart" className="btn btn-ghost">
            Back to cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* "Back to cart" sits ABOVE the payment slab now.
          The Stripe element reflows several times while it works out which
          payment methods to show, and anything rendered below it moves with
          every repaint — which meant the escape hatch jumped under the cursor
          at the exact moment someone was deciding whether to trust us. Above
          the slab it cannot move at all. */}
      <Link href="/cart" className="mb-4 block text-center text-sm link-quiet">
        ← Back to cart
      </Link>

      {/* Stripe renders its own light-on-white form here. Keeping it on a plain
          white surface is deliberate — a recolored payment form reads as less
          trustworthy, and trust is the only thing that matters at this step.
          What we can do is make the slab feel like part of the page rather
          than pasted onto it: same corner radius and border treatment as our
          cards, a ring instead of a hard edge, and no wasted padding.
          Everything inside the frame is Stripe's; set the accent color and
          logo under Settings → Business → Branding in the dashboard. */}
      <div className="relative min-h-[760px] overflow-hidden rounded-[1.25rem] bg-white px-1 py-2 shadow-[0_1px_0_rgba(148,197,255,.12),0_18px_50px_-12px_rgba(0,0,0,.6)] ring-1 ring-[rgba(148,197,255,.14)]">
        {/* Skeleton underneath. The frame reserves its full height from the
            first paint, so the element mounting on top of this displaces
            nothing. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col gap-4 p-6"
        >
          <div className="h-5 w-32 rounded bg-[#eceff3]" />
          <div className="h-11 w-full rounded-lg bg-[#f3f5f8]" />
          <div className="h-11 w-full rounded-lg bg-[#f3f5f8]" />
          <div className="h-11 w-2/3 rounded-lg bg-[#f3f5f8]" />
          <div className="mt-4 h-5 w-40 rounded bg-[#eceff3]" />
          <div className="h-11 w-full rounded-lg bg-[#f3f5f8]" />
        </div>
        <div className="relative">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-ink-faint">
        Payments processed by Stripe. Your card details never touch our servers.
      </p>
    </div>
  );
}

export function EmbeddedCheckoutForm() {
  const { lines, ready } = useCart();

  if (!publishableKey) {
    return (
      <div className="card mt-8 p-8">
        <h2 className="font-semibold">Checkout isn&rsquo;t live yet</h2>
        <p className="mt-2 leading-relaxed text-ink-dim">
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set on this deployment. Add
          it in Vercel &rarr; Settings &rarr; Environment Variables and redeploy.
          Until then the storefront works but payments are disabled.
        </p>
        <Link href="/cart" className="btn btn-ghost mt-5">
          Back to cart
        </Link>
      </div>
    );
  }

  if (!ready) {
    return <p className="mt-8 text-ink-dim">Preparing checkout…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="card mt-8 p-10 text-center">
        <p className="text-lg text-ink-dim">Your cart is empty.</p>
        <Link href="/products" className="btn btn-primary mt-5">
          Browse the gear
        </Link>
      </div>
    );
  }

  return <CheckoutFrame initialLines={lines} />;
}
