import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "TheAnglerStore — Surf & Inshore Fishing Tackle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide OG card. Rendered at build time with no network access — every
 * colour and shape is inline, and we use the default sans stack rather than
 * fetching a webfont (Google Fonts is unreachable at build in our sandbox).
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #071a2e 0%, #04101d 55%, #0a2036 100%)",
          position: "relative",
        }}
      >
        {/* ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "rgba(45,212,191,0.16)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "rgba(56,189,248,0.14)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="ogm" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
              <path d="M4 16 c 5 -7.5 14.5 -7.5 19.5 0 c -5 7.5 -14.5 7.5 -19.5 0 z" fill="url(#ogm)" />
              <path d="M23.5 16 l4.6 -4.8 v9.6 z" fill="url(#ogm)" />
            </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600 }}>
            <span style={{ color: "#e9f2fb" }}>The</span>
            <span style={{ color: "#38bdf8" }}>Angler</span>
            <span style={{ color: "#e9f2fb" }}>Store</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              color: "#e9f2fb",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Gear for the tide
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              color: "#2dd4bf",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            you&rsquo;re about to fish
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              color: "#9db8d2",
            }}
          >
            Surf &amp; inshore tackle · Free US shipping over $49
          </div>
        </div>

        {/* swell */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 4,
              borderRadius: 4,
              background: "linear-gradient(90deg,#38bdf8,#2dd4bf)",
            }}
          />
          <div style={{ display: "flex", fontSize: 24, color: "#647f9b" }}>
            theanglerstore.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
