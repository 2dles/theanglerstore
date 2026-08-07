import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import {
  REDIRECTS,
  allKeys,
  formatPrice,
  getProduct,
  related,
} from "@/lib/products";
import { withParams } from "@/lib/attribution";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { AddToCart } from "@/components/AddToCart";
import { TidePromo } from "@/components/TidePromo";
import { Walkthrough } from "@/components/Walkthrough";
import { getWalkthrough } from "@/lib/walkthroughs";
import { FREE_SHIPPING_OVER } from "@/lib/stripe";

/**
 * THE URL CONTRACT.
 *
 * USTideCharts links here as:
 *   /products/<key>?utm_source=ustidecharts&utm_medium=gear-rec|nav|footer|home|location
 *
 * Every key in the catalog must resolve. Retired keys 301 via REDIRECTS with
 * their utm params preserved, so attribution survives the redirect.
 */

type Params = { key: string };
type Search = Record<string, string | string[] | undefined>;

export function generateStaticParams(): Params[] {
  return allKeys().map((key) => ({ key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { key } = await params;
  const product = getProduct(key);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${formatPrice(product.price)}`,
    description: product.blurb.slice(0, 158),
    alternates: { canonical: `/products/${product.key}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      url: `/products/${product.key}`,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { key } = await params;

  const target = REDIRECTS[key];
  if (target) {
    const sp = await searchParams;
    const usp = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) {
      if (typeof v === "string") usp.set(k, v);
    }
    permanentRedirect(withParams(target, usp));
  }

  const product = getProduct(key);
  if (!product) notFound();

  const alsoBuy = related(product);
  const walkthrough = getWalkthrough(product.key);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.blurb,
    category: product.category,
    sku: product.key,
    brand: { "@type": "Brand", name: "TheAnglerStore" },
    offers: {
      "@type": "Offer",
      url: `https://theanglerstore.com/products/${product.key}`,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      seller: { "@id": "https://theanglerstore.com/#org" },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://theanglerstore.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category,
        item: `https://theanglerstore.com/products`,
      },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  const howToLd = walkthrough
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to fish the ${product.name}`,
        description: walkthrough.intro,
        step: walkthrough.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.heading,
          text: s.body,
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            [jsonLd, breadcrumbLd, howToLd].filter(Boolean),
          ),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-faint">
          <Link href="/" className="hover:text-tide">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-tide">
            All gear
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink-dim">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* ---- art ---- */}
          <div>
            <div className="card overflow-hidden">
              <ProductArt product={product} priority className="aspect-[4/3] w-full" />
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              Product photography arrives with our next supplier shipment.
            </p>
          </div>

          {/* ---- buy box ---- */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.6875rem] uppercase tracking-wider text-ink-faint">
                {product.category}
              </span>
              {product.badge && <span className="badge">{product.badge}</span>}
            </div>

            <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-teal">{product.tagline}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="tnum text-3xl font-semibold">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && (
                <>
                  <span className="tnum text-lg text-ink-faint line-through">
                    {formatPrice(product.compareAt)}
                  </span>
                  <span className="badge">
                    Save {Math.round((1 - product.price / product.compareAt) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-2 text-sm text-ink-faint">
              {product.price >= FREE_SHIPPING_OVER
                ? "Ships free"
                : `Free shipping over $${FREE_SHIPPING_OVER}`}
              {" · ships in "}
              {product.shipsIn}
            </p>

            {product.role === "add-on" && (
              <p className="mt-3 rounded-xl border border-line bg-card/60 p-3 text-sm leading-relaxed text-ink-dim">
                <strong className="text-ink">Best bought alongside something else.</strong>{" "}
                Small, light items like this cost nearly as much to ship as they
                do to make. Add it to a rod or lure order and it rides along in
                the same box — which is why the free-shipping threshold is
                ${FREE_SHIPPING_OVER}.
              </p>
            )}

            <p className="mt-6 leading-relaxed text-ink-dim">{product.blurb}</p>

            <div className="mt-7">
              <AddToCart productKey={product.key} />
            </div>

            <div className="card mt-7 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
                Why this one
              </h2>
              <ul className="mt-3 space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-ink-dim">
                    <span className="mt-0.5 shrink-0 text-teal">▸</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card mt-4 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
                Specs
              </h2>
              <dl className="mt-3 divide-y divide-[rgba(148,197,255,.08)]">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-6 py-2 text-sm">
                    <dt className="text-ink-faint">{s.label}</dt>
                    <dd className="tnum text-right text-ink-dim">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card mt-4 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
                When to fish it
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {product.whenToUse}
              </p>
              <a
                href={`https://ustidecharts.com?utm_source=theanglerstore&utm_medium=location`}
                className="mt-3 inline-block text-sm text-tide hover:text-teal"
              >
                Find the right tide window near you ↗
              </a>
            </div>
          </div>
        </div>

        {alsoBuy.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">Pairs with</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {alsoBuy.map((p) => (
                <ProductCard key={p.key} product={p} />
              ))}
            </div>
          </section>
        )}

        {walkthrough && (
          <Walkthrough product={product} walkthrough={walkthrough} />
        )}

        <TidePromo product={product} />
      </div>
    </>
  );
}
