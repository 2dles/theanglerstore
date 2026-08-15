import Link from "next/link";
import { Suspense } from "react";
import { activeCategories, indexed } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductFinder } from "@/components/ProductFinder";

export const metadata = {
  title: "All Gear: Surf & Inshore Fishing Tackle",
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
      // Must describe what the page links, not the raw catalogue — the old
      // ItemList named 233 products while the HTML linked none of them.
      numberOfItems: indexed().length,
      itemListElement: indexed().map((p, i) => ({
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
          {indexed().length} products. Everything here is something we&rsquo;d
          actually carry down the beach, and where we think a product is a
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
                a category index. Ranked editorially in products.ts, see APPEAL. */}
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
                {indexed()
                  .slice(0, 8)
                  .map((p, i) => (
                    <ProductCard key={p.key} product={p} priority={i < 4} />
                  ))}
              </div>
            </section>

            {/*
              A PREVIEW per category, not the whole shelf.

              This used to render a card for all 233 products, which is what
              made this page 504 KB of payload, every card's props serialised
              into the RSC stream, and the heaviest page on the site by an
              order of magnitude, mostly on phones. Four cards is enough to
              show what a category looks like; the collection page is one
              click away and the text index below links every single product.

              Nothing became less reachable: this page still contains 233
              product links in the server HTML. It just stopped shipping 233
              product cards to do it.
            */}
            {activeCategories().map((c) => {
              const items = indexed().filter((p) => p.category === c.name);
              if (items.length === 0) return null;
              const preview = items.slice(0, 4);
              return (
                <section key={c.slug} className="mt-14">
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="text-xl font-semibold tracking-tight">{c.name}</h2>
                    <Link href={`/collections/${c.slug}`} className="text-sm link-quiet">
                      {items.length > preview.length
                        ? `All ${items.length} →`
                        : "View collection →"}
                    </Link>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {preview.map((p) => (
                      <ProductCard key={p.key} product={p} />
                    ))}
                  </div>
                </section>
              );
            })}
          </ProductFinder>
        </Suspense>

        {/*
          THE CRAWLABLE INDEX, deliberately outside the Suspense boundary.

          ProductFinder reads searchParams, so everything inside that boundary
          renders as the fallback skeleton in the server response and only
          becomes real after hydration. The consequence: this page shipped 504
          KB of HTML containing 29 anchors, none of which pointed at a
          product, while emitting ItemList schema describing 233 products it
          did not link to. The site's most-linked hub passed zero link equity
          to anything it sold, and any retrieval system that doesn't run
          JavaScript saw an empty catalogue.

          A paginated card grid would fix the letter of that (24 links on page
          one) but not the substance, products on page 6 stay three hops from
          the hub. Plain text links cost almost nothing to render, so every
          product gets a server-rendered link one hop from the nav instead.
          It's also just a useful page: people who know what they want can
          find it without waiting for a search box to hydrate.
        */}
        <section className="mt-20 border-t border-line pt-10" aria-labelledby="index-h">
          <h2 id="index-h" className="text-xl font-semibold tracking-tight">
            Every product
          </h2>
          <p className="mt-1 text-sm text-ink-faint">
            The whole catalogue as a plain list, by category.
          </p>

          {activeCategories().map((c) => {
            const items = indexed().filter((p) => p.category === c.name);
            if (items.length === 0) return null;
            return (
              <div key={c.slug} className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
                  <Link href={`/collections/${c.slug}`} className="link-quiet">
                    {c.name}
                  </Link>
                </h3>
                <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <li key={p.key} className="text-sm leading-snug">
                      <Link href={`/products/${p.key}`} className="link-quiet">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
