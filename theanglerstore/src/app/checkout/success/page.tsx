import Link from "next/link";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";

export const metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <ClearCartOnMount />

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-tide to-teal">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-abyss" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">
        You&rsquo;re set. Tight lines.
      </h1>
      <p className="mt-4 leading-relaxed text-ink-dim">
        Your order is confirmed and a receipt is on its way to your inbox. Most
        orders leave the warehouse within one business day; you&rsquo;ll get
        tracking as soon as it ships.
      </p>

      <div className="card mt-9 p-6 text-left">
        <h2 className="font-semibold">While you wait</h2>
        <p className="mt-2 leading-relaxed text-ink-dim">
          Pick your tide. Our sister site scores every two-hour window at your
          local spot so the gear shows up the same week the fishing is good.
        </p>
        <a
          href="https://ustidecharts.com?utm_source=theanglerstore&utm_medium=post-purchase"
          className="btn btn-ghost mt-4"
        >
          Plan your next session ↗
        </a>
      </div>

      <Link href="/products" className="mt-8 inline-block text-sm link-quiet">
        Keep shopping →
      </Link>
    </div>
  );
}
