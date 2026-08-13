# SEO / AEO audit — implementation report

Audits: `TheAnglerStoreSEOAudit` + `theanglerstoreaeogeoaudit`, both 13 Aug 2026.
Implemented 13 Aug 2026. All numbers below are measured from the built HTML
(`.next/server/app/**`), not from source files.

---

## Before / after

| Measure | Before | After |
|---|---|---|
| `brand.name` on product schema | `TheAnglerStore` on 233/233 | real manufacturer on 238/238 |
| Products claiming us as manufacturer | 233 | **0** |
| `mpn` present | 0/233 | **233/238 (98%)** |
| `gtin` present | 0/233 | 0 — we hold no UPC/EAN (see open items) |
| `additionalProperty` (structured specs) | 0/233 | **217/238** |
| `priceValidUntil` | fabricated on 233/233 | absent |
| `shippingRate` | flat `12.95`, contradicting "free over $75" | `minValue 0 / maxValue 12.95`, or `0` where the product clears the threshold alone |
| Product links in `/products` server HTML | **0** | **233** |
| `/products` HTML size | 504 KB | 620 KB — **regression, see below** |
| Product titles containing `$` | 233 | 0 |
| Product title length | median 72, max 96 | **median 55, max 71** |
| Titles over 65 chars | 142 of 259 | 7 (long manufacturer model names) |
| Duplicate meta descriptions | 21 groups / 72 pages | **0** |
| `/collections/accessories` | 404 | 301 → `/products` |
| Unsourced products (5) | `index, follow` | `noindex, follow` — still resolve |
| `robots.txt` `Host:` | present | removed |
| Sitemap homepage `<loc>` | no trailing slash ≠ canonical | matches canonical |
| Organization schema fields | 5 | 13 (address, phone, email, founder, logo, contactPoint…) |
| `WebSite.SearchAction` | pointed at a non-functional URL | removed |
| Collection `ItemList` | position/name/url | + image, brand, price, availability |

Regression sweep across all 270 built pages: 0 pages without exactly one `<h1>`,
0 JSON-LD parse failures, 0 duplicate titles, 0 duplicate descriptions among
indexable pages, 0 missing canonicals among indexable pages. Nothing that was
correct became incorrect.

---

## Fixes, by task

**Task 1 — brand / GTIN / MPN.** `brandOf()` reads the Brand row from the
product's own visible spec table, so schema and page cannot diverge. 13
products had no Brand row at all; each got one, taken from the manufacturer
named in its own title. `mpnOf()` exposes the manufacturer part number already
held in `supplier.ts`. No GTIN: we hold no UPC/EAN for any product, and an
invented identifier is worse than a missing one because it matches something
that isn't this product.

**Task 3 — crawlable `/products`.** The card grid lives inside `ProductFinder`,
which reads `searchParams`; everything inside that Suspense boundary renders as
a skeleton in the server response. Added an "Every product" text index outside
the boundary: 233 links, every product one hop from the hub. Chose this over
paginating to 24 because pagination leaves page-6 products three hops away,
and this also makes the page's own `ItemList` schema true.

**Task 4 — redirects.** `/collections/accessories` → `/products` (its old
inventory now spans Tools, Tackle Storage and Lights — no single honest
destination). Also added `/collections/surf-fishing`, `/rods`, `/line`, `/nets`,
all of which 404'd. The five orphaned products are the `UNSOURCED` set: they
resolve, stay out of the sitemap, and are now `noindex, follow` — the URL
contract with USTideCharts holds, but we stop offering unbuyable pages to the
index.

**Task 5 — titles.** Price removed. Product pages opt out of the layout's
`| TheAnglerStore` suffix — that was 17 characters of brand on a page whose
brand is already the domain in the result.

**Task 6 — schema-to-content.** Shipping rate now expresses the real
threshold-dependent range. `priceValidUntil` removed. Organization filled in
from what `/contact` already publishes — nothing invented. `sameAs` →
`subOrganization` (sameAs means another profile of the *same* entity;
USTideCharts is a different site under the same owner). SearchAction removed.
`availability` was already bound to real sourcing state, not hardcoded.

**Task 7 — sitemap / robots.** Homepage `<loc>` now matches its canonical.
`Host:` removed.

**New: `src/lib/schema.test.ts`** — 11 assertions, run by `npm test`. Fails the
build if any product claims us as its manufacturer, if schema brand ever
diverges from the visible spec row, if "Ships in" leaks into product
attributes, if a title carries a price or two pages share a title or
description, or if any of the 14 USTideCharts keys stops resolving.

---

## Not done, and why

**`/products` payload got worse (504 → 620 KB).** The 233 text links cost
~116 KB; the existing 504 KB is the RSC payload for the 233-card client-rendered
grid, which my index now duplicates. Removing that grid would fix both, but it
changes what the page looks like — your call, not mine.

**Per-URL `lastmod`.** No honest source exists. The catalogue is one hand-edited
file, so there is no per-product change date to emit. Fixing this means adding
an `updated` field to the product data and maintaining it.

**Task 2 — slug registry. I think this finding is wrong.** It says generic slugs
"are being reassigned to different products over time" and asks for a
write-once slug registry. There is no ingestion pipeline — the catalogue is
hand-maintained in `products.ts`. What the auditor saw in Google's index is
placeholder products being deliberately replaced by real ones under the same
key, because those 14 keys are a contract with USTideCharts and cannot change.
Building a registry would be machinery for a pipeline that doesn't exist. The
schema test now guards the thing that actually matters: the 14 keys resolving.

**Tasks 8–14** (internal linking, images/CWV, mobile audit, variant
consolidation, subcategories, content templates, heading copy) — not started.
Several need decisions from you; see below.

---

## Needs your decision

1. **`/products` card grid** — remove the duplicated 233-card grid now that
   every product has a text link? Fixes the payload regression and then some.
2. **UPC from CWR** — their export has a UPC column we never imported. Importing
   it is the only route to `gtin13`. Worth a pass?
3. **7 long product names** (66–71 chars) — leave as the manufacturer writes
   them, or shorten for the SERP? I'd leave them.
4. **Colour-variant consolidation** (~20 Luhr-Jensen flashers etc.) — the audit
   wants one page with a colour selector. That's a real UX change.
5. **Footer vs. two-row homepage** for the 7 starved collections.
6. **Free-shipping threshold** — code says $75; Google's index still shows $49.
   Confirm $75 is current.
