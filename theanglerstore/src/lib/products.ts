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
// SOURCING STATUS — read before trusting anything below.
//
// SEVEN keys are real, live CWR products as of 10 Aug 2026, with the dealer
// price, licensed photography and specs taken from CWR's own export:
//   braided-line · fluoro-leader · jig-assort · landing-net · pliers ·
//   tackle-bag · cooler
// Their retail prices are CWR's list price, and each clears ~25% net after
// $9.95 inbound freight and Stripe fees. See SOURCING-REALITY.md.
//
// SEVEN keys are still PLACEHOLDERS and cannot currently be fulfilled:
//   surf-rod · inshore-combo · circle-hooks · carolina-kit · swimbait-kit ·
//   sand-spike · headlamp
// CWR stocks no fishing rods, two reels, and no fishing hooks. These are
// waiting on the Burch Fishing Tackle account — see BURCH-APPLICATION.md.
// Their names, prices and specs are invented and must not be treated as real.
//
// Cost, supplier and margin deliberately do NOT live in this file, because it
// ships to the browser.

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
   * California Proposition 65 warning required by the manufacturer.
   * We are a California seller shipping to California consumers, so where the
   * supplier declares one we surface it on the product page rather than
   * burying it. Sufix braid, the Williamson jig and the Rapala pliers all
   * carry one in CWR's feed.
   */
  prop65?: boolean;
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
    name: "Sufix 832 Advanced Superline Braid — 20 lb, 300 yd",
    category: "Line & Leader",
    price: 40.99,
    tagline: "8 fibers, 32 weaves per inch, Coastal Camo",
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber, braided at 32 picks per inch. The GORE fiber is what makes this line quiet through the guides and stubborn against sand and shell — the two things that end a surf session early. Coastal Camo is the colour to run when the water is clear and the fish have seen everything.",
    specs: [
      { label: "Strength", value: "20 lb test" },
      { label: "Length", value: "300 yds" },
      { label: "Construction", value: "8 fibers · 32 picks/in" },
      { label: "Fiber", value: "7 HMPE + 1 GORE Performance" },
      { label: "Colour", value: "Coastal Camo" },
      { label: "Brand", value: "Sufix 832 Advanced Superline" },
    ],
    features: [
      "The GORE fiber is the whole point — it cuts line vibration, so you feel the take instead of the wind",
      "32 picks per inch makes it round, and round line lies on the spool properly instead of digging in",
      "Abrasion resistance that survives being dragged over shell and rock",
      "300 yards fills a 4000-size spinning reel with backing to spare",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: ["fluoro-leader", "pliers", "tackle-bag"],
    whenToUse: "Main line for surf and inshore spinning. Clear water, spooky fish.",
    featured: true,
    image: "https://productimageserver.com/product/xl/90822XL.jpg",
    prop65: true,
    role: "anchor",
    shipsIn: "3\u20137 business days",
  },
  {
    key: "fluoro-leader",
    name: "Sufix Wind-On Fluorocarbon Leader — 50 lb, 11 yd",
    category: "Line & Leader",
    price: 22.49,
    tagline: "Knotless loop-to-loop, winds through the guides",
    blurb:
      "A braided loop on one end means you connect to your main line without a knot or a swivel, and the leader winds straight through the guides onto the reel. That last part is the reason to buy it: you can fight a fish right to the rod tip without a hard connection banging through every guide on the way.",
    specs: [
      { label: "Strength", value: "50 lb test" },
      { label: "Length", value: "11 yds" },
      { label: "Material", value: "100% fluorocarbon" },
      { label: "Connection", value: "Braided loop, knotless" },
      { label: "Clarity", value: "Crystal clear" },
      { label: "UV", value: "Unaffected by sunlight" },
    ],
    features: [
      "Loop-to-loop means no leader knot to catch weed or jam a guide",
      "Winds onto the reel, so you can fish it as a long shock leader",
      "Fluorocarbon disappears in clear water far better than mono",
      "Shock absorption that mono can't match when a fish surges at the rod tip",
    ],
    gradient: ["#243a4a", "#4f7f9c"],
    glyph: "spool",
    pairsWith: ["braided-line", "circle-hooks", "pliers"],
    whenToUse: "Clear water, toothy or abrasive fish, anywhere braid needs a buffer.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110924XL.jpg",
    role: "add-on",
    shipsIn: "3\u20137 business days",
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
    name: "Williamson Vortex Speed 300 Jig — 10.5 oz",
    category: "Lures",
    price: 31.99,
    tagline: "Rotates on the fall, pre-rigged with a VMC assist hook",
    blurb:
      "One side convex, the other concave, so the jig spins as it drops rather than falling dead. Each face is finished differently, which turns that rotation into a strobing flash on the way down — and the drop is when most fish commit. Comes pre-rigged with a ball-bearing swivel and a VMC assist hook, so it's ready to tie on.",
    specs: [
      { label: "Weight", value: "10.5 oz" },
      { label: "Length", value: "7.25\"" },
      { label: "Size", value: "300" },
      { label: "Colour", value: "Black Silver" },
      { label: "Hook", value: "VMC assist, pre-rigged" },
      { label: "Swivel", value: "Stainless ball-bearing" },
    ],
    features: [
      "Opposing convex and concave faces make it rotate instead of dropping flat",
      "Two-tone finish turns that rotation into flash",
      "Ball-bearing swivel lets you tie direct to the solid ring and leave the lure free-swimming",
      "Arrives rigged \u2014 no assist hook to tie yourself",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "jig",
    pairsWith: ["braided-line", "pliers", "tackle-bag"],
    whenToUse: "Deep water over structure. Drop it, rip it, let it flutter back.",
    featured: false,
    image: "https://productimageserver.com/product/xl/101149XL.jpg",
    prop65: true,
    role: "add-on",
    shipsIn: "3\u20137 business days",
  },
  {
    key: "landing-net",
    name: "Attwood Fold-N-Stow Fishing Net — Medium",
    category: "Accessories",
    price: 19.99,
    tagline: "Folds flat, locks open with a flip",
    blurb:
      "A flip of the handle opens it and locks it; pull the trigger and it collapses back down to something you can stow under a seat or strap to a pack. Knotless netting, which is gentler on a fish you intend to release and far less likely to tangle a treble hook than the old knotted mesh.",
    specs: [
      { label: "Size", value: "Medium" },
      { label: "Extended", value: "47\" \u00d7 16\" \u00d7 16\"" },
      { label: "Netting", value: "Knot-free" },
      { label: "Action", value: "Flip to open, trigger to collapse" },
      { label: "Weight", value: "0.87 lb" },
      { label: "Brand", value: "Attwood" },
    ],
    features: [
      "Knot-free mesh is kinder to fish and doesn't snag trebles the way knotted netting does",
      "Collapses small enough to carry on a beach walk or a kayak",
      "Locks rigid when open \u2014 no flexing handle at the moment it matters",
      "47 inches of reach extended, from a net that stows at a fraction of that",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "net",
    pairsWith: ["pliers", "tackle-bag", "braided-line"],
    whenToUse: "Anywhere you plan to release fish, and any time you're fishing alone.",
    featured: false,
    image: "https://productimageserver.com/product/xl/103114XL.jpg",
    role: "add-on",
    shipsIn: "3\u20137 business days",
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
    name: "Rapala 8\" Super Stainless Steel Pliers",
    category: "Accessories",
    price: 32.99,
    tagline: "Stainless, spring-loaded, side cutter",
    blurb:
      "Eight inches of stainless with an internal spring that holds the jaws open, so you can work one-handed while the other hand is busy holding a fish. The side cutter handles line and leader, and there's a lanyard point \u2014 which you will use, because pliers dropped off a jetty are simply gone.",
    specs: [
      { label: "Length", value: "8\"" },
      { label: "Material", value: "Stainless steel" },
      { label: "Jaw spring", value: "Precision internal, self-opening" },
      { label: "Cutter", value: "Side cutter for line and leader" },
      { label: "Grips", value: "Ergonomic comfort handles" },
      { label: "Lanyard", value: "Built-in attachment point" },
    ],
    features: [
      "Self-opening jaws mean genuine one-handed use with a fish in the other",
      "Eight inches keeps your fingers away from teeth and trebles",
      "Side cutter deals with leader without reaching for scissors",
      "Lanyard point, because the sea takes anything you don't tether",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: ["landing-net", "braided-line", "tackle-bag"],
    whenToUse: "Every trip. Hook removal, crimping, cutting leader.",
    featured: true,
    image: "https://productimageserver.com/product/xl/110902XL.jpg",
    prop65: true,
    role: "anchor",
    shipsIn: "3\u20137 business days",
  },
  {
    key: "tackle-bag",
    name: "Rapala Venture 13 Backpack",
    category: "Accessories",
    price: 76.99,
    tagline: "13 L, holds three 3700 boxes, hands-free",
    blurb:
      "Built for people who fish on foot. Thirteen litres of main compartment that swallows three 3700-size tackle boxes, three zippered pockets, tool attachment points, and a water-resistant base for when you set it down on wet sand. Padded shoulder straps with a chest belt, and a ventilated back panel that matters on a long walk to the mark.",
    specs: [
      { label: "Capacity", value: "13 L main compartment" },
      { label: "Boxes", value: "Fits 3 \u00d7 3700 size (not included)" },
      { label: "Pockets", value: "3 zippered + mesh side pouch" },
      { label: "Straps", value: "3D mesh padded, chest belt" },
      { label: "Back", value: "3D mesh ventilating support" },
      { label: "Base", value: "Water-resistant" },
    ],
    features: [
      "Carries hands-free, which is the whole difference on a beach or a kayak",
      "Three 3700 boxes is a genuinely complete surf and inshore kit",
      "Tool attachment points for pliers and a gripper on the outside where you need them",
      "Water-resistant base survives being put down on wet sand and rock",
    ],
    gradient: ["#2b2f3d", "#5a6478"],
    glyph: "bag",
    pairsWith: ["pliers", "braided-line", "jig-assort"],
    whenToUse: "Any session you walk into. Beach, jetty, kayak.",
    featured: true,
    image: "https://productimageserver.com/product/xl/105698XL.jpg",
    role: "anchor",
    shipsIn: "3\u20137 business days",
  },
  {
    key: "cooler",
    name: "Coleman CHILLER 28-Can Soft-Sided Backpack Cooler",
    category: "Coolers",
    price: 48.49,
    tagline: "12+ hours cold, leakproof, carried on your back",
    blurb:
      "Twenty-eight cans of capacity with TempLock insulation that holds ice past twelve hours, in a soft-sided pack you wear rather than carry. Welded seams so meltwater stays inside, and a zippered front pocket for ice packs. The exterior is made from recycled polyester.",
    specs: [
      { label: "Capacity", value: "28 cans" },
      { label: "Ice retention", value: "12+ hours (TempLock)" },
      { label: "Seams", value: "Welded, leakproof" },
      { label: "Carry", value: "Padded shoulder + waist straps" },
      { label: "Exterior", value: "Recycled polyester" },
      { label: "Height", value: "18.75\"" },
    ],
    features: [
      "Backpack straps free both hands for rods, nets and a tackle pack",
      "Welded seams mean no drip trail across the car on the way home",
      "Twelve hours is a full dawn-to-dusk session with ice left over",
      "Front and interior mesh pockets keep ice packs off your lunch",
    ],
    gradient: ["#1d3346", "#417293"],
    glyph: "cooler",
    pairsWith: ["tackle-bag", "pliers", "landing-net"],
    whenToUse: "Long sessions, hot days, and any trip you intend to keep fish.",
    featured: true,
    image: "https://productimageserver.com/product/xl/98875XL.jpg",
    role: "anchor",
    shipsIn: "3\u20137 business days",
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
