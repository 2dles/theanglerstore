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
    default: "TheAnglerStore. Surf & Inshore Fishing Tackle",
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
      // Every value below is already published on /contact and in the footer.
      // Nothing here is invented, and nothing here is more than the visible
      // pages say. It was all missing from schema, which meant the most
      // verifiable thing about this business — a named human, a real address
      // and a state seller's permit — was invisible to anything reading the
      // markup. That is more identity than most competitors publish.
      "@type": ["Organization", "OnlineStore"],
      "@id": "https://theanglerstore.com/#org",
      name: "TheAnglerStore",
      url: "https://theanglerstore.com",
      logo: "https://theanglerstore.com/icon.svg",
      description:
        "Surf and inshore fishing tackle for US anglers. Sister site to USTideCharts.",
      email: "help@theanglerstore.com",
      telephone: "+1-707-508-7118",
      founder: { "@type": "Person", name: "Augustus Muse" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sebastopol",
        addressRegion: "CA",
        addressCountry: "US",
      },
      areaServed: { "@type": "Country", name: "United States" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "help@theanglerstore.com",
          telephone: "+1-707-508-7118",
          areaServed: "US",
          availableLanguage: "English",
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "gear@theanglerstore.com",
          areaServed: "US",
          availableLanguage: "English",
        },
      ],
      // sameAs used to point at ustidecharts.com. sameAs means "another
      // profile of this same entity" — a Twitter account, a Wikidata item.
      // USTideCharts is a different site under the same owner, which is what
      // this actually says. It goes back to sameAs the day social or
      // directory profiles exist for TheAnglerStore itself.
      subOrganization: {
        "@type": "Organization",
        name: "USTideCharts",
        url: "https://ustidecharts.com",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://theanglerstore.com/#site",
      name: "TheAnglerStore",
      url: "https://theanglerstore.com",
      publisher: { "@id": "https://theanglerstore.com/#org" },
      // SearchAction removed. It advertised
      // /products?q={search_term_string}, but search here is client-side —
      // that URL returns the full unfiltered catalogue server-side, so the
      // markup was promising an endpoint that does not exist. It goes back
      // in the day /products?q= filters on the server (that result page must
      // then be noindex, follow and canonical to /products).
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
