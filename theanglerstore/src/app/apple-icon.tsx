import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. Generated at build so there's no binary to keep in
 * sync with the brand — same hook-and-swell mark as icon.svg and the header.
 * iOS ignores transparency and squares the corners itself, hence the solid fill.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#082036 0%,#04101d 100%)",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32">
          <defs>
            <linearGradient id="ai" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
          </defs>
          <path
            d="M6 16 c 5 -7.5 14.5 -7.5 19.5 0 c -5 7.5 -14.5 7.5 -19.5 0 z"
            fill="url(#ai)"
          />
          <path d="M25.5 16 l4.2 -4.4 v8.8 z" fill="url(#ai)" />
          <circle cx="11.6" cy="14.4" r="1.5" fill="#04101d" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
