import {
  appealOf,
  listed,
  suitsWater,
  waterOf,
  type Category,
  type Product,
  type Water,
} from "@/lib/products";

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
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenise(s: string): string[] {
  const n = normalize(s);
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
      // Water suitability is searchable text as well as a filter — "saltwater"
      // used to return exactly one product on a store that sells surf tackle.
      {
        tokens: tokenise(
          waterOf(product) === "both"
            ? "saltwater freshwater surf inshore"
            : waterOf(product) === "salt"
              ? "saltwater salt surf inshore beach"
              : "freshwater fresh bass crappie lake",
        ).map(stem),
        weight: WEIGHTS.category,
      },
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
  let q = normalize(query);
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
  waters: Water[];
  sort: SortId;
}

export const EMPTY_FILTERS: Filters = {
  query: "",
  categories: [],
  bands: [],
  waters: [],
  sort: "popular",
};

export function isFiltered(f: Filters): boolean {
  return (
    f.query.trim().length > 0 ||
    f.categories.length > 0 ||
    f.bands.length > 0 ||
    f.waters.length > 0 ||
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

  if (f.waters.length) {
    out = out.filter((p) => f.waters.some((w) => suitsWater(p, w)));
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

/**
 * THE GAP NOTICE.
 *
 * Some searches deserve an answer rather than a result set. We sell no reels,
 * and a literal search for "reel" used to return pliers and braid because the
 * word appears in their copy — which reads as either incompetence or bait.
 *
 * Saying so plainly costs us nothing and is the same instinct as the rest of
 * the store: tell people what we don't have, and why.
 */
export function gapNotice(query: string): { title: string; body: string } | null {
  const q = normalize(query);
  if (!q) return null;
  if (/\b(reel|reels|combo|combos)\b/.test(q)) {
    return {
      title: "We don't sell reels yet.",
      body:
        "Our rods are real and in stock, but the reel is still yours to bring. Our distributors carry almost none, and we would rather sell you nothing than sell you a reel we haven't fished. For the surf rods here, a 5000–8000 size spinning reel with sealed bearings is the right pairing.",
    };
  }
  if (/\b(rod|rods)\b/.test(q) && !/holder|rack|hanger|storage/.test(q)) {
    return {
      title: "Three rods, one model.",
      body:
        "We carry the Daiwa FT Surf in 9, 10 and 11 foot. That is the whole rod range today — it is a fiberglass blank at a fair price, not a flagship, and we say so on its page.",
    };
  }
  return null;
}

// ── Did you mean? ──────────────────────────────────────────────────────────

/**
 * TYPO TOLERANCE.
 *
 * "hoks" returned nothing and offered nothing. A shopper who mistypes once and
 * gets a blank page usually doesn't try a second time.
 *
 * Deliberately conservative: we only suggest when the query found NOTHING, and
 * only for a single close word. Fuzzy matching applied to a query that already
 * works is how a search box starts returning things nobody asked for.
 */
function editDistance(a: string, b: string, cap: number): number {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const d = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      cur.push(d);
      if (d < best) best = d;
    }
    if (best > cap) return cap + 1; // whole row already too far — stop early
    prev = cur;
  }
  return prev[b.length];
}

/**
 * Words this shop has already declared meaningful — every synonym key and
 * every synonym value. A candidate in this set gets a one-edit head start.
 *
 * This is the bit that makes the suggestions read as though a fisherman wrote
 * them. "brade" is one edit from "grade" (which appears twice, inside "Tour
 * Grade") and two from "braid" — but braid is a word this catalog is built
 * around and grade is an adjective that happens to be in two product names.
 * Pure edit distance has no way to know that. The synonym table does.
 */
let DOMAIN: Set<string> | null = null;
function domainWords(): Set<string> {
  if (DOMAIN) return DOMAIN;
  DOMAIN = new Set<string>();
  for (const [k, vs] of Object.entries(SYNONYMS)) {
    DOMAIN.add(stem(k));
    for (const v of vs) DOMAIN.add(stem(v));
  }
  return DOMAIN;
}

let VOCAB: Map<string, number> | null = null;

/**
 * Candidate words, with how many products each appears in.
 *
 * Frequency matters: "brade" is one edit from "grade" and two from "braid",
 * but nobody searching a tackle shop meant "Tour Grade". Weighting by how
 * common a word is in the catalog picks the word a fisherman meant.
 */
function vocab(): Map<string, number> {
  if (VOCAB) return VOCAB;
  VOCAB = new Map();
  for (const doc of index()) {
    const seen = new Set<string>();
    // Names, brands and categories only. Feature-bullet words would suggest
    // "abrasion" at someone who typed "abrasin", which helps nobody.
    for (const f of doc.fields.slice(0, 3)) {
      for (const t of f.tokens) if (t.length >= 4) seen.add(t);
    }
    for (const t of seen) VOCAB.set(t, (VOCAB.get(t) ?? 0) + 1);
  }
  return VOCAB;
}

/**
 * The nearest real word to what they typed, or null if nothing is close.
 * Only meaningful when the search returned no results.
 */
export function didYouMean(query: string): string | null {
  const raw = tokenise(query);
  // 3 characters is the floor: "hoks" stems to "hok", and refusing to look at
  // it was why the audit's example returned no suggestion at all.
  const words = raw.map(stem).filter((w) => w.length >= 3);
  if (words.length === 0) return null;

  const v = vocab();
  // Only give up when EVERY word is already real — "circel hook" has one good
  // word and one typo, and that is exactly the case worth catching.
  if (words.every((w) => v.has(w))) return null;

  const fixes = new Map<string, string>();
  for (const w of words) {
    if (v.has(w)) continue;
    const dom = domainWords();
    let best: { term: string; score: number; freq: number } | null = null;
    for (const [cand, freq] of v) {
      const d = editDistance(w, cand, 2);
      if (d > 2) continue;
      // Order-independent: score every candidate, keep the lowest.
      const score = dom.has(cand) ? Math.max(0, d - 1) : d;
      if (
        !best ||
        score < best.score ||
        (score === best.score && freq > best.freq)
      ) {
        best = { term: cand, score, freq };
      }
    }
    if (best) fixes.set(w, best.term);
  }
  if (fixes.size === 0) return null;

  const out = raw.map((t) => fixes.get(stem(t)) ?? t).join(" ");
  return out === normalize(query) ? null : out;
}
