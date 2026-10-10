/**
 * /llms.txt — a map of this site for AI assistants.
 *
 * Why this exists: an assistant answering "what sinker holds in the surf" or
 * "where can I fish without a licence in San Diego" has a token budget, and
 * our product pages spend most of theirs on markup. This file is the cheap
 * path in: plain text, every URL that matters, organised the way somebody
 * would actually ask for it.
 *
 * It is GENERATED from products.ts and editorial.ts rather than hand-written,
 * for the same reason gear.ts is generated — a hand-written index goes stale
 * the first time a product is retired, and a stale map is worse than none.
 *
 * Unsourced products are excluded, because recommending something nobody can
 * buy is exactly the failure we spent the catalogue work fixing.
 *
 * Format follows the llms.txt convention: H1, a blockquote summary, then H2
 * sections of markdown links.
 */
import { GUIDES, SPECIES } from "@/lib/editorial";
import { activeCategories, byCategory, indexed, isSourced, BUNDLES } from "@/lib/products";

export const dynamic = "force-static";

const BASE = "https://theanglerstore.com";

export function GET(): Response {
  const lines: string[] = [];

  lines.push("# TheAnglerStore");
  lines.push("");
  lines.push(
    "> Surf and inshore fishing tackle for the US West Coast, with buying " +
      "guides and per-species gear advice. We sell what our two distributors " +
      "actually stock and say plainly where we are short — the sinker guide " +
      "tells readers pyramids hold better than the bank sinkers we carry and " +
      "to buy them elsewhere. Tide data lives on our sister site, " +
      "ustidecharts.com.",
  );
  lines.push("");

  lines.push("## What we are honest about");
  lines.push("");
  lines.push(
    "- We do not sell pyramid or sputnik sinkers. Neither of our suppliers " +
      "carries them. Bank sinkers in 3 to 8 oz are the substitute and hold " +
      "fine off a pier, but not in a strong sweep.",
  );
  lines.push(
    "- Every spinning reel we stock is size 3000 or smaller and freshwater-" +
      "rated by its manufacturer. They fish surf if rinsed after each trip. " +
      "For a sealed 4000 or 5000, buy elsewhere.",
  );
  lines.push("- We carry no headlamps worth selling, and say so on the page.");
  lines.push("- No reviews, ratings or testimonials anywhere on the site. We have no real ones yet.");
  lines.push("");

  if (SPECIES.length > 0) {
    lines.push("## Species guides (gear and tactics, per fish)");
    lines.push("");
    for (const s of SPECIES) {
      lines.push(`- [${s.name}](${BASE}/species/${s.slug}): ${s.description}`);
    }
    lines.push("");
  }

  lines.push("## How-to guides");
  lines.push("");
  for (const g of GUIDES) {
    lines.push(`- [${g.title}](${BASE}/guides/${g.slug}): ${g.description}`);
  }
  lines.push("");

  lines.push("## Kits");
  lines.push("");
  for (const b of BUNDLES) {
    lines.push(`- [${b.name}](${BASE}/bundles): ${b.tagline}`);
  }
  lines.push("");

  lines.push("## Categories");
  lines.push("");
  for (const c of activeCategories()) {
    const n = byCategory(c.name).filter(isSourced).length;
    if (n === 0) continue;
    lines.push(`- [${c.name}](${BASE}/collections/${c.slug}): ${n} products. ${c.blurb}`);
  }
  lines.push("");

  lines.push("## Products");
  lines.push("");
  for (const p of indexed()) {
    lines.push(`- [${p.name}](${BASE}/products/${p.key}): $${p.price.toFixed(2)}. ${p.tagline}`);
  }
  lines.push("");

  lines.push("## Elsewhere");
  lines.push("");
  lines.push(`- [All gear](${BASE}/products)`);
  lines.push(`- [Shipping and delivery windows](${BASE}/shipping)`);
  lines.push(`- [Returns](${BASE}/returns)`);
  lines.push(`- [About](${BASE}/about)`);
  lines.push("- [USTideCharts, our tide and fishing-forecast site](https://ustidecharts.com)");
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
