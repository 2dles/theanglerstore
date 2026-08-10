import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
