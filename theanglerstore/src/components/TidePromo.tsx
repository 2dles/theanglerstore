import type { Product } from "@/lib/products";

/**
 * The cross-ecosystem link, product-page edition.
 *
 * USTideCharts sends traffic here; this sends considered traffic back. Both
 * directions are genuinely relevant — the tide decides whether the gear gets
 * used — which is what makes these legitimate links rather than link-swapping.
 */
export function TidePromo({ product }: { product: Product }) {
  const href = `https://ustidecharts.com?utm_source=theanglerstore&utm_medium=location&utm_content=${product.key}`;

  return (
    <section className="mt-16">
      <div className="card relative overflow-hidden">
        {/* swell motif */}
        <svg
          viewBox="0 0 1200 120"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-25"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 70 c 120 -26, 220 24, 340 8 s 240 -34, 360 -10 s 220 26, 340 4 l 160 -8 V120 H0 z"
            fill="#38bdf8"
            opacity="0.35"
          />
          <path
            d="M0 88 c 140 -22, 240 20, 360 6 s 250 -28, 370 -6 s 210 22, 330 2 l 140 -6 V120 H0 z"
            fill="#2dd4bf"
            opacity="0.3"
          />
        </svg>

        <div className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center">
          <div className="flex-1">
            <span className="chip">From our sister site</span>
            <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
              Check the tides before you fish
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-ink-dim">
              <strong className="text-ink">{product.whenToUse}</strong>{" "}
              USTideCharts scores every two-hour window at your local spot using
              live NOAA tide data, wind, and moon phase — so you know whether
              tomorrow is worth the early alarm before you buy anything at all.
            </p>
          </div>

          <a href={href} className="btn btn-ghost shrink-0">
            Find your tide window ↗
          </a>
        </div>
      </div>
    </section>
  );
}
