import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AUTHOR, SPECIES, getSpecies } from "@/lib/editorial";
import { Byline, EditorialBody, Faqs } from "@/components/EditorialBody";
import { getProduct } from "@/lib/products";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SPECIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sp = getSpecies(slug);
  if (!sp) return { title: "Species not found" };
  return {
    title: { absolute: `${sp.name}: Gear & Tactics | TheAnglerStore` },
    description: sp.description.slice(0, 158),
    alternates: { canonical: `/species/${sp.slug}` },
  };
}

export default async function SpeciesPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const sp = getSpecies(slug);
  if (!sp) notFound();

  const url = `https://theanglerstore.com/species/${sp.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${sp.name}: gear and tactics`,
    description: sp.description,
    datePublished: sp.published,
    dateModified: sp.updated ?? sp.published,
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url, jobTitle: AUTHOR.jobTitle },
    publisher: { "@id": "https://theanglerstore.com/#org" },
    mainEntityOfPage: url,
    url,
    ...(sp.scientificName ? { about: { "@type": "Thing", name: sp.scientificName } } : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://theanglerstore.com" },
      { "@type": "ListItem", position: 2, name: "Species", item: "https://theanglerstore.com/species" },
      { "@type": "ListItem", position: 3, name: sp.name },
    ],
  };

  const faqLd = sp.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: sp.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleLd, breadcrumbLd, faqLd].filter(Boolean)),
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-faint">
          <Link href="/" className="hover:text-tide">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/species" className="hover:text-tide">Species</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-dim">{sp.name}</span>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{sp.name}</h1>
        {sp.scientificName && (
          <p className="mt-1 text-sm italic text-ink-faint">{sp.scientificName}</p>
        )}
        <p className="mt-4 text-lg leading-relaxed text-ink-dim">{sp.description}</p>
        <Byline author={AUTHOR} published={sp.published} updated={sp.updated} />

        {/* THE COMPLETE SETUP.
            Every row points at a real product, a real collection, or says
            plainly that we don't sell it. That last case is the important one:
            a setup table with a silent gap is how a reader ends up on a beach
            missing the one piece that makes the rest work. */}
        {sp.setup && sp.setup.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              The complete setup
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="border-b border-line px-3 py-2 text-left font-semibold text-ink">Part</th>
                    <th scope="col" className="border-b border-line px-3 py-2 text-left font-semibold text-ink">What to use</th>
                    <th scope="col" className="border-b border-line px-3 py-2 text-left font-semibold text-ink">Where</th>
                  </tr>
                </thead>
                <tbody>
                  {sp.setup.map((row) => {
                    const product = row.productKey ? getProduct(row.productKey) : undefined;
                    return (
                      <tr key={row.part}>
                        <td className="border-b border-line/60 px-3 py-2 font-medium text-ink">{row.part}</td>
                        <td className="border-b border-line/60 px-3 py-2 text-ink-dim">{row.choice}</td>
                        <td className="border-b border-line/60 px-3 py-2">
                          {product ? (
                            <Link href={`/products/${product.key}`} className="link-quiet">
                              {product.name}
                            </Link>
                          ) : row.collectionSlug ? (
                            <Link href={`/collections/${row.collectionSlug}`} className="link-quiet">
                              Browse
                            </Link>
                          ) : (
                            <span className="text-ink-faint">{row.weDontStock}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <EditorialBody sections={sp.sections} />
        {sp.faqs && <Faqs faqs={sp.faqs} />}
      </article>
    </>
  );
}
