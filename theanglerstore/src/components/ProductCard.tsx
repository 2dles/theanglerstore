import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { ProductArt } from "./ProductArt";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
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
        {product.role === "add-on" && (
          <span className="absolute right-3 top-3 hidden rounded-full border border-white/10 bg-abyss/85 px-2.5 py-0.5 text-[0.6875rem] font-medium text-ink backdrop-blur-sm sm:inline">
            Best as an add-on
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
