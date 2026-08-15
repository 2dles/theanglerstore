"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { announceAdded } from "./CartToast";

/**
 * Adds every item in a kit to the cart in one click.
 *
 * The discount itself is NOT applied here. This component only puts product
 * keys in the cart; /api/checkout recomputes every price from the catalog and
 * decides for itself which kits the cart earns. That keeps the same guarantee
 * as everything else in the store: a tampered cart cannot change what you are
 * charged.
 *
 * Note that adding a kit does not reserve it. Kits share parts, so a cart
 * holding two kits that both want braid needs two spools to earn both — the
 * allocator in products.ts settles that, and the cart page shows the result
 * before checkout rather than after.
 */
export function AddBundle({
  name,
  keys,
  className = "btn btn-primary mt-4 w-full lg:w-auto",
}: {
  name: string;
  keys: readonly string[];
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handle() {
    for (const k of keys) add(k, 1);
    // Same confirmation as every other add. This used to hard-navigate to the
    // cart, so the identical action had two different outcomes depending on
    // where you clicked it.
    announceAdded({ keys: [...keys], qty: 1, label: name });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <button type="button" onClick={handle} className={className}>
      {added ? "Added ✓" : "Add this kit to cart"}
    </button>
  );
}
