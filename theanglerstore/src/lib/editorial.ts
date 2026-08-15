import { CATEGORIES, getProduct, isSourced, type Product } from "@/lib/products";

/**
 * EDITORIAL CONTENT — GUIDES AND SPECIES PAGES.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THIS FILE IS SCAFFOLDING. THE WRITING IS NOT MINE TO DO.
 *
 * Two independent audits reached the same conclusion: the site answers 6 of
 * the 100 questions anglers actually ask, has no guides, no species pages and
 * nothing citable. Every technical fix so far makes the site legible to
 * machines; none of it gives anyone a reason to cite it.
 *
 * So the routes, schema, breadcrumbs and product plumbing are built and
 * tested, and GUIDES and SPECIES ship EMPTY. Nothing here is generated,
 * because generated fishing advice is exactly the thing that would sink a
 * store whose entire positioning is that it tells the truth. Pages appear —
 * in the nav, the sitemap and the index — the moment a real entry is added,
 * and not before.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * The byline. A real person, already named on /contact and in the footer.
 *
 * Every editorial page carries one. Anonymous fishing advice is worth what
 * you paid for it, and E-E-A-T aside, a reader deciding whether to trust a
 * rig diagram deserves to know who is telling them.
 */
export const AUTHOR = {
  name: "Augustus Muse",
  url: "https://theanglerstore.com/about",
  jobTitle: "Owner, TheAnglerStore",
} as const;

export interface Section {
  heading?: string;
  /** Paragraphs of plain prose. */
  body?: string[];
  /** Optional table — header row plus rows, rendered as a real <table>. */
  table?: { head: string[]; rows: string[][] };
  /** Product keys to surface inline as cards. Must exist and be sourced. */
  products?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  /** Meta description and the standfirst under the H1. */
  description: string;
  /**
   * ISO dates. `published` never changes. `updated` moves ONLY when the
   * content materially changed — bumping it to look fresh makes the date
   * worthless as a signal to the one audience that matters, which is the
   * reader deciding whether the advice is current.
   */
  published: string;
  updated?: string;
  sections: Section[];
  /** Rendered as a visible Q&A block, and only then as FAQPage schema. */
  faqs?: { q: string; a: string }[];
  related?: string[];
}

/** A row of the "complete setup" table. Each points at something real. */
export interface SetupRow {
  /** "Rod", "Reel", "Line", "Leader", "Hook", "Weight", "Lure", "Bait" */
  part: string;
  /** What to use, in words. */
  choice: string;
  /** A product key we stock — or a collection slug — or neither. */
  productKey?: string;
  collectionSlug?: string;
  /** Say so plainly when we don't sell it. Honesty is the differentiator. */
  weDontStock?: string;
}

export interface Species {
  slug: string;
  /** "Barred surfperch" */
  name: string;
  /** "Amphistichus argenteus" — shown, and used in schema. */
  scientificName?: string;
  description: string;
  published: string;
  updated?: string;
  sections: Section[];
  setup?: SetupRow[];
  faqs?: { q: string; a: string }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT GOES HERE. Both arrays are deliberately empty — see the note above.
// ─────────────────────────────────────────────────────────────────────────────

export const GUIDES: Guide[] = [];

export const SPECIES: Species[] = [];

// ── lookups ──────────────────────────────────────────────────────────────────

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getSpecies(slug: string): Species | undefined {
  return SPECIES.find((s) => s.slug === slug);
}

/**
 * Resolve the product keys referenced by a section.
 *
 * Silently drops anything that doesn't exist or isn't currently sourced, so a
 * guide can never advertise a product the checkout would refuse. Use
 * validateEditorial() to find those references before they ship.
 */
export function sectionProducts(section: Section): Product[] {
  return (section.products ?? [])
    .map(getProduct)
    .filter((p): p is Product => Boolean(p) && isSourced(p!));
}

/**
 * Every reference in every guide and species page, checked.
 *
 * Run by schema.test.ts. Editorial content that links to a product we removed
 * is the exact failure mode that put fabricated gear on USTideCharts for
 * months — this is the check that would have caught it.
 */
export function validateEditorial(): string[] {
  const problems: string[] = [];
  const slugs = new Set(CATEGORIES.map((c) => c.slug));

  const checkSections = (where: string, sections: Section[]) => {
    for (const s of sections) {
      for (const key of s.products ?? []) {
        const p = getProduct(key);
        if (!p) problems.push(`${where}: product "${key}" does not exist`);
        else if (!isSourced(p)) problems.push(`${where}: product "${key}" is not sourced`);
      }
      if (s.table && s.table.rows.some((r) => r.length !== s.table!.head.length)) {
        problems.push(`${where}: a table row does not match its header width`);
      }
    }
  };

  const seenGuide = new Set<string>();
  for (const g of GUIDES) {
    if (seenGuide.has(g.slug)) problems.push(`duplicate guide slug "${g.slug}"`);
    seenGuide.add(g.slug);
    checkSections(`guide/${g.slug}`, g.sections);
    for (const r of g.related ?? []) {
      if (!GUIDES.some((x) => x.slug === r)) problems.push(`guide/${g.slug}: related "${r}" not found`);
    }
  }

  const seenSpecies = new Set<string>();
  for (const sp of SPECIES) {
    if (seenSpecies.has(sp.slug)) problems.push(`duplicate species slug "${sp.slug}"`);
    seenSpecies.add(sp.slug);
    checkSections(`species/${sp.slug}`, sp.sections);
    for (const row of sp.setup ?? []) {
      if (row.productKey) {
        const p = getProduct(row.productKey);
        if (!p) problems.push(`species/${sp.slug}: setup product "${row.productKey}" does not exist`);
        else if (!isSourced(p)) problems.push(`species/${sp.slug}: setup product "${row.productKey}" is not sourced`);
      }
      if (row.collectionSlug && !slugs.has(row.collectionSlug)) {
        problems.push(`species/${sp.slug}: setup collection "${row.collectionSlug}" does not exist`);
      }
      if (!row.productKey && !row.collectionSlug && !row.weDontStock) {
        problems.push(`species/${sp.slug}: setup row "${row.part}" points at nothing and says nothing`);
      }
    }
  }
  return problems;
}
