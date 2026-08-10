import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, activeCategories, byCategory, categoryBySlug } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) return { title: "Collection not found" };
  return {
    title: cat.name,
    description: cat.blurb.slice(0, 158),
    alternates: { canonical: `/collections/${cat.slug}` },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();

  const items = byCategory(cat.name);

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
      {
        "@type": "ListItem",
        position: 2,
        name: "All gear",
        item: "https://theanglerstore.com/products",
      },
      { "@type": "ListItem", position: 3, name: cat.name },
    ],
  };

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.name,
    description: cat.blurb,
    url: `https://theanglerstore.com/collections/${cat.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((p, i) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify([ld, breadcrumbLd]) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-faint">
          <Link href="/" className="hover:text-tide">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-tide">
            All gear
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink-dim">{cat.name}</span>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{cat.name}</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">{cat.blurb}</p>

        {items.length > 0 ? (
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <ProductCard key={p.key} product={p} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="card mt-9 p-8">
            <h2 className="text-lg font-semibold">Nothing here yet</h2>
            <p className="mt-2 max-w-xl leading-relaxed text-ink-dim">
              We&rsquo;d rather show you an empty shelf than list something we
              can&rsquo;t actually ship you. This category opens as soon as we
              have a supplier we trust for it.
            </p>
            <Link href="/products" className="btn btn-primary mt-5">
              See what we do have
            </Link>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-2">
          {activeCategories().filter((c) => c.slug !== cat.slug).map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="chip hover:border-line-hi hover:text-ink"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
