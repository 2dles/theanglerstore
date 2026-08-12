import type { Walkthrough as W } from "@/lib/walkthroughs";
import type { Product } from "@/lib/products";
import { walkthroughHeading } from "@/lib/products";

/**
 * The "how to actually use this" section.
 *
 * This is the part a marketplace listing can't do and a good tackle shop
 * always does. It also cuts returns — most tackle comes back because it was
 * rigged wrong or fished on the wrong tide, not because it was faulty.
 */
export function Walkthrough({
  product,
  walkthrough,
}: {
  product: Product;
  walkthrough: W;
}) {
  return (
    <section className="mt-16 scroll-mt-24" id="how-to-use">
      <div className="max-w-3xl">
        <span className="chip">Walkthrough</span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          {walkthroughHeading(product)}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink-dim">
          {walkthrough.intro}
        </p>
      </div>

      <ol className="mt-9 space-y-4">
        {walkthrough.steps.map((s, i) => (
          <li key={s.heading} className="card flex gap-5 p-5 sm:p-6">
            <span
              className="tnum mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-deep text-sm font-semibold text-teal"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <h3 className="font-medium text-ink">{s.heading}</h3>
              <p className="mt-1.5 leading-relaxed text-ink-dim">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card p-5 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
            Worth knowing
          </h3>
          <ul className="mt-3 space-y-2.5">
            {walkthrough.tips.map((t) => (
              <li
                key={t}
                className="flex gap-2.5 text-sm leading-relaxed text-ink-dim"
              >
                <span className="mt-0.5 shrink-0 text-teal">▸</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
            When to fish it
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">
            {walkthrough.timing}
          </p>
          <a
            href={`https://ustidecharts.com?utm_source=theanglerstore&utm_medium=walkthrough&utm_content=${product.key}`}
            className="mt-4 inline-block text-sm text-tide hover:text-teal"
          >
            Check your local tide window ↗
          </a>
        </div>
      </div>
    </section>
  );
}
