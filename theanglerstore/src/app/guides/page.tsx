import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES } from "@/lib/editorial";

export const metadata = {
  title: { absolute: "Fishing Guides — Rigs, Tides & Technique | TheAnglerStore" },
  description:
    "How to rig, when to fish, and what actually works on Northern California beaches and bays. Written by people who fish them.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndex() {
  // An index of nothing is a thin page, and a thin page in the sitemap is
  // worse than no page. This route appears the day the first guide is written.
  if (GUIDES.length === 0) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-faint">
        <Link href="/" className="hover:text-tide">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-dim">Guides</span>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Guides</h1>
      <ul className="mt-10 space-y-8">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <h2 className="text-lg font-semibold">
              <Link href={`/guides/${g.slug}`} className="hover:text-tide">{g.title}</Link>
            </h2>
            <p className="mt-1.5 leading-relaxed text-ink-dim">{g.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
