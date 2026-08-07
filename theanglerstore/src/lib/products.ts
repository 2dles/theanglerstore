// TheAnglerStore catalog.
//
// ─────────────────────────────────────────────────────────────────────────────
// THE URL CONTRACT — do not break it.
//
// USTideCharts.com links every gear card, nav item, and footer link here as:
//   /products/<key>?utm_source=ustidecharts&utm_medium=gear-rec|nav|footer|home|location
//
// All 14 keys below MUST resolve. Never delete a key. If a product is retired,
// add a REDIRECTS entry so the inbound link 301s with its utm params intact.
// ─────────────────────────────────────────────────────────────────────────────
//
// Every product here is a REAL product from a US-warehouse supplier, sourced
// August 2026. Retail prices are set from verified supplier cost + shipping so
// each SKU clears 25% net after Stripe fees. The supplier, cost, and margin for
// each key live in SOURCING.md — deliberately NOT in this file, because this
// file ships to the browser.
//
// Prices that differ from the original brief are intentional: the brief's
// placeholder prices did not survive real sourcing. See SOURCING.md § Repricing.

export type Category =
  | "Rods & Combos"
  | "Line & Leader"
  | "Terminal Tackle"
  | "Lures"
  | "Accessories"
  | "Coolers";

export interface Product {
  key: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  tagline: string;
  blurb: string;
  badge?: string;
  specs: { label: string; value: string }[];
  features: string[];
  gradient: [string, string];
  glyph: Glyph;
  pairsWith: string[];
  whenToUse: string;
  featured: boolean;
  /**
   * Real product photograph, if we have the rights to one.
   *
   * Drop a file at /public/products/<key>.jpg and set this to
   * "/products/<key>.jpg" — the storefront uses it everywhere in place of the
   * illustration, with no other change. See IMAGES.md before using any image
   * you did not take yourself or receive written permission to use.
   */
  image?: string;
  /**
   * "anchor"  — carries its own margin standalone, safe to advertise
   * "add-on"  — thin standalone; profitable inside a larger basket
   */
  role: "anchor" | "add-on";
  shipsIn: string;
}

export type Glyph =
  | "rod"
  | "rod-short"
  | "spool"
  | "spool-small"
  | "hook"
  | "rig"
  | "lure"
  | "jig"
  | "net"
  | "spike"
  | "pliers"
  | "bag"
  | "cooler"
  | "lamp";

export const CATEGORIES: { slug: string; name: Category; blurb: string }[] = [
  {
    slug: "rods-combos",
    name: "Rods & Combos",
    blurb:
      "Two setups, chosen rather than assembled: a 10-foot heavy for the open beach and a 7-foot medium for bays and jetties. Both ship free and both are real PENN tackle, not house-brand filler.",
  },
  {
    slug: "line-leader",
    name: "Line & Leader",
    blurb:
      "Eight-strand braid and true 100% fluorocarbon. The cheapest meaningful upgrade in fishing, and the one most anglers put off longest.",
  },
  {
    slug: "terminal-tackle",
    name: "Terminal Tackle",
    blurb:
      "Hooks and rigs — the small metal that decides whether a bite becomes a fish. Everything here is plated or coated, because untreated hardware rusts out in one salt session.",
  },
  {
    slug: "lures",
    name: "Lures",
    blurb:
      "Soft plastics and bucktails in the sizes and colors that work on this coast — halibut, surfperch, calico, and spotted bay bass.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb:
      "The gear that makes a dawn session pleasant instead of miserable: nets, spikes, pliers, a bag that survives wet sand, and light that doesn't wreck your night vision.",
  },
  {
    slug: "coolers",
    name: "Coolers",
    blurb:
      "Cold storage that actually ships well. We looked hard at big rotomolded hard coolers and decided against them — the explanation is on the product page.",
  },
];

