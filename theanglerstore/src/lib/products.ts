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
  {
    key: "braid-hivis",
    name: "Sufix 832 Braid — 20 lb, Hi-Vis Yellow, 300 yd",
    category: "Line & Leader",
    price: 40.99,
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
    price: 40.99,
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
    price: 25.99,
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
    price: 36.99,
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
    price: 31.14,
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
    price: 26.95,
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
    price: 44.99,
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
    price: 31.99,
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
    price: 26.99,
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
