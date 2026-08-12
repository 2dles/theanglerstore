import Link from "next/link";
import { Suspense } from "react";
import { activeCategories, listed } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductFinder } from "@/components/ProductFinder";

export const metadata = {
  title: "All Gear — Surf & Inshore Fishing Tackle",
  description:
    "Every product we carry: braid and fluorocarbon leader, jigs, landing nets, pliers, tackle packs and coolers. Real gear from US distributors, shipped in 3-7 business days.",
  alternates: { canonical: "/products" },
};

export default function AllProductsPage() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Gear",
    url: "https://theanglerstore.com/products",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: listed().length,
      itemListElement: listed().map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `https://theanglerstore.com/products/${p.key}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">All gear</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">
          {listed().length} products. Everything here is something we&rsquo;d
          actually carry down the beach &mdash; and where we think a product is a
          bad buy, we say so on its page instead of quietly not selling it.
        </p>

        <Suspense
          fallback={
            <div className="mt-8 h-32 rounded-xl border border-line bg-card/40" />
          }
        >
          <ProductFinder>
            {/* Most Popular leads, because a first-time visitor from the tide site
                should meet the things almost every angler needs before they meet
                a category index. Ranked editorially in products.ts — see APPEAL. */}
            <section className="mt-14">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    Most popular
                  </h2>
                  <p className="mt-1 text-sm text-ink-faint">
                    If you buy one thing from here, make it one of these.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {listed()
                  .slice(0, 8)
                  .map((p, i) => (
                    <ProductCard key={p.key} product={p} priority={i < 4} />
                  ))}
              </div>
            </section>

            {activeCategories().map((c) => {
              const items = listed().filter((p) => p.category === c.name);
              if (items.length === 0) return null;
              return (
                <section key={c.slug} className="mt-14">
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="text-xl font-semibold tracking-tight">{c.name}</h2>
                    <Link href={`/collections/${c.slug}`} className="text-sm link-quiet">
                      View collection →
                    </Link>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {items.map((p) => (
                      <ProductCard key={p.key} product={p} />
                    ))}
                  </div>
                </section>
              );
            })}
          </ProductFinder>
        </Suspense>
      </div>
    </>
  );
}
