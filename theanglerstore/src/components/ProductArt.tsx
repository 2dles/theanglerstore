import Image from "next/image";
import type { Product } from "@/lib/products";
import { ProductIllustration } from "./ProductIllustration";

/**
 * Product imagery.
 *
 * Two paths, and the right one is chosen per product:
 *
 *   1. `product.image` set  → a real photograph we own or are licensed to use.
 *      Drop the file at /public/products/<key>.jpg, set the field, done.
 *   2. otherwise             → our own illustration of that product.
 *
 * We do not hotlink supplier or retailer photography. Those images belong to
 * their owners, the links rot when a supplier reorganises their CDN, and
 * "linked, not copied" has never been a defence. IMAGES.md covers how to get
 * real photos you can actually use.
 */
export function ProductArt({
  product,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
}: {
  product: Product;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (product.image) {
    return (
      <div className={`relative overflow-hidden bg-deep ${className}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const [a, b] = product.gradient;
  const id = `art-${product.key}`;

  return (
    <svg
      viewBox="0 0 160 120"
      className={className}
      role="img"
      aria-label={`Illustration of ${product.name}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-vig`} cx="50%" cy="42%" r="72%">
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#04101d" stopOpacity="0.42" />
        </radialGradient>
      </defs>

      <rect width="160" height="120" fill={`url(#${id}-bg)`} />
      <rect width="160" height="62" fill={`url(#${id}-sheen)`} />

      {/* the product itself */}
      <g>
        <ProductIllustration glyph={product.glyph} />
      </g>

      {/* coastal swell, so every card still reads as this brand */}
      <path
        d="M0 104 c 22 -5, 38 5, 60 1 s 40 -7, 62 -2 s 28 5, 38 2 v15 H0 z"
        fill="#04101d"
        opacity="0.28"
      />
      <path
        d="M0 111 c 26 -5, 40 5, 62 2 s 44 -7, 66 -2 s 24 4, 32 2 v7 H0 z"
        fill="#04101d"
        opacity="0.4"
      />

      <rect width="160" height="120" fill={`url(#${id}-vig)`} />
    </svg>
  );
}
