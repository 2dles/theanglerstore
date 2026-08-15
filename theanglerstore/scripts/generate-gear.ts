/**
 * GENERATE ustidecharts/src/lib/gear.ts FROM THE LIVE CATALOG.
 *
 * Run:   npx tsx scripts/generate-gear.ts            (writes the file)
 *        npx tsx scripts/generate-gear.ts --check    (fails if it has drifted)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS EXISTS
 *
 * USTideCharts shipped a hand-written copy of the catalog. It was never
 * updated, so ~193 location, species and guide pages advertised product names
 * and prices that did not match the pages they linked to — "DeepTide X8 Braid,
 * $24.99" resolving to Sufix 832 at $34.99, and two products that had never
 * existed at all. Roughly 600-800 false product statements on the only path
 * that sends the store qualified traffic.
 *
 * A hand-maintained second copy of a catalog will always drift. So there isn't
 * one any more: gear.ts is generated from products.ts and checked in CI.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getProduct,
  indexed,
  isSourced,
  speciesOf,
  waterOf,
  type Product,
} from "../src/lib/products";

const HERE = dirname(fileURLToPath(import.meta.url));

/**
 * Every product key USTideCharts asks for, and the real catalog product that
 * answers it.
 *
 * The left-hand keys are a contract: they are baked into locations.ts,
 * species.ts, species-fl.ts and articles.ts, and into inbound links. They can
 * never change. The right-hand keys are whatever the store actually stocks
 * today, and are expected to change as sourcing does.
 */
const RESOLVE: Record<string, string> = {
  // Sourced under their own key — no substitution needed.
  "surf-rod": "surf-rod",
  "braided-line": "braided-line",
  "fluoro-leader": "fluoro-leader",
  "circle-hooks": "circle-hooks",
  "jig-assort": "jig-assort",
  "landing-net": "landing-net",
  pliers: "pliers",
  "tackle-bag": "tackle-bag",
  cooler: "cooler",

  // Substituted. The legacy key had no supplier behind it, so the store's own
  // checkout refuses it — recommending it was sending readers to a page they
  // could not buy from. Each maps to the closest real product we can ship.
  "inshore-combo": "okuma-tundra-7", // 7 ft saltwater rod, the role the combo filled
  "swimbait-kit": "zoom-fluke-smokin-shad", // soft paddle/jerk bait, the role the kit filled
  "carolina-kit": "mustad-barrel-swivel-4", // the swivel a Carolina rig is built around
};

/**
 * Keys with no honest equivalent in the catalog. They resolve to nothing and
 * simply do not render — which is the correct outcome, because the alternative
 * is advertising a product we cannot ship.
 *
 * Both are genuine merchandising gaps, not data problems. Delete the entry and
 * add a RESOLVE line the day we stock one.
 */
const NO_EQUIVALENT: Record<string, string> = {
  "sand-spike": "no beach sand spike in the catalog — Rod Holders are all boat mounts",
  headlamp: "no headlamp in the catalog — the only light that fits is 12V boat-powered",
};

/**
 * Topped up to this many cards when a page's list loses entries to the gaps
 * above, drawn from products that are relevant almost anywhere saltwater.
 */
const MIN_CARDS = 3;
const BACKFILL = ["braided-line", "pliers", "landing-net", "circle-hooks", "tackle-bag"];

/**
 * USTIDECHARTS SPECIES SLUG -> THE STORE'S OWN SPECIES TERMS.
 *
 * The tide site names 24 species. The store tags products by species in
 * `speciesOf()`, derived from category, name and water. This is the only
 * hand-written part of the bridge, and it is deliberately a translation
 * table and nothing more — it maps names to names, it does not decide which
 * products suit which fish. That judgement stays in the catalog.
 *
 * A slug absent from this table emits no entry, and USTideCharts falls back
 * to its own hand-written list. That is the correct outcome for the eleven
 * Florida species and for white seabass and cabezon: this is a Northern
 * California surf and inshore shop, it has nothing tagged for bonefish or
 * tarpon, and inventing a match would be exactly the failure that put
 * fabricated gear on those pages in the first place.
 */
const SPECIES_MAP: Record<string, string[]> = {
  "striped-bass": ["striped bass", "striper"],
  halibut: ["halibut"],
  rockfish: ["rockfish"],
  lingcod: ["lingcod"],
  surfperch: ["surfperch", "perch"],
  salmon: ["salmon", "king salmon", "coho"],
  yellowtail: ["yellowtail", "tuna", "bonito"],
  "calico-bass": ["calico bass"],
  corbina: ["corbina"],
  "spotted-bay-bass": ["spotted bay bass"],
  "leopard-shark": ["shark", "ray"],
};

