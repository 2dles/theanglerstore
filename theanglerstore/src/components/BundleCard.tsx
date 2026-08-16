import Link from "next/link";
import {
  type Bundle,
  type Product,
  bundleItems,
  bundleListPrice,
  bundlePrice,
  formatPrice,
} from "@/lib/products";
import { ProductArt } from "@/components/ProductArt";
import { AddBundle } from "@/components/AddBundle";

/**
 * The contents of a kit, as pictures.
 *
 * A kit's problem is that its parts are only nameable at length: "Daiwa D-Wave
 * Saltwater Spinning Combo — 8 ft, 2-Piece Medium" is precise and takes a full
 * line to say. Five of those is a wall of text that answers "what is in this?"
 * far more slowly than five photographs do, and buries the price below the
 * fold while it's at it.
 *
 * So the strip is the contents, and the names move into a disclosure below it.
 * The names stay in the DOM either way, each still linking to its product page,
 * because those links are how a kit passes equity to its members and how anyone
 * using a screen reader finds out what they'd be buying.
 */
function BundleStrip({
  items,
  priority = false,
}: {
  items: Product[];
  priority?: boolean;
}) {
  return (
    <ul className="flex gap-2">
      {items.map((p, i) => (
        <li key={p.key} className="min-w-0 flex-1">
          <Link
            href={`/products/${p.key}`}
            className="block overflow-hidden rounded-lg border border-line transition-colors hover:border-line-hi"
            title={p.name}
          >
            <ProductArt
              product={p}
              priority={priority && i === 0}
              sizes="(max-width: 640px) 20vw, 120px"
              className="aspect-square w-full"
            />
            <span className="sr-only">{p.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * One kit, priced and addable.
 *
 * Shared by the homepage and /bundles so the two can never quote different
 * numbers for the same kit, which is exactly what happened when the homepage
 * computed the bundle price inline: it took 12% off the sum, while the
 * checkout took 12% off each item and summed, and the two disagreed by a cent.
 * Every price here comes from bundlePrice(), which is built from the same
 * per-unit figures Stripe is billed.
 *
 * The card is deliberately about as tall as its photographs. An earlier version
 * ran a full paragraph and five bullets of product names, and two of them side
 * by side filled a laptop screen with almost no product visible.
 */
export function BundleCard({
  bundle,
  featured = false,
}: {
  bundle: Bundle;
  featured?: boolean;
}) {
  const items = bundleItems(bundle);
  const list = bundleListPrice(bundle);
  const price = bundlePrice(bundle);
  const saving = Math.round((list - price) * 100) / 100;

  return (
    <div className="card flex h-full flex-col overflow-hidden p-5">
      <BundleStrip items={items} priority={featured} />

      <div className="mt-4 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3
            className={
              featured
                ? "text-xl font-semibold tracking-tight sm:text-2xl"
                : "text-lg font-semibold tracking-tight"
            }
          >
            {bundle.name}
          </h3>
          <span className="badge">save {Math.round(bundle.discount * 100)}%</span>
        </div>
        <p className="mt-1 text-sm text-ink-faint">{bundle.tagline}</p>

        {/* Two lines of the blurb, then it stops. The full text is on the
            product pages it links to, and a kit card is a pitch, not a manual. */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-dim">
          {bundle.blurb}
        </p>

        <details className="group mt-3">
          <summary className="cursor-pointer list-none text-xs font-medium text-ink-faint hover:text-tide">
            <span className="group-open:hidden">
              What&rsquo;s in it ({items.length} items) &#9662;
            </span>
            <span className="hidden group-open:inline">Hide the list &#9652;</span>
          </summary>
          <ul className="mt-2 grid gap-1.5 text-sm">
            {items.map((p) => (
              <li key={p.key} className="flex items-baseline gap-2 text-ink-dim">
                <span className="shrink-0 text-teal">&#9656;</span>
                <Link href={`/products/${p.key}`} className="hover:text-tide">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </div>

      {/* Price and button along the bottom. They used to sit in a right-hand
          column, vertically centred against a much taller block of copy, so on
          a wide screen the card was a wall of text with a price floating in
          empty space beside it. */}
      <div className="hairline mt-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 pt-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span
              className={
                featured
                  ? "tnum text-2xl font-semibold sm:text-3xl"
                  : "tnum text-xl font-semibold"
              }
            >
              {formatPrice(price)}
            </span>
            <span className="tnum text-sm text-ink-faint line-through">
              {formatPrice(list)}
            </span>
          </div>
          <p className="mt-0.5 text-xs">
            <span className="font-semibold text-gold">
              Save {formatPrice(saving)}
            </span>
            {price >= 75 && (
              <span className="text-ink-faint"> &middot; ships free</span>
            )}
          </p>
        </div>

        <AddBundle
          name={bundle.name}
          keys={items.map((p) => p.key)}
          className="btn btn-primary w-full sm:w-auto"
        />
      </div>
    </div>
  );
}

/**
 * A kit at a glance: contents, name, price, saving.
 *
 * Exists so the homepage can show that the other six kits are there without
 * giving each of them a full card. Six full cards would bury the section below
 * it; six of these fit under the featured kit in two rows.
 */
export function BundleTile({ bundle }: { bundle: Bundle }) {
  const items = bundleItems(bundle);
  const list = bundleListPrice(bundle);
  const price = bundlePrice(bundle);

  return (
    <div className="card card-hover flex h-full flex-col gap-3 p-3">
      <BundleStrip items={items} />
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            href={`/bundles#${bundle.id}`}
            className="block truncate text-sm font-semibold hover:text-tide"
          >
            {bundle.name}
          </Link>
          <p className="truncate text-xs text-ink-faint">{bundle.tagline}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="tnum text-base font-semibold">{formatPrice(price)}</p>
          <p className="tnum text-xs font-semibold text-gold">
            Save {formatPrice(Math.round((list - price) * 100) / 100)}
          </p>
        </div>
      </div>
    </div>
  );
}
