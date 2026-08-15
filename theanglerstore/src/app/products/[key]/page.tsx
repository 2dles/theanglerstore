import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import {
  REDIRECTS,
  allKeys,
  formatPrice,
  getProduct,
  isSourced,
  brandOf,
  bundlePrice,
  bundlesContaining,
  colorCanonical,
  metaDescription,
  structuredSpecs,
  related,
  siblings,
  variantLabel,
  walkthroughHeading,
  waterOf,
  CATEGORIES,
  FISHABLE,
} from "@/lib/products";
import { withParams } from "@/lib/attribution";
import {
  productImages,
  returnPolicy,
  shippingDetails,
} from "@/lib/product-schema";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { AddToCart } from "@/components/AddToCart";
import { Walkthrough } from "@/components/Walkthrough";
import { getWalkthrough } from "@/lib/walkthroughs";
// Server component. supplier.ts is marked `server-only`, so this import can
// never follow a client boundary and leak dealer cost into a JS chunk.
import { mpnOf, upcOf } from "@/lib/supplier";
import { tideLinkFor } from "@/lib/tide-links";
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

  // The price used to live in the title. Google was already stripping it —
  // the SERP showed "Foxelli MX200 Rechargeable Headlamp - TheAnglerStore"
  // with the "— $37.99" gone — so it bought nothing and cost characters, and
  // a title that goes stale the moment a price moves is a liability. Price
  // reaches the SERP through Offer schema, which is where it belongs.
  //
  // product.name is already {Brand} {Model} — {Key spec}; the category suffix
  // is added only when there's room inside a title Google will show whole.
  //
  // `absolute` on purpose: the root layout appends " | TheAnglerStore" to
  // every title, which is 17 characters of brand on a page whose brand is
  // already the domain in the result. With the suffix, these titles ran
  // 68-94 characters and Google rewrote them anyway. The product name is
  // what a searcher matched on — spend the space on that.
  const withCategory = `${product.name} | ${product.category}`;
  const title = withCategory.length <= 62 ? withCategory : product.name;

  return {
    title: { absolute: title },
    description: metaDescription(product),
    // Colour-only variants point at the cheapest colour in their family.
    // Twenty near-identical flasher pages were competing with each other for
    // the same query; now one of them can win it.
    alternates: { canonical: `/products/${colorCanonical(product).key}` },
    // A page nobody can buy from should resolve — USTideCharts links to five
    // of them and those links are attribution we can't get back — but it
    // should not be offered to the index as a product. It stays out of the
    // sitemap for the same reason; this makes the two agree.
    ...(isSourced(product) ? {} : { robots: { index: false, follow: true } }),
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
  const family = siblings(product);
  const kits = bundlesContaining(product.key);
  const cat = CATEGORIES.find((c) => c.name === product.category);
  const water = waterOf(product);
  const walkthrough = getWalkthrough(product.key);
  const sourced = isSourced(product);
  const tideLink = tideLinkFor(product);

  // NOTE: no aggregateRating / review here, deliberately. Search Console asks
  // for them, but we have never taken an order — inventing ratings would be
  // fabricated review content. They go in when real customers write them.
  // We are the seller; Sufix, Rapala and Luhr-Jensen are the brands. Emitting
  // ourselves as the brand contradicted the spec table on the same page and
  // made every listing unmatchable against the same product at any other
  // merchant. brandOf() reads the visible row, so they cannot diverge.
  const brand = brandOf(product);
  const mpn = mpnOf(product.key);
  const gtin12 = upcOf(product.key);
  const attributes = structuredSpecs(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.blurb,
    category: product.category,
    sku: product.key,
    image: productImages(product),
    ...(brand ? { brand: { "@type": "Brand", name: brand } } : {}),
    // Our sku is the URL slug, which means nothing off this domain. The MPN
    // and the UPC are what let a shopping surface recognise this listing as
    // the same product another merchant sells. Both omitted where we don't
    // hold one — Burch publish no UPCs, so their items carry mpn only, and an
    // invented identifier would resolve to somebody else's product.
    ...(mpn ? { mpn } : {}),
    ...(gtin12 ? { gtin12 } : {}),
    // Every spec the page shows, machine-readable. Was human-readable only:
    // the Daiwa Laguna page displays nine useful specs and the schema
    // described none of them.
    ...(attributes.length
      ? {
          additionalProperty: attributes.map((s) => ({
            "@type": "PropertyValue",
            name: s.label,
            value: s.value,
          })),
        }
      : {}),
    offers: {
      "@type": "Offer",
      url: `https://theanglerstore.com/products/${product.key}`,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      // priceValidUntil deliberately absent. It was hardcoded to next
      // December on all 233 products — a date we invented, describing a
      // commitment we never made. A missing field is better than a false one.
      itemCondition: "https://schema.org/NewCondition",
      availability: sourced
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@id": "https://theanglerstore.com/#org" },
      shippingDetails: shippingDetails(product),
      hasMerchantReturnPolicy: returnPolicy(),
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
        name: "All gear",
        item: "https://theanglerstore.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `https://theanglerstore.com/collections/${cat?.slug ?? ""}`,
      },
      { "@type": "ListItem", position: 4, name: product.name },
    ],
  };

  const howToLd = walkthrough
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: walkthroughHeading(product),
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
          {cat && (
            <>
              <Link
                href={`/collections/${cat.slug}`}
                className="hover:text-tide"
              >
                {cat.name}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-ink-dim">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* ---- art ---- */}
          <div>
            <div className="card overflow-hidden">
              <ProductArt product={product} priority className="aspect-[4/3] w-full" />
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              {product.image
                ? "Manufacturer photography, supplied through our distributor."
                : "Our own illustration, real photography arrives with the next supplier shipment."}
            </p>
          </div>

          {/* ---- buy box ---- */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.6875rem] uppercase tracking-wider text-ink-faint">
                {product.category}
              </span>
              {product.badge && <span className="badge">{product.badge}</span>}
              <span className="chip">
                {water === "salt"
                  ? "Saltwater"
                  : water === "fresh"
                    ? "Freshwater"
                    : "Salt or fresh"}
              </span>
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

            {/* One line, not two. This used to print "In stock at our
                distributor · ships in 3–7 business days" directly above
                "Free shipping over $75 · ships in 3–7 business days". */}
            {sourced ? (
              <p className="mt-3 flex items-center gap-2 text-sm text-teal">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-teal"
                />
                In stock at our distributor · ships in {product.shipsIn} ·{" "}
                {product.price >= FREE_SHIPPING_OVER
                  ? "ships free"
                  : `free shipping over $${FREE_SHIPPING_OVER}`}
              </p>
            ) : (
              <p className="mt-2 text-sm text-ink-faint">
                Pricing shown is indicative until we confirm a supplier.
              </p>
            )}

            {product.role === "add-on" && (
              <p className="mt-3 rounded-xl border border-line bg-card/60 p-3 text-sm leading-relaxed text-ink-dim">
                <strong className="text-ink">Best bought alongside something else.</strong>{" "}
                Small, light items like this cost nearly as much to ship as they
                do to make. Add it to a rod or lure order and it rides along in
                the same box, which is why the free-shipping threshold is
                ${FREE_SHIPPING_OVER}.
              </p>
            )}

            <p className="mt-6 leading-relaxed text-ink-dim">{product.blurb}</p>

            <div className="mt-7">
              {sourced ? (
                <AddToCart productKey={product.key} />
              ) : (
                <div className="rounded-xl border border-line bg-card/60 p-4">
                  <p className="font-semibold text-ink">Not available yet</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                    We haven&rsquo;t settled a supplier for this one, so we
                    won&rsquo;t take your money for it. We&rsquo;d rather tell
                    you that than sell you something and then explain why it
                    hasn&rsquo;t shipped.{" "}
                    <Link href="/contact" className="text-tide hover:text-teal">
                      Tell us you want it
                    </Link>{" "}
                    and you&rsquo;ll be the first to know when it lands.
                  </p>
                  <Link href="/products" className="btn btn-primary mt-4">
                    See what we do have
                  </Link>
                </div>
              )}
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

            {product.prop65 && (
              <div className="card mt-4 border-[rgba(251,191,36,.25)] p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#fbbf24]">
                  ⚠ California Proposition 65 warning
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                  This product can expose you to chemicals which are known to
                  the State of California to cause cancer, birth defects or
                  other reproductive harm. For more information go to{" "}
                  <a
                    href="https://www.p65warnings.ca.gov"
                    className="text-tide hover:text-teal"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    P65Warnings.ca.gov
                  </a>
                  .
                </p>
              </div>
            )}

            <div className="card mt-4 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
                {/* "When to fish it" on a cup holder was funny once. */}
                {FISHABLE.includes(product.category)
                  ? "When to fish it"
                  : "When it earns its place"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {product.whenToUse}
              </p>
              {/* The single tide link on a product page, and only where tides
                  are relevant. Tides do not move a lake, and "find your tide
                  window" under a crappie bait reads as automation, which
                  quietly undermines the water tag a few inches above it. */}
              {tideLink && (
                <a
                  href={tideLink.href}
                  target="_blank"
                  rel="noopener"
                  className="mt-3 inline-block text-sm text-tide hover:text-teal"
                >
                  {tideLink.label}
                </a>
              )}
            </div>
          </div>
        </div>

        {family.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Other sizes &amp; colors
            </h2>
            <p className="mt-1 text-sm text-ink-faint">
              Same product, {family.length} other{" "}
              {family.length === 1 ? "option" : "options"}.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {family.map((sib) => (
                <li key={sib.key}>
                  <Link
                    href={`/products/${sib.key}`}
                    className="card card-hover flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <span className="min-w-0 flex-1 truncate text-sm text-ink-dim">
                      {variantLabel(sib) || sib.name}
                    </span>
                    <span className="tnum shrink-0 text-sm font-semibold">
                      {formatPrice(sib.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* The kits this product belongs to. Someone looking at a spool of
            braid should be told it comes cheaper as part of a set BEFORE they
            buy it on its own, not discover it afterwards on the homepage. */}
        {kits.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Comes in {kits.length === 1 ? "a kit" : "these kits"}
            </h2>
            <p className="mt-1 text-sm text-ink-faint">
              Buy it as part of a set and the whole set is{" "}
              {Math.round(kits[0].discount * 100)}% off.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {kits.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/bundles#${b.id}`}
                    className="card card-hover flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {b.name}
                      </span>
                      <span className="block truncate text-xs text-ink-faint">
                        {b.tagline}
                      </span>
                    </span>
                    <span className="tnum shrink-0 text-sm font-semibold">
                      {formatPrice(bundlePrice(b))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {alsoBuy.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">Pairs with</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {alsoBuy.map((p) => (
                <ProductCard key={p.key} product={p} />
              ))}
            </div>
          </section>
        )}

        {walkthrough && (
          <Walkthrough product={product} walkthrough={walkthrough} />
        )}

      </div>
    </>
  );
}
