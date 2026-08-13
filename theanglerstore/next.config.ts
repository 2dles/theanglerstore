import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Guessable URLs that used to 404.
   *
   * Every category lives at /collections/<slug>, so /collections/all is the
   * pattern a customer (or an external link) will invent for "everything".
   * It cost us a dead end for nothing.
   */
  async redirects() {
    return [
      { source: "/collections/all", destination: "/products", permanent: true },
      { source: "/collections/rods-combos", destination: "/collections/combos", permanent: true },
      /**
       * /collections/accessories was 404ing while still serving as the
       * breadcrumb on indexed product results in Google — a dead end reached
       * from a live search listing.
       *
       * There is no honest single destination: what used to sit under
       * Accessories is now split across Tools, Tackle Storage and Lights.
       * Picking one would send two thirds of the traffic to the wrong shelf,
       * so it goes to the full catalogue, which contains all three.
       */
      { source: "/collections/accessories", destination: "/products", permanent: true },
      // Common guesses that currently 404. Cheap to answer, and each one is
      // a real query: "surf fishing" is the store's whole positioning and had
      // no landing page at all.
      { source: "/collections/surf-fishing", destination: "/collections/surf-rods", permanent: true },
      { source: "/collections/rods", destination: "/collections/surf-rods", permanent: true },
      { source: "/collections/line", destination: "/collections/line-leader", permanent: true },
      { source: "/collections/nets", destination: "/collections/nets-landing", permanent: true },
    ];
  },
  images: {
    /**
     * CWR's product image server. We are an approved CWR dealer and their
     * dealer program provides this imagery for use on dealer storefronts —
     * that licence is what makes this acceptable, and it is the reason we
     * would still never do this with a supplier we don't hold an account
     * with. See IMAGES.md.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "productimageserver.com",
        pathname: "/product/**",
      },
      /**
       * Burch Fishing Tackle's storefront CDN.
       *
       * Same basis as CWR: we hold a dealer account with them, and this is the
       * manufacturer photography they publish for the products they sell us.
       * Narrowed to their own Shopify store path so this cannot become a
       * general licence to hotlink any Shopify site.
       *
       * NOT yet confirmed in writing — Leslie has been asked. If Burch say no,
       * delete this block and the `image:` field on the 40 Burch products;
       * they fall back to our own illustrations with no other change.
       */
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/1/0033/5442/7456/**",
      },
    ],
  },
};

export default nextConfig;
