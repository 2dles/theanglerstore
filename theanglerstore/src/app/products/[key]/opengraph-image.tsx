import { ImageResponse } from "next/og";
import { allKeys, getProduct } from "@/lib/products";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TheAnglerStore product";

export function generateStaticParams() {
  return allKeys().map((key) => ({ key }));
}

/**
 * Per-product OG card, generated at build time from the catalog.
 *
 * This doubles as the product image URL that USTideCharts references in
 * gear.ts — until supplier photography exists, this is a real, stable,
 * branded image URL for every one of the 14 keys.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const product = getProduct(key);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#04101d",
            color: "#e9f2fb",
            fontSize: 48,
          }}
        >
          TheAnglerStore
        </div>
      ),
      { ...size },
    );
  }

  const [a, b] = product.gradient;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#04101d",
        }}
      >
        {/* left: copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "62%",
            padding: "64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 11,
                background: "linear-gradient(135deg,#38bdf8,#2dd4bf)",
                display: "flex",
              }}
            />
            <div style={{ display: "flex", fontSize: 26, fontWeight: 600 }}>
              <span style={{ color: "#e9f2fb" }}>The</span>
              <span style={{ color: "#38bdf8" }}>Angler</span>
              <span style={{ color: "#e9f2fb" }}>Store</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: "0.1em",
                color: "#647f9b",
                textTransform: "uppercase",
              }}
            >
              {product.category}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 16,
                fontSize: product.name.length > 34 ? 52 : 62,
                fontWeight: 700,
                color: "#e9f2fb",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: 28,
                color: "#2dd4bf",
              }}
            >
              {product.tagline}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 700,
                color: "#e9f2fb",
              }}
            >
              ${product.price.toFixed(2)}
            </div>
            {product.compareAt ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 30,
                  color: "#647f9b",
                  textDecoration: "line-through",
                }}
              >
                ${product.compareAt.toFixed(2)}
              </div>
            ) : null}
          </div>
        </div>

        {/* right: product colour block */}
        <div
          style={{
            display: "flex",
            width: "38%",
            background: `linear-gradient(135deg, ${a}, ${b})`,
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(233,242,251,0.75)",
              textAlign: "center",
            }}
          >
            theanglerstore.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
