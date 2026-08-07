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
        {product.badge && (
          <span className="badge absolute left-3 top-3 backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        {product.role === "add-on" && (
          <span className="absolute right-3 top-3 rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] font-medium text-ink-dim backdrop-blur-sm">
            Best as an add-on
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[0.6875rem] uppercase tracking-wider text-ink-faint">
          {product.category}
        </p>
        <h3 className="font-medium leading-snug text-ink group-hover:text-tide">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-dim">{product.tagline}</p>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="tnum text-lg font-semibold text-ink">
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
