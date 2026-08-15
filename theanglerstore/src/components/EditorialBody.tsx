import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { sectionProducts, type Section } from "@/lib/editorial";

/**
 * The body of a guide or species page.
 *
 * Prose, tables and inline product modules — the three things the editorial
 * plan needs and nothing else. Products are resolved through the catalog, so
 * a page cannot show a card for something we don't stock.
 */
export function EditorialBody({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s, i) => {
        const products = sectionProducts(s);
        return (
          <section key={i} className="mt-10">
            {s.heading && (
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{s.heading}</h2>
            )}
            {s.body?.map((p, j) => (
              <p key={j} className="mt-4 leading-relaxed text-ink-dim">
                {p}
              </p>
            ))}

            {s.table && (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {s.table.head.map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="border-b border-line px-3 py-2 text-left font-semibold text-ink"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c} className="border-b border-line/60 px-3 py-2 text-ink-dim">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {products.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {products.map((p) => (
                  <ProductCard key={p.key} product={p} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}

/** Visible Q&A. FAQPage schema is emitted only where this renders. */
export function Faqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (faqs.length === 0) return null;
  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Common questions</h2>
      <dl className="mt-6 space-y-6">
        {faqs.map((f) => (
          <div key={f.q}>
            <dt className="font-medium text-ink">{f.q}</dt>
            <dd className="mt-2 leading-relaxed text-ink-dim">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Byline + dates. Published and Updated are separate, and both are real. */
export function Byline({
  author,
  published,
  updated,
}: {
  author: { name: string; url: string };
  published: string;
  updated?: string;
}) {
  const fmt = (d: string) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  return (
    <p className="mt-4 text-sm text-ink-faint">
      By{" "}
      <Link href={author.url} className="link-quiet">
        {author.name}
      </Link>
      {" · "}Published {fmt(published)}
      {updated && updated !== published && <> · Updated {fmt(updated)}</>}
    </p>
  );
}
