import { appealOf, listed, type Category, type Product } from "@/lib/products";

/**
 * CATALOG SEARCH.
 *
 * Runs entirely in the browser. The whole catalog is already in the client
 * bundle (the cart needs getProduct), so shipping a search index costs us
 * nothing extra and buys instant results with no network round trip. At ~225
 * products a linear scan per keystroke is measured in microseconds; there is
 * no reason to reach for a trie or a worker.
 *
 * The scoring is deliberately simple and predictable. A shopper typing
 * "braid" should get braid, not a landing net whose blurb happens to contain
 * the word. So: every query token must match SOMETHING, and where it matches
 * decides the rank.
 */

/** Higher wins. A hit in the product name beats a hit in a feature bullet. */
const WEIGHTS = {
  name: 10,
  brand: 7,
  category: 5,
  tagline: 3,
  key: 3,
  features: 1,
  when: 1,
} as const;

/**
 * Words anglers type that don't appear in any product name.
 *
 * This is where a tackle shop's search either works or doesn't. Nobody
 * searches for "Personal Flotation Device" — they type "life jacket". Nobody
 * types "Terminal Tackle", they type "hooks". Each entry expands the query,
 * it never narrows it, so a synonym can only ever help.
 */
const SYNONYMS: Record<string, string[]> = {
  pfd: ["flotation", "vest"],
  vest: ["flotation"],
  line: ["braid", "braided", "fluorocarbon", "leader", "mono", "monofilament"],
  braid: ["braided", "superline"],
  leader: ["fluorocarbon", "fluoro"],
  fluoro: ["fluorocarbon"],
  hook: ["circle", "octopus"],
  worm: ["senko", "trick", "trd", "creature"],
  plastic: ["senko", "worm", "craw", "creature", "fluke"],
  crank: ["crankbait", "squarebill", "lipless"],
  crankbait: ["squarebill", "lipless"],
  jighead: ["jig", "shroomz"],
  ned: ["trd", "shroomz", "finesse"],
  bass: ["senko", "craw", "squarebill", "spinnerbait"],
  crappie: ["magnet", "panfish"],
  surf: ["surfcasting", "beach"],
  beach: ["surf"],
  kayak: ["paddle", "scupper", "railblaza", "yakgear"],
  net: ["landing"],
  pliers: ["gripper"],
  box: ["stowaway", "tray", "utility"],
  light: ["lamp", "strobe", "headlamp"],
  rod: ["combo"],
  reel: ["combo"],
  holder: ["mount"],
  downrigger: ["cannonball", "snubber", "release"],
  troll: ["trolling", "flasher", "diver"],
};

/**
 * Whole-query rewrites, applied before tokenising.
 *
 * Some things people type are phrases, not words — "life jacket" tokenises
 * into two useless words, and matching "life" against "Frabill Aqua-Life"
 * is exactly the kind of nonsense that makes shoppers stop trusting a search
 * box. Rewriting the phrase first is the only clean fix.
 */
const PHRASES: [RegExp, string][] = [
  [/\blife (jacket|vest)s?\b/g, "flotation"],
  [/\bbuoyancy aid\b/g, "flotation"],
  [/\bsoft (bait|plastic)s?\b/g, "worm"],
  [/\bterminal tackle\b/g, "hook swivel"],
  [/\bfishing line\b/g, "line"],
  [/\bsun ?glass(es)?\b/g, "eyewear"],
];

/**
 * How much a synonym hit is worth against a literal one.
 *
 * This number matters more than it looks. At 1.0 a search for "worm" ranked a
 * Coleman "Soft-Sided" cooler first, because the synonym landed in a product
 * NAME and outscored real worms whose match sat in the category. A synonym is
 * a hint, not evidence — it should break ties, never lead.
 */
const SYNONYM_WEIGHT = 0.3;

/** Strip everything that isn't a letter or digit, and fold case. */
function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenise(s: string): string[] {
  const n = normalise(s);
  return n ? n.split(" ") : [];
}

/** "hooks" and "hook" should be the same search. Crude, and right often enough. */
function stem(t: string): string {
  if (t.length > 3 && t.endsWith("es")) return t.slice(0, -2);
  if (t.length > 3 && t.endsWith("s")) return t.slice(0, -1);
  return t;
}

interface Doc {
  product: Product;
  fields: { tokens: string[]; weight: number }[];
}

/** Brand lives in the spec table rather than on the product, so dig it out. */
function brandOf(p: Product): string {
  return p.specs.find((s) => s.label === "Brand")?.value ?? "";
}

let INDEX: Doc[] | null = null;

function index(): Doc[] {
  if (INDEX) return INDEX;
  INDEX = listed().map((product) => ({
    product,
    fields: [
      { tokens: tokenise(product.name).map(stem), weight: WEIGHTS.name },
      { tokens: tokenise(brandOf(product)).map(stem), weight: WEIGHTS.brand },
      { tokens: tokenise(product.category).map(stem), weight: WEIGHTS.category },
      { tokens: tokenise(product.tagline).map(stem), weight: WEIGHTS.tagline },
      { tokens: tokenise(product.key).map(stem), weight: WEIGHTS.key },
      {
        tokens: tokenise(product.features.join(" ")).map(stem),
        weight: WEIGHTS.features,
      },
      { tokens: tokenise(product.whenToUse).map(stem), weight: WEIGHTS.when },
    ],
  }));
  return INDEX;
}

