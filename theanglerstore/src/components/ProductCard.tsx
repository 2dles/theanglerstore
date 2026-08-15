import Link from "next/link";
import { cardSpecs, colorFamily, formatPrice, type Product } from "@/lib/products";
import { FLAT_SHIPPING } from "@/lib/stripe";

/**
 * The threshold is the shipping charge itself, not a round number.
 *
 * An item that costs less than it costs to post is unambiguously an add-on,
 * and that is a fact the customer can check rather than a label we asserted.
 * At $20 the hint landed on 46% of the catalog; at the shipping rate it lands
 * on 22%, which is roughly the share of the catalog that is genuinely tiny.
 */
const ADD_ON_HINT_UNDER = FLAT_SHIPPING;

import { ProductArt } from "./ProductArt";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const specs = cardSpecs(product);
  const colors = colorFamily(product).length;

  return (
    <Link
      href={`/products/${product.key}`}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductArt
          product={product}
          priority={priority}
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Both pills sit ON the artwork, and the artwork is now a light plate
            for photographed products and a dark gradient for illustrated ones.
            Light-on-light is unreadable, so these carry their own dark ground
            rather than inheriting the card's. */}
        {product.badge && (
          <span className="badge absolute left-3 top-3 !border-white/10 !bg-abyss/85 !text-ink backdrop-blur-sm">
            {product.badge}
          </span>
        )}

      </div>

      {/* Two cards per row on a phone, so the grid scans instead of scrolling
          one product at a time. Type steps down to match the narrower column
          and the tagline is hidden below sm — at 2-up there isn't room for it
          to be anything but clutter. */}
      <div className="flex flex-1 flex-col gap-1 p-3 sm:gap-1.5 sm:p-4">
        <p className="text-[0.625rem] uppercase tracking-wider text-ink-faint sm:text-[0.6875rem]">
          {product.category}
        </p>
        <h3 className="text-sm font-medium leading-snug text-ink group-hover:text-tide sm:text-base">
          {product.name}
        </h3>
        <p className="line-clamp-2 hidden text-sm text-ink-dim sm:block">
          {product.tagline}
        </p>

        {/* The deciding specs, on the card.

            Three Daiwa surf rods sat on the Surf Rods page at the same price
            with the same tagline — "Fiberglass, two-piece, honestly priced" —
            and nothing to tell a 9-footer from an 11. The one question that
            page exists to answer got no answer until you opened all three in
            separate tabs. Length and line rating are the two numbers anglers
            compare, and they belong where the comparison happens.

            Shown on phones too, unlike the tagline: two short numbers are
            worth more at 2-up than a sentence is. */}
        {specs.length > 0 && (
          <dl className="flex flex-wrap gap-x-3 gap-y-0.5 text-[0.625rem] text-ink-faint sm:text-[0.6875rem]">
            {specs.map((s) => (
              <div key={s.label} className="flex gap-1">
                <dt className="sr-only">{s.label}</dt>
                <dd className="tnum">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* The add-on hint used to sit on ~90% of cards, on top of the photo,
            which made it both unreadable and meaningless. It now appears only
            where it tells you something you didn't know — genuinely small items
            that can't carry their own shipping — and it lives in the text
            column, not over the product. */}
        {product.role === "add-on" && product.price < ADD_ON_HINT_UNDER && (
          <p className="hidden text-[0.6875rem] text-ink-faint sm:block">
            Rides along in a bigger order
          </p>
        )}

        {/* One card per colour family now, so say how many colours are behind
            it rather than silently hiding nineteen flashers. */}
        {colors > 1 && (
          <p className="text-[0.625rem] text-ink-faint sm:text-[0.6875rem]">
            {colors} colours
          </p>
        )}

        <div className="mt-auto flex items-baseline gap-2 pt-2 sm:pt-3">
          <span className="tnum font-semibold text-ink sm:text-lg">
            {formatPrice(product.price)}
          </span>
          {product.compareAt && (
            <span className="tnum text-sm text-ink-faint line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
