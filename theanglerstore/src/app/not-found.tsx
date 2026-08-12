import Link from "next/link";
import { activeCategories } from "@/lib/products";

export const metadata = {
  title: { absolute: "Nothing at this address — TheAnglerStore" },
  robots: { index: false, follow: false },
};

/**
 * The 404.
 *
 * The framework default is a bare "404 | This page could not be found." with no
 * footer and no way onward, which strands anyone arriving from a stale link. A
 * shop's 404 has one job: put the customer back in the catalog in one click.
 *
 * The search box is a plain GET form pointed at /products, which already reads
 * ?q= from the URL. No JavaScript required, so it works even if the page was
 * reached in a degraded state.
 */
export default function NotFound() {
  const cats = activeCategories().slice(0, 8);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm uppercase tracking-wider text-ink-faint">Error 404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Nothing at this address.
      </h1>
      <p className="mt-4 leading-relaxed text-ink-dim">
        Either we moved it, or the link was wrong to begin with. Nothing has been
        lost from your cart — it&rsquo;s exactly where you left it.
      </p>

      <form action="/products" method="get" role="search" className="mt-8">
        <label htmlFor="nf-q" className="text-sm text-ink-faint">
          Search the catalog
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="nf-q"
            name="q"
            type="search"
            placeholder="braid, circle hooks, kayak…"
            className="w-full rounded-xl border border-line bg-card/70 px-4 py-2.5 text-[0.9375rem] text-ink placeholder:text-ink-faint focus:border-line-hi focus:outline-none focus:ring-2 focus:ring-tide/30"
          />
          <button type="submit" className="btn btn-primary shrink-0">
            Search
          </button>
        </div>
      </form>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wider text-ink-faint">
        Or start from a category
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href="/products" className="chip hover:border-line-hi hover:text-ink">
          All gear
        </Link>
        {cats.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="chip hover:border-line-hi hover:text-ink"
          >
            {c.name}
          </Link>
        ))}
      </div>

      <p className="mt-10 text-sm text-ink-faint">
        If you followed a link from somewhere and it broke,{" "}
        <Link href="/contact" className="text-tide hover:text-teal">
          tell us where it was
        </Link>{" "}
        — we&rsquo;d rather fix it than have you find it twice.
      </p>
    </div>
  );
}
