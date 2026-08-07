import Link from "next/link";
import { CATEGORIES, PRODUCTS, featured, getProduct } from "@/lib/products";
import { FREE_SHIPPING_OVER } from "@/lib/stripe";
import { ProductCard } from "@/components/ProductCard";
import { ProductArt } from "@/components/ProductArt";

export const metadata = {
  title: "TheAnglerStore — Surf & Inshore Fishing Tackle",
  description:
    "Surf and inshore fishing gear chosen by people who fish the same beaches you do. Free US shipping over $49. Sister site to USTideCharts.",
  alternates: { canonical: "/" },
};

const STARTER_KEYS = ["surf-rod", "braided-line", "carolina-kit", "sand-spike"];

export default function HomePage() {
  const picks = featured();
  const starter = STARTER_KEYS.map(getProduct).filter(Boolean);
  const starterTotal = starter.reduce((s, p) => s + (p?.price ?? 0), 0);
  const bundlePrice = Math.round(starterTotal * 0.88 * 100) / 100;

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="animate-rise">
              <span className="chip">Free US shipping over ${FREE_SHIPPING_OVER}</span>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Gear for the{" "}
                <span className="text-gradient">tide you&rsquo;re about to fish</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-dim">
                Surf and inshore tackle, picked for the West Coast and priced
                honestly. Every product here is one we&rsquo;d put in our own bag
                &mdash; and we tell you which ones we wouldn&rsquo;t.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="btn btn-primary">
                  Shop all gear
                </Link>
                <a
                  href="https://ustidecharts.com?utm_source=theanglerstore&utm_medium=home"
                  className="btn btn-ghost"
                >
                  Check the tides first ↗
                </a>
              </div>

              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
                <div>
                  <dt className="text-ink-faint">Products</dt>
                  <dd className="tnum mt-0.5 text-xl font-semibold">{PRODUCTS.length}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Ships from</dt>
                  <dd className="tnum mt-0.5 text-xl font-semibold">the US</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Returns</dt>
                  <dd className="tnum mt-0.5 text-xl font-semibold">30 days</dd>
                </div>
              </dl>
            </div>

            <div className="animate-rise animate-rise-2 grid grid-cols-2 gap-3 sm:gap-4">
              {picks.slice(0, 4).map((p, i) => (
                <Link
                  key={p.key}
                  href={`/products/${p.key}`}
                  className={`card card-hover overflow-hidden ${i % 2 === 1 ? "mt-6" : ""}`}
                >
                  <ProductArt product={p} priority={i === 0} className="aspect-[4/3] w-full" />
                  <div className="p-3">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="tnum mt-0.5 text-sm text-ink-dim">
                      ${p.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="chip hover:border-line-hi hover:text-ink"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Featured ---------------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What we&rsquo;d buy first
            </h2>
            <p className="mt-2 max-w-xl text-ink-dim">
              If you&rsquo;re starting from nothing, this is the order to buy in.
            </p>
          </div>
          <Link href="/products" className="hidden shrink-0 text-sm link-quiet sm:block">
            All products →
          </Link>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((p, i) => (
            <ProductCard key={p.key} product={p} priority={i < 3} />
          ))}
        </div>
      </section>

      {/* ---------------- Starter bundle ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="card overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="badge">Bundle · save 12%</span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                The Surf Starter
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">
                A 10-foot PENN combo, 300 yards of 30 lb braid, three hand-tied
                Carolina rigs, and two sand spikes. That is a complete, genuinely
                capable beach setup &mdash; rod in the sand, bait in the water,
                nothing else to buy.
              </p>
              <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                {starter.map((p) =>
                  p ? (
                    <li key={p.key} className="flex items-baseline gap-2 text-ink-dim">
                      <span className="text-teal">▸</span>
                      <Link href={`/products/${p.key}`} className="hover:text-tide">
                        {p.name}
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>

            <div className="shrink-0 lg:text-right">
              <p className="tnum text-sm text-ink-faint line-through">
                ${starterTotal.toFixed(2)}
              </p>
              <p className="tnum text-4xl font-semibold">${bundlePrice.toFixed(2)}</p>
              <p className="mt-1 text-xs text-ink-faint">Ships free</p>
              <Link href="/products" className="btn btn-primary mt-4 w-full lg:w-auto">
                Build the bundle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Cross-promo ---------------- */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="card flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Know the tide before you spend a dollar
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-ink-dim">
              Our sister site runs live NOAA tide charts, a fishing score, and the
              best two-hour windows for every spot we cover. The right gear matters
              less than showing up on the right tide &mdash; so start there.
            </p>
          </div>
          <a
            href="https://ustidecharts.com?utm_source=theanglerstore&utm_medium=home"
            className="btn btn-ghost shrink-0"
          >
            USTideCharts.com ↗
          </a>
        </div>
      </section>
    </>
  );
}
