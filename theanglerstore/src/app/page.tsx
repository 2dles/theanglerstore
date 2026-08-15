import Link from "next/link";
import {
  activeBundles,
  activeCategories,
  featuredBundle,
  indexed,
  featured,
} from "@/lib/products";
import { BundleCard, BundleTile } from "@/components/BundleCard";
import { FREE_SHIPPING_OVER } from "@/lib/stripe";
import { ProductCard } from "@/components/ProductCard";
import { ProductArt } from "@/components/ProductArt";
import { TIDE_HOME } from "@/lib/tide-links";

export const metadata = {
  // absolute: the layout template would otherwise render this as
  // "TheAnglerStore — … | TheAnglerStore".
  title: {
    absolute: "TheAnglerStore. Surf & Inshore Fishing Tackle",
  },
  description:
    "Surf and inshore fishing gear chosen by people who fish the same beaches you do. Free US shipping over $75. Sister site to USTideCharts.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const picks = featured();
  const kits = activeBundles();
  const hero = featuredBundle();
  const otherKits = kits.filter((b) => b.id !== hero?.id);

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
                honestly. Every product here is one we&rsquo;d put in our own
                bag, and where we think something is a bad buy we say so on its
                own page instead of quietly not selling it.
              </p>

              {/* Two destinations, not one. /products is 206 items deep, which
                  is the right page for someone who knows what a 4/0 circle hook
                  is and the wrong one for someone arriving off a tide chart
                  with a rod they have never used. The kits are the answer to
                  that second person, so they get equal billing here. The tide
                  link drops to a text link: it is where our traffic comes FROM,
                  so it does not need to be a button. */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="btn btn-primary">
                  Shop all gear
                </Link>
                {hero && (
                  <Link href="/bundles" className="btn btn-ghost">
                    Start with a kit
                  </Link>
                )}
              </div>
              <a
                href={TIDE_HOME}
                className="mt-4 inline-block text-sm link-quiet"
                target="_blank"
                rel="noopener"
              >
                Or check the tides first &#8599;
              </a>

              <dl className="mt-10 grid max-w-lg grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-ink-faint">Products</dt>
                  {/* indexed(), the same figure /products prints. This used to
                      read listed(), so the homepage advertised 240 products and
                      the catalogue page then showed 206 of them. */}
                  <dd className="tnum mt-0.5 text-xl font-semibold">{indexed().length}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Kits</dt>
                  <dd className="tnum mt-0.5 text-xl font-semibold">{activeBundles().length}</dd>
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
          {activeCategories().map((c) => (
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

        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {picks.map((p, i) => (
            <ProductCard key={p.key} product={p} priority={i < 3} />
          ))}
        </div>
      </section>

      {/* ---------------- Kits ----------------
          One kit in full, the rest as tiles. Showing all seven as cards pushed
          everything below the fold and made the page read as a bundle catalogue
          rather than a shop; showing only one hid the fact that there are seven.
          The "see all" button is gold rather than the site's cyan because it is
          competing with "Shop all gear" for the same eye, and colour is the only
          thing it can win that on. */}
      {hero && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Kits
              </h2>
              <p className="mt-2 max-w-xl leading-relaxed text-ink-dim">
                Everything for one kind of day, bought in one go at{" "}
                {Math.round(hero.discount * 100)}% off the parts.
              </p>
            </div>
            <Link href="/bundles" className="btn btn-accent shrink-0">
              See all {kits.length} kits →
            </Link>
          </div>

          <div className="mt-8">
            <BundleCard bundle={hero} featured />
          </div>

          {otherKits.length > 0 && (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherKits.map((b) => (
                <li key={b.id}>
                  <BundleTile bundle={b} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

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
              less than showing up on the right tide, so start there.
            </p>
          </div>
          <a
            href={TIDE_HOME}
            className="btn btn-ghost shrink-0"
           target="_blank" rel="noopener">
            USTideCharts.com ↗
          </a>
        </div>
      </section>
    </>
  );
}
