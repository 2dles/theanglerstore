import Link from "next/link";
import {
  activeBundles,
  bundleItems,
  bundleListPrice,
  bundlePrice,
} from "@/lib/products";
import { BundleCard } from "@/components/BundleCard";

export const metadata = {
  title: { absolute: "Fishing Kits & Bundles | TheAnglerStore" },
  description:
    "Complete kits for one kind of day: surf, jetty, rockfish, salmon trolling, bass. Rod, line, terminal tackle and tools together, 12% off buying the parts separately.",
  alternates: { canonical: "/bundles" },
};

export default function BundlesPage() {
  const kits = activeBundles();

  // Product schema for each kit, priced from the same function the page and
  // the checkout use. A kit is a real orderable thing at a real price, so it
  // gets described as one rather than left as decoration.
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Fishing kits",
    url: "https://theanglerstore.com/bundles",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: kits.length,
      itemListElement: kits.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: b.name,
          description: b.blurb,
          url: `https://theanglerstore.com/bundles#${b.id}`,
          // isSimilarTo rather than hasPart: the kit is sold as its member
          // products at a discount, not as a separate SKU with its own MPN,
          // and claiming a part-whole relationship we don't stock would be a
          // small lie in structured data.
          isSimilarTo: bundleItems(b).map((p) => ({
            "@type": "Product",
            name: p.name,
            url: `https://theanglerstore.com/products/${p.key}`,
          })),
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: bundlePrice(b).toFixed(2),
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://theanglerstore.com",
      },
      { "@type": "ListItem", position: 2, name: "Kits" },
    ],
  };

  const biggestSaving = kits.reduce(
    (best, b) => Math.max(best, bundleListPrice(b) - bundlePrice(b)),
    0,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([ld, breadcrumbLd]) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-faint">
          <Link href="/" className="hover:text-tide">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink-dim">Kits</span>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Kits
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">
          Each of these is what you would carry for one specific kind of day,
          bought in one go at 12% off the parts. They are not sampler boxes;
          nothing is in a kit to pad it out, and where a kit needs six things to
          be complete it has six things. The biggest of them takes $
          {biggestSaving.toFixed(0)} off.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-ink-faint">
          Kits share parts on purpose. If you want two of them, you need two of
          whatever they have in common, and the cart will tell you before you
          pay rather than after.
        </p>

        {kits.length > 0 ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {kits.map((b) => (
              <div key={b.id} id={b.id} className="scroll-mt-24">
                <BundleCard bundle={b} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card mt-10 p-8">
            <h2 className="text-lg font-semibold">No kits right now</h2>
            <p className="mt-2 max-w-xl leading-relaxed text-ink-dim">
              A kit comes down the moment we can&rsquo;t ship all of it, rather
              than quietly shipping you a shorter one.
            </p>
            <Link href="/products" className="btn btn-primary mt-5">
              Browse the gear
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
