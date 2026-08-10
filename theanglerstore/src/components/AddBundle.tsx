"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

/**
 * Adds every item in the starter bundle to the cart in one click, then sends
 * the customer to the cart so they can see what happened.
 *
 * The discount itself is NOT applied here. This component only puts product
 * keys in the cart; /api/checkout recomputes every price from the catalog and
 * decides for itself whether the bundle discount is earned. That keeps the
 * same guarantee as everything else in the store — a tampered cart cannot
 * change what you are charged.
 */
export function AddBundle({ keys }: { keys: readonly string[] }) {
  const { add } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  function handle() {
    setBusy(true);
    for (const k of keys) add(k, 1);
    router.push("/cart");
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={busy}
      className="btn btn-primary mt-4 w-full lg:w-auto"
    >
      {busy ? "Adding…" : "Add the bundle to cart"}
    </button>
  );
}
