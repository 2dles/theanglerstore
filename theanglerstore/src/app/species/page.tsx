import Link from "next/link";
import { notFound } from "next/navigation";
import { SPECIES } from "@/lib/editorial";

export const metadata = {
  title: { absolute: "Fish Species — Gear & Tactics | TheAnglerStore" },
  description:
    "What to use for surfperch, halibut, striped bass and the rest — rod, reel, line, leader, hook and weight, per species.",
  alternates: { canonical: "/species" },
};

export default function SpeciesIndex() {
  if (SPECIES.length === 0) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-faint">
        <Link href="/" className="hover:text-tide">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-dim">Species</span>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Species</h1>
      <ul className="mt-10 space-y-8">
        {SPECIES.map((s) => (
          <li key={s.slug}>
            <h2 className="text-lg font-semibold">
              <Link href={`/species/${s.slug}`} className="hover:text-tide">{s.name}</Link>
            </h2>
            <p className="mt-1.5 leading-relaxed text-ink-dim">{s.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
