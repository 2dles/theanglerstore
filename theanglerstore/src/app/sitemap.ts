import type { MetadataRoute } from "next";
import { activeCategories, indexed } from "@/lib/products";
import { GUIDES, SPECIES } from "@/lib/editorial";

const BASE = "https://theanglerstore.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    // Trailing slash on purpose: the homepage canonical is
    // https://theanglerstore.com/ and a <loc> that differs from the canonical
    // by even a slash is a URL the sitemap is asking Google not to index.
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/shipping`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/returns`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const collections: MetadataRoute.Sitemap = activeCategories().map((c) => ({
    url: `${BASE}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Only sourced products are submitted for discovery. The unsourced keys
  // still resolve for inbound USTideCharts links, but we do not ask Google to
  // index a page nobody can buy from.
  // indexed(), not listed(): colour-only variants canonicalise onto the
  // cheapest colour in their family, so submitting all twenty flashers would
  // be asking Google to index nineteen pages we have told it to ignore.
  const products: MetadataRoute.Sitemap = indexed().map((p) => ({
    url: `${BASE}/products/${p.key}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Editorial pages, and their index pages, only once something is published.
  // Both arrays are empty today, so none of this appears — an index of nothing
  // in the sitemap is a thin page we asked Google to come and look at.
  const guides: MetadataRoute.Sitemap = GUIDES.length
    ? [
        { url: `${BASE}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
        ...GUIDES.map((g) => ({
          url: `${BASE}/guides/${g.slug}`,
          lastModified: new Date(`${g.updated ?? g.published}T00:00:00Z`),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ]
    : [];

  const species: MetadataRoute.Sitemap = SPECIES.length
    ? [
        { url: `${BASE}/species`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
        ...SPECIES.map((s) => ({
          url: `${BASE}/species/${s.slug}`,
          lastModified: new Date(`${s.updated ?? s.published}T00:00:00Z`),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ]
    : [];

  return [...statics, ...collections, ...guides, ...species, ...products];
}
