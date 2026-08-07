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
      {/* Stripe renders its own light-on-white form here. Keeping it on a plain
          white surface is deliberate — a recoloured payment form reads as less
          trustworthy, and trust is the only thing that matters at this step. */}
      <div className="overflow-hidden rounded-[1.25rem] bg-white p-1">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout className="min-h-[600px]" />
        </EmbeddedCheckoutProvider>
      </div>

      <p className="mt-4 text-center text-xs text-ink-faint">
        Payments processed by Stripe. Your card details never touch our servers.
      </p>
      <Link href="/cart" className="mt-2 block text-center text-sm link-quiet">
        ← Back to cart
      </Link>
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