/**
 * A page shows four cards. Four soft baits is not a recommendation, it is a
 * shelf — so each species list is ordered as a KIT, one product per job, in
 * the order someone actually assembles a setup. Location pages take the first
 * four of whatever they're given, so this ordering is what decides whether a
 * reader sees rod/line/hook/lure or four colours of the same lure.
 */
const KIT_ORDER: { cats: string[]; match?: RegExp; not?: RegExp }[] = [
  { cats: ["Surf Rods", "Rod & Reel Combos", "Reels"] },
  { cats: ["Line & Leader"] },
  // Hook and weight are two slots, not one. Both live in Terminal Tackle, so
  // a single slot gave every surf page a hook and no way to cast it — the
  // exact gap the audit named: you could buy the rod, the line and the hook
  // here and still not be able to fish.
  { cats: ["Terminal Tackle"], not: /sinker|weight/i },
  { cats: ["Terminal Tackle"], match: /sinker|weight/i },
  { cats: ["Lures", "Soft Baits"] },
  { cats: ["Nets & Landing"] },
  { cats: ["Tools"] },
  { cats: ["Trolling & Rigging"] },
  { cats: ["Tackle Storage", "Coolers"] },
];

/** How many keys to emit per species. Pages slice to 4; the rest give variety. */
const PER_SPECIES = 8;

function keysForSpecies(terms: string[]): string[] {
  const wanted = new Set(terms.map((t) => t.toLowerCase()));
  const salt = indexed().filter((p) => waterOf(p) !== "fresh");
  // Tagged for this species...
  const pool = salt.filter((p) => speciesOf(p).some((s) => wanted.has(s.toLowerCase())));
  // ...falling back to anything that works anywhere in salt. Rockfish and
  // lingcod are tagged on only a handful of products, so a tagging-only pool
  // gave them a rod, a hook and then two landing nets. Braid and pliers are
  // honest recommendations for any saltwater fish; using them to fill an empty
  // kit slot is not a claim that they were chosen for that species.
  const groupOf = (p: Product) => KIT_ORDER.findIndex((g) => g.cats.includes(p.category));

  const picked: Product[] = [];
  const used = new Set<string>();
  const filledGroups = new Set<number>();

  const take = (p: Product | undefined) => {
    if (!p || used.has(p.key)) return false;
    picked.push(p);
    used.add(p.key);
    filledGroups.add(groupOf(p));
    return true;
  };

  // Round one: one product per kit slot, species-tagged first, universal second.
  for (let i = 0; i < KIT_ORDER.length; i++) {
    const slot = KIT_ORDER[i];
    const inGroup = (p: Product) =>
      slot.cats.includes(p.category) &&
      (!slot.match || slot.match.test(p.name)) &&
      (!slot.not || !slot.not.test(p.name));
    if (!take(pool.find((p) => !used.has(p.key) && inGroup(p)))) {
      take(salt.find((p) => !used.has(p.key) && inGroup(p)));
    }
  }

  // Round two: widen with species-tagged items from kit slots still empty.
  for (const p of pool) {
    if (picked.length >= PER_SPECIES) break;
    if (!used.has(p.key) && !filledGroups.has(groupOf(p))) take(p);
  }

  // Round three: pad the tail with more of what this species is tagged for.
  for (const p of pool) {
    if (picked.length >= PER_SPECIES) break;
    take(p);
  }

  return picked.slice(0, PER_SPECIES).map((p) => p.key);
}

/** Card art, by store category. Purely decorative. */
const ART: Record<string, { gradient: string; icon: string }> = {
  "Surf Rods": { gradient: "linear-gradient(135deg,#0e3a5c,#155e88)", icon: "🎣" },
  "Rod & Reel Combos": { gradient: "linear-gradient(135deg,#0d4a4a,#137a6e)", icon: "🎣" },
  Reels: { gradient: "linear-gradient(135deg,#123a52,#1d6c86)", icon: "🌀" },
  "Line & Leader": { gradient: "linear-gradient(135deg,#233a5e,#3b5fa0)", icon: "🧵" },
  "Terminal Tackle": { gradient: "linear-gradient(135deg,#3a2e59,#5d4a8f)", icon: "🪝" },
  Lures: { gradient: "linear-gradient(135deg,#52340e,#8a5a1d)", icon: "⚓" },
  "Soft Baits": { gradient: "linear-gradient(135deg,#14532d,#1f7a45)", icon: "🐟" },
  "Nets & Landing": { gradient: "linear-gradient(135deg,#0f3d51,#177a91)", icon: "🥅" },
  Tools: { gradient: "linear-gradient(135deg,#334155,#516782)", icon: "🔧" },
  "Tackle Storage": { gradient: "linear-gradient(135deg,#3f2d3f,#6b4a66)", icon: "🎒" },
  Coolers: { gradient: "linear-gradient(135deg,#134e4a,#1a7a72)", icon: "🧊" },
  Lights: { gradient: "linear-gradient(135deg,#44403c,#6d655d)", icon: "🔦" },
  "Rod Holders": { gradient: "linear-gradient(135deg,#374151,#5b6472)", icon: "🏖️" },
};
const ART_FALLBACK = { gradient: "linear-gradient(135deg,#1e293b,#334155)", icon: "🎣" };

