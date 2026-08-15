import Link from "next/link";
import {
  type Bundle,
  bundleItems,
  bundleListPrice,
  bundlePrice,
  formatPrice,
} from "@/lib/products";
import { AddBundle } from "@/components/AddBundle";

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
 * LAYOUT NOTE. The price and the button live in a strip along the BOTTOM, not
 * in a column down the right. The right-hand column was vertically centred
 * against a much taller block of copy, so on a wide screen the card was a wall
 * of text with a price floating in a field of empty space beside it. A full
 * width footer rule also gives the number somewhere to sit that reads as a
 * conclusion rather than an aside.
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
    <div className="card flex h-full flex-col overflow-hidden p-6 sm:p-7">
      <div className="flex-1">
        <span className="badge">
          Kit &middot; save {Math.round(bundle.discount * 100)}%
        </span>
        <h3
          className={
            featured
              ? "mt-4 text-2xl font-semibold tracking-tight sm:text-3xl"
              : "mt-4 text-xl font-semibold tracking-tight"
          }
        >
          {bundle.name}
        </h3>
        <p className="mt-1 text-sm text-ink-faint">{bundle.tagline}</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">
          {bundle.blurb}
        </p>

        <ul
          className={
            featured
              ? "mt-5 grid gap-y-2 gap-x-8 text-sm sm:grid-cols-2"
              : "mt-5 grid gap-2 text-sm"
          }
        >
          {items.map((p) => (
            <li key={p.key} className="flex items-baseline gap-2 text-ink-dim">
              <span className="shrink-0 text-teal">&#9656;</span>
              <Link href={`/products/${p.key}`} className="hover:text-tide">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="hairline mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pt-5">
        <div>
          <div className="flex items-baseline gap-3">
            <span
              className={
                featured
                  ? "tnum text-3xl font-semibold sm:text-4xl"
                  : "tnum text-2xl font-semibold"
              }
            >
              {formatPrice(price)}
            </span>
            <span className="tnum text-sm text-ink-faint line-through">
              {formatPrice(list)}
            </span>
          </div>
          <p className="mt-1 text-xs">
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
 * A kit at a glance: name, what it's for, price, saving.
 *
 * Exists so the homepage can show that the other six kits are there without
 * giving each of them a full card. Six full cards would bury the section below
 * it; six one-line tiles fit under the featured kit in two rows.
 */
export function BundleTile({ bundle }: { bundle: Bundle }) {
  const items = bundleItems(bundle);
  const list = bundleListPrice(bundle);
  const price = bundlePrice(bundle);

  return (
    <Link
      href={`/bundles#${bundle.id}`}
      className="card card-hover flex h-full items-center gap-4 p-4"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{bundle.name}</p>
        <p className="truncate text-xs text-ink-faint">{bundle.tagline}</p>
        <p className="mt-1 text-xs text-ink-dim">{items.length} items</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="tnum text-base font-semibold">{formatPrice(price)}</p>
        <p className="tnum text-xs font-semibold text-gold">
          Save {formatPrice(Math.round((list - price) * 100) / 100)}
        </p>
      </div>
    </Link>
  );
}