export const PRODUCTS: Product[] = [
  {
    key: "surf-rod",
    name: "PENN Wrath II Surf Combo — 10' Heavy",
    category: "Rods & Combos",
    price: 159.99,
    compareAt: 189.99,
    tagline: "The do-everything beach setup",
    blurb:
      "A two-piece 10-foot heavy surf blank matched to a PENN 8000 with sealed stainless bearings and the HT-100 drag system. Ten feet is the honest answer for most people: it throws 3 to 4 ounces past the inside bar without demanding a tournament casting stroke, and it still fits in a car.",
    badge: "Best Seller",
    specs: [
      { label: "Length", value: "10' 0\" · 2-piece" },
      { label: "Power", value: "Heavy" },
      { label: "Reel size", value: "8000" },
      { label: "Gear ratio", value: "5.3:1" },
      { label: "Bearings", value: "2 sealed stainless + 1 anti-reverse" },
      { label: "Line rating", value: "25 lb" },
      { label: "Drag", value: "HT-100 carbon fiber" },
    ],
    features: [
      "Sealed bearings — the one spec that decides whether a surf reel survives a season of sand and spray",
      "HT-100 carbon drag, the same system PENN puts in reels costing three times this",
      "Two-piece ferrule fits a sedan trunk and every surf cart we've tried",
      "Graphite composite blank with a moderate-fast taper that loads properly with bait, not just metal",
    ],
    gradient: ["#0e3a5c", "#155e88"],
    glyph: "rod",
    pairsWith: ["braided-line", "sand-spike", "carolina-kit"],
    whenToUse: "Open beach, moderate to heavy surf, pyramid sinkers and bait rigs.",
    featured: true,
    role: "anchor",
    shipsIn: "3–6 business days",
  },
  {
    key: "inshore-combo",
    name: "PENN Wrath II Inshore Combo — 7' Medium",
    category: "Rods & Combos",
    price: 129.99,
    compareAt: 159.99,
    tagline: "Bays, jetties, and kelp edges",
    blurb:
      "A 7-foot medium two-piece on a PENN 4000 turning 6.2:1. The fast retrieve is the point: when a halibut picks up a swimbait and runs at you, a slow reel loses the fish before you ever feel it. Best value in the catalog by a clear margin.",
    specs: [
      { label: "Length", value: "7' 0\" · 2-piece" },
      { label: "Power", value: "Medium" },
      { label: "Reel size", value: "4000" },
      { label: "Gear ratio", value: "6.2:1" },
      { label: "Bearings", value: "2 sealed stainless + 1 anti-reverse" },
      { label: "Line rating", value: "15 lb" },
      { label: "Drag", value: "HT-100 carbon fiber" },
    ],
    features: [
      "6.2:1 retrieve picks up slack fast — the difference between feeling the bite and finding it",
      "Sealed bearings and a carbon drag on a combo under $130",
      "Two-piece breaks down to about 45\", so it rides in a kayak hatch",
      "Genuinely versatile: popping corks, swimbaits, jigs, live bait",
    ],
    gradient: ["#0d4a4a", "#137a6e"],
    glyph: "rod-short",
    pairsWith: ["swimbait-kit", "fluoro-leader", "landing-net"],
    whenToUse: "Bays, harbors, jetties, kelp edges, kayak fishing.",
    featured: true,
    role: "anchor",
    shipsIn: "3–6 business days",
  },
  {
    key: "braided-line",
    name: "Reaction Tackle X8 Braid — 30 lb / 300 yd",
    category: "Line & Leader",
    price: 29.99,
    compareAt: 39.99,
    tagline: "Feel every tick of the bottom",
    blurb:
      "True eight-carrier braid at 30 lb, 300 yards, with a no-fade color treatment that survives a season of sun. Put this on a mediocre reel and the reel gets better — braid is the single highest-leverage dollar in fishing, and an 8-carrier line casts quieter and further than the 4-carrier stuff sold at the same price.",
    badge: "Staff Pick",
    specs: [
      { label: "Test", value: "30 lb" },
      { label: "Length", value: "300 yd" },
      { label: "Construction", value: "8-carrier round braid" },
      { label: "Stretch", value: "Effectively zero" },
      { label: "Color", value: "Hi-vis green · no-fade treated" },
      { label: "Ships from", value: "Wisconsin" },
    ],
    features: [
      "Eight carriers, not four — rounder, smoother, and noticeably quieter through the guides",
      "Zero stretch means you feel a pickup at 80 yards, which is the whole argument for braid",
      "No-fade color treatment; cheap braid goes grey and chalky by August",
      "Ships free and fast from a US warehouse",
    ],
    gradient: ["#233a5e", "#3b5fa0"],
    glyph: "spool",
    pairsWith: ["fluoro-leader", "surf-rod", "circle-hooks"],
    whenToUse: "Main line for any surf or inshore setup.",
    featured: true,
    role: "anchor",
    shipsIn: "2–5 business days",
  },
  {
    key: "fluoro-leader",
    name: "Reaction Tackle Fluorocarbon Leader — 15 lb / 50 yd",
    category: "Line & Leader",
    price: 17.99,
    tagline: "Twice the yardage, genuinely invisible",
    blurb:
      "100% fluorocarbon at 0.34 mm — not fluoro-coated nylon, which is what a lot of cheap 'fluoro' actually is. Fifty yards instead of the usual twenty-five, so it's roughly 25 surf leaders rather than 12. On bright, clear days for corbina and halibut this is the difference between follows and bites.",
    specs: [
      { label: "Test", value: "15 lb" },
      { label: "Diameter", value: "0.34 mm" },
      { label: "Length", value: "50 yd" },
      { label: "Material", value: "100% fluorocarbon" },
      { label: "Use", value: "Leader or main line" },
    ],
    features: [
      "50 yards — double the industry-standard 25 yd leader spool at a comparable price",
      "Refractive index close to seawater, so it effectively disappears",
      "Sinks, unlike mono, which keeps your bait in the strike zone",
      "Ties clean FG and double-uni connections to braid",
    ],
    gradient: ["#1d3752", "#2e5f83"],
    glyph: "spool-small",
    pairsWith: ["braided-line", "circle-hooks", "inshore-combo"],
    whenToUse: "Clear water, bright sun, spooky fish. Realistically, always.",
    featured: false,
    role: "anchor",
    shipsIn: "2–5 business days",
  },
  {
    key: "circle-hooks",
    name: "VMC 7381 SureSet Circle Hooks — Black Nickel",
    category: "Terminal Tackle",
    price: 12.99,
    tagline: "Corner-of-the-mouth, nearly every time",
    blurb:
      "Vanadium steel circle hooks in black nickel, offset shank, needle point. Don't set the hook — just come tight and let the fish turn. Better landing rates than a J-hook on bait, and a released fish that actually swims off instead of bleeding out.",
    specs: [
      { label: "Sizes", value: "4, 2, 1 (16 pk) · 1/0–3/0 (12 pk) · 4/0 (9 pk)" },
      { label: "Material", value: "Vanadium steel" },
      { label: "Finish", value: "Black nickel" },
      { label: "Point", value: "Needle point, offset shank" },
      { label: "Strength", value: "~25% over standard wire" },
    ],
    features: [
      "Vanadium steel runs about 25% stronger than standard hook wire at the same diameter",
      "Black nickel plating — uncoated hooks rust through in one saltwater session",
      "Sold by size rather than as an assortment, because you're fishing for something specific",
      "Best value as an add-on to a rod or lure order — see the shipping note below",
    ],
    gradient: ["#3a2e59", "#5d4a8f"],
    glyph: "hook",
    pairsWith: ["carolina-kit", "fluoro-leader", "braided-line"],
    whenToUse: "Any bait fishing. Required in some fisheries — check local regs.",
    featured: false,
    role: "add-on",
    shipsIn: "2–5 business days",
  },
  {
    key: "carolina-kit",
    name: "Terra Firma Carolina Rig — 3 pack",
    category: "Terminal Tackle",
    price: 24.99,
    tagline: "Tied by hand in the US, ready to fish",
    blurb:
      "Three finished Carolina rigs, each built on heavy cable and fluorocarbon with a ball-bearing swivel and a 5/0 or 8/0 circle hook. We looked hard at the 200-piece rig-making kits everyone sells and could not find one from a US warehouse that we could price honestly — they are all the same Chinese white-label box, and your customer can find it themselves for what we'd have to pay. So we sell finished rigs made in America instead.",
    specs: [
      { label: "Count", value: "3 rigs" },
      { label: "Leader", value: "200 lb cable / 130 lb fluoro / 200 lb mono options" },
      { label: "Hook", value: "5/0 or 8/0 high-carbon circle" },
      { label: "Swivel", value: "Ball bearing" },
      { label: "Weight", value: "3 oz or 6 oz egg sinker" },
      { label: "Made in", value: "USA" },
    ],
    features: [
      "Hand-tied in the US, not a bagged assortment you finish yourself at 5 a.m.",
      "Ball-bearing swivel — the component cheap rigs skip, and the reason they twist your main line",
      "Cable option for toothy fish; fluoro option for clear water and spooky ones",
      "Honest note: this replaces the 220-piece kit we originally planned. We could not source that kit from a US warehouse at a price that made sense for either of us.",
    ],
    gradient: ["#4a3420", "#7a5c36"],
    glyph: "rig",
    pairsWith: ["circle-hooks", "surf-rod", "sand-spike"],
    whenToUse: "Surf bait fishing — perch, corbina, croaker, striper, drum.",
    featured: false,
    role: "add-on",
    shipsIn: "4–7 business days",
  },
  {
    key: "swimbait-kit",
    name: "Z-Man Coastal Swimbait Kit — 21 pc",
    category: "Lures",
    price: 34.99,
    compareAt: 42.99,
    tagline: "Three sizes, ElaZtech, West Coast colors",
    blurb:
      "Twenty-one Z-Man paddle tails across 2.5\" and 4\" in the pearl, smelt, and mullet range that actually produces on this coast. ElaZtech is the reason to care: it's buoyant, so the tail stands up off the bottom at rest instead of lying flat — which matters enormously to a halibut sitting in the sand watching it.",
    badge: "Best Value",
    specs: [
      { label: "Count", value: "21 baits" },
      { label: "Sizes", value: "2.5\" Slim SwimZ (16) · 4\" DieZel MinnowZ (5)" },
      { label: "Material", value: "ElaZtech — 10× tougher, buoyant" },
      { label: "Rigging", value: "Molded hook slot + dorsal hook pocket" },
      { label: "Colors", value: "Pearl / smelt / mullet range" },
    ],
    features: [
      "ElaZtech floats, so the tail stands up when the bait sits still — a genuine advantage on flatfish",
      "Survives fish after fish; conventional soft plastic tears off after two",
      "Two sizes covers surfperch through legal halibut with one box",
      "Rigs on 1/4–1 oz heads — pair it with the bucktail assortment",
    ],
    gradient: ["#123f52", "#1b7f8f"],
    glyph: "lure",
    pairsWith: ["jig-assort", "inshore-combo", "landing-net"],
    whenToUse: "Halibut, surfperch, calico, spotted bay bass. Moving water.",
    featured: true,
    role: "anchor",
    shipsIn: "2–5 business days",
  },
  {
    key: "jig-assort",
    name: "Trokar Pro-V Bucktail Assortment — 1, 2 & 3 oz",
    category: "Lures",
    price: 34.99,
    tagline: "The surf weight range, on surgical hooks",
    blurb:
      "Three natural bucktail jigs — 1 oz on a 5/0, 2 oz on a 6/0, 3 oz on a 7/0 — built on Trokar's three-sided surgically sharpened hooks. That 1-to-3-ounce spread is precisely the striper, halibut, and fluke window from the sand, and bucktail is the one lure that has never stopped working.",
    specs: [
      { label: "Count", value: "3 jigs" },
      { label: "Weights", value: "1 oz · 2 oz · 3 oz" },
      { label: "Hooks", value: "5/0 · 6/0 · 7/0 Trokar" },
      { label: "Point", value: "Three-sided surgically sharpened" },
      { label: "Colors", value: "White / Glow / Pink or all White" },
      { label: "Hair", value: "Natural bucktail" },
    ],
    features: [
      "Trokar points are the sharpest production hook made — measurably, not as marketing",
      "1–3 oz is the working range from a beach; lighter jigs never reach, heavier ones plow",
      "Natural bucktail breathes at rest in a way silicone skirts do not",
      "⚠️ Contains lead — Prop 65 warning applies. Wash hands after handling.",
    ],
    gradient: ["#2a3350", "#4a5f96"],
    glyph: "jig",
    pairsWith: ["swimbait-kit", "surf-rod", "pliers"],
    whenToUse: "Surf and inshore, especially moving water and structure edges.",
    featured: true,
    role: "anchor",
    shipsIn: "2–5 business days",
  },
  {
    key: "landing-net",
    name: "KastKing Brutus Folding Landing Net",
    category: "Accessories",
    price: 49.99,
    tagline: "Folds flat, fish-friendly mesh",
    blurb:
      "A 15×12 aluminum-frame net with 10-inch coated mesh and a push-button telescoping handle, rated to 44 pounds. The frame folds and the handle collapses, so it lives on the outside of a pack instead of in your other hand.",
    specs: [
      { label: "Hoop", value: "15\" × 12\"" },
      { label: "Depth", value: "10\"" },
      { label: "Mesh", value: "Nylon-coated PVC, fish-friendly" },
      { label: "Frame", value: "6063 aluminum, 1 mm wall" },
      { label: "Handle", value: "Retractable, push-button lock" },
      { label: "Capacity", value: "44 lb / 20 kg" },
    ],
    features: [
      "Coated mesh protects the slime coat on fish you intend to release",
      "Hooks pull free of coated mesh instead of burying like they do in knotted nylon",
      "U-shaped folding hoop plus collapsing handle — packs down to almost nothing",
      "Orange EVA grip, which you will appreciate the first time you drop it in the wash",
    ],
    gradient: ["#12483f", "#1f8a72"],
    glyph: "net",
    pairsWith: ["inshore-combo", "pliers", "swimbait-kit"],
    whenToUse: "Bays, jetties, kayaks — anywhere you can't slide a fish up the sand.",
    featured: false,
    role: "anchor",
    shipsIn: "2–5 business days",
  },
  {
    key: "sand-spike",
    name: "Sea Striker Sand Spike — 27\" PVC, 2 pack",
    category: "Accessories",
    price: 34.99,
    tagline: "Two rods, hands free, coffee in hand",
    blurb:
      "Two 27-inch corrosion-proof PVC spikes with an angled sand-driving point and a rod-butt slot. Nothing clever, nothing to break, and they hold in wet sand at the wash where the fancy aluminum ones lever themselves loose.",
    specs: [
      { label: "Length", value: "27\"" },
      { label: "Count", value: "2 per pack" },
      { label: "Material", value: "Corrosion-proof PVC" },
      { label: "Tip", value: "Angled sand-driving point" },
      { label: "Holder", value: "Rod-butt slot" },
    ],
    features: [
      "PVC does not corrode, full stop — there is no metal to seize or pit",
      "27\" is the length that still holds in saturated sand without being unwieldy",
      "Two spikes, because almost nobody surf fishes with one rod",
      "Cheap enough to leave in the truck permanently",
    ],
    gradient: ["#3d3a24", "#7d7440"],
    glyph: "spike",
    pairsWith: ["surf-rod", "carolina-kit", "headlamp"],
    whenToUse: "Bait fishing the open beach, especially two rods at once.",
    featured: false,
    role: "anchor",
    shipsIn: "5–8 business days",
  },
  {
    key: "pliers",
    name: "KastKing AlumaStream Aluminum Pliers — 7.5\"",
    category: "Accessories",
    price: 49.99,
    tagline: "Tungsten carbide cutters, anodized aluminum",
    blurb:
      "6061 anodized aluminum body, 17-4 stainless jaws, and tungsten carbide cutters that go through 80 lb braid like thread. Comes with a belt sheath, a carabiner, and a lanyard — which you will use, because pliers dropped off a jetty are simply gone.",
    specs: [
      { label: "Length", value: "7.5\"" },
      { label: "Body", value: "6061 anodized aluminum" },
      { label: "Jaws", value: "17-4 stainless, multi-function" },
      { label: "Cutters", value: "Tungsten carbide — mono, fluoro, braid" },
      { label: "Included", value: "Sheath · carabiner · lanyard" },
      { label: "Extra", value: "Knot-cinch hole" },
    ],
    features: [
      "Tungsten carbide is the only cutter material that stays sharp on braid",
      "Aluminum body won't seize with rust the way stainless pliers do after a wet season",
      "Split-ring tip that opens a split ring without needing a third hand",
      "Self-adjusting belt sheath with a suction cup for the boat gunwale",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: ["landing-net", "circle-hooks", "tackle-bag"],
    whenToUse: "Every trip. Hook removal, crimping, cutting braid.",
    featured: true,
    role: "anchor",
    shipsIn: "2–5 business days",
  },
  {
    key: "tackle-bag",
    name: "KastKing Essential Tackle Backpack + Tool Set",
    category: "Accessories",
    price: 74.99,
    compareAt: 94.99,
    tagline: "Two trays and a tool set included",
    blurb:
      "A water-resistant tackle backpack that arrives with two utility trays and a tool set already in it, so it's usable the day it lands rather than after another $40 of boxes. Padded straps and a breathable back panel, which matters on a mile of soft sand.",
    specs: [
      { label: "Included", value: "2 utility trays + tool set" },
      { label: "Shell", value: "Water-resistant" },
      { label: "Carry", value: "Padded straps, breathable back panel" },
      { label: "Organisation", value: "Multi-compartment, front tool pockets" },
    ],
    features: [
      "Trays and tools included — most bags at this price arrive empty",
      "Water-resistant shell for spray and the walk back in the rain",
      "Padded, breathable harness for long walks to the spot",
      "Front pockets sized for pliers and a headlamp, not just decoration",
    ],
    gradient: ["#2b2f46", "#525a86"],
    glyph: "bag",
    pairsWith: ["pliers", "headlamp", "carolina-kit"],
    whenToUse: "Long walks to the spot, multi-rod sessions, kayak carry.",
    featured: false,
    role: "anchor",
    shipsIn: "2–5 business days",
  },
  {
    key: "cooler",
    name: "RTIC Ultra-Tough Soft Cooler — 30 can",
    category: "Coolers",
    price: 184.99,
    tagline: "The cooler that actually makes sense to ship",
    blurb:
      "A welded, waterproof soft cooler with a leakproof zipper and closed-cell insulation — and a deliberate substitution. We planned to sell a 45-quart rotomolded hard cooler here and spent real time trying to make it work. We couldn't, and rather than quietly drop the product we'd rather tell you why: see below.",
    specs: [
      { label: "Capacity", value: "30 cans" },
      { label: "Shell", value: "Welded, fully waterproof" },
      { label: "Closure", value: "Leakproof zipper" },
      { label: "Insulation", value: "Closed-cell foam" },
      { label: "Carry", value: "Shoulder strap" },
    ],
    features: [
      "Welded seams and a leakproof zipper — it holds ice water on its side in a truck bed",
      "Compresses and stows flat when empty, unlike a hard cooler",
      "Why not the 45 qt rotomolded: a carton that size bills at roughly 54 lb of dimensional weight regardless of what it weighs. Every US source we could order from one-at-a-time sells at consumer retail, so we'd have to list it at $330 to make a normal margin — about $90 over what you'd pay going direct.",
      "We'd rather sell you the right cooler than mark up the wrong one.",
    ],
    gradient: ["#1b3550", "#33628c"],
    glyph: "cooler",
    pairsWith: ["tackle-bag", "pliers", "headlamp"],
    whenToUse: "Long days, hot beaches, and the walk back with fish.",
    featured: false,
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "headlamp",
    name: "Foxelli MX200 Rechargeable Headlamp",
    category: "Accessories",
    price: 37.99,
    tagline: "Red mode, USB-C, 2.4 oz",
    blurb:
      "180 lumens of white, a proper red mode you reach by holding the button rather than cycling through white, USB-C charging, and IPX5 water resistance. The red is the actual reason to buy this: white light kills your night vision for twenty minutes and puts down fish in skinny water.",
    badge: "Staff Pick",
    specs: [
      { label: "Output", value: "180 lumens" },
      { label: "Modes", value: "5 · white + red" },
      { label: "Red access", value: "Press and hold 1.5 s" },
      { label: "Battery", value: "USB-C rechargeable Li-ion" },
      { label: "Runtime", value: "Up to 40 hr" },
      { label: "Weight / rating", value: "2.4 oz · IPX5" },
    ],
    features: [
      "Hold-to-red — no strobing white across the water while you hunt for the right mode",
      "USB-C, so it charges off the same cable as your phone",
      "2.4 oz means you'll actually keep it on the hat brim all session",
      "40 hours of runtime covers a season of dawn patrols between charges",
    ],
    gradient: ["#3f2f1c", "#8a6a2e"],
    glyph: "lamp",
    pairsWith: ["sand-spike", "tackle-bag", "pliers"],
    whenToUse: "Dawn patrol, night sessions, pre-sunrise walks in.",
    featured: true,
    role: "anchor",
    shipsIn: "3–7 business days",
  },
];

/**
 * Retired keys → live targets. /products/<key> issues a 301 and preserves utm
 * params, so a USTideCharts link never dead-ends and attribution survives.
 * Currently empty: all 14 contract keys resolve to a real product.
 */
export const REDIRECTS: Record<string, string> = {
  // "old-key": "/products/new-key",
};

const BY_KEY = new Map(PRODUCTS.map((p) => [p.key, p]));

export function getProduct(key: string): Product | undefined {
  return BY_KEY.get(key);
}

export function allKeys(): string[] {
  return PRODUCTS.map((p) => p.key);
}

export function byCategory(name: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === name);
}

export function categoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function featured(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function related(p: Product): Product[] {
  return p.pairsWith.map(getProduct).filter((x): x is Product => Boolean(x));
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
