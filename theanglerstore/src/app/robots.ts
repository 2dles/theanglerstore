import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Cart and checkout carry no crawlable value and can generate
        // near-infinite parameterised URLs. Keep them out of the index.
        disallow: ["/cart", "/checkout/", "/api/"],
      },
    ],
    sitemap: "https://theanglerstore.com/sitemap.xml",
    host: "https://theanglerstore.com",
  };
}
