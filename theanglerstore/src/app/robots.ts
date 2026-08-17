import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /*
         * ONLY what must never be FETCHED. Not "everything we don't want
         * indexed" — those are different jobs, and confusing them is what put
         * "Blocked by robots.txt" in Search Console.
         *
         * /cart and /checkout used to be listed here as well. Both already
         * carry <meta name="robots" content="noindex">, which is the correct
         * way to keep a page out of the index, and the Disallow was actively
         * stopping it from working: a crawler that is not allowed to fetch a
         * page never sees the noindex on it. Google is explicit about this —
         * a blocked URL can still be indexed URL-only, with no title and no
         * snippet, if something links to it. Every page on this site links to
         * /cart from the header, so it was as linked as a URL can get.
         *
         * The two left are genuinely fetch-blocked rather than merely
         * unindexed: /api/ returns JSON that has nowhere to put a meta tag,
         * and /admin sits behind auth. Both ALSO send noindex, because a
         * robots.txt is a public list of the paths you would rather nobody
         * looked at, and should never be the only lock on the door.
         */
        disallow: ["/api/", "/admin"],
      },
    ],
    sitemap: "https://theanglerstore.com/sitemap.xml",
    // `host:` removed — a Yandex directive Google has never supported, and
    // Yandex itself deprecated it. Canonical tags already do this job.
  };
}
