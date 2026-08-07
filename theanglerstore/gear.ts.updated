// TheAnglerStore product catalog.
// Every recommendation on USTideCharts links into the store.
//
// Real products, sourced August 2026 from US-warehouse suppliers.
// Names and prices mirror theanglerstore.com/src/lib/products.ts — keep them in
// sync, because a price mismatch between the two sites reads as a bait-and-switch.
// Keys are a contract with the store and must never change.

export interface Product {
  key: string;
  name: string;
  category: string;
  price: number;
  blurb: string;
  badge?: string;
  gradient: string; // card art fallback
  icon: string;
  /**
   * Real, stable image URL for every key. These are the store's per-product
   * OpenGraph cards (1200x630, branded, generated at build from the live
   * catalog) — so they always match the real product name and price, and they
   * never 404. Swap to supplier photography when it exists.
   */
  image: string;
}

const STORE = "https://theanglerstore.com";

export function productUrl(p: Product): string {
  return `${STORE}/products/${p.key}?utm_source=ustidecharts&utm_medium=gear-rec`;
}

/** Card image for a product. Served by the store, cached at its edge. */
export function productImage(key: string): string {
  return `${STORE}/products/${key}/opengraph-image`;
}

export const PRODUCTS: Record<string, Product> = {
  "surf-rod": {
    key: "surf-rod",
    name: "PENN Wrath II Surf Combo — 10' Heavy",
    category: "Rods & Combos",
    price: 159.99,
    blurb:
      "Two-piece 10' heavy blank on a sealed PENN 8000. Reaches past the inside bar without a tournament casting stroke.",
    badge: "Best Seller",
    gradient: "linear-gradient(135deg,#0e3a5c,#155e88)",
    icon: "🎣",
    image: `${STORE}/products/surf-rod/opengraph-image`,
  },
  "inshore-combo": {
    key: "inshore-combo",
    name: "PENN Wrath II Inshore Combo — 7' Medium",
    category: "Rods & Combos",
    price: 129.99,
    blurb:
      "7' medium on a 4000 turning 6.2:1 — fast enough to catch up when a halibut runs at you.",
    gradient: "linear-gradient(135deg,#0d4a4a,#137a6e)",
    icon: "🎣",
    image: `${STORE}/products/inshore-combo/opengraph-image`,
  },
  "braided-line": {
    key: "braided-line",
    name: "Reaction Tackle X8 Braid — 30 lb / 300 yd",
    category: "Line & Leader",
    price: 29.99,
    blurb:
      "True 8-carrier braid with near-zero stretch. Feel every tick of the bottom at 80 yards.",
    badge: "Staff Pick",
    gradient: "linear-gradient(135deg,#233a5e,#3b5fa0)",
    icon: "🧵",
    image: `${STORE}/products/braided-line/opengraph-image`,
  },
  "fluoro-leader": {
    key: "fluoro-leader",
    name: "Reaction Tackle Fluorocarbon Leader — 15 lb / 50 yd",
    category: "Line & Leader",
    price: 17.99,
    blurb:
      "100% fluorocarbon, 50 yards instead of the usual 25. Nearly invisible to picky corbina and halibut.",
    gradient: "linear-gradient(135deg,#1d3752,#2e5f83)",
    icon: "🧵",
    image: `${STORE}/products/fluoro-leader/opengraph-image`,
  },
  "circle-hooks": {
    key: "circle-hooks",
    name: "VMC 7381 SureSet Circle Hooks",
    category: "Terminal Tackle",
    price: 12.99,
    blurb:
      "Black nickel vanadium steel. Corner-of-the-mouth hookups, and a released fish that swims off.",
    gradient: "linear-gradient(135deg,#3a2e59,#5d4a8f)",
    icon: "🪝",
    image: `${STORE}/products/circle-hooks/opengraph-image`,
  },
  "carolina-kit": {
    key: "carolina-kit",
    name: "Terra Firma Carolina Rig — 3 pack",
    category: "Terminal Tackle",
    price: 24.99,
    blurb:
      "Hand-tied in the US on heavy cable and fluoro, with a ball-bearing swivel and a circle hook.",
    gradient: "linear-gradient(135deg,#4a3420,#7a5c36)",
    icon: "🪝",
    image: `${STORE}/products/carolina-kit/opengraph-image`,
  },
  "swimbait-kit": {
    key: "swimbait-kit",
    name: "Z-Man Coastal Swimbait Kit — 21 pc",
    category: "Lures",
    price: 34.99,
    blurb:
      "ElaZtech paddle tails in West Coast colors. Buoyant, so the tail stands up off the bottom at rest.",
    badge: "Best Value",
    gradient: "linear-gradient(135deg,#14532d,#1f7a45)",
    icon: "🐟",
    image: `${STORE}/products/swimbait-kit/opengraph-image`,
  },
  "jig-assort": {
    key: "jig-assort",
    name: "Trokar Pro-V Bucktail Assortment — 1, 2 & 3 oz",
    category: "Lures",
    price: 34.99,
    blurb:
      "The exact surf weight range on surgically sharpened Trokar hooks. Bucktail has never stopped working.",
    gradient: "linear-gradient(135deg,#52340e,#8a5a1d)",
    icon: "⚓",
    image: `${STORE}/products/jig-assort/opengraph-image`,
  },
  "landing-net": {
    key: "landing-net",
    name: "KastKing Brutus Folding Landing Net",
    category: "Accessories",
    price: 49.99,
    blurb:
      "20\" aluminum frame, fish-friendly coated mesh, folds flat for the jetty walk.",
    gradient: "linear-gradient(135deg,#0f3d51,#177a91)",
    icon: "🥅",
    image: `${STORE}/products/landing-net/opengraph-image`,
  },
  "sand-spike": {
    key: "sand-spike",
    name: "Sea Striker Sand Spike — 27\" PVC, 2 pk",
    category: "Accessories",
    price: 34.99,
    blurb:
      "Corrosion-proof PVC with an angled point. Plant your spread and watch the tips.",
    gradient: "linear-gradient(135deg,#374151,#5b6472)",
    icon: "🏖️",
    image: `${STORE}/products/sand-spike/opengraph-image`,
  },
  pliers: {
    key: "pliers",
    name: "KastKing AlumaStream Aluminum Pliers",
    category: "Accessories",
    price: 49.99,
    blurb:
      "Anodized aluminum with replaceable tungsten carbide cutters that shear braid clean.",
    gradient: "linear-gradient(135deg,#334155,#516782)",
    icon: "🔧",
    image: `${STORE}/products/pliers/opengraph-image`,
  },
  "tackle-bag": {
    key: "tackle-bag",
    name: "KastKing Essential Tackle Backpack",
    category: "Accessories",
    price: 74.99,
    blurb:
      "Water-resistant shell, padded harness, and two utility trays plus a tool set included.",
    gradient: "linear-gradient(135deg,#3f2d3f,#6b4a66)",
    icon: "🎒",
    image: `${STORE}/products/tackle-bag/opengraph-image`,
  },
  cooler: {
    key: "cooler",
    name: "RTIC Ultra-Tough Soft Cooler — 30 can",
    category: "Coolers",
    price: 184.99,
    blurb:
      "Welded, fully waterproof, leakproof zipper. Holds ice on its side in a truck bed.",
    badge: "New",
    gradient: "linear-gradient(135deg,#134e4a,#1a7a72)",
    icon: "🧊",
    image: `${STORE}/products/cooler/opengraph-image`,
  },
  headlamp: {
    key: "headlamp",
    name: "Foxelli MX200 Rechargeable Headlamp",
    category: "Accessories",
    price: 37.99,
    blurb:
      "180 lumens with a hold-to-red mode that won't wreck your night vision or spook fish.",
    gradient: "linear-gradient(135deg,#44403c,#6d655d)",
    icon: "🔦",
    image: `${STORE}/products/headlamp/opengraph-image`,
  },
};

export function getProducts(keys: string[]): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const k of keys) {
    if (!seen.has(k) && PRODUCTS[k]) {
      seen.add(k);
      out.push(PRODUCTS[k]);
    }
  }
  return out;
}
