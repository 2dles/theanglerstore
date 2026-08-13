import type { MetadataRoute } from "next";
import { activeCategories, listed } from "@/lib/products";

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
  const products: MetadataRoute.Sitemap = listed().map((p) => ({
    url: `${BASE}/products/${p.key}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...statics, ...collections, ...products];
}
