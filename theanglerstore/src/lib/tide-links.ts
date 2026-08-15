import type { Product } from "@/lib/products";
import { waterOf } from "@/lib/products";

/**
 * WHERE A TIDE LINK SHOULD ACTUALLY GO.
 *
 * Every one of the ~714 links from this site to USTideCharts pointed at the
 * bare root domain. USTideCharts has 775 location pages, three guides and a
 * water-temperature index, and none of them were ever linked. A reader who
 * clicked "find the right tide window" from a surf rod page landed on a
 * homepage and had to start their search over — and the two properties got
 * none of the topical connection that makes cross-linking worth anything.
 *
 * Only routes verified to exist in the USTideCharts app are used here:
 *   /                    home
 *   /locations           every station, searchable
 *   /california          state index (also /florida)
 *   /guides/<slug>       three published guides
 *   /water-temps         water temperature index
 *
 * Nothing here invents a URL. When there is no better answer than the root,
 * the root is what it returns.
 */
const SITE = "https://ustidecharts.com";

/** Guides that exist. Adding one here without adding it there is a broken link. */
const GUIDES = {
  tides: "how-tides-affect-fishing",
  reading: "how-to-read-tide-charts",
  moon: "best-moon-phase-for-fishing",
} as const;

function url(path: string, medium: string, content?: string): string {
  const q = new URLSearchParams({ utm_source: "theanglerstore", utm_medium: medium });
  if (content) q.set("utm_content", content);
  return `${SITE}${path}?${q}`;
}

/**
 * The contextual link on a product page.
 *
 * Saltwater gear goes to California — this is a Sonoma County business whose
 * customers fish this coast, and the state index is a real page listing real
 * stations. Freshwater gear gets no tide link at all: tides do not move a
 * lake, and pretending otherwise reads as template automation.
 */
export function tideLinkFor(product: Product): { href: string; label: string } | null {
  if (waterOf(product) === "fresh") return null;

  // Rods and terminal tackle are bought for a session that has to be timed.
  // Line, tools and storage are not — those get the guide instead, which is
  // the more honest match for "here is something worth reading".
  const timingMatters =
    product.category === "Surf Rods" ||
    product.category === "Terminal Tackle" ||
    product.category === "Lures" ||
    product.category === "Soft Baits";

  return timingMatters
    ? {
        href: url("/california", "location", product.key),
        label: "Check the tide window on your beach ↗",
      }
    : {
        href: url(`/guides/${GUIDES.tides}`, "guide", product.key),
        label: "Why moving water catches fish ↗",
      };
}

/** The nav link. Straight to the thing people came for. */
export const TIDE_NAV = url("/locations", "nav");

/** The footer link. */
export const TIDE_FOOTER = url("/locations", "footer");

/** The homepage link. */
export const TIDE_HOME = url("/california", "home");
