"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

/**
 * Empties the cart once the customer lands on the success page.
 * Guarded on `ready` so we don't clear before hydration has restored the cart
 * and then immediately write an empty array back to storage.
 */
export function ClearCartOnMount() {
  const { clear, ready } = useCart();

  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);

  return null;
}