interface Group {
  /** What the person actually typed. */
  literal: string;
  /** What they might have meant. Scored at a discount. */
  synonyms: string[];
}

/**
 * Expand the raw query into the groups we'll look for.
 * Every group must match something; within a group, any member will do.
 */
function expand(query: string): Group[] {
  let q = normalise(query);
  for (const [re, to] of PHRASES) q = q.replace(re, to);
  const raws = q ? q.split(" ") : [];
  return raws.map((raw) => {
    const t = stem(raw);
    return {
      literal: t,
      synonyms: (SYNONYMS[raw] ?? SYNONYMS[t] ?? []).map(stem),
    };
  });
}

/**
 * Score one document. Returns 0 when any query group fails to match, which is
 * what makes multi-word searches narrow rather than widen — "surf rod" should
 * mean both words, the way a person means it.
 */
function score(doc: Doc, groups: Group[]): number {
  let total = 0;
  for (const group of groups) {
    let best = 0;
    for (const field of doc.fields) {
      for (const token of field.tokens) {
        // Exact beats prefix, so "net" ranks landing nets above "NedlockZ".
        if (token === group.literal) {
          best = Math.max(best, field.weight * 2);
        } else if (
          group.literal.length >= 3 &&
          token.startsWith(group.literal)
        ) {
          best = Math.max(best, field.weight);
        }
        for (const syn of group.synonyms) {
          if (token === syn) {
            best = Math.max(best, field.weight * SYNONYM_WEIGHT);
          } else if (syn.length >= 4 && token.startsWith(syn)) {
            best = Math.max(best, field.weight * SYNONYM_WEIGHT * 0.7);
          }
        }
      }
    }
    if (best === 0) return 0;
    total += best;
  }
  return total;
}

export function searchProducts(query: string): Product[] {
  const groups = expand(query);
  if (groups.length === 0) return listed();

  const hits: { product: Product; score: number }[] = [];
  for (const doc of index()) {
    const s = score(doc, groups);
    if (s > 0) hits.push({ product: doc.product, score: s });
  }
  // Relevance first, then our editorial ranking — so among equally relevant
  // matches the one we'd actually recommend comes up top.
  hits.sort((a, b) => b.score - a.score || appealOf(a.product) - appealOf(b.product));
  return hits.map((h) => h.product);
}

// ── Filters ────────────────────────────────────────────────────────────────

/**
 * Price bands rather than a slider.
 *
 * A two-handle range slider is a nightmare on a phone and nobody has a
 * precise budget anyway — they have a rough one. Four bands, and the top one
 * is drawn at the free-shipping threshold because that is the number a
 * shopper is actually optimising against.
 */
export const PRICE_BANDS = [
  { id: "under25", label: "Under $25", test: (p: number) => p < 25 },
  { id: "25to75", label: "$25 – $75", test: (p: number) => p >= 25 && p < 75 },
  { id: "over75", label: "$75+ · ships free", test: (p: number) => p >= 75 },
] as const;

export type PriceBandId = (typeof PRICE_BANDS)[number]["id"];

export const SORTS = [
  { id: "popular", label: "Most popular" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name A–Z" },
] as const;

export type SortId = (typeof SORTS)[number]["id"];

export interface Filters {
  query: string;
  categories: Category[];
  bands: PriceBandId[];
  sort: SortId;
}

export const EMPTY_FILTERS: Filters = {
  query: "",
  categories: [],
  bands: [],
  sort: "popular",
};

export function isFiltered(f: Filters): boolean {
  return (
    f.query.trim().length > 0 ||
    f.categories.length > 0 ||
    f.bands.length > 0 ||
    f.sort !== "popular"
  );
}

export function applyFilters(f: Filters): Product[] {
  // Search first: it establishes the relevance order that sort may override.
  let out = f.query.trim() ? searchProducts(f.query) : listed();

  if (f.categories.length) {
    const want = new Set<string>(f.categories);
    out = out.filter((p) => want.has(p.category));
  }

  if (f.bands.length) {
    const tests = PRICE_BANDS.filter((b) =>
      (f.bands as readonly string[]).includes(b.id),
    );
    out = out.filter((p) => tests.some((b) => b.test(p.price)));
  }

  switch (f.sort) {
    case "price-asc":
      out = [...out].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out = [...out].sort((a, b) => b.price - a.price);
      break;
    case "name":
      out = [...out].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "popular":
      // A search already ordered these by relevance; re-sorting by appeal
      // would throw that away and is not what "most popular" means here.
      if (!f.query.trim()) out = [...out].sort((a, b) => appealOf(a) - appealOf(b));
      break;
  }

  return out;
}

/** How many results each category would give, under the CURRENT other filters. */
export function categoryCounts(f: Filters): Map<string, number> {
  const base = applyFilters({ ...f, categories: [] });
  const counts = new Map<string, number>();
  for (const p of base) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return counts;
}
