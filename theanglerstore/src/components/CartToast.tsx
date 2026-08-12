"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice, getProduct } from "@/lib/products";
import { FREE_SHIPPING_OVER } from "@/lib/stripe";

/**
 * ADD-TO-CART CONFIRMATION.
 *
 * Before this, adding from a product page changed a number in the far corner of
 * the header and nothing else. Shoppers either double-added or assumed the
 * click hadn't registered — both cost the sale.
 *
 * It's a toast rather than a full drawer on purpose: a drawer that covers the
 * page interrupts someone who is still shopping, and the most common next
 * action after adding a $6 soft plastic is adding another one. The toast
 * confirms, shows what's left to free shipping, and gets out of the way.
 *
 * Fires off a window event so any component can trigger it — the product page
 * and the homepage bundle button now behave identically, which they didn't.
 */

export const CART_ADDED_EVENT = "anglerstore:cart-added";

export interface CartAddedDetail {
  /** Product keys just added. One for a normal add, four for the bundle. */
  keys: string[];
  qty: number;
  /** Optional label used instead of the product name, e.g. the bundle name. */
  label?: string;
}

export function announceAdded(detail: CartAddedDetail) {
  window.dispatchEvent(new CustomEvent(CART_ADDED_EVENT, { detail }));
}

export function CartToast() {
  const { subtotal, count } = useCart();
  const [detail, setDetail] = useState<CartAddedDetail | null>(null);

  useEffect(() => {
    function onAdded(e: Event) {
      setDetail((e as CustomEvent<CartAddedDetail>).detail);
    }
    window.addEventListener(CART_ADDED_EVENT, onAdded);
    return () => window.removeEventListener(CART_ADDED_EVENT, onAdded);
  }, []);

  // Auto-dismiss, but only after the person has had time to read it. Restarts
  // whenever a new add comes in.
  useEffect(() => {
    if (!detail) return;
    const t = setTimeout(() => setDetail(null), 6000);
    return () => clearTimeout(t);
  }, [detail]);

  if (!detail) return null;

  const first = getProduct(detail.keys[0]);
  const title =
    detail.label ??
    (detail.keys.length > 1
      ? `${detail.keys.length} items`
      : (first?.name ?? "Item"));
  const toFree = FREE_SHIPPING_OVER - subtotal;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[22rem]"
    >
      <div className="card animate-rise p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,.75)]">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-0.5 text-teal">
            ✓
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-snug text-ink">
              Added to cart
            </p>
            <p className="mt-0.5 truncate text-sm text-ink-dim">
              {detail.qty > 1 ? `${detail.qty} × ` : ""}
              {title}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDetail(null)}
            aria-label="Dismiss"
            className="shrink-0 rounded-md px-1 text-ink-faint hover:text-ink"
          >
            ✕
          </button>
        </div>

        <dl className="mt-3 flex justify-between text-sm">
          <dt className="text-ink-faint">
            Cart subtotal · {count} item{count === 1 ? "" : "s"}
          </dt>
          <dd className="tnum font-semibold">{formatPrice(subtotal)}</dd>
        </dl>

        {toFree > 0 ? (
          <p className="mt-1.5 text-sm text-teal">
            Add {formatPrice(toFree)} for free shipping.
          </p>
        ) : (
          <p className="mt-1.5 text-sm text-teal">This order ships free.</p>
        )}

        <div className="mt-3 flex gap-2">
          <Link href="/cart" className="btn btn-primary flex-1 !py-2 !text-sm">
            View cart
          </Link>
          <button
            type="button"
            onClick={() => setDetail(null)}
            className="btn btn-ghost flex-1 !py-2 !text-sm"
          >
            Keep shopping
          </button>
        </div>
      </div>
    </div>
  );
}
