import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartToast } from "@/components/CartToast";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://theanglerstore.com"),
  title: {
    default: "TheAnglerStore — Surf & Inshore Fishing Tackle",
    template: "%s | TheAnglerStore",
  },
  description:
    "Surf and inshore fishing gear chosen by people who fish the same beaches you do. Rods, braid, rigs, lures, and the accessories that make a dawn session worth it.",
  openGraph: {
    siteName: "TheAnglerStore",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://theanglerstore.com/#org",
      name: "TheAnglerStore",
      url: "https://theanglerstore.com",
      description:
        "Surf and inshore fishing tackle for US anglers. Sister site to USTideCharts.",
      sameAs: ["https://ustidecharts.com"],
    },
    {
      "@type": "WebSite",
      "@id": "https://theanglerstore.com/#site",
      name: "TheAnglerStore",
      url: "https://theanglerstore.com",
      publisher: { "@id": "https://theanglerstore.com/#org" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://theanglerstore.com/products?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} store-bg flex min-h-screen flex-col antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartToast />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
