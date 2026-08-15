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

  return (
    <div className="card overflow-hidden">
      <div
        className={
          featured
            ? "grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center"
            : "flex h-full flex-col gap-6 p-6"
        }
      >
        <div className="flex-1">
          <span className="badge">
            Kit · save {Math.round(bundle.discount * 100)}%
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
                ? "mt-5 grid gap-2 text-sm sm:grid-cols-2"
                : "mt-5 grid gap-2 text-sm"
            }
          >
            {items.map((p) => (
              <li key={p.key} className="flex items-baseline gap-2 text-ink-dim">
                <span className="text-teal">▸</span>
                <Link href={`/products/${p.key}`} className="hover:text-tide">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={
            featured ? "shrink-0 lg:text-right" : "shrink-0 border-t border-line pt-5"
          }
        >
          <p className="tnum text-sm text-ink-faint line-through">
            {formatPrice(list)}
          </p>
          <p
            className={
              featured
                ? "tnum text-4xl font-semibold"
                : "tnum text-3xl font-semibold"
            }
          >
            {formatPrice(price)}
          </p>
          <p className="mt-1 text-xs text-ink-faint">
            Saves {formatPrice(list - price)}
            {price >= 75 ? " · ships free" : ""}
          </p>
          <AddBundle
            name={bundle.name}
            keys={items.map((p) => p.key)}
            className={
              featured
                ? "btn btn-primary mt-4 w-full lg:w-auto"
                : "btn btn-primary mt-4 w-full"
            }
          />
        </div>
      </div>
    </div>
  );
}
