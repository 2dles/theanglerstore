"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct } from "@/lib/products";
import { capture } from "@/lib/attribution";

const STORAGE_KEY = "tas_cart_v1";

export interface CartLine {
  key: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (key: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  ready: boolean;
}

const Ctx = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // lines and ready are one piece of state so hydration is a single update.
  const [{ lines, ready }, setState] = useState<{
    lines: CartLine[];
    ready: boolean;
  }>({ lines: [], ready: false });

  const setLines = useCallback(
    (next: (prev: CartLine[]) => CartLine[]) =>
      setState((s) => ({ ...s, lines: next(s.lines) })),
    [],
  );

  // Hydrate from storage and capture attribution on first paint.
  useEffect(() => {
    let restored: CartLine[] = [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        // Drop any line whose key no longer exists in the catalog.
        restored = parsed.filter((l) => Boolean(getProduct(l.key)) && l.qty > 0);
      }
    } catch {
      /* a corrupt cart is not worth crashing over */
    }
    capture();
    // localStorage does not exist during server rendering, so the cart cannot
    // be part of the initial state without a hydration mismatch. Reading it
    // after mount is the only correct option; `ready` gates render until then.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ lines: restored, ready: true });
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage full or blocked — the cart still works for this page view */
    }
  }, [lines, ready]);

  const add = useCallback(
    (key: string, qty = 1) => {
      if (!getProduct(key)) return;
      setLines((prev) => {
        const found = prev.find((l) => l.key === key);
        if (found) {
          return prev.map((l) =>
            l.key === key ? { ...l, qty: Math.min(l.qty + qty, 99) } : l,
          );
        }
        return [...prev, { key, qty: Math.min(qty, 99) }];
      });
    },
    [setLines],
  );

  const setQty = useCallback(
    (key: string, qty: number) => {
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.key !== key)
          : prev.map((l) =>
              l.key === key ? { ...l, qty: Math.min(qty, 99) } : l,
            ),
      );
    },
    [setLines],
  );

  const remove = useCallback(
    (key: string) => setLines((prev) => prev.filter((l) => l.key !== key)),
    [setLines],
  );

  const clear = useCallback(() => setLines(() => []), [setLines]);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const l of lines) {
      const p = getProduct(l.key);
      if (!p) continue;
      c += l.qty;
      s += p.price * l.qty;
    }
    return { count: c, subtotal: Math.round(s * 100) / 100 };
  }, [lines]);

  const value = useMemo(
    () => ({ lines, count, subtotal, add, setQty, remove, clear, ready }),
    [lines, count, subtotal, add, setQty, remove, clear, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
