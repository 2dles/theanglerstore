/**
 * STRUCTURED-DATA TESTS.
 *
 * Run with:  npx tsx src/lib/schema.test.ts
 *
 * These exist because the schema on 233 product pages contradicted the pages
 * themselves: brand.name said "TheAnglerStore" while the spec table two
 * inches below said Sufix. Schema that disagrees with the visible page is a
 * stated Google structured-data violation, and it made every listing here
 * impossible to match against the same product at any other merchant.
 *
 * The rule these encode: never assert in markup anything the page does not
 * show, and never invent an identifier.
 */
import {
  PRODUCTS,
  UNSOURCED,
  brandOf,
  listed,
  metaDescription,
  structuredSpecs,
  CATEGORIES,
} from "@/lib/products";
import { GUIDES, SPECIES, validateEditorial } from "@/lib/editorial";

let failures = 0;

function check(name: string, ok: boolean, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok || !detail ? "" : `\n        ${detail}`}`);
}

// ── brand ──────────────────────────────────────────────────────────────────
const noBrand = PRODUCTS.filter((p) => !brandOf(p));
check(
  "every product has a visible Brand spec",
  noBrand.length === 0,
  noBrand.map((p) => p.key).join(", "),
);

const selfBranded = PRODUCTS.filter(
  (p) => (brandOf(p) ?? "").toLowerCase() === "theanglerstore",
);
check(
  'no product claims "TheAnglerStore" as its manufacturer',
  selfBranded.length === 0,
  selfBranded.map((p) => p.key).join(", "),
);

// The schema brand IS the visible row — brandOf reads the spec table — so
// this asserts the invariant that keeps them from ever diverging again.
const mismatched = PRODUCTS.filter((p) => {
  const visible = p.specs.find((s) => s.label.toLowerCase() === "brand")?.value;
  return brandOf(p) !== visible;
});
check(
  "schema brand equals the brand rendered in the spec table",
  mismatched.length === 0,
  mismatched.map((p) => p.key).join(", "),
);

// ── additionalProperty ─────────────────────────────────────────────────────
const leaksShipping = PRODUCTS.filter((p) =>
  structuredSpecs(p).some((s) => s.label.toLowerCase() === "ships in"),
);
check(
  '"Ships in" is not emitted as a product attribute',
  leaksShipping.length === 0,
  leaksShipping.map((p) => p.key).join(", "),
);

const emptyAttr = PRODUCTS.filter((p) =>
  structuredSpecs(p).some((s) => !s.label.trim() || !s.value.trim()),
);
check(
  "no attribute has an empty name or value",
  emptyAttr.length === 0,
  emptyAttr.map((p) => p.key).join(", "),
);

// ── titles ─────────────────────────────────────────────────────────────────
// The template is `{name} | {category}` when that fits inside what Google
// will display whole, otherwise `{name}`. Price is deliberately absent: it
// went stale the moment a price moved, and Google was stripping it anyway.
//
// This must model the RENDERED title, suffix and all. The first version of
// this test didn't, passed cleanly, and the built HTML still shipped 94-char
// titles — the root layout's " | TheAnglerStore" template was appended after
// the check ran. Product pages now opt out of that template with `absolute`,
// so what this computes is what ships. If that ever changes, change it here
// too or the test is theatre.
const titleOf = (name: string, category: string) => {
  const withCat = `${name} | ${category}`;
  return withCat.length <= 62 ? withCat : name;
};
// Hard failure only where the TEMPLATE pushed a title over the line — that
// is ours to fix. Seven product names are themselves 66-71 characters, and
// truncating a manufacturer's own model name to hit a SERP pixel target
// would make the page less accurate to save nothing. Those are reported, not
// failed, so they stay visible without crying wolf.
const templateOverflow = PRODUCTS.filter((p) => {
  const t = titleOf(p.name, p.category);
  return t !== p.name && t.length > 65;
});
check(
  "the title template never pushes a title over 65 characters",
  templateOverflow.length === 0,
  templateOverflow.map((p) => `${p.key} (${titleOf(p.name, p.category).length})`).join(", "),
);

const longNames = PRODUCTS.filter((p) => p.name.length > 65);
if (longNames.length) {
  console.log(
    `NOTE  ${longNames.length} product names exceed 65 chars on their own; ` +
      `Google will truncate the display.\n        ` +
      longNames.map((p) => `${p.key} (${p.name.length})`).join(", "),
  );
}

const pricedTitles = PRODUCTS.filter((p) => titleOf(p.name, p.category).includes("$"));
check("no product title contains a price", pricedTitles.length === 0);

// ── uniqueness ─────────────────────────────────────────────────────────────
function dupes(values: string[]): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const v of values) (seen.has(v) ? dup : seen).add(v);
  return [...dup];
}

const dupTitles = dupes(PRODUCTS.map((p) => titleOf(p.name, p.category)));
check("no two products share a title", dupTitles.length === 0, dupTitles.join(" | "));

// Meta description is blurb.slice(0, 158). Colour variants of the same lure
// share an opening paragraph, which is how 21 groups ended up identical.
const dupDesc = dupes(PRODUCTS.map((p) => metaDescription(p)));
check(
  "no two products share a meta description",
  dupDesc.length === 0,
  `${dupDesc.length} duplicate group(s); first: ${dupDesc[0]?.slice(0, 90) ?? ""}…`,
);

// ── the URL contract ───────────────────────────────────────────────────────
// USTideCharts links to these keys. They must resolve forever, whether or not
// anyone can buy them.
const CONTRACT = [
  "surf-rod", "inshore-combo", "braided-line", "fluoro-leader", "circle-hooks",
  "carolina-kit", "swimbait-kit", "jig-assort", "landing-net", "sand-spike",
  "pliers", "tackle-bag", "cooler", "headlamp",
];
const keys = new Set(PRODUCTS.map((p) => p.key));
const broken = CONTRACT.filter((k) => !keys.has(k));
check("all 14 USTideCharts keys still resolve", broken.length === 0, broken.join(", "));

// A page nobody can buy from stays reachable but is not offered to the index,
// and is not in the sitemap. These two must agree.
const listedKeys = new Set(listed().map((p) => p.key));
const indexedButUnbuyable = [...UNSOURCED].filter((k) => listedKeys.has(k));
check(
  "unsourced products are excluded from the sitemap",
  indexedButUnbuyable.length === 0,
  indexedButUnbuyable.join(", "),
);

// ── editorial ──────────────────────────────────────────────────────────────
// Empty today. These checks exist so the first guide written can't quietly
// reference a product that has since been retired — which is exactly how
// USTideCharts ended up advertising gear that did not exist.
const editorialProblems = validateEditorial();
check(
  "every guide and species reference resolves to a real, sourced product",
  editorialProblems.length === 0,
  editorialProblems.join("\n        "),
);
console.log(`NOTE  editorial: ${GUIDES.length} guide(s), ${SPECIES.length} species page(s) published.`);

// ── categories ─────────────────────────────────────────────────────────────
const slugs = CATEGORIES.map((c) => c.slug);
check("no duplicate collection slugs", dupes(slugs).length === 0, dupes(slugs).join(", "));

console.log(
  failures === 0 ? "\nAll schema tests passed." : `\n${failures} FAILED`,
);
if (failures > 0) process.exit(1);
