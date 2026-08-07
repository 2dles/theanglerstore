"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export function AddToCart({ productKey }: { productKey: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(productKey, qty);
    setAdded(true);
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
            onClick={() => setQty((q) => Math.min(99, q + 1))}
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

      {added && (
        <Link href="/cart" className="text-center text-sm text-tide hover:text-teal">
          View cart →
        </Link>
      )}
    </div>
  );
}
