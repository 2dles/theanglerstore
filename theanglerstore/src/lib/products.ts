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
  | "Rod Holders"
  | "Lights"
  | "Bait & Live Wells"
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
      "Rods and combos are coming. We're not listing any until we have a supplier who can ship a 7-foot blank to the West Coast at a price that isn't absurd — see the shipping page for why that's harder than it sounds.",
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
      "Hooks and rigs — the small metal that decides whether a bite becomes a fish. Nothing listed yet: our current distributor is a marine house and doesn't stock fishing hooks. Being sorted.",
  },
  {
    slug: "lures",
    name: "Lures",
    blurb:
      "Metal that gets down and stays down. Jigs built to rotate and flash on the fall, which is when most fish decide.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb:
      "The gear that makes a dawn session pleasant instead of miserable: a net that folds away, pliers that survive salt, and a pack you can walk a beach in.",
  },
  {
    slug: "rod-holders",
    name: "Rod Holders",
    blurb:
      "Somewhere to put the rod that isn't your hand or the sand. Flush mounts for a gunwale, clamp-ons for a rail, and three-pole racks — CWR is a marine distributor first, and this is the category where that shows.",
  },
  {
    slug: "lights",
    name: "Lights",
    blurb:
      "Green and blue submersible and dock lights. Light draws plankton, plankton draws bait, bait draws what you're after — it's the oldest trick in night fishing and it still works.",
  },
  {
    slug: "bait-live-wells",
    name: "Bait & Live Wells",
    blurb:
      "Keeping bait alive is most of the battle. A dead anchovy catches a fraction of what a lively one does, and an aerator is the cheapest thing on this site measured against the difference it makes.",
  },
  {
    slug: "coolers",
    name: "Coolers",
    blurb:
      "Cold storage that actually ships well. We looked hard at big rotomolded hard coolers and decided against them: they cost more to freight than they do to make.",
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
    price: 34.99,
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
    price: 15.49,
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
    price: 24.99,
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
    price: 19.24,
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
    price: 70.49,
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
  {
    key: "braid-hivis",
    name: "Sufix 832 Braid — 20 lb, Hi-Vis Yellow, 300 yd",
    category: "Line & Leader",
    price: 38.99,
    tagline: "The same braid, in a colour you can see",
    blurb:
      "Identical line to the Coastal Camo — eight fibres, 32 picks, one GORE strand — but yellow enough to watch. Worth it at night, mending line in current, or teaching someone else to feel a bite: you see the tick before they feel it. Run a fluorocarbon leader and the fish never see the colour anyway.",
    specs: [
      { label: "Strength", value: "20 lb test" },
      { label: "Length", value: "300 yds" },
      { label: "Colour", value: "Hi-Vis Yellow" },
      { label: "Construction", value: "8 fibers · 32 picks/in" },
      { label: "Fiber", value: "7 HMPE + 1 GORE Performance" },
      { label: "Brand", value: "Sufix 832" },
    ],
    features: [
      "Watching your line is the fastest way to learn to detect bites",
      "Same abrasion resistance and diameter as the camo version",
      "Pairs with a fluorocarbon leader so the colour never reaches the fish",
      "Genuinely useful in the dark under a headlamp",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: ["fluoro-leader", "pliers", "tackle-bag"],
    whenToUse: "Night sessions, current, and anyone still learning to feel the take.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90826XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "braid-light",
    name: "Sufix 832 Braid — 8 lb, Ghost, 300 yd",
    category: "Line & Leader",
    price: 29.99,
    tagline: "Light line for clear water and small baits",
    blurb:
      "Eight-pound test in Ghost, the near-translucent finish. This is the spool for finesse work — surfperch on small plastics, bay bass on light jigs, anywhere heavier line kills the action of a two-inch bait. The diameter is closer to 2 lb mono, so it casts a long way for very little effort.",
    specs: [
      { label: "Strength", value: "8 lb test" },
      { label: "Length", value: "300 yds" },
      { label: "Colour", value: "Ghost" },
      { label: "Construction", value: "8 fibers · 32 picks/in" },
      { label: "Best for", value: "Finesse, clear water" },
      { label: "Brand", value: "Sufix 832" },
    ],
    features: [
      "Tiny diameter for the strength — small baits actually swim properly",
      "Ghost finish is the least visible in clear water",
      "Casts light lures further than any mono at the same test",
      "300 yards fills a 2500-size spool twice",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: ["fluoro-leader", "landing-net", "pliers"],
    whenToUse: "Surfperch, bay bass, clear calm water and small plastics.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90752XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "stowaway-4pack",
    name: "Plano 3700 StowAway — 4-Pack",
    category: "Accessories",
    price: 34.99,
    tagline: "Four boxes, sized for the Venture backpack",
    blurb:
      "The 3700 is the format most tackle bags are built around, including the Rapala Venture 13 we sell — it takes three of them. Getting four at once is how you stop rummaging: one for hooks and weights, one for soft plastics, one for hard baits, one for leader and swivels.",
    specs: [
      { label: "Quantity", value: "4 boxes" },
      { label: "Size", value: "3700 series" },
      { label: "Fits", value: "Rapala Venture 13 (3 of 4)" },
      { label: "Dividers", value: "Adjustable" },
      { label: "Latch", value: "ProLatch" },
      { label: "Brand", value: "Plano" },
    ],
    features: [
      "Four boxes is the point at which tackle stops being a pile",
      "3700 is the size nearly every bag is designed around",
      "Adjustable dividers, so a box can be repurposed as your fishing changes",
      "Cheaper per box than buying them one at a time",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: ["tackle-bag", "jig-assort", "pliers"],
    whenToUse: "The day you get tired of digging through one box for one hook.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110067XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "rapstack-tray",
    name: "Rapala RapStack 3700 Deep Tackle Tray",
    category: "Accessories",
    price: 23.49,
    tagline: "Deep 3700 for bulkier baits",
    blurb:
      "A deeper 3700 for the things that do not lie flat — jigs, big soft plastics, spools of leader, a spare reel. Same footprint as a standard 3700, so it drops into the same bag slot without reorganising everything else.",
    specs: [
      { label: "Size", value: "3700 series, deep" },
      { label: "Fits", value: "Any 3700-format bag" },
      { label: "Use", value: "Jigs, bulk plastics, leader" },
      { label: "Dividers", value: "Adjustable" },
      { label: "Brand", value: "Rapala" },
      { label: "System", value: "Stacks with RapStack" },
    ],
    features: [
      "Depth is what standard 3700 boxes lack — jigs stop lying on their sides",
      "Same footprint, so no bag reshuffle",
      "Stacks with the rest of the RapStack range",
      "Holds leader spools upright where they do not tangle",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: ["tackle-bag", "stowaway-4pack", "jig-assort"],
    whenToUse: "When your jigs will not lie flat in a standard tray.",
    featured: false,
    image: "https://productimageserver.com/product/xl/101115XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "tool-holder",
    name: "Rapala Angler’s Magnetic Tool Holder",
    category: "Accessories",
    price: 31.99,
    tagline: "Pliers stay put, and stay reachable",
    blurb:
      "A magnet strong enough to hold pliers or a gripper against a gunwale, a tackle bag or a cooler lid, and release them one-handed. The problem it solves is small and constant: tools you put down while unhooking a fish are tools you eventually kick into the water.",
    specs: [
      { label: "Hold", value: "Magnetic" },
      { label: "Mount", value: "Bag, gunwale, cooler" },
      { label: "Release", value: "One-handed" },
      { label: "Best with", value: "Pliers, grippers, cutters" },
      { label: "Brand", value: "Rapala" },
      { label: "Weight", value: "Light" },
    ],
    features: [
      "One-handed release matters when the other hand has a fish in it",
      "Sticks to a cooler lid, so it works from the beach as well as a boat",
      "Nothing to tie, clip or thread",
      "Cheap insurance against losing a $33 pair of pliers",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: ["pliers", "tackle-bag", "cooler"],
    whenToUse: "Every trip where you put a tool down and then look for it.",
    featured: false,
    image: "https://productimageserver.com/product/xl/96776XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "net-handle",
    name: "Shurhold 6ft Telescoping Handle — Fishing Series",
    category: "Accessories",
    price: 119.98,
    tagline: "43″ to 72″, for reaching down off a jetty",
    blurb:
      "A telescoping aluminium handle that takes a Shur-LOK net head and extends from 43 to 72 inches. This answers one specific problem: hooking a fish from a jetty, a pier or a high bank and having no way to reach it. Collapses to something you can actually carry.",
    specs: [
      { label: "Extended", value: "72″" },
      { label: "Collapsed", value: "43″" },
      { label: "Material", value: "Aluminium" },
      { label: "Fitting", value: "Shur-LOK quick-release" },
      { label: "Series", value: "Fishing" },
      { label: "Brand", value: "Shurhold" },
    ],
    features: [
      "Six feet of reach is the difference between landing a fish and losing it at the wall",
      "Telescopes down to something that fits in a car or on a pack",
      "Quick-release head, so one handle takes a net or a gaff",
      "Aluminium will not seize with salt the way steel does",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "net",
    pairsWith: ["crab-net", "landing-net", "pliers"],
    whenToUse: "Jetties, piers, high banks — anywhere the water is below you.",
    featured: false,
    image: "https://productimageserver.com/product/xl/34613XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "crab-net",
    name: "Shurhold Shur-LOK Crab Net — 12″ × 13″ × 15″",
    category: "Accessories",
    price: 22.98,
    tagline: "Quick-release head for the telescoping handle",
    blurb:
      "A compact net head on the Shur-LOK quick-release fitting, so it swaps onto the telescoping handle in a second. Sized for crab and small fish — the sort of net that lives in the car and gets used far more often than the big one.",
    specs: [
      { label: "Size", value: "12″ × 13″ × 15″" },
      { label: "Fitting", value: "Shur-LOK quick-release" },
      { label: "Use", value: "Crab, small fish" },
      { label: "Handle", value: "Sold separately" },
      { label: "Brand", value: "Shurhold" },
      { label: "Stock", value: "Deep" },
    ],
    features: [
      "Swaps onto the telescoping handle without tools",
      "Small enough to actually carry, which is why it gets used",
      "Pier crabbing is a real day of fishing when the bite is off",
      "Quick-release means one handle covers several jobs",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "net",
    pairsWith: ["net-handle", "pliers", "cooler"],
    whenToUse: "Pier crabbing, and any day the fish are not cooperating.",
    featured: false,
    image: "https://productimageserver.com/product/xl/32955XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "rod-rack",
    name: "Sea-Dog 3-Rod Storage Rack",
    category: "Accessories",
    price: 22.99,
    tagline: "Three rods, off the floor",
    blurb:
      "A simple three-rod rack for a garage wall, a shed, or a boat bulkhead. Rods stored leaning in a corner get stepped on, and guides bent against a wall are the most common damage a rod ever takes. This is the cheapest fix for that.",
    specs: [
      { label: "Capacity", value: "3 rods" },
      { label: "Mount", value: "Wall or bulkhead" },
      { label: "Material", value: "Marine-grade" },
      { label: "Use", value: "Garage, shed, boat" },
      { label: "Brand", value: "Sea-Dog" },
      { label: "Fixings", value: "Not included" },
    ],
    features: [
      "Rods leaning in a corner are rods waiting to be stepped on",
      "Keeps guides off the wall, where they get bent",
      "Works in a garage as well as on a boat",
      "Cheap enough that there is no reason to keep putting it off",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rod",
    pairsWith: ["tackle-bag", "pliers", "stowaway-4pack"],
    whenToUse: "The moment you own more than two rods.",
    featured: false,
    image: "https://productimageserver.com/product/xl/77711XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "jig-box",
    name: "Plano EDGE Micro Jig Box",
    category: "Lures",
    price: 39.99,
    tagline: "Jigs held individually, not in a heap",
    blurb:
      "The EDGE range holds each jig in its own slot rather than letting them tangle into a single mass of hooks. Rustrictor coating inside genuinely slows the corrosion that turns a box of jig heads into scrap after one salt season.",
    specs: [
      { label: "Type", value: "Micro jig storage" },
      { label: "Holds", value: "Jigs individually" },
      { label: "Coating", value: "Rustrictor rust-inhibiting" },
      { label: "Seal", value: "Waterproof gasket" },
      { label: "Series", value: "Plano EDGE" },
      { label: "Brand", value: "Plano" },
    ],
    features: [
      "Individual slots — no more untangling a knot of jig heads",
      "Rustrictor coating slows salt corrosion inside the box",
      "Waterproof gasket keeps spray out",
      "Fits standard tackle bag slots",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "jig",
    pairsWith: ["jig-assort", "tackle-bag", "stowaway-4pack"],
    whenToUse: "As soon as you own more than a handful of jigs.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90224XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "flasher",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Rainbow Crush",
    category: "Lures",
    price: 22.99,
    tagline: "Attractor for trolled salmon rigs",
    blurb:
      "An eleven-inch rolling flasher for trolling. It does not catch fish itself — it makes the bait behind it findable from much further away. Standard kit for West Coast salmon, and the reason a slow troll works at all in coloured water.",
    specs: [
      { label: "Length", value: "11″" },
      { label: "Finish", value: "Rainbow Crush" },
      { label: "Action", value: "Rolling" },
      { label: "Use", value: "Trolled salmon rigs" },
      { label: "Rigging", value: "Ahead of bait or hoochie" },
      { label: "Brand", value: "Luhr-Jensen" },
    ],
    features: [
      "A flasher widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Rainbow Crush works across a range of light conditions",
      "Standard West Coast salmon rigging",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["braided-line", "fluoro-leader", "cooler"],
    whenToUse: "Trolling for salmon, especially in coloured or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110805XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "jig-mid",
    name: "Williamson Kensaki 220 Jig — 7¾ oz, Blue Lagoon",
    category: "Lures",
    price: 20.99,
    tagline: "Lighter Kensaki for shallower water",
    blurb:
      "The same Kensaki profile as the 300, at 7¾ ounces instead of 10½ — the size to reach for in eighty feet rather than two hundred, or when the current is slack and a heavier jig drops too fast to get looked at.",
    specs: [
      { label: "Weight", value: "7-3/4 oz" },
      { label: "Length", value: "6.75″" },
      { label: "Size", value: "220" },
      { label: "Colour", value: "Blue Lagoon" },
      { label: "Hook", value: "VMC assist, pre-rigged" },
      { label: "Swivel", value: "Stainless ball-bearing" },
    ],
    features: [
      "Lighter drop rate keeps it in the strike zone longer in slack current",
      "Same rotating profile that makes the Kensaki work",
      "Pre-rigged with a VMC assist hook",
      "Blue Lagoon is a clear-water, bright-day colour",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "jig",
    pairsWith: ["jig-assort", "braided-line", "jig-box"],
    whenToUse: "Eighty to a hundred and fifty feet, or slack tide over structure.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105293XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "flush-mount-0",
    name: "C.E. Smith Screwless Flush Mount Rod Holder — 0°",
    category: "Rod Holders",
    price: 44.99,
    tagline: "No visible screws, straight up",
    blurb:
      "A flush mount that installs without exposed fasteners, so there is nothing on the deck to catch a line, a knee or a fish. Zero degrees means the rod sits vertical — the setup for storage and for baits you want hanging straight down rather than trolled.",
    specs: [
      { label: "Angle", value: "0° (vertical)" },
      { label: "Mount", value: "Flush, screwless" },
      { label: "Finish", value: "Black liner" },
      { label: "Use", value: "Gunwale, deck, transom" },
      { label: "Brand", value: "C.E. Smith" },
      { label: "Fasteners", value: "Concealed" },
    ],
    features: [
      "Nothing proud of the deck to snag line or shins",
      "Vertical is the right angle for storage and for dropping straight down",
      "C.E. Smith is the default name in US rod-holder hardware",
      "Deep enough that a loaded rod does not lever itself out",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["rod-rack", "braided-line", "pliers"],
    whenToUse: "Permanent installs on a gunwale, deck or transom.",
    featured: false,
    image: "https://productimageserver.com/product/xl/108260XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "flush-mount-70",
    name: "C.E. Smith 70 Series Screwless Flush Mount — 0°",
    category: "Rod Holders",
    price: 124.99,
    tagline: "Deeper 70 Series body, screwless",
    blurb:
      "The 70 Series is the deeper body, which matters more than it sounds: the further down the butt sits, the less leverage a big fish gets on the holder when it runs. Same screwless install as the standard mount.",
    specs: [
      { label: "Series", value: "70 Series" },
      { label: "Angle", value: "0° (vertical)" },
      { label: "Mount", value: "Flush, screwless" },
      { label: "Depth", value: "Deep body" },
      { label: "Brand", value: "C.E. Smith" },
      { label: "Fasteners", value: "Concealed" },
    ],
    features: [
      "Depth is leverage — a deeper tube takes the strain off the mounting",
      "Screwless face keeps the deck clean",
      "Rated for the loads that pull cheaper holders out of a gunwale",
      "Same cutout as the standard mount in most installs",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["flush-mount-0", "rod-rack", "pliers"],
    whenToUse: "Bigger fish, heavier rods, or anywhere you would rather over-build.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102565XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "flush-mount-ss",
    name: "C.E. Smith Stainless Steel Flush Mount — 15°",
    category: "Rod Holders",
    price: 159.99,
    tagline: "Stainless, angled back 15 degrees",
    blurb:
      "Stainless rather than composite, angled fifteen degrees back. The angle is the trolling angle — it takes the rod tip away from the boat and stops the line running back into the hull. Stainless costs more and lasts longer in salt than anything else here.",
    specs: [
      { label: "Angle", value: "15°" },
      { label: "Material", value: "Stainless steel" },
      { label: "Mount", value: "Flush" },
      { label: "Use", value: "Trolling" },
      { label: "Brand", value: "C.E. Smith" },
      { label: "Finish", value: "Polished" },
    ],
    features: [
      "Fifteen degrees is the standard trolling angle for a reason",
      "Stainless is the only material that genuinely shrugs off salt",
      "Takes the line away from the hull instead of into it",
      "The one to buy if you are installing once and forgetting about it",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["flasher", "braided-line", "cooler"],
    whenToUse: "Trolling, and any install you want to outlast the boat.",
    featured: false,
    image: "https://productimageserver.com/product/xl/30232XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "track-holder",
    name: "Sea-Dog Triple Threat Rod Holder — Track Mount",
    category: "Rod Holders",
    price: 33.49,
    tagline: "Slides onto a track, moves when you do",
    blurb:
      "A track-mounted holder rather than a drilled one, so it slides along the rail and comes off entirely when you want the space back. The right answer for a kayak or a small boat where nothing has a permanent home.",
    specs: [
      { label: "Mount", value: "Track" },
      { label: "Adjustable", value: "Slides and removes" },
      { label: "Series", value: "Triple Threat" },
      { label: "Use", value: "Kayak, small boat" },
      { label: "Brand", value: "Sea-Dog" },
      { label: "Drilling", value: "None required" },
    ],
    features: [
      "No holes in the boat, which matters on a kayak",
      "Slides to wherever you actually need it that day",
      "Comes off completely when the rail is needed for something else",
      "Far cheaper than being wrong about where to drill",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["three-pole-holder", "pliers", "tackle-bag"],
    whenToUse: "Kayaks, small boats, and anywhere you are not ready to drill.",
    featured: false,
    image: "https://productimageserver.com/product/xl/104193XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "three-pole-holder",
    name: "Sea-Dog Triple Threat Three-Pole Rod Holder",
    category: "Rod Holders",
    price: 22.99,
    tagline: "Three rods in the footprint of one",
    blurb:
      "Holds three rods where a single holder holds one. Useful when you are fishing more lines than hands — bait rods out while you work a lure, or three rigs staged and ready so a re-tie is a swap rather than a job.",
    specs: [
      { label: "Capacity", value: "3 rods" },
      { label: "Series", value: "Triple Threat" },
      { label: "Colour", value: "Flat Dark Earth" },
      { label: "Use", value: "Boat, dock, rail" },
      { label: "Brand", value: "Sea-Dog" },
      { label: "Footprint", value: "Single-holder" },
    ],
    features: [
      "Three rods from one mounting point",
      "Staged rigs mean a re-tie is a swap, not a stop",
      "Flat Dark Earth does not glare in the sun the way white does",
      "Pairs with the track mount for a no-drill install",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["track-holder", "braided-line", "tackle-bag"],
    whenToUse: "Multiple lines, staged rigs, or bait out while you cast lures.",
    featured: false,
    image: "https://productimageserver.com/product/xl/99422XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "flush-mount-ss-top",
    name: "Sea-Dog Flush Mount Rod Holder w/Stainless Top",
    category: "Rod Holders",
    price: 29.99,
    tagline: "Composite body, stainless rim",
    blurb:
      "A composite holder with a stainless top ring, which is the sensible compromise — the rim is the part that takes every knock from a rod butt going in, and that is the part made of metal. Cheaper than full stainless, far tougher than plain plastic.",
    specs: [
      { label: "Body", value: "Composite" },
      { label: "Top ring", value: "Stainless steel" },
      { label: "Mount", value: "Flush" },
      { label: "Use", value: "Gunwale, dock box" },
      { label: "Brand", value: "Sea-Dog" },
      { label: "Value", value: "Mid-range" },
    ],
    features: [
      "The rim takes the abuse, so the rim is the metal part",
      "A third the price of full stainless for most of the durability",
      "Standard flush cutout",
      "Sensible choice when you are fitting several at once",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["flush-mount-0", "three-pole-holder", "pliers"],
    whenToUse: "Fitting several holders without paying for stainless throughout.",
    featured: false,
    image: "https://productimageserver.com/product/xl/77702XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "clamp-on-holder",
    name: "C.E. Smith Aluminium Clamp-On Rod Holder — Horizontal",
    category: "Rod Holders",
    price: 93.15,
    tagline: "Clamps to a 1.315″ rail, no drilling",
    blurb:
      "Clamps onto a horizontal rail of 1.315 inch outside diameter — the standard pipe size on most boat rails and dock structures. Aluminium, so it will not rust into the rail and become permanent by accident.",
    specs: [
      { label: "Fits", value: "1.315″ OD rail" },
      { label: "Orientation", value: "Horizontal" },
      { label: "Material", value: "Aluminium" },
      { label: "Mount", value: "Clamp-on" },
      { label: "Brand", value: "C.E. Smith" },
      { label: "Drilling", value: "None" },
    ],
    features: [
      "No drilling, so no holes to regret",
      "Aluminium will not seize into the rail the way steel does",
      "1.315 inch is the standard rail and dock pipe size",
      "Moves to another boat with you",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["flush-mount-ss", "three-pole-holder", "cooler"],
    whenToUse: "Rails and dock pipe, and anywhere drilling is not an option.",
    featured: false,
    image: "https://productimageserver.com/product/xl/62246XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "net-handle-5",
    name: "Shurhold 5ft Fixed Length Handle — Fishing Series",
    category: "Accessories",
    price: 97.99,
    tagline: "Sixty inches, nothing to slip",
    blurb:
      "Five feet, fixed. A telescoping handle can slip under load; a fixed one cannot. If you always fish the same height above the water, the fixed handle is the stronger and cheaper answer.",
    specs: [
      { label: "Length", value: "60″ fixed" },
      { label: "Material", value: "Aluminium" },
      { label: "Fitting", value: "Shur-LOK quick-release" },
      { label: "Series", value: "Fishing" },
      { label: "Brand", value: "Shurhold" },
      { label: "Sections", value: "One" },
    ],
    features: [
      "Nothing to slip or seize under load",
      "Lighter than the telescoping version at the same reach",
      "Same Shur-LOK head fitting, so it takes the crab net",
      "Cheaper than the telescoping handle if you do not need the range",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "net",
    pairsWith: ["crab-net", "net-handle", "landing-net"],
    whenToUse: "A consistent height above the water — a home dock, your own boat.",
    featured: false,
    image: "https://productimageserver.com/product/xl/34612XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "curved-adapter",
    name: "Shurhold Shur-LOK 10″ Curved Adapter",
    category: "Accessories",
    price: 23.99,
    tagline: "Puts the net head at a working angle",
    blurb:
      "A ten-inch curved adapter between handle and head. It sounds fussy until you have tried to scoop a fish with a net that is dead in line with a six-foot pole — the curve puts the hoop where the fish is instead of where the handle points.",
    specs: [
      { label: "Length", value: "10″" },
      { label: "Fitting", value: "Shur-LOK, both ends" },
      { label: "Shape", value: "Curved" },
      { label: "Use", value: "Handle-to-head" },
      { label: "Brand", value: "Shurhold" },
      { label: "Material", value: "Aluminium" },
    ],
    features: [
      "Angles the hoop toward the water instead of straight ahead",
      "Fits between any Shur-LOK handle and head",
      "Adds ten inches of reach as a side effect",
      "Cheap fix for the most annoying thing about long-handled nets",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "net",
    pairsWith: ["net-handle", "crab-net", "net-handle-5"],
    whenToUse: "Any long-handled net that feels awkward to scoop with.",
    featured: false,
    image: "https://productimageserver.com/product/xl/32958XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "tool-holder-3",
    name: "Rapala Magnetic Tool Holder — 3-Place",
    category: "Accessories",
    price: 29.99,
    tagline: "Three tools, one strip",
    blurb:
      "The three-place version of the magnetic holder. Pliers, cutters and a gripper in a row, all within reach of one hand, all released without looking. Once you are carrying three tools, one holder each stops making sense.",
    specs: [
      { label: "Capacity", value: "3 tools" },
      { label: "Hold", value: "Magnetic" },
      { label: "Release", value: "One-handed" },
      { label: "Mount", value: "Bag, gunwale, cooler" },
      { label: "Brand", value: "Rapala" },
      { label: "Layout", value: "Strip" },
    ],
    features: [
      "Three tools in a row you can find without looking",
      "One mounting point instead of three",
      "Same one-handed release as the single holder",
      "Keeps cutters and pliers separate so you grab the right one",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: ["pliers", "tool-holder", "tackle-bag"],
    whenToUse: "Once you fish with more than one tool, which is most people.",
    featured: false,
    image: "https://productimageserver.com/product/xl/88961XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "cup-holder-box",
    name: "Deep Blue Marine Double Cup Holder / Storage Box",
    category: "Accessories",
    price: 28.95,
    tagline: "Two drinks and somewhere for the small stuff",
    blurb:
      "Two cup holders over a small storage box. Unglamorous and genuinely useful: somewhere for a drink that is not the floor, and a lidded space for keys, a phone and the leader spool you keep putting down.",
    specs: [
      { label: "Cups", value: "2" },
      { label: "Storage", value: "Lidded box below" },
      { label: "Mount", value: "Surface" },
      { label: "Use", value: "Boat, dock, cart" },
      { label: "Brand", value: "Deep Blue Marine" },
      { label: "Material", value: "Marine plastic" },
    ],
    features: [
      "A drink that is not on the floor is a drink that does not get kicked over",
      "Lidded box for keys and a phone, away from spray",
      "Mounts to a boat, a dock or a surf cart",
      "The kind of thing nobody buys until they have needed it twice",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: ["cooler", "tackle-bag", "three-pole-holder"],
    whenToUse: "Any session long enough that you brought a drink.",
    featured: false,
    image: "https://productimageserver.com/product/xl/108208XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "lead-core",
    name: "Sufix Performance Lead Core — 18 lb, 200 yd",
    category: "Line & Leader",
    price: 31.99,
    tagline: "Colour changes every ten yards, so you know your depth",
    blurb:
      "Lead core sinks, and it changes colour every ten yards so you can count exactly how much you have out. That is the whole trick: depth becomes a number you control rather than a guess, and you can repeat the depth that just produced a fish.",
    specs: [
      { label: "Strength", value: "18 lb test" },
      { label: "Length", value: "200 yds" },
      { label: "Metering", value: "10-colour, every 10 yds" },
      { label: "Core", value: "Lead" },
      { label: "Use", value: "Trolling to depth" },
      { label: "Brand", value: "Sufix Performance" },
    ],
    features: [
      "Counting colours turns depth into something you can repeat",
      "Gets baits down without a downrigger or heavy weights",
      "200 yards covers the range most trolling actually uses",
      "The cheapest depth control there is",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: ["flasher", "flush-mount-ss", "braided-line"],
    whenToUse: "Trolling when the fish are holding at a depth you need to hit again.",
    featured: false,
    image: "https://productimageserver.com/product/xl/96824XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "braid-10",
    name: "Sufix 832 Braid — 10 lb, Hi-Vis Yellow, 300 yd",
    category: "Line & Leader",
    price: 36.99,
    tagline: "Light line you can still see",
    blurb:
      "Ten-pound test in hi-vis yellow — light enough for finesse work, visible enough to watch. The combination people usually have to choose between, which is why it is worth stocking as its own spool rather than a compromise.",
    specs: [
      { label: "Strength", value: "10 lb test" },
      { label: "Length", value: "300 yds" },
      { label: "Colour", value: "Hi-Vis Yellow" },
      { label: "Construction", value: "8 fibers · 32 picks/in" },
      { label: "Use", value: "Finesse, visible" },
      { label: "Brand", value: "Sufix 832" },
    ],
    features: [
      "Light line and visible line, which normally means picking one",
      "Small diameter casts light baits a long way",
      "Watch the line and you see bites you would not feel",
      "Fluorocarbon leader keeps the colour away from the fish",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: ["fluoro-leader", "braid-light", "landing-net"],
    whenToUse: "Finesse fishing where you still want to watch the line.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90766XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "braid-15",
    name: "Sufix 832 Braid — 15 lb, Fire Tiger, 300 yd",
    category: "Line & Leader",
    price: 28.99,
    tagline: "The middle weight, in the loudest colour",
    blurb:
      "Fifteen pound sits between the finesse spool and the surf spool, which makes it the one line that will do most things adequately. Fire Tiger is aggressively visible — useful in low light, and the reason to run a leader.",
    specs: [
      { label: "Strength", value: "15 lb test" },
      { label: "Length", value: "300 yds" },
      { label: "Colour", value: "Fire Tiger" },
      { label: "Construction", value: "8 fibers · 32 picks/in" },
      { label: "Use", value: "General purpose" },
      { label: "Brand", value: "Sufix 832" },
    ],
    features: [
      "The weight that does most jobs adequately if you only own one spool",
      "Fire Tiger is the easiest colour to track in low light",
      "Same 832 construction as the heavier spools",
      "Run a fluorocarbon leader and the colour stops mattering",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: ["fluoro-leader", "pliers", "tackle-bag"],
    whenToUse: "If you are buying one spool and fish a bit of everything.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110908XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "fluoro-100",
    name: "Sufix Wind-On Fluorocarbon Leader — 100 lb, 11 yd",
    category: "Line & Leader",
    price: 34.99,
    tagline: "Heavy wind-on for big fish",
    blurb:
      "The hundred-pound version of the wind-on leader. Same knotless loop connection, same ability to wind through the guides — but rated for fish that would part the fifty. This is the leader for tuna, big halibut, and anything that goes near structure.",
    specs: [
      { label: "Strength", value: "100 lb test" },
      { label: "Length", value: "11 yds" },
      { label: "Material", value: "100% fluorocarbon" },
      { label: "Connection", value: "Braided loop, knotless" },
      { label: "Use", value: "Big fish, structure" },
      { label: "Brand", value: "Sufix" },
    ],
    features: [
      "Rated for fish that would break lighter leader on the first run",
      "Winds through the guides, so you can fight to the rod tip",
      "No leader knot to jam a guide at the worst moment",
      "Abrasion resistance that matters around rock and structure",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: ["fluoro-leader", "braided-line", "pliers"],
    whenToUse: "Big fish, or anywhere the fight will end up near structure.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110926XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "xrap-magnum",
    name: "Rapala X-Rap Magnum 15 — Hot Pink UV",
    category: "Lures",
    price: 21.99,
    tagline: "Dives to 15 feet on the troll",
    blurb:
      "A trolling minnow that runs at fifteen feet without weight or a downrigger — the lip does the work. Hot Pink UV is a colour that reads as bright to fish in water where everything else has gone grey.",
    specs: [
      { label: "Dive depth", value: "15 ft trolled" },
      { label: "Colour", value: "Hot Pink UV" },
      { label: "Type", value: "Trolling minnow" },
      { label: "Action", value: "Hard swimming" },
      { label: "Hooks", value: "VMC" },
      { label: "Brand", value: "Rapala X-Rap Magnum" },
    ],
    features: [
      "Reaches fifteen feet with nothing but the lip — no weight, no downrigger",
      "UV finish stays visible in deep or coloured water",
      "Hard swimming action that holds at trolling speed",
      "Rapala hardware, so the hooks and rings are not the weak point",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["lead-core", "flasher", "flush-mount-ss"],
    whenToUse: "Trolling the top fifteen feet, especially in coloured water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/89811XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "side-mount-rack",
    name: "Rod Saver Side Mount 6-Rod Holder",
    category: "Rod Holders",
    price: 37.75,
    tagline: "Six rods along a bulkhead",
    blurb:
      "Six rods held along a vertical surface rather than standing in a corner. Rod Saver make the strapping systems most boat owners already use; this is the same idea for a garage wall or a cabin bulkhead.",
    specs: [
      { label: "Capacity", value: "6 rods" },
      { label: "Mount", value: "Side / vertical surface" },
      { label: "Use", value: "Bulkhead, garage wall" },
      { label: "Brand", value: "Rod Saver" },
      { label: "Orientation", value: "Horizontal rods" },
      { label: "Fixings", value: "Not included" },
    ],
    features: [
      "Six rods off the floor in the width of a doorway",
      "Horizontal storage keeps tips out of the walking space",
      "Rod Saver is the standard name in boat rod storage",
      "Works as well in a garage as on a boat",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["rod-rack", "flush-mount-0", "tackle-bag"],
    whenToUse: "More rods than corners to lean them in.",
    featured: false,
    image: "https://productimageserver.com/product/xl/78045XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "rod-hanger",
    name: "TACO 2-Rod Hanger w/Poly Rack — Polished Stainless",
    category: "Rod Holders",
    price: 164.94,
    tagline: "Polished stainless, for a boat you care about",
    blurb:
      "Polished stainless with a poly rack that holds the rod without marking it. TACO make the outrigger hardware serious boats are rigged with, and this is that build quality applied to something as simple as hanging two rods.",
    specs: [
      { label: "Capacity", value: "2 rods" },
      { label: "Material", value: "Polished stainless" },
      { label: "Rack", value: "Poly, non-marking" },
      { label: "Mount", value: "Overhead or bulkhead" },
      { label: "Brand", value: "TACO Marine" },
      { label: "Finish", value: "Polished" },
    ],
    features: [
      "Poly rack holds the blank without marking the finish",
      "Polished stainless does not stain a clean boat",
      "TACO build quality, which is the outrigger standard",
      "The one to fit where the boat is part of the pleasure",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["side-mount-rack", "flush-mount-ss", "clamp-on-holder"],
    whenToUse: "A boat where the hardware is meant to look right as well as work.",
    featured: false,
    image: "https://productimageserver.com/product/xl/45916XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "dock-light",
    name: "Hydro Glow DM260G Dock Mounted Fishing Light — Green, 40W",
    category: "Lights",
    price: 175.00,
    tagline: "Green light over the water, bait underneath it",
    blurb:
      "Forty watts of green over the water on a mains supply. The chain is simple and reliable: light draws plankton, plankton draws bait, bait draws what you actually came for. Leave it on an hour before you fish.",
    specs: [
      { label: "Power", value: "40W / 120VAC" },
      { label: "Colour", value: "Green" },
      { label: "Mount", value: "Dock" },
      { label: "Use", value: "Night fishing" },
      { label: "Brand", value: "Hydro Glow" },
      { label: "Supply", value: "Mains" },
    ],
    features: [
      "Green penetrates water better than white and draws harder",
      "Switch it on an hour early and the bait is there when you start",
      "Mains powered, so no battery to run flat mid-session",
      "A fixed dock light turns one spot into a reliable one",
    ],
    gradient: ["#1d3320", "#3f7a4e"],
    glyph: "lamp",
    pairsWith: ["flood-light", "cooler", "pliers"],
    whenToUse: "Night fishing from a dock you can run power to.",
    featured: false,
    image: "https://productimageserver.com/product/xl/64976XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "flood-light",
    name: "Hydro Glow FL50 Flood Light — Green, 50W",
    category: "Lights",
    price: 195.00,
    tagline: "Fifty watts, thrown across the surface",
    blurb:
      "A flood rather than a submersible — it throws light across the surface instead of down through it. Useful for working an area rather than concentrating bait at one point, and for actually seeing what you are doing on the dock.",
    specs: [
      { label: "Power", value: "50W / 120VAC" },
      { label: "Colour", value: "Green" },
      { label: "Type", value: "Flood" },
      { label: "Coverage", value: "Surface spread" },
      { label: "Brand", value: "Hydro Glow" },
      { label: "Supply", value: "Mains" },
    ],
    features: [
      "Covers an area instead of concentrating one point",
      "Enough light to rig and unhook by, which a submersible is not",
      "Green keeps your night vision better than white floodlight",
      "Pairs with a submersible: one gathers, one lets you see",
    ],
    gradient: ["#1d3320", "#3f7a4e"],
    glyph: "lamp",
    pairsWith: ["dock-light", "pliers", "cooler"],
    whenToUse: "Working a stretch of dock, or needing to see while you fish.",
    featured: false,
    image: "https://productimageserver.com/product/xl/64987XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "xrap-30",
    name: "Rapala X-Rap Magnum 30 — Bunker",
    category: "Lures",
    price: 30.99,
    tagline: "Thirty feet down on the lip alone",
    blurb:
      "The deep one. Thirty feet without weight, a downrigger or lead core — the lip drags it down and holds it there. Bunker is a baitfish pattern, which is what you want when the fish are on schools rather than hunting anything that moves.",
    specs: [
      { label: "Dive depth", value: "30 ft trolled" },
      { label: "Colour", value: "Bunker" },
      { label: "Type", value: "Deep trolling minnow" },
      { label: "Action", value: "Hard swimming" },
      { label: "Hooks", value: "VMC" },
      { label: "Brand", value: "Rapala X-Rap Magnum" },
    ],
    features: [
      "Thirty feet with nothing but the lip doing the work",
      "Baitfish pattern for when fish are feeding on schools",
      "Holds its action at real trolling speed",
      "Reaches depths that usually need extra hardware",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["xrap-magnum", "lead-core", "flush-mount-ss"],
    whenToUse: "Fish holding deep, without rigging lead core or a downrigger.",
    featured: false,
    image: "https://productimageserver.com/product/xl/89851XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "xrap-20",
    name: "Rapala X-Rap Magnum 20 — Glass Ghost",
    category: "Lures",
    price: 28.99,
    tagline: "Twenty feet, translucent finish",
    blurb:
      "The middle depth of the Magnum range, in a translucent finish that reads as a real baitfish rather than a painted one. Glass Ghost is the colour for clear water and bright days, when a solid pattern looks like exactly what it is.",
    specs: [
      { label: "Dive depth", value: "20 ft trolled" },
      { label: "Colour", value: "Glass Ghost" },
      { label: "Type", value: "Trolling minnow" },
      { label: "Finish", value: "Translucent" },
      { label: "Hooks", value: "VMC" },
      { label: "Brand", value: "Rapala X-Rap Magnum" },
    ],
    features: [
      "Twenty feet fills the gap between the 15 and the 30",
      "Translucent bodies out-fish solid ones in clear water",
      "Same hardware as the rest of the Magnum range",
      "Bright-day colour for when the water is gin clear",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["xrap-magnum", "xrap-30", "lead-core"],
    whenToUse: "Clear water, bright light, fish in the middle of the column.",
    featured: false,
    image: "https://productimageserver.com/product/xl/89835XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "xplode-170",
    name: "Rapala X-Rap Magnum Xplode 170 — Dorado",
    category: "Lures",
    price: 29.99,
    tagline: "Surface bait for fish that come up",
    blurb:
      "The Xplode works the surface rather than diving — for the moments when fish are pushing bait up and a deep-diving plug swims straight under the action. Dorado is the high-contrast colour for blue water.",
    specs: [
      { label: "Type", value: "Surface / shallow" },
      { label: "Size", value: "170 mm" },
      { label: "Colour", value: "Dorado" },
      { label: "Use", value: "Fish feeding on top" },
      { label: "Hooks", value: "VMC" },
      { label: "Brand", value: "Rapala X-Rap Magnum Xplode" },
    ],
    features: [
      "Works the surface, where the diving plugs miss the action entirely",
      "170 mm is a big profile for fish committed to big bait",
      "Dorado is high contrast in blue water",
      "The lure to have ready when a school pushes bait up",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["xrap-magnum", "tuna-catcher", "flush-mount-ss"],
    whenToUse: "Fish busting bait on the surface.",
    featured: false,
    image: "https://productimageserver.com/product/xl/96763XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "tuna-catcher",
    name: "Williamson High-Speed Tuna Catcher Rigged 8″ — Mahi",
    category: "Lures",
    price: 35.25,
    tagline: "Rigged and ready for a fast troll",
    blurb:
      "A skirted trolling lure built for speed — it holds together and keeps swimming at the pace you cover water looking for tuna, where slower lures blow out and spin. Arrives rigged, so it goes straight in the spread.",
    specs: [
      { label: "Length", value: "8″" },
      { label: "Colour", value: "Mahi" },
      { label: "Type", value: "Skirted trolling" },
      { label: "Speed", value: "High-speed rated" },
      { label: "Rigged", value: "Yes, ready to fish" },
      { label: "Brand", value: "Williamson" },
    ],
    features: [
      "Holds its swim at speeds that blow out ordinary skirts",
      "Arrives rigged — straight into the spread",
      "Eight inches is the searching size for tuna",
      "Mahi pattern for blue water and bright days",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["xplode-170", "flush-mount-ss", "fluoro-100"],
    whenToUse: "Covering water fast, looking for tuna or dorado.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105346XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "edge-deep",
    name: "Plano EDGE Professional 3700 Deep Stowaway",
    category: "Accessories",
    price: 44.99,
    tagline: "Waterproof, rust-inhibiting, deep",
    blurb:
      "The professional-grade EDGE box: a proper waterproof gasket, Rustrictor coating on every surface, and enough depth for bulky baits. Salt gets into everything, and this is the box designed on the assumption that it will.",
    specs: [
      { label: "Size", value: "3700, deep" },
      { label: "Seal", value: "Waterproof gasket" },
      { label: "Coating", value: "Rustrictor" },
      { label: "Latch", value: "Dual, positive" },
      { label: "Series", value: "EDGE Professional" },
      { label: "Brand", value: "Plano" },
    ],
    features: [
      "A real gasket, not a claimed one",
      "Rustrictor on every internal surface, not just the base",
      "Depth for jigs and bulky plastics",
      "The box to buy for anything you would hate to find rusted",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: ["stowaway-4pack", "edge-thin", "tackle-bag"],
    whenToUse: "Anything you would be annoyed to open and find corroded.",
    featured: false,
    image: "https://productimageserver.com/product/xl/79717XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "edge-thin",
    name: "Plano EDGE Professional 3700 Thin Stowaway",
    category: "Accessories",
    price: 39.99,
    tagline: "Same protection, half the depth",
    blurb:
      "The shallow EDGE, which is what you actually want for hooks, blades, swivels and anything flat. Two thin boxes fit the slot one deep box takes, so the format is a genuine choice rather than a compromise.",
    specs: [
      { label: "Size", value: "3700, thin" },
      { label: "Seal", value: "Waterproof gasket" },
      { label: "Coating", value: "Rustrictor" },
      { label: "Best for", value: "Hooks, blades, terminal" },
      { label: "Series", value: "EDGE Professional" },
      { label: "Brand", value: "Plano" },
    ],
    features: [
      "Two thin boxes stack into one deep slot",
      "The right depth for flat terminal tackle",
      "Same gasket and Rustrictor as the deep version",
      "Stops small hardware rattling around in a box too big for it",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: ["edge-deep", "stowaway-4pack", "tackle-bag"],
    whenToUse: "Hooks, swivels, blades — anything that lies flat.",
    featured: false,
    image: "https://productimageserver.com/product/xl/79715XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "angled-system",
    name: "Plano Guide Series Angled Tackle System w/5 StowAways",
    category: "Accessories",
    price: 98.99,
    tagline: "Five boxes, angled so you can see them",
    blurb:
      "A hard system that holds five 3700 boxes at an angle, so you can read the contents without pulling each one out. That sounds trivial until you have hunted through a stack of identical boxes in the dark for one specific hook.",
    specs: [
      { label: "Capacity", value: "5 × 3700 boxes" },
      { label: "Boxes", value: "Included" },
      { label: "Layout", value: "Angled for visibility" },
      { label: "Type", value: "Hard system" },
      { label: "Series", value: "Guide Series" },
      { label: "Brand", value: "Plano" },
    ],
    features: [
      "Angled boxes mean you read the contents instead of guessing",
      "Five boxes included, not sold separately",
      "Hard shell for a boat deck or a truck bed",
      "The step up from a soft bag once the collection outgrows it",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: ["edge-deep", "edge-thin", "tackle-bag"],
    whenToUse: "When one bag has stopped being enough.",
    featured: false,
    image: "https://productimageserver.com/product/xl/66576XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "side-mount-4",
    name: "Rod Saver Side Mount 4-Rod Holder",
    category: "Rod Holders",
    price: 32.99,
    tagline: "Four rods, smaller footprint",
    blurb:
      "The four-rod version of the side mount, for a smaller wall or a boat where six would be greedy. Same idea: rods held horizontally along a vertical surface, tips out of the walkway.",
    specs: [
      { label: "Capacity", value: "4 rods" },
      { label: "Mount", value: "Side / vertical surface" },
      { label: "Orientation", value: "Horizontal" },
      { label: "Use", value: "Bulkhead, garage" },
      { label: "Brand", value: "Rod Saver" },
      { label: "Fixings", value: "Not included" },
    ],
    features: [
      "Four rods where six would not fit",
      "Horizontal storage keeps tips out of the walkway",
      "Rod Saver strapping holds without pinching the blank",
      "Cheaper than the six if you own four rods",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["side-mount-rack", "rod-rack", "rod-hanger"],
    whenToUse: "A shorter wall, or four rods rather than six.",
    featured: false,
    image: "https://productimageserver.com/product/xl/78044XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "rod-hanger-single",
    name: "Tigress Premium Silver Anodized Rod Hanger",
    category: "Rod Holders",
    price: 34.99,
    tagline: "Anodized aluminium, one rod",
    blurb:
      "A single anodized hanger — the unit you buy several of and space out to suit your own rods, rather than accepting whatever spacing a fixed rack came with. Anodized aluminium, so it stays clean in salt air.",
    specs: [
      { label: "Capacity", value: "1 rod" },
      { label: "Material", value: "Anodized aluminium" },
      { label: "Finish", value: "Silver" },
      { label: "Mount", value: "Overhead or bulkhead" },
      { label: "Brand", value: "Tigress" },
      { label: "Spacing", value: "You choose" },
    ],
    features: [
      "Buy several and space them to fit your own rods",
      "Anodized aluminium survives salt air without staining",
      "Overhead or bulkhead mounting",
      "The flexible answer where a fixed rack does not fit",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: ["rod-hanger", "side-mount-4", "rod-rack"],
    whenToUse: "When a fixed rack does not match the rods you actually own.",
    featured: false,
    image: "https://productimageserver.com/product/xl/63719XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "tool-holder-2",
    name: "Rapala Magnetic Tool Holder — Two Place",
    category: "Accessories",
    price: 24.99,
    tagline: "Two tools, the common case",
    blurb:
      "Two places rather than three, which covers what most people actually carry: pliers and cutters. Same magnets, same one-handed release, less strip to mount.",
    specs: [
      { label: "Capacity", value: "2 tools" },
      { label: "Hold", value: "Magnetic" },
      { label: "Release", value: "One-handed" },
      { label: "Mount", value: "Bag, gunwale, cooler" },
      { label: "Brand", value: "Rapala" },
      { label: "Stock", value: "Deep" },
    ],
    features: [
      "Two is what most people carry, so two is what most people need",
      "One-handed release with a fish in the other hand",
      "Shorter strip fits where the three-place will not",
      "Deep stock, so it is reliably available",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: ["pliers", "tool-holder-3", "tackle-bag"],
    whenToUse: "Pliers and cutters, which is most anglers.",
    featured: false,
    image: "https://productimageserver.com/product/xl/88960XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "mag-spring-pliers",
    name: "Rapala Mag Spring Pliers — 4″",
    category: "Accessories",
    price: 30.99,
    tagline: "Short pliers for fine work",
    blurb:
      "Four inches, for the jobs eight-inch pliers are clumsy at — small hooks, split rings, crimps and anything needing your fingers close to the work. The magnetic spring keeps them shut in a pocket and open in your hand.",
    specs: [
      { label: "Length", value: "4″" },
      { label: "Spring", value: "Magnetic" },
      { label: "Use", value: "Small hooks, split rings" },
      { label: "Grip", value: "Ergonomic" },
      { label: "Brand", value: "Rapala" },
      { label: "Pairs with", value: "8″ pliers" },
    ],
    features: [
      "Fine work that big pliers fumble",
      "Magnetic spring holds them closed in a pocket",
      "A second pair, not a replacement for the eight inch",
      "Small enough to live in a jacket rather than a bag",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: ["pliers", "tool-holder-2", "edge-thin"],
    whenToUse: "Small hooks, split rings, and anything fiddly.",
    featured: false,
    image: "https://productimageserver.com/product/xl/96773XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "gripper-scale",
    name: "Rapala 50 lb Digital Fish Gripper Scale",
    category: "Accessories",
    price: 74.99,
    tagline: "Grips and weighs in one motion",
    blurb:
      "A lip gripper with a digital scale built into the handle, so the fish is controlled and weighed in one movement instead of two. Fifty pounds covers essentially everything you will land from shore or a small boat.",
    specs: [
      { label: "Capacity", value: "50 lb" },
      { label: "Type", value: "Gripper + digital scale" },
      { label: "Readout", value: "Digital" },
      { label: "Handling", value: "Lip grip" },
      { label: "Brand", value: "Rapala" },
      { label: "Use", value: "Weigh and release" },
    ],
    features: [
      "One motion instead of juggling a gripper and a separate scale",
      "Lip grip controls the fish without hands in the gill plate",
      "Fifty pounds covers shore and small-boat fishing entirely",
      "Weigh, record, release — the fish is out of the water for seconds",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: ["pliers", "landing-net", "tool-holder-2"],
    whenToUse: "Any fish worth recording, especially if you intend to release it.",
    featured: false,
    image: "https://productimageserver.com/product/xl/96767XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "cull-tags",
    name: "Rapala Lip-Grip Cull Tags",
    category: "Accessories",
    price: 35.99,
    tagline: "Keep track of which fish is which",
    blurb:
      "Numbered tags for keeping fish identifiable in a live well — tournament kit, but useful to anyone holding several fish and deciding what to keep. Clip on the lip, read the number, no guessing which one was the good one.",
    specs: [
      { label: "Type", value: "Numbered cull tags" },
      { label: "Attachment", value: "Lip grip" },
      { label: "Use", value: "Live well, tournaments" },
      { label: "Set", value: "Multiple tags" },
      { label: "Brand", value: "Rapala" },
      { label: "Reusable", value: "Yes" },
    ],
    features: [
      "Fish stop being interchangeable the moment they are in a well",
      "Tournament standard, useful to anyone culling",
      "Lip-grip attachment does not damage the fish",
      "Reusable season after season",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["gripper-scale", "bait-bucket", "aerator-floating"],
    whenToUse: "Holding several fish and deciding which to keep.",
    featured: false,
    image: "https://productimageserver.com/product/xl/85650XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "leader-spool-holder",
    name: "Deep Blue Marine Spool King Leader Line Holder",
    category: "Accessories",
    price: 30.99,
    tagline: "Leader spools that do not unravel",
    blurb:
      "Holds leader spools so they pay out one at a time instead of unwinding into a bird nest in the bottom of a bag. A small problem, but one that costs you five minutes every time it happens.",
    specs: [
      { label: "Holds", value: "Leader spools" },
      { label: "Mount", value: "Boat, bag, bench" },
      { label: "Access", value: "Pay out individually" },
      { label: "Brand", value: "Deep Blue Marine" },
      { label: "Material", value: "Marine plastic" },
      { label: "Use", value: "Leader storage" },
    ],
    features: [
      "Spools pay out one at a time instead of tangling together",
      "Fixes a small problem that costs five minutes each time",
      "Mounts on a boat or sits on a bench",
      "Keeps leader material off the deck",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "spool",
    pairsWith: ["fluoro-leader", "fluoro-100", "tackle-bag"],
    whenToUse: "Once you carry more than one spool of leader.",
    featured: false,
    image: "https://productimageserver.com/product/xl/108209XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "downrigger",
    name: "Scotty 1060 Depthking Manual Downrigger w/Rod Holder",
    category: "Accessories",
    price: 230.99,
    tagline: "Precise depth, no batteries",
    blurb:
      "A manual downrigger with a rod holder built in. It puts your bait at an exact depth and keeps it there — the difference between fishing where you hope the fish are and fishing where you know they are. Manual means nothing to fail electrically.",
    specs: [
      { label: "Type", value: "Manual downrigger" },
      { label: "Rod holder", value: "Integrated" },
      { label: "Depth", value: "Precise, by counter" },
      { label: "Power", value: "None required" },
      { label: "Brand", value: "Scotty" },
      { label: "Model", value: "1060 Depthking" },
    ],
    features: [
      "Exact depth, held there, rather than an educated guess",
      "Manual — no motor, no wiring, nothing electrical to fail",
      "Rod holder integrated, so it is one mounting job not two",
      "Scotty is the name most downrigger accessories are built to fit",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["downrigger-cable", "weight-retriever", "lead-core"],
    whenToUse: "Trolling when the fish are at a depth worth hitting exactly.",
    featured: false,
    image: "https://productimageserver.com/product/xl/34281XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "weight-retriever",
    name: "Scotty 3025 Downrigger Weight Retriever",
    category: "Accessories",
    price: 24.99,
    tagline: "Gets the ball up without your hands on the cable",
    blurb:
      "Retrieves the downrigger weight without you hauling on the cable by hand. Downrigger cable under load will cut a finger open, and this is the tool that means it never gets the chance.",
    specs: [
      { label: "Use", value: "Weight retrieval" },
      { label: "Fits", value: "Scotty downriggers" },
      { label: "Safety", value: "Hands off the cable" },
      { label: "Brand", value: "Scotty" },
      { label: "Model", value: "3025" },
      { label: "Material", value: "Marine grade" },
    ],
    features: [
      "Keeps your hands off loaded cable, which is the point",
      "Faster than hauling by hand at the end of every drop",
      "Fits the Scotty downrigger range",
      "Cheap next to a cut hand",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["downrigger", "downrigger-cable", "pulley-kit"],
    whenToUse: "Every time you bring the ball up, which is often.",
    featured: false,
    image: "https://productimageserver.com/product/xl/35531XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "pulley-kit",
    name: "Scotty 1014 Downrigger Pulley Replacement Kit",
    category: "Accessories",
    price: 29.95,
    tagline: "The part that wears out first",
    blurb:
      "The terminal pulley is the component doing the most work on a downrigger and the one that wears out first. Replacing it is cheap and quick; discovering it has seized mid-season is neither.",
    specs: [
      { label: "Fits", value: "1″ and 3/4″ booms" },
      { label: "Part", value: "Terminal pulley" },
      { label: "Type", value: "Replacement kit" },
      { label: "Brand", value: "Scotty" },
      { label: "Model", value: "1014" },
      { label: "Fitment", value: "Scotty downriggers" },
    ],
    features: [
      "The first part on a downrigger to wear out",
      "Cheap to keep spare, expensive to discover mid-season",
      "Fits both common boom diameters",
      "A ten-minute job with the kit, a lost day without it",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["downrigger", "downrigger-cable", "weight-retriever"],
    whenToUse: "Preventive — buy it before you need it.",
    featured: false,
    image: "https://productimageserver.com/product/xl/99579XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "downrigger-cable",
    name: "Scotty 200 ft Premium Stainless Downrigger Cable",
    category: "Accessories",
    price: 33.99,
    tagline: "Two hundred feet of replacement cable",
    blurb:
      "Downrigger cable kinks, frays and eventually parts, usually with a ball on the end of it. Two hundred feet of premium stainless is a spare you keep rather than a repair you make in a hurry.",
    specs: [
      { label: "Length", value: "200 ft" },
      { label: "Material", value: "Premium stainless" },
      { label: "Use", value: "Downrigger replacement" },
      { label: "Brand", value: "Scotty" },
      { label: "Model", value: "Replacement cable" },
      { label: "Fitment", value: "Scotty downriggers" },
    ],
    features: [
      "Cable fails eventually — usually with a weight attached",
      "Two hundred feet is a full respool with margin",
      "Premium stainless resists the kinking that starts the failure",
      "Keep it aboard rather than buying it after the fact",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "spool",
    pairsWith: ["downrigger", "pulley-kit", "weight-retriever"],
    whenToUse: "Before the cable frays, not after.",
    featured: false,
    image: "https://productimageserver.com/product/xl/34299XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "aerator-floating",
    name: "Rapala Floating Aerator",
    category: "Bait & Live Wells",
    price: 39.99,
    tagline: "Drop it in the bucket and forget it",
    blurb:
      "A floating aerator that goes straight into a bait bucket with no plumbing and no mounting. Bait that stays lively catches disproportionately more than bait that is merely alive, and this is the cheapest way to keep it that way.",
    specs: [
      { label: "Type", value: "Floating aerator" },
      { label: "Install", value: "None — drop in" },
      { label: "Use", value: "Bait bucket, live well" },
      { label: "Power", value: "Battery" },
      { label: "Brand", value: "Rapala" },
      { label: "Portability", value: "Fully portable" },
    ],
    features: [
      "No plumbing, no mounting, no install of any kind",
      "Lively bait out-fishes barely-alive bait by a wide margin",
      "Moves between buckets, boats and shore trips",
      "The cheapest thing here relative to the difference it makes",
    ],
    gradient: ["#1c3340", "#3f7089"],
    glyph: "rig",
    pairsWith: ["bait-bucket", "aerator-110", "cooler"],
    whenToUse: "Any trip using live bait, from shore or a boat.",
    featured: false,
    image: "https://productimageserver.com/product/xl/66342XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "bait-bucket",
    name: "Frabill Dual Fish Bait Bucket w/Built-In Aerator",
    category: "Bait & Live Wells",
    price: 27.49,
    tagline: "Bucket and aerator in one",
    blurb:
      "A two-chamber bait bucket with the aerator built in rather than clipped on. The inner chamber lifts out, so you can get at bait without emptying the whole thing over the deck.",
    specs: [
      { label: "Type", value: "Dual-chamber bucket" },
      { label: "Aerator", value: "Built in" },
      { label: "Inner", value: "Lift-out chamber" },
      { label: "Use", value: "Live bait" },
      { label: "Brand", value: "Frabill" },
      { label: "Portability", value: "Carry handle" },
    ],
    features: [
      "Aerator built in, so there is nothing to lose or forget",
      "Lift-out inner chamber gets you bait without a spill",
      "Two chambers separate bait from the water you carry",
      "Frabill are the default name in live-bait handling",
    ],
    gradient: ["#1c3340", "#3f7089"],
    glyph: "cooler",
    pairsWith: ["aerator-floating", "aerator-110", "cooler"],
    whenToUse: "Live bait, especially anything delicate like anchovies.",
    featured: false,
    image: "https://productimageserver.com/product/xl/71462XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "aerator-110",
    name: "Frabill Aqua-Life Single Output Aerator — 110V",
    category: "Bait & Live Wells",
    price: 44.99,
    tagline: "Mains aerator for holding bait overnight",
    blurb:
      "A mains-powered aerator for holding bait longer than a day — a garage tub the night before a trip, or a dock tank between sessions. Mains power means it runs indefinitely rather than until the batteries die.",
    specs: [
      { label: "Power", value: "110V mains" },
      { label: "Output", value: "Single" },
      { label: "Use", value: "Overnight, dock, garage" },
      { label: "Runtime", value: "Indefinite" },
      { label: "Series", value: "Aqua-Life" },
      { label: "Brand", value: "Frabill" },
    ],
    features: [
      "Runs indefinitely instead of until the batteries fade",
      "Hold bait overnight so a dawn start does not need a bait stop",
      "Single output is enough for one tub or tank",
      "Pairs with the floating aerator for the trip itself",
    ],
    gradient: ["#1c3340", "#3f7089"],
    glyph: "rig",
    pairsWith: ["aerator-floating", "bait-bucket", "dock-light"],
    whenToUse: "Holding bait overnight before an early start.",
    featured: false,
    image: "https://productimageserver.com/product/xl/71480XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "dock-light-blue",
    name: "Hydro Glow DM260B Dock Mounted Fishing Light — Blue, 40W",
    category: "Lights",
    price: 175.00,
    tagline: "Blue, for clearer water",
    blurb:
      "The blue version of the dock light. Blue penetrates clear water further than green, while green wins in water with any colour to it — so the honest answer is that it depends on where you fish, and locals usually know which works.",
    specs: [
      { label: "Power", value: "40W / 120VAC" },
      { label: "Colour", value: "Blue" },
      { label: "Mount", value: "Dock" },
      { label: "Best in", value: "Clear water" },
      { label: "Brand", value: "Hydro Glow" },
      { label: "Supply", value: "Mains" },
    ],
    features: [
      "Blue reaches further in clear water than green does",
      "Green wins where the water carries colour — pick for your spot",
      "Mains powered, so no battery management",
      "Ask locally which colour works; opinions are strong and usually right",
    ],
    gradient: ["#1d3320", "#3f7a4e"],
    glyph: "lamp",
    pairsWith: ["dock-light", "flood-light", "cooler"],
    whenToUse: "Clear-water docks, where blue out-reaches green.",
    featured: false,
    image: "https://productimageserver.com/product/xl/64977XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "submersible-light",
    name: "Hydro Glow HG1000G Submersible Fishing Light — Green, 84W, 12V",
    category: "Lights",
    price: 209.95,
    tagline: "Goes in the water, runs off a battery",
    blurb:
      "Eighty-four watts on twelve volts, designed to go in the water rather than hang above it. Under the surface there is no reflection loss, so far more of the light does the job — and 12V means it runs off a boat battery instead of a dock outlet.",
    specs: [
      { label: "Power", value: "84W / 12V / 7A" },
      { label: "Colour", value: "Green" },
      { label: "Type", value: "Submersible" },
      { label: "Supply", value: "12V battery" },
      { label: "Brand", value: "Hydro Glow" },
      { label: "Model", value: "HG1000G" },
    ],
    features: [
      "Submerged light loses nothing to surface reflection",
      "12V runs from a boat battery, no shore power needed",
      "Eighty-four watts is a serious draw of bait",
      "Green is the workhorse colour for most water",
    ],
    gradient: ["#1d3320", "#3f7a4e"],
    glyph: "lamp",
    pairsWith: ["dock-light", "flood-light", "aerator-floating"],
    whenToUse: "Anchored at night, or anywhere without shore power.",
    featured: false,
    image: "https://productimageserver.com/product/xl/86180XL.jpg",
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

/**
 * Keys with no supplier behind them yet.
 *
 * These are the seven placeholders CWR cannot fill — see the sourcing note at
 * the top of this file. Their pages still resolve, because USTideCharts links
 * to every one of them and breaking those links loses attribution we can't
 * get back. But they are:
 *
 *   · hidden from every browsing surface (home, /products, collections,
 *     "pairs with", sitemap)
 *   · not purchasable — AddToCart is replaced, the Offer says OutOfStock,
 *     and /api/checkout rejects them server-side
 *
 * Delete a key from this set the moment a real supplier product replaces it.
 * Nothing else needs changing.
 */
export const UNSOURCED: ReadonlySet<string> = new Set([
  "surf-rod",
  "inshore-combo",
  "circle-hooks",
  "carolina-kit",
  "swimbait-kit",
  "sand-spike",
  "headlamp",
]);

/** Can a customer actually buy this today? */
export function isSourced(p: Product | string): boolean {
  return !UNSOURCED.has(typeof p === "string" ? p : p.key);
}

/**
 * THE SURF STARTER BUNDLE.
 *
 * Four things that make a session work, sold together at a discount. The
 * discount is real and applied server-side in /api/checkout — the homepage
 * used to advertise "save 12%" against a button that added nothing to the
 * cart, which meant quoting a price we would not have honoured.
 *
 * Keys are filtered through isSourced() everywhere they're used, so an
 * unsourced product silently drops out of the bundle instead of advertising
 * something we can't ship. If fewer than MIN_ITEMS survive, the bundle is
 * withdrawn entirely rather than shown as a "bundle" of one.
 */
export const BUNDLE = {
  name: "The Surf Starter",
  keys: ["braided-line", "fluoro-leader", "pliers", "landing-net"],
  discount: 0.12,
  minItems: 3,
} as const;

export function bundleItems(): Product[] {
  return BUNDLE.keys
    .map(getProduct)
    .filter((p): p is Product => Boolean(p) && isSourced(p!));
}

export function bundleAvailable(): boolean {
  return bundleItems().length >= BUNDLE.minItems;
}

/**
 * Does this cart earn the bundle discount?
 *
 * Every currently-available bundle item must be present. Computed from keys
 * only — the client never tells us whether it qualifies, it just sends what
 * is in the cart and the server decides.
 */
export function cartEarnsBundle(keys: string[]): boolean {
  if (!bundleAvailable()) return false;
  const inCart = new Set(keys);
  return bundleItems().every((p) => inCart.has(p.key));
}

/** Everything we're willing to show a browsing customer. */
export function listed(): Product[] {
  return PRODUCTS.filter(isSourced);
}

export function allKeys(): string[] {
  return PRODUCTS.map((p) => p.key);
}

export function byCategory(name: Category): Product[] {
  return listed().filter((p) => p.category === name);
}

export function categoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

/**
 * Categories that currently contain something a customer can buy.
 *
 * Empty categories keep their pages — the slugs are linked from elsewhere and
 * they explain themselves honestly — but they drop out of the nav, the
 * footer, and the /products index, because a menu item leading to nothing is
 * a small betrayal.
 */
export function activeCategories() {
  return CATEGORIES.filter((c) => byCategory(c.name).length > 0);
}

export function featured(): Product[] {
  return listed().filter((p) => p.featured);
}

export function related(p: Product): Product[] {
  return p.pairsWith
    .map(getProduct)
    .filter((x): x is Product => Boolean(x) && isSourced(x!));
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
