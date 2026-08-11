"use client";

import Link from "next/link";
import { useState } from "react";
import { activeCategories } from "@/lib/products";
import { useCart } from "./CartProvider";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="TheAnglerStore home">
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <defs>
          <linearGradient id="tas-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
        <path
          d="M4 16 c 5 -7.5 14.5 -7.5 19.5 0 c -5 7.5 -14.5 7.5 -19.5 0 z"
          fill="url(#tas-logo)"
        />
        <path d="M23.5 16 l4.6 -4.8 v9.6 z" fill="url(#tas-logo)" />
        <circle cx="9.6" cy="14.4" r="1.5" fill="#04101d" />
      </svg>
      <span className="text-[0.95rem] font-semibold tracking-tight">
        The<span className="text-gradient">Angler</span>Store
      </span>
    </Link>
  );
}

export function Header() {
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-abyss/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {activeCategories().filter((c) => c.nav).map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="link-quiet">
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            href="https://ustidecharts.com?utm_source=theanglerstore&utm_medium=nav"
            className="hidden text-sm link-quiet lg:inline"
          >
            Check the tides ↗
          </a>

          <Link
            href="/cart"
            className="btn btn-ghost relative !px-3.5 !py-2 text-sm"
            aria-label={`Cart, ${ready ? count : 0} items`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.5L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {ready && count > 0 && (
              <span className="tnum absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-tide to-teal px-1 text-[0.6875rem] font-bold text-abyss">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="btn btn-ghost !px-2.5 !py-2 md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="hairline mx-auto max-w-6xl px-4 py-3 md:hidden">
          <ul className="grid gap-1">
            {activeCategories().filter((c) => c.nav).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2 text-sm link-quiet"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://ustidecharts.com?utm_source=theanglerstore&utm_medium=nav"
                className="block rounded-lg px-2 py-2 text-sm link-quiet"
              >
                Check the tides ↗
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