/**
 * The card copy: the product's own first sentence, from products.ts.
 *
 * Never write new marketing here. Anything invented in this file is a claim
 * the store's own product page does not make, which is how the last version
 * went wrong.
 */
function cardBlurb(p: Product): string {
  const sentences = p.blurb.split(/(?<=[.!?])\s+(?=[A-Z"“])/).map((s) => s.trim());
  // Two lines of clamp. One sentence usually fills them; "Built for people who
  // fish on foot." does not, so keep taking sentences until there's enough.
  let text = sentences[0] ?? p.tagline;
  for (let i = 1; i < sentences.length && text.length < 90; i++) {
    text += " " + sentences[i];
  }
  if (text.length <= 165) return text;
  const cut = text.slice(0, 164);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]$/, "") + "…";
}

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

// ── build ────────────────────────────────────────────────────────────────────
// Species lists first, so we know every product that needs an entry.
const BY_SPECIES: Record<string, string[]> = {};
for (const [slug, terms] of Object.entries(SPECIES_MAP)) {
  const keys = keysForSpecies(terms);
  if (keys.length > 0) BY_SPECIES[slug] = keys;
}

// PRODUCTS must contain everything anyone can ask for: the legacy request
// keys, plus every product a species list names. Legacy keys stay keyed by
// their legacy name and point at the real product; species keys are keyed by
// the real product key. getProducts() dedupes on the resolved key, so a page
// asking for both "inshore-combo" and "okuma-tundra-7" gets one card.
const REQUESTS: Record<string, string> = { ...RESOLVE };
for (const keys of Object.values(BY_SPECIES)) {
  for (const k of keys) if (!(k in REQUESTS)) REQUESTS[k] = k;
}

const entries: string[] = [];
const report: string[] = [];

for (const [legacy, real] of Object.entries(REQUESTS)) {
  const p = getProduct(real);
  if (!p) throw new Error(`RESOLVE["${legacy}"] -> "${real}" is not in the catalog.`);
  if (!isSourced(p)) {
    throw new Error(
      `RESOLVE["${legacy}"] -> "${real}" is UNSOURCED. USTideCharts must never ` +
        `recommend a product the store's own checkout refuses.`,
    );
  }
  const art = ART[p.category] ?? ART_FALLBACK;
  const quoted = /^[a-z][a-z0-9]*$/.test(legacy) ? legacy : `"${legacy}"`;
  entries.push(
    `  ${quoted}: {\n` +
      `    key: "${esc(p.key)}",\n` +
      `    name: "${esc(p.name)}",\n` +
      `    category: "${esc(p.category)}",\n` +
      `    price: ${p.price.toFixed(2)},\n` +
      `    blurb:\n      "${esc(cardBlurb(p))}",\n` +
      (p.image ? `    image: "${esc(p.image)}",\n` : "") +
      `    gradient: "${art.gradient}",\n` +
      `    icon: "${art.icon}",\n` +
      `  },`,
  );
  report.push(
    `  ${legacy.padEnd(15)} -> ${real === legacy ? "(same)".padEnd(24) : real.padEnd(24)} $${p.price.toFixed(2).padEnd(7)} ${p.name}`,
  );
}
for (const [legacy, why] of Object.entries(NO_EQUIVALENT)) {
  report.push(`  ${legacy.padEnd(15)} -> DROPPED — ${why}`);
}
report.push("");
report.push(`  BY_SPECIES: ${Object.keys(BY_SPECIES).length} species mapped, ${Object.keys(REQUESTS).length} products emitted`);
for (const [slug, keys] of Object.entries(BY_SPECIES)) {
  report.push(`    ${slug.padEnd(18)} ${keys.length} keys — ${keys.slice(0, 4).join(", ")}`);
}

const stamp = new Date().toISOString().slice(0, 10);
const out = `// ─────────────────────────────────────────────────────────────────────────────
// GENERATED FILE — DO NOT EDIT BY HAND.
//
// Source of truth: theanglerstore/src/lib/products.ts
// Regenerate:      npx tsx scripts/generate-gear.ts   (in the store repo)
// Verify:          npx tsx scripts/generate-gear.ts --check
//
// Every name, price and sentence below is copied from the product page the
// card links to, so the two can never disagree. An earlier hand-written
// version of this file drifted from the catalog and advertised prices and
// product names that did not exist — do not reintroduce that by editing here.
//
// Last generated ${stamp}.
// ─────────────────────────────────────────────────────────────────────────────

export interface Product {
  /** The store's product key. Resolves at theanglerstore.com/products/<key>. */
  key: string;
  name: string;
  category: string;
  price: number;
  blurb: string;
  /** Licensed supplier photography, served from the supplier's CDN. */
  image?: string;
  gradient: string; // card art fallback
  icon: string;
}

const STORE = "https://theanglerstore.com";

export function productUrl(p: Product): string {
  return \`\${STORE}/products/\${p.key}?utm_source=ustidecharts&utm_medium=gear-rec\`;
}

/**
 * Keyed by the *request* key used across locations.ts, species.ts,
 * species-fl.ts and articles.ts. Those keys are a contract and never change;
 * the product each one resolves to follows whatever the store stocks.
 */
export const PRODUCTS: Record<string, Product> = {
${entries.join("\n")}
};

/**
 * Requested keys the catalog has no honest answer for. They render nothing
 * rather than sending a reader to a product the store cannot ship.
 *
${Object.entries(NO_EQUIVALENT)
  .map(([k, why]) => ` * · ${k} — ${why}`)
  .join("\n")}
 */
export const UNAVAILABLE: readonly string[] = ${JSON.stringify(Object.keys(NO_EQUIVALENT))};

/**
 * Species slug -> product keys, ordered as a KIT: rod, line, terminal, lure,
 * then the rest. Derived from the store's own per-product species tagging, not
 * hand-picked here.
 *
 * A species absent from this map has nothing in the catalog tagged for it —
 * the eleven Florida species, plus white seabass and cabezon. Those fall back
 * to USTideCharts' own lists rather than being handed a NorCal surf rod and
 * told it was chosen for bonefish.
 */
export const BY_SPECIES: Record<string, string[]> = ${JSON.stringify(BY_SPECIES, null, 2)};

/** Relevant almost anywhere saltwater; tops a list back up when one drops out. */
const BACKFILL: readonly string[] = ${JSON.stringify(BACKFILL)};
const MIN_CARDS = ${MIN_CARDS};

export function getProducts(keys: string[]): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  const take = (k: string) => {
    const p = PRODUCTS[k];
    if (!p || seen.has(p.key)) return;
    seen.add(p.key);
    out.push(p);
  };
  for (const k of keys) take(k);
  // A page that asked for four and lost one to an unstocked category should
  // still look considered, so top it back up — but never past what was asked
  // for, and never with something we can't ship.
  for (const k of BACKFILL) {
    if (out.length >= Math.min(MIN_CARDS, keys.length)) break;
    take(k);
  }
  return out;
}
`;

// The two repos sit side by side on some machines and one level apart on
// others (Tides/ustidecharts vs Tides/anglerstore-live/theanglerstore), so
// probe rather than assume. Falls back to a local copy to hand-place.
const CANDIDATES = [
  "../../ustidecharts/src/lib/gear.ts",
  "../../../ustidecharts/src/lib/gear.ts",
  "../../../../ustidecharts/src/lib/gear.ts",
];
const fallback = resolve(HERE, "../gear.generated.ts");
const dest =
  CANDIDATES.map((c) => resolve(HERE, c)).find((p) => existsSync(dirname(p))) ?? fallback;

if (process.argv.includes("--check")) {
  const current = existsSync(dest) ? readFileSync(dest, "utf8") : "";
  // The date stamp is not drift.
  const strip = (s: string) => s.replace(/^\/\/ Last generated .*$/m, "");
  if (strip(current) !== strip(out)) {
    console.error(`DRIFT: ${dest} does not match the catalog. Run: npx tsx scripts/generate-gear.ts`);
    process.exit(1);
  }
  console.log(`OK: ${dest} matches the catalog.`);
} else {
  writeFileSync(dest, out);
  console.log(`Wrote ${dest}\n\n${report.join("\n")}\n`);
  if (dest === fallback) {
    console.log(
      "NOTE: ../../ustidecharts was not found, so this wrote a local copy.\n" +
        "      Copy it to ustidecharts/src/lib/gear.ts.",
    );
  }
}
