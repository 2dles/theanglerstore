"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useCart } from "./CartProvider";
import { ProductArt } from "./ProductArt";
import {
  BUNDLE,
  MAX_QTY,
  cartEarnsBundle,
  formatPrice,
  getProduct,
} from "@/lib/products";
import { FLAT_SHIPPING, FREE_SHIPPING_OVER } from "@/lib/stripe";

function CancelNotice() {
  const params = useSearchParams();
  if (!params.get("cancelled")) return null;
  return (
    <div className="card mt-6 border-l-2 border-l-[#fb923c] p-4 text-sm text-ink-dim">
      Checkout was cancelled — your cart is exactly as you left it.
    </div>
  );
}

function CartInner() {
  const { lines, subtotal, setQty, remove, ready } = useCart();
  const [confirmKey, setConfirmKey] = useState<string | null>(null);

  if (!ready) {
    return <p className="mt-8 text-ink-dim">Loading your cart…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="card mt-8 p-10 text-center">
        <p className="text-lg text-ink-dim">Nothing in the cart yet.</p>
        <Link href="/products" className="btn btn-primary mt-5">
          Browse the gear
        </Link>
      </div>
    );
  }

  // Mirrors the server calculation in /api/checkout exactly. Shown here so the
  // customer sees the discount before they commit — but the number that gets
  // charged is always the one the server recomputes, never this one.
  const earnsBundle = cartEarnsBundle(lines.map((l) => l.key));
  const inBundle = (key: string) =>
    (BUNDLE.keys as readonly string[]).includes(key);
  const bundleSaving = earnsBundle
    ? Math.round(
        lines
          .filter((l) => (BUNDLE.keys as readonly string[]).includes(l.key))
          .reduce(
            (sum, l) =>
              sum + (getProduct(l.key)?.price ?? 0) * l.qty * BUNDLE.discount,
            0,
          ) * 100,
      ) / 100
    : 0;

  const discountedSubtotal = subtotal - bundleSaving;
  const shipping = discountedSubtotal >= FREE_SHIPPING_OVER ? 0 : FLAT_SHIPPING;
  const total = discountedSubtotal + shipping;
  const toFreeShipping = FREE_SHIPPING_OVER - discountedSubtotal;

  return (
    <>
      <CancelNotice />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <ul className="space-y-3">
          {lines.map((line) => {
            const p = getProduct(line.key);
            if (!p) return null;
            return (
              <li key={line.key} className="card relative flex gap-4 p-4">
                <Link
                  href={`/products/${p.key}`}
                  className="w-24 shrink-0 overflow-hidden rounded-xl"
                >
                  <ProductArt product={p} className="aspect-[4/3] w-full" />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${p.key}`}
                    className="font-medium leading-snug hover:text-tide"
                  >
                    {p.name}
                  </Link>
                  <p className="mt-0.5 text-sm text-ink-faint">
                    {p.category}
                    {earnsBundle && inBundle(p.key) && (
                      <span className="ml-2 text-teal">· {BUNDLE.name}</span>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-ink-faint">
                    Ships in {p.shipsIn}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex items-center rounded-lg border border-line">
                      <button
                        type="button"
                        onClick={() => setQty(p.key, line.qty - 1)}
                        className="px-2.5 py-1.5 text-sm text-ink-dim hover:text-ink"
                        aria-label={`Decrease ${p.name} quantity`}
                      >
                        −
                      </button>
                      <span className="tnum w-7 text-center text-sm">{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(p.key, Math.min(MAX_QTY, line.qty + 1))}
                        className="px-2.5 py-1.5 text-sm text-ink-dim hover:text-ink"
                        aria-label={`Increase ${p.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        // Removing a bundle member quietly deletes the 12%
                        // discount. The math was always right; the customer
                        // just never found out until the total moved.
                        if (earnsBundle && inBundle(p.key)) {
                          setConfirmKey(p.key);
                        } else {
                          remove(p.key);
                        }
                      }}
                      className="text-sm text-ink-faint hover:text-[#f87171]"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="tnum shrink-0 font-semibold">
                  {formatPrice(p.price * line.qty)}
                </p>

                {confirmKey === p.key && (
                  <div className="absolute inset-0 flex flex-col justify-center gap-3 rounded-[1.25rem] bg-abyss/95 p-4 backdrop-blur-sm">
                    <p className="text-sm leading-relaxed text-ink">
                      Removing this breaks up{" "}
                      <strong>{BUNDLE.name}</strong> — you&rsquo;ll lose the{" "}
                      {Math.round(BUNDLE.discount * 100)}% bundle discount
                      ({formatPrice(bundleSaving)}).
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          remove(p.key);
                          setConfirmKey(null);
                        }}
                        className="btn btn-ghost !py-2 !text-sm"
                      >
                        Remove anyway
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmKey(null)}
                        className="btn btn-primary !py-2 !text-sm"
                      >
                        Keep the bundle
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <aside className="card p-5 lg:sticky lg:top-24">
          <h2 className="font-semibold">Order summary</h2>

          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-dim">Subtotal</dt>
              <dd className="tnum">{formatPrice(subtotal)}</dd>
            </div>

            {earnsBundle && (
              <div className="flex justify-between text-teal">
                <dt>
                  {BUNDLE.name} · {Math.round(BUNDLE.discount * 100)}% off
                </dt>
                <dd className="tnum">−{formatPrice(bundleSaving)}</dd>
              </div>
            )}

            <div className="flex justify-between">
              <dt className="text-ink-dim">Shipping</dt>
              <dd className="tnum">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="hairline flex justify-between pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd className="tnum">{formatPrice(total)}</dd>
            </div>
          </dl>

          <p className="mt-2 text-xs text-ink-faint">
            California orders have sales tax added at checkout. Other states,
            none &mdash; see{" "}
            <Link href="/shipping" className="hover:text-ink">
              shipping &amp; tax
            </Link>
            .
          </p>

          {toFreeShipping > 0 && (
            <p className="mt-3 text-sm text-teal">
              Add {formatPrice(toFreeShipping)} for free shipping.
            </p>
          )}

          <Link href="/checkout" className="btn btn-primary mt-5 w-full">
            Checkout
          </Link>

          <Link
            href="/products"
            className="mt-3 block text-center text-sm link-quiet"
          >
            Keep shopping
          </Link>

          <p className="mt-5 text-center text-xs text-ink-faint">
            Secure checkout happens on this site — you won&rsquo;t be redirected.
          </p>
        </aside>
      </div>
    </>
  );
}

export function CartView() {
  return (
    <Suspense fallback={<p className="mt-8 text-ink-dim">Loading your cart…</p>}>
      <CartInner />
    </Suspense>
  );
}
