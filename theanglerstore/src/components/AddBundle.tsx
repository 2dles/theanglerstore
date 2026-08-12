"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { announceAdded } from "./CartToast";
import { BUNDLE } from "@/lib/products";

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
  const [added, setAdded] = useState(false);

  function handle() {
    for (const k of keys) add(k, 1);
    // Same confirmation as every other add. This used to hard-navigate to the
    // cart, so the identical action had two different outcomes depending on
    // where you clicked it.
    announceAdded({ keys: [...keys], qty: 1, label: BUNDLE.name });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <button
      type="button"
      onClick={handle}
      className="btn btn-primary mt-4 w-full lg:w-auto"
    >
      {added ? "Added ✓" : "Add the bundle to cart"}
    </button>
  );
}
