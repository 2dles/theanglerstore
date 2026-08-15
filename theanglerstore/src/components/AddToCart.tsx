"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { MAX_QTY } from "@/lib/products";
import { announceAdded } from "./CartToast";

export function AddToCart({ productKey }: { productKey: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(productKey, qty);
    announceAdded({ keys: [productKey], qty });
    setAdded(true);
    // Reset the stepper. Leaving it at 3 after adding 3 is how people
    // accidentally add six.
    setQty(1);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-xl border border-line bg-card">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3.5 py-2.5 text-ink-dim hover:text-ink"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="tnum w-8 text-center text-sm font-medium" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
            className="px-3.5 py-2.5 text-ink-dim hover:text-ink"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button type="button" onClick={handleAdd} className="btn btn-primary flex-1">
          {added ? "Added ✓" : "Add to cart"}
        </button>
      </div>

      {qty >= MAX_QTY && (
        <p className="text-sm text-ink-faint">
          {MAX_QTY} is the most we&rsquo;ll take online. We order from a
          distributor after you buy, so bigger than that needs a quick email
          first.
        </p>
      )}

      {added && (
        <Link href="/cart" className="text-center text-sm text-tide hover:text-teal">
          View cart →
        </Link>
      )}
    </div>
  );
}
