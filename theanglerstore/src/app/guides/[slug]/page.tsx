import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AUTHOR, GUIDES, getGuide } from "@/lib/editorial";
import { Byline, EditorialBody, Faqs } from "@/components/EditorialBody";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  return {
    title: { absolute: `${guide.title} | TheAnglerStore` },
    description: guide.description.slice(0, 158),
    alternates: { canonical: `/guides/${guide.slug}` },
  };
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = `https://theanglerstore.com/guides/${guide.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    // The visible byline and these values are the same strings. A page that
    // shows one date and reports another is the schema-vs-content mismatch
    // that cost this site its rich results the first time.
    datePublished: guide.published,
    dateModified: guide.updated ?? guide.published,
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url, jobTitle: AUTHOR.jobTitle },
    publisher: { "@id": "https://theanglerstore.com/#org" },
    mainEntityOfPage: url,
    url,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://theanglerstore.com" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://theanglerstore.com/guides" },
      { "@type": "ListItem", position: 3, name: guide.title },
    ],
  };

  // FAQPage ONLY where a Q&A block actually renders. Marking up questions the
  // page does not display is a manual-action risk, not a clever trick.
  const faqLd = guide.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((f) => ({
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
          <Link href="/guides" className="hover:text-tide">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-dim">{guide.title}</span>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{guide.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-dim">{guide.description}</p>
        <Byline author={AUTHOR} published={guide.published} updated={guide.updated} />

        <EditorialBody sections={guide.sections} />
        {guide.faqs && <Faqs faqs={guide.faqs} />}

        {guide.related && guide.related.length > 0 && (
          <section className="mt-14 border-t border-line pt-8">
            <h2 className="text-lg font-semibold tracking-tight">Read next</h2>
            <ul className="mt-4 space-y-2">
              {guide.related.map((r) => {
                const g = getGuide(r);
                if (!g) return null;
                return (
                  <li key={r}>
                    <Link href={`/guides/${g.slug}`} className="link-quiet">{g.title}</Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
