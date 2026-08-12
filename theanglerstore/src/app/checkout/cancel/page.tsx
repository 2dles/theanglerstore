import Link from "next/link";

export const metadata = {
  title: "Checkout cancelled",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-line bg-card">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-ink-dim"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </div>

      <h1 className="mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">
        Checkout cancelled
      </h1>
      <p className="mt-4 leading-relaxed text-ink-dim">
        Nothing was charged, and your cart is exactly as you left it. Pick up
        where you stopped whenever you like.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/cart" className="btn btn-primary">
          Back to cart
        </Link>
        <Link href="/products" className="btn btn-ghost">
          Keep shopping
        </Link>
      </div>

      <p className="mt-10 text-sm leading-relaxed text-ink-faint">
        Something go wrong at checkout? Email{" "}
        <a
          href="mailto:help@theanglerstore.com"
          className="text-tide hover:text-teal"
        >
          help@theanglerstore.com
        </a>{" "}
        and tell us what happened — we&rsquo;d rather fix it than lose the order.
      </p>
    </div>
  );
}
