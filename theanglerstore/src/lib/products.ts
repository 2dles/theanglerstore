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
  | "Surf Rods"
  | "Line & Leader"
  | "Terminal Tackle"
  | "Lures"
  | "Nets & Landing"
  | "Tools"
  | "Tackle Storage"
  | "Rod Holders"
  | "Downriggers"
  | "Lights"
  | "Bait & Live Wells"
  | "Coolers"
  | "Trolling & Rigging"
  | "Kayak & Paddle"
  | "Safety & Flotation"
  | "Soft Baits"
  | "Reels"
  | "Rod & Reel Combos";

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
   * Overrides the family derived from the title.
   *
   * Grouping normally comes from everything before the em dash, which works
   * until two spellings of the same product exist — five spools titled
   * "Sufix 832 Braid" sat in a different family from nine titled "Sufix 832
   * Advanced Superline Braid", so the shopper looking for 20 lb Hi-Vis was
   * told it didn't exist. Titles are now unified, but an explicit key means a
   * future rename can't silently split a family again.
   */
  familyKey?: string;
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

export const CATEGORIES: {
  slug: string;
  name: Category;
  blurb: string;
  /**
   * The <title>. Was bare "{Name} | TheAnglerStore" on all 18 — "Lures |
   * TheAnglerStore" competes with every tackle shop on earth and tells a
   * searcher nothing about what is behind the link. The modifier names what
   * the page actually holds, which is also the thing someone is searching for.
   */
  title: string;
  /**
   * A plain warning shown at the top of the collection, where the catalogue
   * cannot do what the storefront implies.
   *
   * Not marketing. This exists because every reel we stock is freshwater-rated
   * by its own manufacturer, on a site whose title promises surf and inshore
   * tackle — so somebody buying an 11-foot surf rod has nothing here to put on
   * it. Saying so costs a sale we were not going to complete honestly anyway,
   * and burying it costs a customer.
   */
  notice?: string;
  /**
   * Show in the header and footer nav. Ten categories is the right shape for
   * /products but too many for a header row, so the deeper ones live one click
   * in. Every category still gets its own page and sits in the sitemap.
   */
  nav?: boolean;
}[] = [
  // ORDER IS DELIBERATE and shared by the header, the homepage chips,
  // the /products filter and the mobile menu. Rods, reels and the things
  // you tie to line first; boat hardware and safety later. New categories
  // used to be appended, which is how Reels ended up last in every list.
  {
    slug: "surf-rods",
    name: "Surf Rods",
    title: "Surf Rods. Two-Piece Beach & Pier Rods",
    notice:
      "These rods are saltwater rods. The reels we sell separately are not, every one is freshwater-rated by its manufacturer, so we can't sell you a reel to put on one of these. Bring your own, or take a Daiwa D-Wave combo instead, which arrives as a matched saltwater rod and reel.",
    blurb:
      "Two-piece surf rods, which is the honest answer to a hard problem: a one-piece 10-foot blank ships as oversize freight and costs more to send than it does to make. Break it in half and it goes in a normal parcel.",
    nav: true,
  },
  {
    slug: "reels",
    name: "Reels",
    title: "Spinning Reels for Rod & Combo Builds",
    notice:
      "Every reel we sell on its own is rated by its manufacturer for freshwater only, none of them publish a saltwater rating, and we won't invent one. If you're building a surf or jetty setup, these are not the reels for it. The saltwater reels we can get come matched to a rod, in the Daiwa D-Wave combos.",
    blurb:
      "Spinning reels from Daiwa and Abu Garcia. Every one here is a freshwater reel and labelled as such, none of these manufacturers publishes a saltwater rating or a sealed-bearing claim for these models, and we don't make claims they don't. A surf reel we'd actually stand behind is still on the list.",
    nav: true,
  },
  {
    slug: "combos",
    name: "Rod & Reel Combos",
    title: "Rod & Reel Combos. Ready to Fish",
    blurb:
      "Rod and reel sold together, matched and balanced by the manufacturer. Some are saltwater outfits and some are strictly freshwater. Every one says which, in its own spec table, using the manufacturer's rating and not ours.",
    nav: true,
  },
  {
    slug: "line-leader",
    name: "Line & Leader",
    title: "Braid, Fluorocarbon Leader & Lead Core",
    blurb:
      "Eight-strand braid and true 100% fluorocarbon. The cheapest meaningful upgrade in fishing, and the one most anglers put off longest.",
    nav: true,
  },
  {
    slug: "terminal-tackle",
    name: "Terminal Tackle",
    title: "Hooks, Swivels & Weights for Bottom Rigs",
    blurb:
      "Hooks, swivels and weights, the small metal that decides whether a bite becomes a fish. This category sat empty for months because our marine distributor doesn't stock a single fishing hook. It is no longer empty.",
    nav: true,
  },
  {
    slug: "lures",
    name: "Lures",
    title: "Fishing Lures. Jigs, Plugs & Hard Baits",
    blurb:
      "Metal and plastic that gets down and stays down. Jigs built to rotate and flash on the fall, and trolling plugs that reach depth on the lip alone.",
    nav: true,
  },
  {
    slug: "soft-baits",
    name: "Soft Baits",
    title: "Soft Plastics. Worms, Flukes & Craws",
    blurb:
      "Worms, craws, creatures and stick baits, the plastic half of freshwater fishing. Almost everything here is under ten dollars and none of it justifies its own shipping label, so buy a handful at once and let them ride in the same box.",
    nav: true,
  },
  {
    slug: "nets-landing",
    name: "Nets & Landing",
    title: "Landing Nets, Handles & Gaffs",
    blurb:
      "Getting the fish out of the water is the part people skimp on and then regret. Nets, the handles that reach them, and the adapter that puts the hoop at a usable angle.",
    nav: true,
  },
  {
    slug: "tools",
    name: "Tools",
    title: "Pliers, Grippers & Scales",
    blurb:
      "Pliers, grippers, scales and somewhere to hang them. Everything here is chosen to survive salt and to work one-handed, because the other hand is usually holding a fish.",
    nav: true,
  },
  {
    slug: "tackle-storage",
    name: "Tackle Storage",
    title: "Tackle Boxes, Trays & Backpacks",
    blurb:
      "Boxes, trays and packs, mostly in the 3700 format that nearly every bag is built around. The point of good storage isn't tidiness, it's not losing ten minutes to a knot of jig heads.",
    nav: true,
  },
  {
    slug: "trolling-rigging",
    name: "Trolling & Rigging",
    title: "Trolling Gear. Divers, Flashers & Releases",
    blurb:
      "Release clips, snubbers, stops and outrigger hardware, the small parts that make a downrigger or a rigger actually work, and the ones that wear out, break or go over the side. This is the consumable end of trolling.",
  },
  {
    slug: "downriggers",
    name: "Downriggers",
    title: "Downriggers, Cable & Weight Retrievers",
    blurb:
      "Precise depth, held there, instead of an educated guess. A manual downrigger and the parts that wear out on it, cable and terminal pulleys go before anything else does.",
  },
  {
    slug: "rod-holders",
    name: "Rod Holders",
    title: "Rod Holders. Flush, Clamp & Rack Mounts",
    blurb:
      "Somewhere to put the rod that isn't your hand or the sand. Flush mounts for a gunwale, clamp-ons for a rail, racks for the garage wall. CWR is a marine distributor first, and this is the category where that shows.",
    nav: true,
  },
  {
    slug: "kayak-paddle",
    name: "Kayak & Paddle",
    title: "Kayak Fishing Gear. Anchors & Mounts",
    blurb:
      "Rigging for a fishing kayak: track-mount rod holders, anchor gear that works one-handed from a seated position, leashes, plugs and a finder mount stiff enough for chop. Nothing here needs you to drill a new hole below the waterline.",
  },
  {
    slug: "bait-live-wells",
    name: "Bait & Live Wells",
    title: "Bait Buckets & Live-Well Aerators",
    blurb:
      "Keeping bait alive is most of the battle. A dead anchovy catches a fraction of what a lively one does, and an aerator is the cheapest thing on this site measured against the difference it makes.",
  },
  {
    slug: "lights",
    name: "Lights",
    title: "Dock, Flood & Submersible Fishing Lights",
    blurb:
      "Green and blue submersible and dock lights. Light draws plankton, plankton draws bait, bait draws what you're after, it's the oldest trick in night fishing and it still works.",
  },
  {
    slug: "coolers",
    name: "Coolers",
    title: "Fishing Coolers & Soft-Sided Packs",
    blurb:
      "Cold storage that actually ships well. We looked hard at big rotomolded hard coolers and decided against them: they cost more to freight than they do to make.",
  },
  {
    slug: "safety-flotation",
    name: "Safety & Flotation",
    title: "Safety Gear. Strobes, Whistles & Throw Bags",
    blurb:
      "Whistles, strobes, a signalling mirror, a throw bag and a grab bag. We describe safety equipment using only what the manufacturer states, where a product carries no USCG or SOLAS approval, we say so rather than implying one.",
  },
];

export const PRODUCTS: Product[] = [
  {
    key: "surf-rod",
    name: "Daiwa FT Surf Spinning Rod — 10', 2-Piece Medium",
    category: "Surf Rods",
    price: 34.99,
    tagline: "Fiberglass, two-piece, honestly priced",
    blurb:
      "Ten feet is the length most surfcasters land on: enough to clear the first break and keep a bait out past it, still short enough to cast all day without your shoulders filing a complaint. Fiberglass rather than graphite, which is the trade Daiwa made deliberately: heavier in the hand, far harder to break, and a third of the price. Two-piece, so it ships as a normal parcel instead of an oversize freight item.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Length", value: "10'" },
      { label: "Pieces", value: "2" },
      { label: "Power", value: "Medium" },
      { label: "Blank", value: "Fiberglass" },
      { label: "Casting weight", value: "1–4 oz" },
      { label: "Line rating", value: "10–20 lb" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Two-piece, ships as a parcel, fits in a car",
      "Fiberglass blank: forgiving, and very hard to break",
      "10–20 lb line, 1–4 oz casting weight",
      "Daiwa's entry surf series, priced accordingly",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rod",
    pairsWith: ["circle-hooks", "braided-line", "fluoro-leader"],
    whenToUse: "Beach, jetty and pier fishing on the tide push.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/533338.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "inshore-combo",
    name: "PENN Wrath II Inshore Combo — 7' Medium",
    category: "Surf Rods",
    price: 129.99,
    compareAt: 159.99,
    tagline: "Bays, jetties, and kelp edges",
    blurb:
      "A 7-foot medium two-piece on a PENN 4000 turning 6.2:1. The fast retrieve is the point: when a halibut picks up a swimbait and runs at you, a slow reel loses the fish before you ever feel it. Best value in the catalog by a clear margin.",
    specs: [
      { label: "Brand", value: "PENN" },
      { label: "Length", value: "7' 0\" · 2-piece" },
      { label: "Power", value: "Medium" },
      { label: "Reel size", value: "4000" },
      { label: "Gear ratio", value: "6.2:1" },
      { label: "Bearings", value: "2 sealed stainless + 1 anti-reverse" },
      { label: "Line rating", value: "15 lb" },
      { label: "Drag", value: "HT-100 carbon fiber" },
    ],
    features: [
      "6.2:1 retrieve picks up slack fast, the difference between feeling the bite and finding it",
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
    tagline: "8 fibers, 32 picks per inch, Coastal Camo",
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber, braided at 32 picks per inch. The GORE fiber is what makes this line quiet through the guides and stubborn against sand and shell, the two things that end a surf session early. Coastal Camo is the color to run when the water is clear and the fish have seen everything.",
    specs: [
      { label: "Strength", value: "20 lb test" },
      { label: "Length", value: "300 yd" },
      { label: "Construction", value: "8 fibers · 32 picks/in" },
      { label: "Fiber", value: "7 HMPE + 1 GORE Performance" },
      { label: "Color", value: "Coastal Camo" },
      { label: "Brand", value: "Sufix" },
    ],
    features: [
      "The GORE fiber is the whole point, it cuts line vibration, so you feel the take instead of the wind",
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
      { label: "Brand", value: "Sufix" },
      { label: "Strength", value: "50 lb test" },
      { label: "Length", value: "11 yd" },
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
    key: "bank-sinker-3oz",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/27482_5ac4310f-a1f8-4f9b-9eb2-40d9386d20d9.jpg",
    name: "MO's Bank Sinkers — 3 oz, 26-Pack",
    category: "Terminal Tackle",
    price: 29.99,
    tagline: "Twenty-six of them, because you will lose them",
    blurb:
      "The everyday surf weight for moderate current, heavy enough to hold a bait through a push, light enough to cast on a medium rod all morning. Bank sinkers taper to a nose that digs into sand and resists the sideways roll that drags a rig into the next angler’s line. Sold as a 5 lb box, which works out cheaper per sinker than any blister pack and roughly matches what a season on the beach costs you.",
    specs: [
      { label: "Brand", value: "MO's" },
      { label: "Weight", value: "3 oz" },
      { label: "Quantity", value: "26 per box" },
      { label: "Style", value: "Bank, teardrop, tapered nose" },
      { label: "Material", value: "Lead" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Sold by the 5 lb box, which is how sinkers are actually bought",
      "Tapered nose digs in and resists rolling in a side sweep",
      "Bell eye takes a snap or ties direct",
      "3 oz, the general-purpose surf weight",
    ],
    gradient: ["#2f2f38", "#55555f"],
    glyph: "rig",
    pairsWith: ["circle-hooks", "braided-line", "fluoro-leader", "surf-rod"],
    whenToUse: "Moderate current, medium rods, most days on most Northern California beaches.",
    featured: false,
    prop65: true,
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "bank-sinker-4oz",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/27482_bc0c34bd-e78b-4789-977b-75d72b9131c8.jpg",
    name: "MO's Bank Sinkers — 4 oz, 20-Pack",
    category: "Terminal Tackle",
    price: 32.99,
    tagline: "The one most surf rods are rated for",
    blurb:
      "Four ounces is the weight most 9 to 11 foot surf rods are built to throw, and the one to reach for when the water is moving hard enough that a 3 oz starts walking. The tapered bank profile holds bottom without the casting drag of a pyramid, and twenty of them is a genuine season’s supply for someone who fishes rocky ground and expects to leave a few behind.",
    specs: [
      { label: "Brand", value: "MO's" },
      { label: "Weight", value: "4 oz" },
      { label: "Quantity", value: "20 per box" },
      { label: "Style", value: "Bank, teardrop, tapered nose" },
      { label: "Material", value: "Lead" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Sold by the 5 lb box, which is how sinkers are actually bought",
      "Tapered nose digs in and resists rolling in a side sweep",
      "Bell eye takes a snap or ties direct",
      "4 oz, matches the casting rating of most surf rods",
    ],
    gradient: ["#2f2f38", "#55555f"],
    glyph: "rig",
    pairsWith: ["circle-hooks", "braided-line", "fluoro-leader", "surf-rod"],
    whenToUse: "A moving tide, a steep beach, or any day a lighter sinker won’t stay put.",
    featured: false,
    prop65: true,
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "bank-sinker-6oz",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/27482.jpg",
    name: "MO's Bank Sinkers — 6 oz, 13-Pack",
    category: "Terminal Tackle",
    price: 34.99,
    tagline: "For the days the ocean is winning",
    blurb:
      "Six ounces is what you put on when a big swing is running and everything lighter is being swept off the spot. Heavy enough to hold through a strong lateral current and to punch a bait out through a headwind, and heavy enough that you want to check your rod’s casting rating before you launch it. Thirteen to a box.",
    specs: [
      { label: "Brand", value: "MO's" },
      { label: "Weight", value: "6 oz" },
      { label: "Quantity", value: "13 per box" },
      { label: "Style", value: "Bank, teardrop, tapered nose" },
      { label: "Material", value: "Lead" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Sold by the 5 lb box, which is how sinkers are actually bought",
      "Tapered nose digs in and resists rolling in a side sweep",
      "Bell eye takes a snap or ties direct",
      "6 oz, for strong current; check your rod’s casting rating",
    ],
    gradient: ["#2f2f38", "#55555f"],
    glyph: "rig",
    pairsWith: ["circle-hooks", "braided-line", "fluoro-leader", "surf-rod"],
    whenToUse: "Big spring tides, strong side currents, and headwinds that flatten a lighter cast.",
    featured: false,
    prop65: true,
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "circle-hooks",
    name: "Eagle Claw Lazer Sharp Offset Circle Sea Hook — 4/0, 50-Pack",
    category: "Terminal Tackle",
    price: 15.97,
    tagline: "Fifty hooks, because you'll lose them",
    blurb:
      "The circle hook does the work for you: no strike, just let the rod load and the hook finds the corner of the jaw on its own. That's why they're mandated in a lot of fisheries, fish that are released swim off unharmed. Sea Guard finish for salt, and fifty in the box so you stop rationing them.",
    specs: [
      { label: "Brand", value: "Eagle Claw" },
      { label: "Size", value: "4/0" },
      { label: "Quantity", value: "50 per pack" },
      { label: "Style", value: "Offset circle, sea hook" },
      { label: "Finish", value: "Sea Guard" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Circle bend, hooks the jaw corner, not the gut",
      "Sea Guard coating for saltwater",
      "Lazer-sharpened point",
      "50 per pack",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "hook",
    pairsWith: ["surf-rod", "mustad-barrel-swivel-2-0"],
    whenToUse: "Bait fishing from beach, pier or boat, anywhere you release fish.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/4378_c106da28-2af5-4b19-886f-88dcadc01272.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "carolina-kit",
    name: "Terra Firma Carolina Rig — 3 pack",
    category: "Terminal Tackle",
    price: 24.99,
    tagline: "Tied by hand in the US, ready to fish",
    blurb:
      "Three finished Carolina rigs, each built on heavy cable and fluorocarbon with a ball-bearing swivel and a 5/0 or 8/0 circle hook. We looked hard at the 200-piece rig-making kits everyone sells and could not find one from a US warehouse that we could price honestly, they are all the same Chinese white-label box, and your customer can find it themselves for what we'd have to pay. So we sell finished rigs made in America instead.",
    specs: [
      { label: "Brand", value: "Terra Firma" },
      { label: "Count", value: "3 rigs" },
      { label: "Leader", value: "200 lb cable / 130 lb fluoro / 200 lb mono options" },
      { label: "Hook", value: "5/0 or 8/0 high-carbon circle" },
      { label: "Swivel", value: "Ball bearing" },
      { label: "Weight", value: "3 oz or 6 oz egg sinker" },
      { label: "Made in", value: "USA" },
    ],
    features: [
      "Hand-tied in the US, not a bagged assortment you finish yourself at 5 a.m.",
      "Ball-bearing swivel, the component cheap rigs skip, and the reason they twist your main line",
      "Cable option for toothy fish; fluoro option for clear water and spooky ones",
      "Honest note: this replaces the 220-piece kit we originally planned. We could not source that kit from a US warehouse at a price that made sense for either of us.",
    ],
    gradient: ["#4a3420", "#7a5c36"],
    glyph: "rig",
    pairsWith: ["circle-hooks", "surf-rod", "sand-spike"],
    whenToUse: "Surf bait fishing, perch, corbina, croaker, striper, drum.",
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
      "Twenty-one Z-Man paddle tails across 2.5\" and 4\" in the pearl, smelt, and mullet range that actually produces on this coast. ElaZtech is the reason to care: it's buoyant, so the tail stands up off the bottom at rest instead of lying flat, which matters enormously to a halibut sitting in the sand watching it.",
    badge: "Best Value",
    specs: [
      { label: "Brand", value: "Z-Man" },
      { label: "Count", value: "21 baits" },
      { label: "Sizes", value: "2.5\" Slim SwimZ (16) · 4\" DieZel MinnowZ (5)" },
      { label: "Material", value: "ElaZtech, 10× tougher, buoyant" },
      { label: "Rigging", value: "Molded hook slot + dorsal hook pocket" },
      { label: "Colors", value: "Pearl / smelt / mullet range" },
    ],
    features: [
      "ElaZtech floats, so the tail stands up when the bait sits still, a genuine advantage on flatfish",
      "Survives fish after fish; conventional soft plastic tears off after two",
      "Two sizes covers surfperch through legal halibut with one box",
      "Rigs on 1/4–1 oz heads, pair it with the bucktail assortment",
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
      "One side convex, the other concave, so the jig spins as it drops rather than falling dead. Each face is finished differently, which turns that rotation into a strobing flash on the way down, and the drop is when most fish commit. Comes pre-rigged with a ball-bearing swivel and a VMC assist hook, so it's ready to tie on.",
    specs: [
      { label: "Brand", value: "Williamson" },
      { label: "Weight", value: "10.5 oz" },
      { label: "Length", value: "7.25\"" },
      { label: "Size", value: "300" },
      { label: "Color", value: "Black Silver" },
      { label: "Hook", value: "VMC assist, pre-rigged" },
      { label: "Swivel", value: "Stainless ball-bearing" },
    ],
    features: [
      "Opposing convex and concave faces make it rotate instead of dropping flat",
      "Two-tone finish turns that rotation into flash",
      "Ball-bearing swivel lets you tie direct to the solid ring and leave the lure free-swimming",
      "Arrives rigged, no assist hook to tie yourself",
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
    category: "Nets & Landing",
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
      "Locks rigid when open, no flexing handle at the moment it matters",
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
    category: "Rod Holders",
    price: 34.99,
    tagline: "Two rods, hands free, coffee in hand",
    blurb:
      "Two 27-inch corrosion-proof PVC spikes with an angled sand-driving point and a rod-butt slot. Nothing clever, nothing to break, and they hold in wet sand at the wash where the fancy aluminum ones lever themselves loose.",
    specs: [
      { label: "Brand", value: "Sea Striker" },
      { label: "Length", value: "27\"" },
      { label: "Count", value: "2 per pack" },
      { label: "Material", value: "Corrosion-proof PVC" },
      { label: "Tip", value: "Angled sand-driving point" },
      { label: "Holder", value: "Rod-butt slot" },
    ],
    features: [
      "PVC does not corrode, full stop, there is no metal to seize or pit",
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
    category: "Tools",
    price: 32.99,
    tagline: "Stainless, spring-loaded, side cutter",
    blurb:
      "Eight inches of stainless with an internal spring that holds the jaws open, so you can work one-handed while the other hand is busy holding a fish. The side cutter handles line and leader, and there's a lanyard point. Use it, because pliers dropped off a jetty are simply gone.",
    specs: [
      { label: "Brand", value: "Rapala" },
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
    category: "Tackle Storage",
    price: 70.49,
    tagline: "13 L, holds three 3700 boxes, hands-free",
    blurb:
      "Built for people who fish on foot. Thirteen litres of main compartment that swallows three 3700-size tackle boxes, three zippered pockets, tool attachment points, and a water-resistant base for when you set it down on wet sand. Padded shoulder straps with a chest belt, and a ventilated back panel that matters on a long walk to the mark.",
    specs: [
      { label: "Brand", value: "Rapala" },
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
      { label: "Brand", value: "Coleman" },
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
    category: "Tools",
    price: 37.99,
    tagline: "Red mode, USB-C, 2.4 oz",
    blurb:
      "180 lumens of white, a proper red mode you reach by holding the button rather than cycling through white, USB-C charging, and IPX5 water resistance. The red is the actual reason to buy this: white light kills your night vision for twenty minutes and puts down fish in skinny water.",
    badge: "Staff Pick",
    specs: [
      { label: "Brand", value: "Foxelli" },
      { label: "Output", value: "180 lumens" },
      { label: "Modes", value: "5 · white + red" },
      { label: "Red access", value: "Press and hold 1.5 s" },
      { label: "Battery", value: "USB-C rechargeable Li-ion" },
      { label: "Runtime", value: "Up to 40 hr" },
      { label: "Weight / rating", value: "2.4 oz · IPX5" },
    ],
    features: [
      "Hold-to-red, no strobing white across the water while you hunt for the right mode",
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
    name: "Sufix 832 Advanced Superline Braid — 20 lb, Hi-Vis Yellow, 300 yd",
    category: "Line & Leader",
    price: 38.99,
    tagline: "The same braid, in a color you can see",
    blurb:
      "Identical line to the Coastal Camo, eight fibers, 32 picks, one GORE strand, but yellow enough to watch. Worth it at night, mending line in current, or teaching someone else to feel a bite: you see the tick before they feel it. Run a fluorocarbon leader and the fish never see the color anyway.",
    specs: [
      { label: "Strength", value: "20 lb test" },
      { label: "Length", value: "300 yd" },
      { label: "Color", value: "Hi-Vis Yellow" },
      { label: "Construction", value: "8 fibers · 32 picks/in" },
      { label: "Fiber", value: "7 HMPE + 1 GORE Performance" },
      { label: "Brand", value: "Sufix" },
    ],
    features: [
      "Watching your line is the fastest way to learn to detect bites",
      "Same abrasion resistance and diameter as the camo version",
      "Pairs with a fluorocarbon leader so the color never reaches the fish",
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
    name: "Sufix 832 Advanced Superline Braid — 8 lb, Ghost, 300 yd",
    category: "Line & Leader",
    price: 29.99,
    tagline: "Light line for clear water and small baits",
    blurb:
      "Eight-pound test in Ghost, the near-translucent finish. This is the spool for finesse work, surfperch on small plastics, bay bass on light jigs, anywhere heavier line kills the action of a two-inch bait. The diameter is closer to 2 lb mono, so it casts a long way for very little effort.",
    specs: [
      { label: "Strength", value: "8 lb test" },
      { label: "Length", value: "300 yd" },
      { label: "Color", value: "Ghost" },
      { label: "Construction", value: "8 fibers · 32 picks/in" },
      { label: "Best for", value: "Finesse, clear water" },
      { label: "Brand", value: "Sufix" },
    ],
    features: [
      "Tiny diameter for the strength, small baits actually swim properly",
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
    category: "Tackle Storage",
    price: 34.99,
    tagline: "Four boxes, sized for the Venture backpack",
    blurb:
      "The 3700 is the format most tackle bags are built around, including the Rapala Venture 13 we sell, takes three of them. Getting four at once is how you stop rummaging: one for hooks and weights, one for soft plastics, one for hard baits, one for leader and swivels.",
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
    category: "Tackle Storage",
    price: 23.49,
    tagline: "Deep 3700 for bulkier baits",
    blurb:
      "A deeper 3700 for the things that do not lie flat, jigs, big soft plastics, spools of leader, a spare reel. Same footprint as a standard 3700, so it drops into the same bag slot without reorganising everything else.",
    specs: [
      { label: "Size", value: "3700 series, deep" },
      { label: "Fits", value: "Any 3700-format bag" },
      { label: "Use", value: "Jigs, bulk plastics, leader" },
      { label: "Dividers", value: "Adjustable" },
      { label: "Brand", value: "Rapala" },
      { label: "System", value: "Stacks with RapStack" },
    ],
    features: [
      "Depth is what standard 3700 boxes lack, jigs stop lying on their sides",
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
    category: "Tools",
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
    name: "Shurhold 6 ft Telescoping Net Handle",
    category: "Nets & Landing",
    price: 119.98,
    tagline: "Net handle, 43″ to 72″, head sold separately",
    blurb:
      "A telescoping aluminum handle that takes a Shur-LOK net head and extends from 43 to 72 inches. This answers one specific problem: hooking a fish from a jetty, a pier or a high bank and having no way to reach it. Collapses to something you can actually carry.",
    specs: [
      { label: "Extended", value: "72″" },
      { label: "Collapsed", value: "43″" },
      { label: "Material", value: "Aluminum" },
      { label: "Fitting", value: "Shur-LOK quick-release" },
      { label: "Series", value: "Fishing" },
      { label: "Brand", value: "Shurhold" },
    ],
    features: [
      "Six feet of reach is the difference between landing a fish and losing it at the wall",
      "Telescopes down to something that fits in a car or on a pack",
      "Quick-release head, so one handle takes a net or a gaff",
      "Aluminum will not seize with salt the way steel does",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "net",
    pairsWith: ["crab-net", "landing-net", "pliers"],
    whenToUse: "Jetties, piers, high banks, anywhere the water is below you.",
    featured: false,
    image: "https://productimageserver.com/product/xl/34613XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "crab-net",
    name: "Shurhold Shur-LOK Crab Net — 12″ × 13″ × 15″",
    category: "Nets & Landing",
    price: 22.98,
    tagline: "Quick-release head for the telescoping handle",
    blurb:
      "A compact net head on the Shur-LOK quick-release fitting, so it swaps onto the telescoping handle in a second. Sized for crab and small fish, the sort of net that lives in the car and gets used far more often than the big one.",
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
    category: "Rod Holders",
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
    category: "Tackle Storage",
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
      "Individual slots, no more untangling a knot of jig heads",
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
    category: "Trolling & Rigging",
    price: 22.99,
    tagline: "Attractor for trolled salmon rigs",
    blurb:
      "An eleven-inch rolling flasher for trolling. It does not catch fish itself; it makes the bait behind it findable from much further away. Standard kit for West Coast salmon, and the reason a slow troll works at all in colored water.",
    specs: [
      { label: "Color", value: "Rainbow Crush" },
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
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
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
      "The same Kensaki profile as the 300, at 7¾ ounces instead of 10½, the size to reach for in eighty feet rather than two hundred, or when the current is slack and a heavier jig drops too fast to get looked at.",
    specs: [
      { label: "Brand", value: "Williamson" },
      { label: "Weight", value: "7-3/4 oz" },
      { label: "Length", value: "6.75″" },
      { label: "Size", value: "220" },
      { label: "Color", value: "Blue Lagoon" },
      { label: "Hook", value: "VMC assist, pre-rigged" },
      { label: "Swivel", value: "Stainless ball-bearing" },
    ],
    features: [
      "Lighter drop rate keeps it in the strike zone longer in slack current",
      "Same rotating profile that makes the Kensaki work",
      "Pre-rigged with a VMC assist hook",
      "Blue Lagoon is a clear-water, bright-day color",
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
      "A flush mount that installs without exposed fasteners, so there is nothing on the deck to catch a line, a knee or a fish. Zero degrees means the rod sits vertical, the setup for storage and for baits you want hanging straight down rather than trolled.",
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
      "Depth is leverage, a deeper tube takes the strain off the mounting",
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
      "Stainless rather than composite, angled fifteen degrees back. The angle is the trolling angle: it takes the rod tip away from the boat and stops the line running back into the hull. Stainless costs more and lasts longer in salt than anything else here.",
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
      "Holds three rods where a single holder holds one. Useful when you are fishing more lines than hands, bait rods out while you work a lure, or three rigs staged and ready so a re-tie is a swap rather than a job.",
    specs: [
      { label: "Capacity", value: "3 rods" },
      { label: "Series", value: "Triple Threat" },
      { label: "Color", value: "Flat Dark Earth" },
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
      "A composite holder with a stainless top ring, which is the sensible compromise, the rim is the part that takes every knock from a rod butt going in, and that is the part made of metal. Cheaper than full stainless, far tougher than plain plastic.",
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
    name: "C.E. Smith Aluminum Clamp-On Rod Holder — Horizontal",
    category: "Rod Holders",
    price: 93.15,
    tagline: "Clamps to a 1.315″ rail, no drilling",
    blurb:
      "Clamps onto a horizontal rail of 1.315 inch outside diameter, the standard pipe size on most boat rails and dock structures. Aluminum, so it will not rust into the rail and become permanent by accident.",
    specs: [
      { label: "Fits", value: "1.315″ OD rail" },
      { label: "Orientation", value: "Horizontal" },
      { label: "Material", value: "Aluminum" },
      { label: "Mount", value: "Clamp-on" },
      { label: "Brand", value: "C.E. Smith" },
      { label: "Drilling", value: "None" },
    ],
    features: [
      "No drilling, so no holes to regret",
      "Aluminum will not seize into the rail the way steel does",
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
    name: "Shurhold 5 ft Net Handle — Fixed Length",
    category: "Nets & Landing",
    price: 97.99,
    tagline: "Net handle, fixed 60″, nothing to slip",
    blurb:
      "Five feet, fixed. A telescoping handle can slip under load; a fixed one cannot. If you always fish the same height above the water, the fixed handle is the stronger and cheaper answer.",
    specs: [
      { label: "Length", value: "60″ fixed" },
      { label: "Material", value: "Aluminum" },
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
    whenToUse: "A consistent height above the water, a home dock, your own boat.",
    featured: false,
    image: "https://productimageserver.com/product/xl/34612XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "curved-adapter",
    name: "Shurhold 10″ Curved Net Adapter",
    category: "Nets & Landing",
    price: 23.99,
    tagline: "Angles a net head so you can actually scoop",
    blurb:
      "A ten-inch curved adapter between handle and head. It sounds fussy until you have tried to scoop a fish with a net that is dead in line with a six-foot pole, the curve puts the hoop where the fish is instead of where the handle points.",
    specs: [
      { label: "Length", value: "10″" },
      { label: "Fitting", value: "Shur-LOK, both ends" },
      { label: "Shape", value: "Curved" },
      { label: "Use", value: "Handle-to-head" },
      { label: "Brand", value: "Shurhold" },
      { label: "Material", value: "Aluminum" },
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
    category: "Tools",
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
    category: "Tackle Storage",
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
    tagline: "Color changes every ten yards, so you know your depth",
    blurb:
      "Lead core sinks, and it changes color every ten yards so you can count exactly how much you have out. That is the whole trick: depth becomes a number you control rather than a guess, and you can repeat the depth that just produced a fish.",
    specs: [
      { label: "Strength", value: "18 lb test" },
      { label: "Length", value: "200 yd" },
      { label: "Metering", value: "10-color, every 10 yd" },
      { label: "Core", value: "Lead" },
      { label: "Use", value: "Trolling to depth" },
      { label: "Brand", value: "Sufix" },
    ],
    features: [
      "Counting colors turns depth into something you can repeat",
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
    prop65: true,
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "braid-10",
    name: "Sufix 832 Advanced Superline Braid — 10 lb, Hi-Vis Yellow, 300 yd",
    category: "Line & Leader",
    price: 36.99,
    tagline: "Light line you can still see",
    blurb:
      "Ten-pound test in hi-vis yellow, light enough for finesse work, visible enough to watch. The combination people usually have to choose between, which is why it is worth stocking as its own spool rather than a compromise.",
    specs: [
      { label: "Strength", value: "10 lb test" },
      { label: "Length", value: "300 yd" },
      { label: "Color", value: "Hi-Vis Yellow" },
      { label: "Construction", value: "8 fibers · 32 picks/in" },
      { label: "Use", value: "Finesse, visible" },
      { label: "Brand", value: "Sufix" },
    ],
    features: [
      "Light line and visible line, which normally means picking one",
      "Small diameter casts light baits a long way",
      "Watch the line and you see bites you would not feel",
      "Fluorocarbon leader keeps the color away from the fish",
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
    name: "Sufix 832 Advanced Superline Braid — 15 lb, Fire Tiger, 300 yd",
    category: "Line & Leader",
    price: 28.99,
    tagline: "The middle weight, in the loudest color",
    blurb:
      "Fifteen pound sits between the finesse spool and the surf spool, which makes it the one line that will do most things adequately. Fire Tiger is aggressively visible, useful in low light, and the reason to run a leader.",
    specs: [
      { label: "Strength", value: "15 lb test" },
      { label: "Length", value: "300 yd" },
      { label: "Color", value: "Fire Tiger" },
      { label: "Construction", value: "8 fibers · 32 picks/in" },
      { label: "Use", value: "General purpose" },
      { label: "Brand", value: "Sufix" },
    ],
    features: [
      "The weight that does most jobs adequately if you only own one spool",
      "Fire Tiger is the easiest color to track in low light",
      "Same 832 construction as the heavier spools",
      "Run a fluorocarbon leader and the color stops mattering",
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
      "The hundred-pound version of the wind-on leader. Same knotless loop connection, same ability to wind through the guides, but rated for fish that would part the fifty. This is the leader for tuna, big halibut, and anything that goes near structure.",
    specs: [
      { label: "Strength", value: "100 lb test" },
      { label: "Length", value: "11 yd" },
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
      "A trolling minnow that runs at fifteen feet without weight or a downrigger, the lip does the work. Hot Pink UV is a color that reads as bright to fish in water where everything else has gone gray.",
    specs: [
      { label: "Dive depth", value: "15 ft trolled" },
      { label: "Color", value: "Hot Pink UV" },
      { label: "Type", value: "Trolling minnow" },
      { label: "Action", value: "Hard swimming" },
      { label: "Hooks", value: "VMC" },
      { label: "Brand", value: "Rapala" },
    ],
    features: [
      "Reaches fifteen feet with nothing but the lip, no weight, no downrigger",
      "UV finish stays visible in deep or colored water",
      "Hard swimming action that holds at trolling speed",
      "Rapala hardware, so the hooks and rings are not the weak point",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["lead-core", "flasher", "flush-mount-ss"],
    whenToUse: "Trolling the top fifteen feet, especially in colored water.",
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
      { label: "Color", value: "Green" },
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
      "A flood rather than a submersible, so it throws light across the surface instead of down through it. Useful for working an area rather than concentrating bait at one point, and for actually seeing what you are doing on the dock.",
    specs: [
      { label: "Power", value: "50W / 120VAC" },
      { label: "Color", value: "Green" },
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
      "The deep one. Thirty feet without weight, a downrigger or lead core, the lip drags it down and holds it there. Bunker is a baitfish pattern, which is what you want when the fish are on schools rather than hunting anything that moves.",
    specs: [
      { label: "Dive depth", value: "30 ft trolled" },
      { label: "Color", value: "Bunker" },
      { label: "Type", value: "Deep trolling minnow" },
      { label: "Action", value: "Hard swimming" },
      { label: "Hooks", value: "VMC" },
      { label: "Brand", value: "Rapala" },
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
      "The middle depth of the Magnum range, in a translucent finish that reads as a real baitfish rather than a painted one. Glass Ghost is the color for clear water and bright days, when a solid pattern looks like exactly what it is.",
    specs: [
      { label: "Dive depth", value: "20 ft trolled" },
      { label: "Color", value: "Glass Ghost" },
      { label: "Type", value: "Trolling minnow" },
      { label: "Finish", value: "Translucent" },
      { label: "Hooks", value: "VMC" },
      { label: "Brand", value: "Rapala" },
    ],
    features: [
      "Twenty feet fills the gap between the 15 and the 30",
      "Translucent bodies out-fish solid ones in clear water",
      "Same hardware as the rest of the Magnum range",
      "Bright-day color for when the water is gin clear",
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
      "The Xplode works the surface rather than diving, for the moments when fish are pushing bait up and a deep-diving plug swims straight under the action. Dorado is the high-contrast color for blue water.",
    specs: [
      { label: "Type", value: "Surface / shallow" },
      { label: "Size", value: "170 mm" },
      { label: "Color", value: "Dorado" },
      { label: "Use", value: "Fish feeding on top" },
      { label: "Hooks", value: "VMC" },
      { label: "Brand", value: "Rapala" },
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
    name: "Williamson High-Speed Tuna Catcher Rigged — 8″ skirt, Mahi",
    category: "Lures",
    price: 35.25,
    tagline: "Rigged and ready for a fast troll",
    blurb:
      "A skirted trolling lure built for speed: it holds together and keeps swimming at the pace you cover water looking for tuna, where slower lures blow out and spin. Arrives rigged, so it goes straight in the spread.",
    specs: [
      { label: "Length", value: "8″" },
      { label: "Color", value: "Mahi" },
      { label: "Type", value: "Skirted trolling" },
      { label: "Speed", value: "High-speed rated" },
      { label: "Rigged", value: "Yes, ready to fish" },
      { label: "Brand", value: "Williamson" },
    ],
    features: [
      "Holds its swim at speeds that blow out ordinary skirts",
      "Arrives rigged, straight into the spread",
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
    category: "Tackle Storage",
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
    category: "Tackle Storage",
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
    whenToUse: "Hooks, swivels, blades, anything that lies flat.",
    featured: false,
    image: "https://productimageserver.com/product/xl/79715XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "angled-system",
    name: "Plano Guide Series Angled Tackle System w/5 StowAways",
    category: "Tackle Storage",
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
    tagline: "Anodized aluminum, one rod",
    blurb:
      "A single anodized hanger, the unit you buy several of and space out to suit your own rods, rather than accepting whatever spacing a fixed rack came with. Anodized aluminum, so it stays clean in salt air.",
    specs: [
      { label: "Capacity", value: "1 rod" },
      { label: "Material", value: "Anodized aluminum" },
      { label: "Finish", value: "Silver" },
      { label: "Mount", value: "Overhead or bulkhead" },
      { label: "Brand", value: "Tigress" },
      { label: "Spacing", value: "You choose" },
    ],
    features: [
      "Buy several and space them to fit your own rods",
      "Anodized aluminum survives salt air without staining",
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
    category: "Tools",
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
    category: "Tools",
    price: 30.99,
    tagline: "Short pliers for fine work",
    blurb:
      "Four inches, for the jobs eight-inch pliers are clumsy at, small hooks, split rings, crimps and anything needing your fingers close to the work. The magnetic spring keeps them shut in a pocket and open in your hand.",
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
    category: "Tools",
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
      "Weigh, record, release, the fish is out of the water for seconds",
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
    category: "Tools",
    price: 35.99,
    tagline: "Keep track of which fish is which",
    blurb:
      "Numbered tags for keeping fish identifiable in a live well, tournament kit, but useful to anyone holding several fish and deciding what to keep. Clip on the lip, read the number, no guessing which one was the good one.",
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
    category: "Tackle Storage",
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
    category: "Downriggers",
    price: 230.99,
    tagline: "Precise depth, no batteries",
    blurb:
      "A manual downrigger with a rod holder built in. It puts your bait at an exact depth and keeps it there, the difference between fishing where you hope the fish are and fishing where you know they are. Manual means nothing to fail electrically.",
    specs: [
      { label: "Type", value: "Manual downrigger" },
      { label: "Rod holder", value: "Integrated" },
      { label: "Depth", value: "Precise, by counter" },
      { label: "Power", value: "None required" },
      { label: "Brand", value: "Scotty" },
    ],
    features: [
      "Exact depth, held there, rather than an educated guess",
      "Manual, no motor, no wiring, nothing electrical to fail",
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
    category: "Downriggers",
    price: 24.99,
    tagline: "Gets the ball up without your hands on the cable",
    blurb:
      "Retrieves the downrigger weight without you hauling on the cable by hand. Downrigger cable under load will cut a finger open, and this is the tool that means it never gets the chance.",
    specs: [
      { label: "Use", value: "Weight retrieval" },
      { label: "Fits", value: "Scotty downriggers" },
      { label: "Safety", value: "Hands off the cable" },
      { label: "Brand", value: "Scotty" },
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
    category: "Downriggers",
    price: 29.95,
    tagline: "The part that wears out first",
    blurb:
      "The terminal pulley is the component doing the most work on a downrigger and the one that wears out first. Replacing it is cheap and quick; discovering it has seized mid-season is neither.",
    specs: [
      { label: "Fits", value: "1″ and 3/4″ booms" },
      { label: "Part", value: "Terminal pulley" },
      { label: "Type", value: "Replacement kit" },
      { label: "Brand", value: "Scotty" },
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
    whenToUse: "Preventive, buy it before you need it.",
    featured: false,
    image: "https://productimageserver.com/product/xl/99579XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "downrigger-cable",
    name: "Scotty 200 ft Premium Stainless Downrigger Cable",
    category: "Downriggers",
    price: 33.99,
    tagline: "Two hundred feet of replacement cable",
    blurb:
      "Downrigger cable kinks, frays and eventually parts, usually with a ball on the end of it. Two hundred feet of premium stainless is a spare you keep rather than a repair you make in a hurry.",
    specs: [
      { label: "Length", value: "200 ft" },
      { label: "Material", value: "Premium stainless" },
      { label: "Use", value: "Downrigger replacement" },
      { label: "Brand", value: "Scotty" },
      { label: "Fitment", value: "Scotty downriggers" },
    ],
    features: [
      "Cable fails eventually, usually with a weight attached",
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
      { label: "Install", value: "None, drop in" },
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
      "A mains-powered aerator for holding bait longer than a day, a garage tub the night before a trip, or a dock tank between sessions. Mains power means it runs indefinitely rather than until the batteries die.",
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
      "The blue version of the dock light. Blue penetrates clear water further than green, while green wins in water with any color to it, so the honest answer is that it depends on where you fish, and locals usually know which works.",
    specs: [
      { label: "Power", value: "40W / 120VAC" },
      { label: "Color", value: "Blue" },
      { label: "Mount", value: "Dock" },
      { label: "Best in", value: "Clear water" },
      { label: "Brand", value: "Hydro Glow" },
      { label: "Supply", value: "Mains" },
    ],
    features: [
      "Blue reaches further in clear water than green does",
      "Green wins where the water carries color, pick for your spot",
      "Mains powered, so no battery management",
      "Ask locally which color works; opinions are strong and usually right",
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
      "Eighty-four watts on twelve volts, designed to go in the water rather than hang above it. Under the surface there is no reflection loss, so far more of the light does the job, and 12V means it runs off a boat battery instead of a dock outlet.",
    specs: [
      { label: "Power", value: "84W / 12V / 7A" },
      { label: "Color", value: "Green" },
      { label: "Type", value: "Submersible" },
      { label: "Supply", value: "12V battery" },
      { label: "Brand", value: "Hydro Glow" },
      { label: "Color", value: "Green" },
      { label: "Color ", value: "84W" },
      { label: "Color  ", value: "12V" },
    ],
    features: [
      "Submerged light loses nothing to surface reflection",
      "12V runs from a boat battery, no shore power needed",
      "Eighty-four watts is a serious draw of bait",
      "Green is the workhorse color for most water",
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
  {
    key: "dipsy-small",
    name: "Luhr-Jensen 2¼″ Dipsy Diver — Moon Jelly",
    category: "Trolling & Rigging",
    price: 11.99,
    tagline: "Takes your bait down and out to the side",
    blurb:
      "A diving planer rather than a lure. It drags your bait down to depth and, crucially, out sideways away from the boat, so you can run several lines without them tangling, and cover water the prop has not just spooked.",
    specs: [
      { label: "Size", value: "2-1/4″" },
      { label: "Finish", value: "Black / Moon Jelly bottom" },
      { label: "Type", value: "Diving planer" },
      { label: "Direction", value: "Dives down and to the side" },
      { label: "Use", value: "Trolling" },
      { label: "Brand", value: "Luhr-Jensen" },
    ],
    features: [
      "Sideways travel is the point, several lines, no tangles",
      "Reaches depth with no weight and no downrigger",
      "Trips on the strike so the fight is with the fish, not the diver",
      "The smallest size, for light gear and shallower work",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["jet-driver-20", "flasher", "braided-line"],
    whenToUse: "Trolling several lines, or covering water beside the boat.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102261XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "jet-driver-20",
    name: "Luhr-Jensen 20 ft Jet Driver — Clear UV",
    category: "Trolling & Rigging",
    price: 12.49,
    tagline: "Twenty feet down, no weight needed",
    blurb:
      "Water forced through the jet ports drives it down to about twenty feet and holds it there. Lighter and less brutal on the rod than a heavy diver, and the clear UV body stays visible to fish while nearly disappearing to everything else.",
    specs: [
      { label: "Depth", value: "~20 ft" },
      { label: "Finish", value: "Clear UV Moon Jelly" },
      { label: "Type", value: "Jet diver" },
      { label: "Weight", value: "None required" },
      { label: "Use", value: "Trolling" },
      { label: "Brand", value: "Luhr-Jensen" },
    ],
    features: [
      "Jet ports do the diving, so the rod is not fighting lead",
      "Clear UV reads bright to fish, subtle to everything else",
      "Runs shallower and lighter than a Dipsy",
      "Pairs with a flasher for depth plus attraction",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["jet-driver-30", "flasher", "fluoro-leader"],
    whenToUse: "Fish holding around twenty feet on a slow troll.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102252XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "jet-driver-30",
    name: "Luhr-Jensen 30 ft Jet Driver — Purple UV",
    category: "Trolling & Rigging",
    price: 15.99,
    tagline: "Thirty feet on the same principle",
    blurb:
      "The deeper Jet Diver, reaching about thirty feet. Purple UV is the low-light color, first and last hour, or any day the water carries some color and a clear finish stops registering.",
    specs: [
      { label: "Depth", value: "~30 ft" },
      { label: "Finish", value: "Purple UV Moon Jelly" },
      { label: "Type", value: "Jet diver" },
      { label: "Weight", value: "None required" },
      { label: "Use", value: "Trolling" },
      { label: "Brand", value: "Luhr-Jensen" },
    ],
    features: [
      "Ten feet deeper than the 20 for the same effort",
      "Purple UV holds up in low light and colored water",
      "No lead, so light gear still handles it",
      "Run one of each to find the depth quickly",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["jet-driver-20", "flasher", "lead-core"],
    whenToUse: "Dawn, dusk, or water with color in it.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102255XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "tuna-catcher-5",
    name: "Williamson Tuna Catcher Rigged — 5½″ skirt, Candy Floss",
    category: "Lures",
    price: 15.49,
    tagline: "The small rigged skirt, for school fish",
    blurb:
      "Five and a half inches of rigged skirt, the size for school tuna, bonito and anything else feeding on small bait. Arrives rigged, so it goes straight in the spread rather than needing an evening at the vice.",
    specs: [
      { label: "Length", value: "5.5″" },
      { label: "Color", value: "Candy Floss" },
      { label: "Type", value: "Skirted trolling" },
      { label: "Rigged", value: "Yes" },
      { label: "Target", value: "School tuna, bonito" },
      { label: "Brand", value: "Williamson" },
    ],
    features: [
      "Small profile matches the bait school fish are actually on",
      "Rigged and ready, straight into the spread",
      "Runs well at the speeds you search at",
      "Cheap enough to carry three colors",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["tuna-catcher", "xrap-magnum", "fluoro-100"],
    whenToUse: "School tuna and bonito on small bait.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105318XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "dipsy-mid",
    name: "Luhr-Jensen 3¼″ Dipsy Diver — Clear UV",
    category: "Trolling & Rigging",
    price: 16.99,
    tagline: "The middle Dipsy, the one most people own",
    blurb:
      "The size most trollers reach for first. Deeper and further out than the 2¼, without the pull of the largest. Clear UV works across most light conditions, which is why it is the one to buy if you are only buying one.",
    specs: [
      { label: "Size", value: "3-1/4″" },
      { label: "Finish", value: "Clear UV Moon Jelly" },
      { label: "Type", value: "Diving planer" },
      { label: "Direction", value: "Down and to the side" },
      { label: "Use", value: "Trolling" },
      { label: "Brand", value: "Luhr-Jensen" },
    ],
    features: [
      "The size most people settle on after owning all three",
      "Clear UV covers the widest range of conditions",
      "Trips on the strike for a clean fight",
      "Adjustable to run at different angles off the boat",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["dipsy-small", "dipsy-large", "flasher"],
    whenToUse: "General-purpose trolling, the default Dipsy.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102268XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "big-game-catcher",
    name: "Williamson Big Game Catcher — 8¼″ skirt, Skipjack",
    category: "Lures",
    price: 18.95,
    tagline: "Big skirt for fish that eat other fish",
    blurb:
      "Eight and a quarter inches in a skipjack pattern, which is what larger tuna and marlin are actually hunting. A big lure narrows the bites you get and widens the ones you want.",
    specs: [
      { label: "Length", value: "8.25″" },
      { label: "Color", value: "Skipjack" },
      { label: "Type", value: "Big game skirt" },
      { label: "Rigged", value: "Yes" },
      { label: "Target", value: "Large tuna, billfish" },
      { label: "Brand", value: "Williamson" },
    ],
    features: [
      "Skipjack is what big fish are hunting, not a guess at it",
      "Fewer bites, bigger average size",
      "Rigged with hardware rated for the fight",
      "Runs in the long positions of a spread",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["tuna-catcher", "fluoro-100", "flush-mount-ss"],
    whenToUse: "Offshore, hunting size rather than numbers.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105314XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "flasher-small",
    name: "Luhr-Jensen Money Roll Flasher — 8¼″, Brandon\u2019s Secret",
    category: "Trolling & Rigging",
    price: 19.99,
    tagline: "The smaller flasher, for lighter gear",
    blurb:
      "Eight and a quarter inches rather than eleven, which matters more than it sounds: a big flasher pulls hard enough to dull the bite of a light rod. This one attracts without taking the feel out of the rod.",
    specs: [
      { label: "Color", value: "Brandon’s Secret" },
      { label: "Length", value: "8.25″" },
      { label: "Finish", value: "Brandons Secret" },
      { label: "Type", value: "Rolling flasher" },
      { label: "Pull", value: "Light" },
      { label: "Use", value: "Trolled attractor" },
      { label: "Brand", value: "Luhr-Jensen" },
    ],
    features: [
      "Less drag, so a light rod still shows you the bite",
      "Same attraction principle as the 11-inch",
      "Easier on kayak and small-boat setups",
      "Proven color on West Coast salmon",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["flasher", "jet-driver-20", "lead-core"],
    whenToUse: "Light gear, kayaks, or anywhere the 11-inch is too much.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110783XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "dipsy-large",
    name: "Luhr-Jensen 4⅛″ Dipsy Diver — Clear UV",
    category: "Trolling & Rigging",
    price: 18.99,
    tagline: "The big one, for depth and distance",
    blurb:
      "The largest Dipsy: deepest, furthest out from the boat, and the hardest pulling. Worth owning when fish are deep and the water is wide, and worth leaving at home the rest of the time.",
    specs: [
      { label: "Size", value: "4-1/8″" },
      { label: "Finish", value: "Clear UV Moon Jelly" },
      { label: "Type", value: "Diving planer" },
      { label: "Pull", value: "Heavy" },
      { label: "Use", value: "Deep trolling" },
      { label: "Brand", value: "Luhr-Jensen" },
    ],
    features: [
      "Deepest and widest of the three sizes",
      "For heavier rods, it will overwhelm light gear",
      "Clear UV, the all-conditions finish",
      "Spreads lines furthest apart when running several",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["dipsy-mid", "lead-core", "flush-mount-ss"],
    whenToUse: "Deep fish, wide spreads, heavier gear.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102274XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "jig-220-mack",
    name: "Williamson Kensaki 220 Jig — 7¾ oz, Mack Daddy",
    category: "Lures",
    price: 19.99,
    tagline: "The 220 in a mackerel pattern",
    blurb:
      "Same rotating Kensaki body as the Blue Lagoon, in a mackerel pattern. Color matters less than most people think and more than nothing, carry two and let the fish tell you.",
    specs: [
      { label: "Brand", value: "Williamson" },
      { label: "Weight", value: "7-3/4 oz" },
      { label: "Length", value: "6.75″" },
      { label: "Size", value: "220" },
      { label: "Color", value: "Mack Daddy" },
      { label: "Hook", value: "VMC assist, pre-rigged" },
      { label: "Swivel", value: "Stainless ball-bearing" },
    ],
    features: [
      "Mackerel pattern for water where that is the bait",
      "Same rotating fall that makes the Kensaki work",
      "Pre-rigged with a VMC assist hook",
      "Carry two colors rather than two sizes",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["jig-mid", "jig-assort", "jig-box"],
    whenToUse: "Eighty to a hundred and fifty feet, mackerel about.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105297XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "jig-280-candy",
    name: "Williamson Kensaki 280 Jig — 9⅞ oz, Candy Floss",
    category: "Lures",
    price: 20.99,
    tagline: "The heavier Kensaki, bright finish",
    blurb:
      "Nine and seven-eighths ounces, for deeper water or more current than the 220 can hold in. Candy Floss is the bright option, the one to try when a natural pattern has been ignored for an hour.",
    specs: [
      { label: "Brand", value: "Williamson" },
      { label: "Weight", value: "9-7/8 oz" },
      { label: "Length", value: "7.25″" },
      { label: "Size", value: "280" },
      { label: "Color", value: "Candy Floss" },
      { label: "Hook", value: "VMC assist, pre-rigged" },
      { label: "Swivel", value: "Stainless ball-bearing" },
    ],
    features: [
      "Holds the strike zone in current the 220 gets swept out of",
      "Bright finish for when natural colors are being refused",
      "Same pre-rigged assist setup",
      "Sits between the 220 and the 300 in the range",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["jig-mid", "jig-assort", "braided-line"],
    whenToUse: "Deeper water, more current, or a slow bite on naturals.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105304XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "xplode-130",
    name: "Rapala X-Rap Magnum Xplode 130 — Clear",
    category: "Lures",
    price: 22.99,
    tagline: "Smaller surface bait, clear finish",
    blurb:
      "The 130 to the 170\u2019s bigger profile, for surface fish keyed on smaller bait, which is most of the time. Clear is the finish for bright days and calm water, when a solid color reads as obviously fake.",
    specs: [
      { label: "Type", value: "Surface / shallow" },
      { label: "Size", value: "130 mm" },
      { label: "Color", value: "Clear" },
      { label: "Use", value: "Fish feeding on top" },
      { label: "Hooks", value: "VMC" },
      { label: "Brand", value: "Rapala" },
    ],
    features: [
      "Smaller profile matches the bait most surface fish are on",
      "Clear works where solid colors get refused",
      "Same Xplode surface action as the 170",
      "The one to throw first when a school comes up",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["xplode-170", "xrap-magnum", "tuna-catcher-5"],
    whenToUse: "Fish busting small bait on the surface.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105359XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "xrap-20-hot",
    name: "Rapala X-Rap Magnum 20 — Hot Head",
    category: "Lures",
    price: 25.99,
    tagline: "Twenty feet, high-contrast head",
    blurb:
      "The 20-foot Magnum in Hot Head, which puts a bright strike point at the front of an otherwise natural body. Useful in stained water where a fish needs something to aim at.",
    specs: [
      { label: "Dive depth", value: "20 ft trolled" },
      { label: "Color", value: "Hot Head" },
      { label: "Type", value: "Trolling minnow" },
      { label: "Action", value: "Hard swimming" },
      { label: "Hooks", value: "VMC" },
      { label: "Brand", value: "Rapala" },
    ],
    features: [
      "Bright head gives a fish a target in stained water",
      "Same 20-foot dive as the Glass Ghost, different conditions",
      "Holds action at real trolling speed",
      "Carry both finishes and switch rather than guess",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: ["xrap-20", "xrap-30", "dipsy-mid"],
    whenToUse: "Stained or colored water at twenty feet.",
    featured: false,
    image: "https://productimageserver.com/product/xl/89837XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "attwood-2-in-1-non-adjustable-rod-holders-2-",
    name: "Attwood 2-In-1 Non-Adjustable Rod Holders 2-Pack",
    category: "Rod Holders",
    price: 26.99,
    tagline: "Two holders, fixed angle",
    blurb:
      "A pair of fixed-angle holders, which is all most people need, the angle you want for storage doesn't change once you've found it. Two to a pack.",
    specs: [
      { label: "Brand", value: "Attwood" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Two per pack, so both sides get done",
      "Fixed angle means nothing to work loose",
      "Cheaper than adjustable when you don't need adjustment",
      "Kayak and small-boat sizing",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: [],
    whenToUse: "Kayaks and small boats, storage rather than trolling.",
    featured: false,
    image: "https://productimageserver.com/product/xl/103109XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "attwood-cockpit-caddy",
    name: "Attwood Cockpit Caddy",
    category: "Tackle Storage",
    price: 14.49,
    tagline: "Somewhere for the small stuff",
    blurb:
      "A caddy for the things that otherwise end up loose on the deck, pliers, a drink, a phone, the leader spool you keep putting down and losing.",
    specs: [
      { label: "Brand", value: "Attwood" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Keeps small gear off the deck",
      "Fits in a cockpit without taking a seat",
      "Somewhere for a drink that isn't the floor",
      "Cheap fix for a constant annoyance",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "Any boat where things end up loose on the floor.",
    featured: false,
    image: "https://productimageserver.com/product/xl/52323XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "attwood-fold-n-stow-fishing-net-small",
    name: "Attwood Fold-N-Stow Fishing Net — Small",
    category: "Nets & Landing",
    price: 11.99,
    tagline: "Folds flat, locks open with a flip",
    blurb:
      "A flip of the handle opens and locks it; pull the trigger and it collapses to something you can stow. Knot-free netting, which is gentler on fish and far less likely to tangle a treble.",
    specs: [
      { label: "Color", value: "Small" },
      { label: "Brand", value: "Attwood" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Knot-free mesh is kinder to fish and doesn't snag trebles",
      "Collapses small enough to actually carry",
      "Locks rigid when open",
      "The small size, for a kayak or a pack",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "net",
    pairsWith: [],
    whenToUse: "Anywhere you plan to release fish.",
    featured: false,
    image: "https://productimageserver.com/product/xl/103113XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "attwood-handheld-spotlight-400-lumens-12v",
    name: "Attwood Handheld Spotlight — 400 Lumens, 12V",
    category: "Lights",
    price: 32.99,
    tagline: "400 lumens, 12V handheld",
    blurb:
      "A 12V handheld spotlight for finding a channel marker, a mooring, or the ramp on the way back in the dark. Four hundred lumens is enough for the job without wrecking your night vision on the deck.",
    specs: [
      { label: "Color", value: "400 Lumens" },
      { label: "Color ", value: "12V" },
      { label: "Brand", value: "Attwood" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Finds markers and moorings after dark",
      "Runs off the boat's 12V rather than batteries",
      "Bright enough to be useful, not so bright it blinds",
      "Handheld, so you can aim it where you actually need it",
    ],
    gradient: ["#1d3320", "#3f7a4e"],
    glyph: "lamp",
    pairsWith: [],
    whenToUse: "Coming back in after dark.",
    featured: false,
    image: "https://productimageserver.com/product/xl/50994XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "attwood-heavy-duty-adjustable-rod-holder-w-c",
    name: "Attwood Heavy Duty Adjustable Rod Holder w/Combo Mount",
    category: "Rod Holders",
    price: 25.00,
    tagline: "Adjustable, side or deck mount",
    blurb:
      "Adjustable angle on a combo mount that fits either a flat deck or a vertical side. Being able to change the angle matters more than it sounds, trolling and storage want different ones.",
    specs: [
      { label: "Brand", value: "Attwood" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Angle adjusts for trolling or storage",
      "Combo mount works on deck or side",
      "Heavy-duty build for real loads",
      "Kayak and small-boat friendly",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: [],
    whenToUse: "One holder that needs to do several jobs.",
    featured: false,
    image: "https://productimageserver.com/product/xl/52282XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "attwood-heavy-duty-adjustable-rod-holder-w-f",
    name: "Attwood Heavy Duty Adjustable Rod Holder w/Flush Mount",
    category: "Rod Holders",
    price: 27.65,
    tagline: "Adjustable head, flush base",
    blurb:
      "The adjustable head on a flush-mount base, for a permanent install where you still want to change the rod angle between trolling and running.",
    specs: [
      { label: "Brand", value: "Attwood" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Adjustable angle on a permanent mount",
      "Flush base keeps the deck clear",
      "Heavy-duty for loaded rods",
      "Standard cutout",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: [],
    whenToUse: "Permanent install where the angle needs to change.",
    featured: false,
    image: "https://productimageserver.com/product/xl/52283XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "attwood-rod-storage-holder",
    name: "Attwood Rod Storage Holder",
    category: "Rod Holders",
    price: 14.99,
    tagline: "Horizontal storage clip",
    blurb:
      "A simple clip for storing a rod horizontally along a gunwale or bulkhead, out of the walkway and off the floor where it gets stepped on.",
    specs: [
      { label: "Brand", value: "Attwood" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Horizontal storage keeps tips out of the walkway",
      "Rods off the floor is the whole point",
      "Cheap enough to fit several",
      "Works in a garage as well as on a boat",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: [],
    whenToUse: "Storing rods rather than fishing them.",
    featured: false,
    image: "https://productimageserver.com/product/xl/52317XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "attwood-standard-series-rod-holder-30-black-",
    name: "Attwood Standard Series Rod Holder — 30°, Black Insert",
    category: "Rod Holders",
    price: 45.99,
    tagline: "Straightforward flush mount",
    blurb:
      "A no-nonsense flush-mount holder with a protective insert, the sensible option when you're fitting several and don't need stainless throughout.",
    specs: [
      { label: "Color", value: "30°" },
      { label: "Color ", value: "Black Insert" },
      { label: "Brand", value: "Attwood" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Insert protects the rod butt from the tube",
      "Standard flush cutout",
      "Priced so you can fit several",
      "Available in different angles for trolling or storage",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: [],
    whenToUse: "Fitting several holders on a budget.",
    featured: false,
    image: "https://productimageserver.com/product/xl/52300XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "attwood-standard-series-rod-holder-0-black-i",
    name: "Attwood Standard Series Rod Holder — 0° Black Insert",
    category: "Rod Holders",
    price: 46.99,
    tagline: "Straightforward flush mount",
    blurb:
      "A no-nonsense flush-mount holder with a protective insert, the sensible option when you're fitting several and don't need stainless throughout.",
    specs: [
      { label: "Color", value: "0° Black Insert" },
      { label: "Brand", value: "Attwood" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Insert protects the rod butt from the tube",
      "Standard flush cutout",
      "Priced so you can fit several",
      "Available in different angles for trolling or storage",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "rod",
    pairsWith: [],
    whenToUse: "Fitting several holders on a budget.",
    featured: false,
    image: "https://productimageserver.com/product/xl/52304XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "frabill-seine-net-4-x-12-mesh",
    name: "Frabill Seine Net — 4 ft × 12 ft",
    category: "Nets & Landing",
    price: 26.99,
    tagline: "Two-person net for catching your own bait",
    blurb:
      "A seine for gathering live bait yourself rather than buying it. Two people walk it through the shallows, the cheapest bait you'll ever fish, and fresher than anything in a tank.",
    specs: [
      { label: "Length", value: "4' x 12' Mesh" },
      { label: "Brand", value: "Frabill" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Catch your own bait instead of buying it",
      "Fresher and livelier than shop bait",
      "Twelve feet of mesh covers a useful width",
      "Cheap once, free thereafter",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "net",
    pairsWith: [],
    whenToUse: "Shallow water with bait in it, and a second pair of hands.",
    featured: false,
    image: "https://productimageserver.com/product/xl/71555XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-20-jet-driver-purple-uv-moon-jel",
    name: "Luhr-Jensen Jet Driver 20 ft — Purple UV Moon Jelly",
    category: "Trolling & Rigging",
    price: 11.99,
    tagline: "Twenty feet down, no weight needed",
    blurb:
      "Water forced through the jet ports drives it to about twenty feet and holds it there. Lighter on the rod than a heavy diver, so you keep some feel for what's happening down there.",
    specs: [
      { label: "Color", value: "Purple UV Moon Jelly" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Jet ports do the diving, the rod isn't fighting lead",
      "Reaches depth with no weight and no downrigger",
      "Runs shallower and lighter than a Dipsy",
      "Pairs with a flasher for depth plus attraction",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Fish holding around twenty feet on a slow troll.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102249XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-20-jet-driver-blue-uv-moon-jelly",
    name: "Luhr-Jensen Jet Driver 20 ft — Blue UV Moon Jelly",
    category: "Trolling & Rigging",
    price: 11.99,
    tagline: "Twenty feet down, no weight needed",
    blurb:
      "Water forced through the jet ports drives it to about twenty feet and holds it there. Lighter on the rod than a heavy diver, so you keep some feel for what's happening down there.",
    specs: [
      { label: "Color", value: "Blue UV Moon Jelly" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Jet ports do the diving, the rod isn't fighting lead",
      "Reaches depth with no weight and no downrigger",
      "Runs shallower and lighter than a Dipsy",
      "Pairs with a flasher for depth plus attraction",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Fish holding around twenty feet on a slow troll.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102250XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-20-jet-driver-black-moon-jelly",
    name: "Luhr-Jensen Jet Driver 20 ft — Black Moon Jelly",
    category: "Trolling & Rigging",
    price: 12.49,
    tagline: "Twenty feet down, no weight needed",
    blurb:
      "Water forced through the jet ports drives it to about twenty feet and holds it there. Lighter on the rod than a heavy diver, so you keep some feel for what's happening down there.",
    specs: [
      { label: "Color", value: "Black Moon Jelly" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Jet ports do the diving, the rod isn't fighting lead",
      "Reaches depth with no weight and no downrigger",
      "Runs shallower and lighter than a Dipsy",
      "Pairs with a flasher for depth plus attraction",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Fish holding around twenty feet on a slow troll.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102251XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-20-jet-driver-silver-crush",
    name: "Luhr-Jensen Jet Driver 20 ft — Silver Crush",
    category: "Trolling & Rigging",
    price: 12.49,
    tagline: "Twenty feet down, no weight needed",
    blurb:
      "Water forced through the jet ports drives it to about twenty feet and holds it there. Lighter on the rod than a heavy diver, so you keep some feel for what's happening down there.",
    specs: [
      { label: "Color", value: "Silver Crush" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Jet ports do the diving, the rod isn't fighting lead",
      "Reaches depth with no weight and no downrigger",
      "Runs shallower and lighter than a Dipsy",
      "Pairs with a flasher for depth plus attraction",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Fish holding around twenty feet on a slow troll.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102253XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-3-1-4-dipsy-diver-black-black-bo",
    name: "Luhr-Jensen 3¼″ Dipsy Diver — Black/Black Bottom Moon Jelly",
    category: "Trolling & Rigging",
    price: 18.99,
    tagline: "The middle Dipsy, the one most people own",
    blurb:
      "A diving planer that takes your bait down and sideways, away from the boat. The sideways part is the point: several lines, no tangles, and water the prop hasn't just spooked.",
    specs: [
      { label: "Color", value: "Black/Black Bottom Moon Jelly" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Runs out to the side so you can fish several lines",
      "Trips on the strike, the fight is with the fish, not the diver",
      "The size most trollers settle on after owning all three",
      "Adjustable to change how far off the boat it tracks",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "General-purpose trolling, the default Dipsy.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102267XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-3-1-4-dipsy-diver-silver-silver-",
    name: "Luhr-Jensen 3¼″ Dipsy Diver — Silver/Silver Bottom Crush",
    category: "Trolling & Rigging",
    price: 18.99,
    tagline: "The middle Dipsy, the one most people own",
    blurb:
      "A diving planer that takes your bait down and sideways, away from the boat. The sideways part is the point: several lines, no tangles, and water the prop hasn't just spooked.",
    specs: [
      { label: "Color", value: "Silver/Silver Bottom Crush" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Runs out to the side so you can fish several lines",
      "Trips on the strike, the fight is with the fish, not the diver",
      "The size most trollers settle on after owning all three",
      "Adjustable to change how far off the boat it tracks",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "General-purpose trolling, the default Dipsy.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102269XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-3-1-4-dipsy-diver-chartreuse-sil",
    name: "Luhr-Jensen 3¼″ Dipsy Diver — Chartreuse/Silver Bottom Moon Jelly",
    category: "Trolling & Rigging",
    price: 16.99,
    tagline: "The middle Dipsy, the one most people own",
    blurb:
      "A diving planer that takes your bait down and sideways, away from the boat. The sideways part is the point: several lines, no tangles, and water the prop hasn't just spooked.",
    specs: [
      { label: "Color", value: "Chartreuse/Silver Bottom Moon Jelly" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Runs out to the side so you can fish several lines",
      "Trips on the strike, the fight is with the fish, not the diver",
      "The size most trollers settle on after owning all three",
      "Adjustable to change how far off the boat it tracks",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "General-purpose trolling, the default Dipsy.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102270XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-30-jet-driver-black-moon-jelly",
    name: "Luhr-Jensen Jet Driver 30 ft — Black Moon Jelly",
    category: "Trolling & Rigging",
    price: 12.49,
    tagline: "Thirty feet, same principle",
    blurb:
      "The deeper Jet Diver, reaching about thirty feet on the same jet-port principle. Run one of each and you find the productive depth in two passes instead of six.",
    specs: [
      { label: "Color", value: "Black Moon Jelly" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Ten feet deeper than the 20 for the same effort",
      "No lead, so light gear still handles it",
      "Holds depth at trolling speed rather than planing up",
      "Run alongside the 20 to bracket the fish",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Fish deeper than a 20-foot diver reaches.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102257XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-30-jet-driver-clear-uv-moon-jell",
    name: "Luhr-Jensen Jet Driver 30 ft — Clear UV Moon Jelly",
    category: "Trolling & Rigging",
    price: 10.99,
    tagline: "Thirty feet, same principle",
    blurb:
      "The deeper Jet Diver, reaching about thirty feet on the same jet-port principle. Run one of each and you find the productive depth in two passes instead of six.",
    specs: [
      { label: "Color", value: "Clear UV Moon Jelly" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Ten feet deeper than the 20 for the same effort",
      "No lead, so light gear still handles it",
      "Holds depth at trolling speed rather than planing up",
      "Run alongside the 20 to bracket the fish",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Fish deeper than a 20-foot diver reaches.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102258XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-30-jet-driver-silver-uv-crush",
    name: "Luhr-Jensen Jet Driver 30 ft — Silver UV Crush",
    category: "Trolling & Rigging",
    price: 12.99,
    tagline: "Thirty feet, same principle",
    blurb:
      "The deeper Jet Diver, reaching about thirty feet on the same jet-port principle. Run one of each and you find the productive depth in two passes instead of six.",
    specs: [
      { label: "Color", value: "Silver UV Crush" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Ten feet deeper than the 20 for the same effort",
      "No lead, so light gear still handles it",
      "Holds depth at trolling speed rather than planing up",
      "Run alongside the 20 to bracket the fish",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Fish deeper than a 20-foot diver reaches.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102259XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-4-1-8-dipsy-diver-black-black-bo",
    name: "Luhr-Jensen 4⅛″ Dipsy Diver — Black/Black Bottom Moon Jelly",
    category: "Trolling & Rigging",
    price: 23.99,
    tagline: "The big Dipsy, for depth and distance",
    blurb:
      "Deepest and furthest out of the three sizes, and the hardest pulling. Worth owning when fish are deep and the water is wide; worth leaving home the rest of the time.",
    specs: [
      { label: "Color", value: "Black/Black Bottom Moon Jelly" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Deepest and widest tracking of the three sizes",
      "Spreads lines furthest apart when running several",
      "For heavier rods, it will overwhelm light gear",
      "Trips on the strike like the smaller sizes",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Deep fish, wide spreads, heavier gear.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102273XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-4-1-8-dipsy-diver-fire-silver-bo",
    name: "Luhr-Jensen 4⅛″ Dipsy Diver — Fire/Silver Bottom Moon Jelly",
    category: "Trolling & Rigging",
    price: 19.49,
    tagline: "The big Dipsy, for depth and distance",
    blurb:
      "Deepest and furthest out of the three sizes, and the hardest pulling. Worth owning when fish are deep and the water is wide; worth leaving home the rest of the time.",
    specs: [
      { label: "Color", value: "Fire/Silver Bottom Moon Jelly" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Deepest and widest tracking of the three sizes",
      "Spreads lines furthest apart when running several",
      "For heavier rods, it will overwhelm light gear",
      "Trips on the strike like the smaller sizes",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Deep fish, wide spreads, heavier gear.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102277XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-4-1-8-dipsy-diver-kelly-green-si",
    name: "Luhr-Jensen 4⅛″ Dipsy Diver — Kelly Green/Silver Bottom Moon Jelly",
    category: "Trolling & Rigging",
    price: 19.49,
    tagline: "The big Dipsy, for depth and distance",
    blurb:
      "Deepest and furthest out of the three sizes, and the hardest pulling. Worth owning when fish are deep and the water is wide; worth leaving home the rest of the time.",
    specs: [
      { label: "Color", value: "Kelly Green/Silver Bottom Moon Jelly" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Deepest and widest tracking of the three sizes",
      "Spreads lines furthest apart when running several",
      "For heavier rods, it will overwhelm light gear",
      "Trips on the strike like the smaller sizes",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Deep fish, wide spreads, heavier gear.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102278XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-8-1-4-blue-ka",
    name: "Luhr-Jensen Money Roll Flasher — 8¼″, Blue Kamikaze UV",
    category: "Trolling & Rigging",
    price: 19.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "8¼″" },
      { label: "Color", value: "Blue Kamikaze UV" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110782XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-8-1-4-chrome-",
    name: "Luhr-Jensen Money Roll Flasher — 8¼″, Chrome Ladder",
    category: "Trolling & Rigging",
    price: 19.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "8¼″" },
      { label: "Color", value: "Chrome Ladder" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110784XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-8-1-4-citrus-",
    name: "Luhr-Jensen Money Roll Flasher — 8¼″, Citrus Nugget",
    category: "Trolling & Rigging",
    price: 19.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "8¼″" },
      { label: "Color", value: "Citrus Nugget" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110786XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-8-1-4-glow-bl",
    name: "Luhr-Jensen Money Roll Flasher — 8¼″, Glow Blue Crush",
    category: "Trolling & Rigging",
    price: 19.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "8¼″" },
      { label: "Color", value: "Glow Blue Crush" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110787XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-8-1-4-rainbow",
    name: "Luhr-Jensen Money Roll Flasher — 8¼″, Rainbow Crush",
    category: "Trolling & Rigging",
    price: 18.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "8¼″" },
      { label: "Color", value: "Rainbow Crush" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110790XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-8-1-4-nuclear",
    name: "Luhr-Jensen Money Roll Flasher — 8¼″, Nuclear Carbon Glow",
    category: "Trolling & Rigging",
    price: 17.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "8¼″" },
      { label: "Color", value: "Nuclear Carbon Glow" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110792XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-8-1-4-razzle-",
    name: "Luhr-Jensen Money Roll Flasher — 8¼″, Razzle Dazzle",
    category: "Trolling & Rigging",
    price: 19.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "8¼″" },
      { label: "Color", value: "Razzle Dazzle" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110793XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-8-1-4-pearl-b",
    name: "Luhr-Jensen Money Roll Flasher — 8¼″, Pearl Blue Skeleton",
    category: "Trolling & Rigging",
    price: 19.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "8¼″" },
      { label: "Color", value: "Pearl Blue Skeleton" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110794XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-8-1-4-2-face-",
    name: "Luhr-Jensen Money Roll Flasher — 8¼″, 2 Face UV",
    category: "Trolling & Rigging",
    price: 19.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "8¼″" },
      { label: "Color", value: "2 Face UV" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110795XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-blue-kamik",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Blue Kamikaze UV",
    category: "Trolling & Rigging",
    price: 25.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "Blue Kamikaze UV" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110796XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-brandon-s-",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Brandon's Secret",
    category: "Trolling & Rigging",
    price: 24.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "Brandon's Secret" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110797XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-chrome-lad",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Chrome Ladder",
    category: "Trolling & Rigging",
    price: 23.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "Chrome Ladder" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110798XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-chrome-sca",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Chrome Scale",
    category: "Trolling & Rigging",
    price: 24.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "Chrome Scale" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110799XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-citrus-nug",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Citrus Nugget",
    category: "Trolling & Rigging",
    price: 24.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "Citrus Nugget" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110800XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-glow-blue-",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Glow Blue Crush",
    category: "Trolling & Rigging",
    price: 24.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "Glow Blue Crush" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110801XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-glow-bioha",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Glow Biohazard",
    category: "Trolling & Rigging",
    price: 25.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "Glow Biohazard" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110804XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-nuclear-ca",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Nuclear Carbon Glow",
    category: "Trolling & Rigging",
    price: 24.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "Nuclear Carbon Glow" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110806XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-razzle-daz",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Razzle Dazzle",
    category: "Trolling & Rigging",
    price: 23.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "Razzle Dazzle" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110807XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-pearl-blue",
    name: "Luhr-Jensen Money Roll Flasher — 11″, Pearl Blue Skeleton",
    category: "Trolling & Rigging",
    price: 24.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "Pearl Blue Skeleton" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110808XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "luhr-jensen-money-roll-flasher-11-2-face-uv",
    name: "Luhr-Jensen Money Roll Flasher — 11″, 2 Face UV",
    category: "Trolling & Rigging",
    price: 24.99,
    tagline: "Rolling attractor for a trolled rig",
    blurb:
      "A flasher doesn't catch fish, it makes the bait behind it findable from much further away. The roll throws flash in every direction on a slow troll, which is why a spread with one out-fishes the same spread without.",
    specs: [
      { label: "Size", value: "11″" },
      { label: "Color", value: "2 Face UV" },
      { label: "Brand", value: "Luhr-Jensen" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Widens the area a fish can find your bait from",
      "Rolling action rather than a hard flip, easier on light gear",
      "Standard West Coast salmon rigging",
      "Color matters less than having one on, but carry two",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Trolling for salmon, especially in colored or deep water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110809XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "plano-edge-3700-terminal",
    name: "Plano EDGE 3700 Terminal",
    category: "Tackle Storage",
    price: 64.99,
    tagline: "Terminal tackle, held individually",
    blurb:
      "The EDGE terminal box holds hooks, swivels and weights in their own compartments rather than as a heap. Rustrictor coating and a waterproof gasket, which is what stops a box of hooks becoming scrap after a salt season.",
    specs: [
      { label: "Brand", value: "Plano" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Individual compartments, no untangling hooks",
      "Rustrictor coating on every internal surface",
      "Waterproof gasket keeps spray out",
      "Standard 3700 footprint fits any bag",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "Once your terminal tackle outgrows a zip bag.",
    featured: false,
    image: "https://productimageserver.com/product/xl/79718XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "plano-edge-professional-3600-standard-stowaw",
    name: "Plano EDGE Professional 3600 Standard Stowaway",
    category: "Tackle Storage",
    price: 32.99,
    tagline: "The 3600 EDGE, standard depth",
    blurb:
      "Same professional-grade gasket and Rustrictor coating as the 3700 range, in the smaller 3600 footprint, for bags and packs built around that size.",
    specs: [
      { label: "Brand", value: "Plano" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Real gasket, not a claimed one",
      "Rustrictor coating slows salt corrosion",
      "3600 footprint for smaller packs",
      "Positive dual latches that survive being dropped",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "Packs and bags built around the 3600 size.",
    featured: false,
    image: "https://productimageserver.com/product/xl/79714XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "plano-prolatch-xl-stowaway-utility-box",
    name: "Plano ProLatch XL StowAway Utility Box",
    category: "Tackle Storage",
    price: 14.99,
    tagline: "Extra-large, for the bulky stuff",
    blurb:
      "The XL ProLatch, for things that don't fit a standard utility box, big plugs, bulk soft plastics, a spare reel. ProLatch closures that stay shut when the box goes in upside down.",
    specs: [
      { label: "Brand", value: "Plano" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Fits what a standard utility box won't",
      "ProLatch closures actually stay closed",
      "Adjustable dividers for whatever you're storing",
      "Cheap way to stop big lures rattling loose",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "Big plugs, bulk plastics, anything oversized.",
    featured: false,
    image: "https://productimageserver.com/product/xl/66603XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },


  {
    key: "plano-stowaway-3700-thin-stow",
    name: "Plano StowAway 3700 Thin Stow",
    category: "Tackle Storage",
    price: 14.99,
    tagline: "Shallow 3700 for flat tackle",
    blurb:
      "The shallow 3700, right for hooks, blades, swivels and anything that lies flat. Two thin boxes fit the slot one deep box takes.",
    specs: [
      { label: "Brand", value: "Plano" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Two thin boxes stack into one deep slot",
      "Correct depth for flat terminal tackle",
      "Adjustable dividers",
      "Standard 3700 footprint",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "Hooks, swivels and blades.",
    featured: false,
    image: "https://productimageserver.com/product/xl/109932XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "plano-waterproof-stowaway-utility-box-3500-s",
    name: "Plano Waterproof StowAway Utility Box — 3500 Size",
    category: "Tackle Storage",
    price: 11.99,
    tagline: "Gasket-sealed utility box",
    blurb:
      "A proper rubber gasket in the lid, so spray, rain and a wet bag floor stay out. The cheapest insurance there is against opening a box of rusted hooks.",
    specs: [
      { label: "Color", value: "3500 Size" },
      { label: "Brand", value: "Plano" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rubber gasket seals against spray and rain",
      "Cheaper than replacing rusted terminal tackle",
      "Adjustable dividers",
      "Fits standard bag slots",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "Kayaks, open boats, anywhere things get wet.",
    featured: false,
    image: "https://productimageserver.com/product/xl/66587XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "plano-waterproof-stowaway-3500",
    name: "Plano Waterproof Stowaway 3500",
    category: "Tackle Storage",
    price: 15.29,
    tagline: "Sealed 3500, for smaller kit",
    blurb:
      "The waterproof 3500, smaller footprint for packs built around that size, same gasket sealing the lid.",
    specs: [
      { label: "Brand", value: "Plano" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Gasket-sealed against spray",
      "3500 footprint for smaller packs",
      "Adjustable dividers",
      "Stacks with other 3500 boxes",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "Smaller packs and lighter trips.",
    featured: false,
    image: "https://productimageserver.com/product/xl/109119XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "plano-waterproof-stowaway-3700",
    name: "Plano Waterproof Stowaway 3700",
    category: "Tackle Storage",
    price: 18.99,
    tagline: "Sealed 3700, the common size",
    blurb:
      "The waterproof version of the format nearly every tackle bag is built around, including the Rapala Venture backpack we sell.",
    specs: [
      { label: "Brand", value: "Plano" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Gasket-sealed against spray and rain",
      "3700 is the size most bags are designed for",
      "Adjustable dividers",
      "Fits three to a Venture 13 backpack",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "The default box, in the version that keeps water out.",
    featured: false,
    image: "https://productimageserver.com/product/xl/109117XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "plano-weekend-tackle-bag-3500-slate-plawknd3",
    name: "Plano Weekend Tackle Bag 3500 — Slate, PLAWKND3500GBTSLATE",
    category: "Tackle Storage",
    price: 44.99,
    tagline: "Soft bag sized for 3500 boxes",
    blurb:
      "A soft-sided bag built around the 3500 format, for trips where a full 3700 system is more than you need. Shoulder strap and enough external pockets to keep tools out of the main compartment.",
    specs: [
      { label: "Color", value: "Slate" },
      { label: "Color ", value: "PLAWKND3500GBTSLATE" },
      { label: "Brand", value: "Plano" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Sized around 3500 boxes rather than the bigger 3700",
      "Lighter and smaller than a full tackle system",
      "External pockets keep tools separate",
      "Shoulder strap for walking in",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "Short trips, or a second bag for a specific style of fishing.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105273XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "rapala-50lb-high-contrast-digital-scale",
    name: "Rapala 50 lb High Contrast Digital Scale",
    category: "Tools",
    price: 49.49,
    tagline: "Readable in bad light",
    blurb:
      "Fifty pounds of capacity with a high-contrast display, which matters more than it sounds, most fish get weighed at dawn, at dusk, or in the rain, and a dim LCD is useless in all three.",
    specs: [
      { label: "Brand", value: "Rapala" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "High-contrast display readable in poor light",
      "Fifty pounds covers shore and small-boat fishing",
      "Digital, so no parallax guessing off a dial",
      "Compact enough to live in a bag",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: [],
    whenToUse: "Any fish worth recording.",
    featured: false,
    image: "https://productimageserver.com/product/xl/96772XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "rapala-6-super-stainless-steel-pliers",
    name: "Rapala 6″ Super Stainless Steel Pliers",
    category: "Tools",
    price: 24.99,
    tagline: "The shorter stainless pliers",
    blurb:
      "Six inches rather than eight, easier in a pocket and better for smaller hooks, at the cost of some reach. The internal spring holds the jaws open for one-handed use.",
    specs: [
      { label: "Brand", value: "Rapala" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Self-opening jaws for genuine one-handed use",
      "Shorter and lighter than the 8-inch",
      "Side cutter handles line and leader",
      "Lanyard point, because the sea takes untethered things",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: [],
    whenToUse: "Smaller hooks, or when you want pliers in a pocket.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110901XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "rapala-angler-s-pliers-6-1-2",
    name: "Rapala Angler's Pliers — 6½″",
    category: "Tools",
    price: 12.99,
    tagline: "The budget pair, for a spare",
    blurb:
      "The cheap Rapala pliers, not the stainless ones, but perfectly good as a second pair for the car, the kayak, or the friend who never brings their own.",
    specs: [
      { label: "Size", value: "6½″" },
      { label: "Brand", value: "Rapala" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Cheap enough to keep a spare in every bag",
      "Side cutter for line and leader",
      "Does the job without being precious about it",
      "Six and a half inches of reach",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: [],
    whenToUse: "A second pair, or a first pair on a budget.",
    featured: false,
    image: "https://productimageserver.com/product/xl/66347XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "rapala-fisherman-s-tool-combo",
    name: "Rapala Fisherman's Tool Combo",
    category: "Tools",
    price: 51.99,
    tagline: "Pliers and a gripper together",
    blurb:
      "The combo pack, pliers and a fish gripper bought together, which is what most people end up owning anyway. Cheaper as a pair than separately.",
    specs: [
      { label: "Brand", value: "Rapala" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "The two tools nearly everyone ends up buying",
      "Cheaper together than separately",
      "Grip the fish, remove the hook, no hands near teeth",
      "A sensible single purchase for a first kit",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: [],
    whenToUse: "Kitting out from nothing.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110904XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "rapala-floating-fish-gripper-6",
    name: "Rapala Floating Fish Gripper — 6″",
    category: "Tools",
    price: 12.49,
    tagline: "Floats when you drop it",
    blurb:
      "A lip gripper that floats, which is the entire feature, and worth it the first time you fumble one over the side. Controls the fish without your hands near the gill plate or the hooks.",
    specs: [
      { label: "Size", value: "6″" },
      { label: "Brand", value: "Rapala" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Floats, so dropping it isn't losing it",
      "Controls a fish without hands near teeth or trebles",
      "Keeps the fish still while a hook comes out",
      "Light enough to clip on and forget",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: [],
    whenToUse: "Any fish you'd rather not hold by hand.",
    featured: false,
    image: "https://productimageserver.com/product/xl/96769XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "rapala-floating-fish-gripper-scale-combo",
    name: "Rapala Floating Fish Gripper Scale Combo",
    category: "Tools",
    price: 39.99,
    tagline: "Gripper and scale, and it floats",
    blurb:
      "The floating gripper with a scale built in, so a fish is controlled and weighed in one movement, and if you drop it over the side you get it back.",
    specs: [
      { label: "Brand", value: "Rapala" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Grip and weigh in one motion",
      "Floats if it goes over the side",
      "No hands near teeth or trebles",
      "Weigh, record, release in seconds",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: [],
    whenToUse: "Weighing fish you intend to put back.",
    featured: false,
    image: "https://productimageserver.com/product/xl/96771XL.jpg",
    familyKey: "Rapala Fish Gripper Scale Combo",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "rapala-large-lure-wrap-3-pack",
    name: "Rapala Large Lure Wrap 3-Pack",
    category: "Tackle Storage",
    price: 11.99,
    tagline: "Stops trebles finding each other",
    blurb:
      "Clear wraps that go over a lure's hooks so a box of plugs doesn't become one welded mass. Three to a pack, and you'll want more than three.",
    specs: [
      { label: "Brand", value: "Rapala" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Trebles stop hooking each other in the box",
      "Clear, so you can still see which lure is which",
      "Protects the finish from rubbing",
      "Three per pack, buy two",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "The moment you own more than a few treble-hooked plugs.",
    featured: false,
    image: "https://productimageserver.com/product/xl/88209XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "rapala-rapstack-3600-open-foam-tackle-tray",
    name: "Rapala RapStack 3600 Open Foam Tackle Tray",
    category: "Tackle Storage",
    price: 13.99,
    tagline: "Foam insert for hooked baits",
    blurb:
      "Open foam rather than dividers, so rigged baits and jigs press in and stay put with their hooks buried. The right storage for anything already tied on.",
    specs: [
      { label: "Brand", value: "Rapala" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Foam holds rigged baits without them moving",
      "Hooks bury in the foam instead of snagging",
      "Keeps pre-tied rigs ready to go",
      "Stacks with the rest of the RapStack range",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "Storing baits and jigs already rigged.",
    featured: false,
    image: "https://productimageserver.com/product/xl/101113XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "rapala-rapstack-3600-tackle-tray",
    name: "Rapala RapStack 3600 Tackle Tray",
    category: "Tackle Storage",
    price: 13.99,
    tagline: "Standard 3600 tray",
    blurb:
      "The plain 3600 tray in the RapStack system, with adjustable dividers. Stacks with the deeper and foam versions so a bag stays one coherent system.",
    specs: [
      { label: "Brand", value: "Rapala" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Stacks with the rest of the RapStack range",
      "Adjustable dividers",
      "3600 footprint for smaller packs",
      "Cheap enough to buy several at once",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "bag",
    pairsWith: [],
    whenToUse: "Building out a RapStack system.",
    featured: false,
    image: "https://productimageserver.com/product/xl/101112XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },


  {
    key: "shurhold-gopro-camera-adapter",
    name: "Shurhold GoPro Camera Adapter",
    category: "Tools",
    price: 12.98,
    tagline: "Camera on the end of a pole",
    blurb:
      "Mounts a GoPro to a Shur-LOK handle, which turns a net pole into a camera pole. Useful for footage under the boat, and for the shot of a fish in the water that nobody can take one-handed.",
    specs: [
      { label: "Brand", value: "Shurhold" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Turns a net handle into a camera pole",
      "Standard GoPro mount",
      "Quick-release like everything else in the range",
      "Gets the underwater angle without getting wet",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "pliers",
    pairsWith: [],
    whenToUse: "Filming, or getting the shot from an angle you can't reach.",
    featured: false,
    image: "https://productimageserver.com/product/xl/51144XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "shurhold-shur-lok-gaff-hook",
    name: "Shurhold Shur-LOK Gaff Hook",
    category: "Nets & Landing",
    price: 67.98,
    tagline: "For fish past netting size",
    blurb:
      "A gaff head on the Shur-LOK fitting, for fish you're keeping and are past the size a net handles well. Same handle as your net, one pole, the right head for the job.",
    specs: [
      { label: "Brand", value: "Shurhold" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "For fish too big to net cleanly",
      "Shares the handle with your net heads",
      "Stainless, for obvious reasons",
      "Only for fish you're keeping",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "net",
    pairsWith: [],
    whenToUse: "Big fish you intend to keep.",
    featured: false,
    image: "https://productimageserver.com/product/xl/32953XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "shurhold-shur-lok-landing-net-17-x-20-x-30",
    name: "Shurhold Shur-LOK Landing Net — 17″ × 20″ × 30″",
    category: "Nets & Landing",
    price: 44.99,
    tagline: "Full-size net head for the Shur-LOK handles",
    blurb:
      "A proper landing net head on the Shur-LOK quick-release, so it clips onto the telescoping or fixed handle in a second. Seventeen by twenty inches with thirty inches of depth, sized for fish you'd actually want a net for.",
    specs: [
      { label: "Size", value: "17″ × 20″ × 30″" },
      { label: "Brand", value: "Shurhold" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Quick-release onto any Shur-LOK handle",
      "Deep bag holds a fish rather than bouncing it out",
      "Swaps with the crab net on the same handle",
      "Handle sold separately",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "net",
    pairsWith: [],
    whenToUse: "Landing decent fish from a dock, jetty or boat.",
    featured: false,
    image: "https://productimageserver.com/product/xl/32954XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "shurhold-shur-lok-shrimp-shad-dip-net-17-x-2",
    name: "Shurhold Shur-LOK Shrimp & Shad Dip Net — 17″ × 20″ × 30″",
    category: "Nets & Landing",
    price: 56.98,
    tagline: "Fine mesh for bait, not fish",
    blurb:
      "Fine-mesh dip net for shrimp and small baitfish, the mesh a landing net can't do, on the same quick-release fitting. Gathering your own bait is half the fun and most of the saving.",
    specs: [
      { label: "Size", value: "17″ × 20″ × 30″" },
      { label: "Brand", value: "Shurhold" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Fine mesh holds shrimp and small bait",
      "Same Shur-LOK fitting as the landing net",
      "Deep bag for scooping under a light at night",
      "One handle, several heads",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "net",
    pairsWith: [],
    whenToUse: "Gathering shrimp or bait under a dock light.",
    featured: false,
    image: "https://productimageserver.com/product/xl/32956XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "shurhold-shur-lok-threaded-adapter",
    name: "Shurhold Shur-LOK Threaded Adapter",
    category: "Nets & Landing",
    price: 9.99,
    tagline: "Puts a threaded head on a Shur-LOK pole",
    blurb:
      "Adapts a standard threaded head onto the Shur-LOK system, so a pole you already own isn't wasted when you buy into the quick-release range.",
    specs: [
      { label: "Brand", value: "Shurhold" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Bridges threaded heads onto Shur-LOK poles",
      "Saves replacing gear you already own",
      "Aluminum, so it won't seize in salt",
      "Small enough to keep in the bag",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "net",
    pairsWith: [],
    whenToUse: "Mixing older threaded heads with a Shur-LOK handle.",
    featured: false,
    image: "https://productimageserver.com/product/xl/32957XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-advanced-lead-core-18lb-10-color-m",
    name: "Sufix 832 Advanced Lead Core — 18 lb, 10-Color Metered, 100 yd",
    category: "Line & Leader",
    price: 34.99,
    tagline: "Color changes every ten yards",
    blurb:
      "Lead core sinks, and it changes color every ten yards so you can count exactly how much is out. Depth stops being a guess and becomes a number you can repeat when a pass produces a fish.",
    specs: [
      { label: "Line rating", value: "18 lb" },
      { label: "Color", value: "10-Color Metered" },
      { label: "Spool length", value: "100 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Counting colors makes depth repeatable",
      "Gets baits down without a downrigger",
      "832 construction on the outer braid",
      "The cheapest depth control there is",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Trolling to a depth you need to hit again.",
    featured: false,
    image: "https://productimageserver.com/product/xl/96812XL.jpg",
    prop65: true,
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-advanced-lead-core-27lb-10-color-m",
    name: "Sufix 832 Advanced Lead Core — 27 lb, 10-Color Metered, 100 yd",
    category: "Line & Leader",
    price: 34.99,
    tagline: "Color changes every ten yards",
    blurb:
      "Lead core sinks, and it changes color every ten yards so you can count exactly how much is out. Depth stops being a guess and becomes a number you can repeat when a pass produces a fish.",
    specs: [
      { label: "Line rating", value: "27 lb" },
      { label: "Color", value: "10-Color Metered" },
      { label: "Spool length", value: "100 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Counting colors makes depth repeatable",
      "Gets baits down without a downrigger",
      "832 construction on the outer braid",
      "The cheapest depth control there is",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Trolling to a depth you need to hit again.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110915XL.jpg",
    prop65: true,
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-braid-30lb-fire-tiger-300-yds",
    name: "Sufix 832 Advanced Superline Braid — 30 lb, Fire Tiger, 300 yd",
    category: "Line & Leader",
    price: 32.99,
    tagline: "The 832 in a high-visibility finish",
    blurb:
      "Same eight-fiber construction as the rest of the 832 range, in a color you can watch. Being able to see your line is the fastest way to learn to spot a bite before you feel it.",
    specs: [
      { label: "Line rating", value: "30 lb" },
      { label: "Color", value: "Fire Tiger" },
      { label: "Spool length", value: "300 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Watching the line teaches you bites you'd otherwise miss",
      "Same abrasion resistance as every other 832 color",
      "Round profile spools cleanly",
      "Fluorocarbon leader keeps color away from the fish",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Low light, current, or learning to detect a take.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110910XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-advanced-superline-braid-8lb-coast",
    name: "Sufix 832 Advanced Superline Braid — 8 lb, Coastal Camo, 150 yd",
    category: "Line & Leader",
    price: 18.99,
    tagline: "8 fibers, 32 picks per inch",
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber at 32 picks per inch. The GORE strand is what makes it quiet through the guides and stubborn against sand and shell, the two things that end a session early.",
    specs: [
      { label: "Line rating", value: "8 lb" },
      { label: "Color", value: "Coastal Camo" },
      { label: "Spool length", value: "150 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "The GORE fiber cuts line vibration, so you feel the take",
      "32 picks per inch makes it round, and round line spools properly",
      "Abrasion resistance that survives shell and rock",
      "Run a fluorocarbon leader and color stops mattering",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Main line for surf and inshore spinning.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90744XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-advanced-superline-braid-8lb-low-v",
    name: "Sufix 832 Advanced Superline Braid — 8 lb, Low-Vis Green, 150 yd",
    category: "Line & Leader",
    price: 18.69,
    tagline: "8 fibers, 32 picks per inch",
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber at 32 picks per inch. The GORE strand is what makes it quiet through the guides and stubborn against sand and shell, the two things that end a session early.",
    specs: [
      { label: "Line rating", value: "8 lb" },
      { label: "Color", value: "Low-Vis Green" },
      { label: "Spool length", value: "150 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "The GORE fiber cuts line vibration, so you feel the take",
      "32 picks per inch makes it round, and round line spools properly",
      "Abrasion resistance that survives shell and rock",
      "Run a fluorocarbon leader and color stops mattering",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Main line for surf and inshore spinning.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90745XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-advanced-superline-braid-8lb-ghost",
    name: "Sufix 832 Advanced Superline Braid — 8 lb, Ghost, 150 yd",
    category: "Line & Leader",
    price: 19.99,
    tagline: "8 fibers, 32 picks per inch",
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber at 32 picks per inch. The GORE strand is what makes it quiet through the guides and stubborn against sand and shell, the two things that end a session early.",
    specs: [
      { label: "Line rating", value: "8 lb" },
      { label: "Color", value: "Ghost" },
      { label: "Spool length", value: "150 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "The GORE fiber cuts line vibration, so you feel the take",
      "32 picks per inch makes it round, and round line spools properly",
      "Abrasion resistance that survives shell and rock",
      "Run a fluorocarbon leader and color stops mattering",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Main line for surf and inshore spinning.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90746XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-advanced-superline-braid-15lb-ghos",
    name: "Sufix 832 Advanced Superline Braid — 15 lb, Ghost, 150 yd",
    category: "Line & Leader",
    price: 19.99,
    tagline: "8 fibers, 32 picks per inch",
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber at 32 picks per inch. The GORE strand is what makes it quiet through the guides and stubborn against sand and shell, the two things that end a session early.",
    specs: [
      { label: "Line rating", value: "15 lb" },
      { label: "Color", value: "Ghost" },
      { label: "Spool length", value: "150 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "The GORE fiber cuts line vibration, so you feel the take",
      "32 picks per inch makes it round, and round line spools properly",
      "Abrasion resistance that survives shell and rock",
      "Run a fluorocarbon leader and color stops mattering",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Main line for surf and inshore spinning.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90788XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-advanced-superline-braid-30lb-low-",
    name: "Sufix 832 Advanced Superline Braid — 30 lb, Low-Vis Green, 150 yd",
    category: "Line & Leader",
    price: 19.49,
    tagline: "8 fibers, 32 picks per inch",
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber at 32 picks per inch. The GORE strand is what makes it quiet through the guides and stubborn against sand and shell, the two things that end a session early.",
    specs: [
      { label: "Line rating", value: "30 lb" },
      { label: "Color", value: "Low-Vis Green" },
      { label: "Spool length", value: "150 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "The GORE fiber cuts line vibration, so you feel the take",
      "32 picks per inch makes it round, and round line spools properly",
      "Abrasion resistance that survives shell and rock",
      "Run a fluorocarbon leader and color stops mattering",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Main line for surf and inshore spinning.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90847XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-advanced-superline-braid-10lb-neon",
    name: "Sufix 832 Advanced Superline Braid — 10 lb, Neon Lime, 300 yd",
    category: "Line & Leader",
    price: 29.49,
    tagline: "8 fibers, 32 picks per inch",
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber at 32 picks per inch. The GORE strand is what makes it quiet through the guides and stubborn against sand and shell, the two things that end a session early.",
    specs: [
      { label: "Line rating", value: "10 lb" },
      { label: "Color", value: "Neon Lime" },
      { label: "Spool length", value: "300 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "The GORE fiber cuts line vibration, so you feel the take",
      "32 picks per inch makes it round, and round line spools properly",
      "Abrasion resistance that survives shell and rock",
      "Run a fluorocarbon leader and color stops mattering",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Main line for surf and inshore spinning.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90765XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-advanced-superline-braid-15lb-low-",
    name: "Sufix 832 Advanced Superline Braid — 15 lb, Low-Vis Green, 300 yd",
    category: "Line & Leader",
    price: 36.99,
    tagline: "8 fibers, 32 picks per inch",
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber at 32 picks per inch. The GORE strand is what makes it quiet through the guides and stubborn against sand and shell, the two things that end a session early.",
    specs: [
      { label: "Line rating", value: "15 lb" },
      { label: "Color", value: "Low-Vis Green" },
      { label: "Spool length", value: "300 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "The GORE fiber cuts line vibration, so you feel the take",
      "32 picks per inch makes it round, and round line spools properly",
      "Abrasion resistance that survives shell and rock",
      "Run a fluorocarbon leader and color stops mattering",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Main line for surf and inshore spinning.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90793XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-832-advanced-superline-braid-20lb-low-",
    name: "Sufix 832 Advanced Superline Braid — 20 lb, Low-Vis Green, 300 yd",
    category: "Line & Leader",
    price: 34.84,
    tagline: "8 fibers, 32 picks per inch",
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber at 32 picks per inch. The GORE strand is what makes it quiet through the guides and stubborn against sand and shell, the two things that end a session early.",
    specs: [
      { label: "Line rating", value: "20 lb" },
      { label: "Color", value: "Low-Vis Green" },
      { label: "Spool length", value: "300 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "The GORE fiber cuts line vibration, so you feel the take",
      "32 picks per inch makes it round, and round line spools properly",
      "Abrasion resistance that survives shell and rock",
      "Run a fluorocarbon leader and color stops mattering",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Main line for surf and inshore spinning.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90823XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-performance-lead-core-36lb-10-color-me",
    name: "Sufix Performance Lead Core — 36 lb, 10-Color Metered, 200 yd",
    category: "Line & Leader",
    price: 45.99,
    tagline: "Metered lead core, longer spools",
    blurb:
      "The same color-metered principle in longer lengths, for filling a dedicated trolling reel rather than topping one up. Ten-yard color changes throughout.",
    specs: [
      { label: "Line rating", value: "36 lb" },
      { label: "Color", value: "10-Color Metered" },
      { label: "Spool length", value: "200 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Long spools for a dedicated trolling setup",
      "Ten-yard color metering end to end",
      "Sinks without weights or a downrigger",
      "Repeatable depth once you know the count",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Filling a dedicated lead-core trolling reel.",
    featured: false,
    image: "https://productimageserver.com/product/xl/96826XL.jpg",
    prop65: true,
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "sufix-revolve-braid-14-lb-coastal-camo-200-y",
    name: "Sufix Revolve Braid — 14 lb, Coastal Camo, 200 yd",
    category: "Line & Leader",
    price: 22.09,
    tagline: "Smoother-casting braid at a lower price",
    blurb:
      "Sufix's smoother, rounder braid for people who want a good line without paying 832 money. Casts further than mono at the same test and behaves properly on a spinning spool.",
    specs: [
      { label: "Line rating", value: "14 lb" },
      { label: "Color", value: "Coastal Camo" },
      { label: "Spool length", value: "200 yd" },
      { label: "Brand", value: "Sufix" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Round and smooth, so it leaves the spool cleanly",
      "Noticeably cheaper than 832",
      "Small diameter for the strength, like all braid",
      "A sensible first braid if you're switching from mono",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "A first braid, or a spare spool you don't want to spend 832 money on.",
    featured: false,
    image: "https://productimageserver.com/product/xl/110921XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "vmc-titanium-leader-7-strand-15lb-12",
    name: "VMC Titanium Leader 7-Strand — 15 lb, 12″",
    category: "Line & Leader",
    price: 14.49,
    tagline: "Titanium, for teeth",
    blurb:
      "Seven-strand titanium leader, kink-resistant in a way steel isn't, and it doesn't take a permanent set after a fish rolls in it. For anything with teeth that would go through fluorocarbon.",
    specs: [
      { label: "Line rating", value: "15 lb" },
      { label: "Size", value: "12″" },
      { label: "Brand", value: "VMC" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Titanium springs back instead of kinking like steel",
      "Survives a fish rolling in the leader",
      "Thin enough not to kill the action of a small bait",
      "Reusable across several trips",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Toothy fish, anywhere fluorocarbon comes back shredded.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90980XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "vmc-titanium-leader-7-strand-30lb-12",
    name: "VMC Titanium Leader 7-Strand — 30 lb, 12″",
    category: "Line & Leader",
    price: 14.99,
    tagline: "Titanium, for teeth",
    blurb:
      "Seven-strand titanium leader, kink-resistant in a way steel isn't, and it doesn't take a permanent set after a fish rolls in it. For anything with teeth that would go through fluorocarbon.",
    specs: [
      { label: "Line rating", value: "30 lb" },
      { label: "Size", value: "12″" },
      { label: "Brand", value: "VMC" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Titanium springs back instead of kinking like steel",
      "Survives a fish rolling in the leader",
      "Thin enough not to kill the action of a small bait",
      "Reusable across several trips",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Toothy fish, anywhere fluorocarbon comes back shredded.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90982XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "vmc-titanium-leader-multi-strand-50lb-12",
    name: "VMC Titanium Leader Multi-Strand — 50 lb, 12″",
    category: "Line & Leader",
    price: 14.49,
    tagline: "Heavier titanium, more strands",
    blurb:
      "The multi-strand version at fifty pounds, more supple than the seven-strand and rated for bigger fish. Still kink-resistant, still reusable.",
    specs: [
      { label: "Line rating", value: "50 lb" },
      { label: "Size", value: "12″" },
      { label: "Brand", value: "VMC" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "More strands means more suppleness at the same rating",
      "Fifty pounds handles most toothy targets",
      "Kink-resistant where steel takes a set",
      "Cheaper than replacing chewed-off fluorocarbon all day",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "spool",
    pairsWith: [],
    whenToUse: "Bigger toothy fish, or where wire needs to be supple.",
    featured: false,
    image: "https://productimageserver.com/product/xl/90975XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "williamson-high-speed-tuna-catcher-rigged-7-",
    name: "Williamson High-Speed Tuna Catcher Rigged — 7½″ skirt, Monte Carlo",
    category: "Lures",
    price: 26.99,
    tagline: "Rigged skirt, built for a fast troll",
    blurb:
      "Holds together and keeps swimming at the speed you cover water looking for tuna, where slower skirts blow out and spin. Arrives rigged, so it goes straight into the spread.",
    specs: [
      { label: "Size", value: "7½″ skirt" },
      { label: "Color", value: "Monte Carlo" },
      { label: "Brand", value: "Williamson" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Holds its swim at searching speeds",
      "Arrives rigged, no evening at the vice",
      "Seven and a half inches is the searching size",
      "Carry two colors rather than two sizes",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Covering water fast, hunting tuna or dorado.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105325XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "williamson-high-speed-tuna-catcher-rigged-8-",
    name: "Williamson High-Speed Tuna Catcher Rigged — 8″ skirt, Skipjack",
    category: "Lures",
    price: 35.25,
    tagline: "The bigger rigged skirt",
    blurb:
      "Eight inches of rigged skirt for fish keyed on larger bait. Fewer bites, better average size, which is the trade you make once you've caught enough small ones.",
    specs: [
      { label: "Size", value: "8″ skirt" },
      { label: "Color", value: "Skipjack" },
      { label: "Brand", value: "Williamson" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Bigger profile filters out the small stuff",
      "Rigged and ready for the spread",
      "Rated hardware for the fight it will pick",
      "Runs in the long positions",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "lure",
    pairsWith: [],
    whenToUse: "Offshore, hunting size rather than numbers.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105348XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "williamson-kensaki-220-jig-6-75-7-3-4oz-hot-",
    name: "Williamson Kensaki 220 Jig — 6¾″, 7¾ oz, Hot Sauce",
    category: "Lures",
    price: 18.99,
    tagline: "Rotates on the fall, pre-rigged",
    blurb:
      "Convex on one side, concave on the other, so it spins as it drops instead of falling dead. Each face is finished differently, which turns that rotation into a strobing flash, and the drop is when most fish commit.",
    specs: [
      { label: "Size", value: "6¾″" },
      { label: "Weight", value: "7¾ oz" },
      { label: "Color", value: "Hot Sauce" },
      { label: "Brand", value: "Williamson" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Opposing faces make it rotate instead of dropping flat",
      "Two-tone finish turns rotation into flash",
      "Ball-bearing swivel lets it swim free of the line",
      "Arrives rigged with a VMC assist hook",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "jig",
    pairsWith: [],
    whenToUse: "Eighty to a hundred and fifty feet over structure.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105296XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },

  {
    key: "williamson-kensaki-280-jig-7-25-9-7-8oz-char",
    name: "Williamson Kensaki 280 Jig — 7¼″, 9⅞ oz, Chartreuse Blink",
    category: "Lures",
    price: 21.99,
    tagline: "The heavier Kensaki",
    blurb:
      "Nine and seven-eighths ounces, for deeper water or more current than the 220 can hold in. Same rotating body, more weight to keep it in the zone.",
    specs: [
      { label: "Size", value: "7¼″" },
      { label: "Weight", value: "9⅞ oz" },
      { label: "Color", value: "Chartreuse Blink" },
      { label: "Brand", value: "Williamson" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Holds the strike zone where the 220 gets swept out",
      "Same rotating fall that makes the Kensaki work",
      "Pre-rigged with a VMC assist hook",
      "Sits between the 220 and the 300",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "jig",
    pairsWith: [],
    whenToUse: "Deeper water or stronger current.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105303XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "mate-30-rod-cup-holder",
    name: "Mate Series 30° Rod & Cup Holder — Drained, White",
    category: "Rod Holders",
    price: 19.99,
    tagline: "Rod tube underway, drink holder at anchor",
    blurb:
      "A single 30-degree cutout that takes a rod while you're trolling and a can while you're not. The 3/8\" NPT drain fitting means it never sits full of rainwater, which is what kills the cheap ones. The least expensive way to put a proper drained gunwale tube in a small boat.",
    specs: [
      { label: "Color", value: "White" },
      { label: "Brand", value: "Mate Series" },
      { label: "Angle", value: "30°" },
      { label: "Top", value: "Round, drained" },
      { label: "Material", value: "Polymer" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "30° angle suits trolling and drifting alike",
      "3/8\" NPT drain so water never stands in it",
      "Round top takes a rod butt or a standard can",
      "UV-stable polymer, no corrosion to chase",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rod-short",
    pairsWith: ["mate-backing-plate", "scotty-1170-release"],
    whenToUse: "Fitting out a center console or skiff gunwale on a budget.",
    featured: false,
    image: "https://productimageserver.com/product/xl/77189XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "scotty-245-rail-mount",
    name: "Scotty 245 Round Rail Mount — 1¼\"",
    category: "Rod Holders",
    price: 18.99,
    tagline: "Adds a rod holder without drilling",
    blurb:
      "Clamps around a 1¼-inch rail and gives you a standard Scotty post to hang any of their rod holders from. On a pontoon or a bow rail this is the difference between one rod holder and six, and you never put a new hole in the boat.",
    specs: [
      { label: "Brand", value: "Scotty" },
      { label: "Fits rail", value: "1¼\" round" },
      { label: "Mount", value: "Clamp-on" },
      { label: "Size", value: "1¼\"" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Fits 1¼\" round rail",
      "Takes any Scotty post-mount holder",
      "No drilling, clamps on and comes off",
      "Glass-reinforced nylon, no galvanic issues",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rod-short",
    pairsWith: ["scotty-405-orca-kit", "three-pole-holder"],
    whenToUse: "Pontoons, bow rails, anywhere you can't or won't drill.",
    featured: false,
    image: "https://productimageserver.com/product/xl/34348XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "scotty-405-orca-kit",
    name: "Scotty 405 Offshore Orca Kit — with 459 Extension",
    category: "Rod Holders",
    price: 54.99,
    tagline: "Locking offshore holder on an extender",
    blurb:
      "The Orca is Scotty's heavy holder: it locks the rod in rather than just cradling it, so a fish that loads up doesn't lift the butt out. The 459 extender that comes with it pulls the whole thing up and inboard, clear of a downrigger cable.",
    specs: [
      { label: "Brand", value: "Scotty" },
      { label: "Color", value: "with 459 Extension" },
      { label: "Mount", value: "Scotty post" },
      { label: "Weight", value: "2.1 lb" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Locking rod retainer, not an open cradle",
      "459 extension included, raises and offsets the rod",
      "Rotates and locks through 360°",
      "Fits the standard Scotty mount system",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rod-short",
    pairsWith: ["scotty-245-rail-mount", "scotty-1170-release", "downrigger"],
    whenToUse: "Trolling offshore with heavy tackle and a cable in the water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/37812XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "mate-15-rod-cup-holder-ss",
    name: "Mate Series 15° Rod & Cup Holder — 316 Stainless, Drained",
    category: "Rod Holders",
    price: 159.99,
    tagline: "The stainless version, for a boat you keep",
    blurb:
      "Cast 316 stainless, 15 degrees, with a drain, the same idea as the polymer one and a different class of object. This is what goes in a gunwale you intend to own for twenty years, and it is priced accordingly.",
    specs: [
      { label: "Brand", value: "Mate Series" },
      { label: "Material", value: "316L stainless" },
      { label: "Angle", value: "15°" },
      { label: "Top", value: "Round, drained" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Cast 316L stainless, the marine-grade alloy",
      "15° angle, round drained top",
      "3/8\" NPT drain fitting",
      "Takes a rod butt or a standard can",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rod-short",
    pairsWith: ["mate-backing-plate", "mate-30-rod-cup-holder"],
    whenToUse: "A permanent gunwale fit-out you won't redo.",
    featured: false,
    image: "https://productimageserver.com/product/xl/72502XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "ce-smith-swivel-flush-mount-80",
    name: "C.E. Smith 80 Series Swivel Flush Mount — 0°, Stainless",
    category: "Rod Holders",
    price: 214.99,
    tagline: "The holder rotates with the fish",
    blurb:
      "A flush mount whose whole barrel swivels, so a fish running down the side of the boat turns the holder instead of bending the rod against it. This is bent-butt tuna hardware, the most serious rod holder we sell, and priced like it.",
    specs: [
      { label: "Brand", value: "C.E. Smith" },
      { label: "Series", value: "80 Series" },
      { label: "Angle", value: "0° (vertical)" },
      { label: "Material", value: "Stainless steel" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Barrel swivels through 360° under load",
      "Stainless construction, 0° vertical",
      "Takes bent-butt and straight-butt rods",
      "Flush fit, nothing to catch a line",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rod-short",
    pairsWith: ["mate-backing-plate", "taco-outrigger-clips"],
    whenToUse: "Fighting big pelagics off a gunwale on stand-up tackle.",
    featured: false,
    image: "https://productimageserver.com/product/xl/30231XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "mate-backing-plate",
    name: "Mate Series Threaded Backing Plate — 316 Stainless",
    category: "Rod Holders",
    price: 23.99,
    tagline: "Mount from the top when you can't reach behind",
    blurb:
      "A cast stainless plate with threads in it, so a rod or cup holder bolts down solid from above with no access underneath and no nuts to drop into the bilge. It also spreads the load, which is what stops a gelcoat spider crack around the cutout.",
    specs: [
      { label: "Brand", value: "Mate Series" },
      { label: "Material", value: "316L stainless" },
      { label: "Type", value: "Threaded backing plate" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Threaded, no backing nuts, no access needed",
      "Cast 316L stainless",
      "Spreads load and prevents gelcoat cracking",
      "Fits the Mate Series rod & cup holder cutout",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rig",
    pairsWith: ["mate-15-rod-cup-holder-ss", "mate-30-rod-cup-holder"],
    whenToUse: "Any gunwale holder install with no access behind the panel.",
    featured: false,
    image: "https://productimageserver.com/product/xl/103694XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "scotty-1170-release",
    name: "Scotty 1170 Power Grip Plus Release — 18\" Leader",
    category: "Trolling & Rigging",
    price: 14.99,
    tagline: "The part you lose and replace most",
    blurb:
      "Grips the line by the pad rather than the knot, so it holds under trolling load and lets go clean on the strike without shaving your braid. The 18-inch mono leader sets the lure back off the ball. Buy two.",
    specs: [
      { label: "Brand", value: "Scotty" },
      { label: "Size", value: "18\" Leader" },
      { label: "Leader", value: "18\" mono" },
      { label: "Fitting", value: "Cannonball snap" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Pad grip, adjustable tension, no line damage",
      "18\" mono leader with cannonball snap",
      "Releases clean on the strike",
      "The standard replacement on any downrigger",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["scotty-370-snubber", "scotty-1176-stacker", "downrigger"],
    whenToUse: "Every downrigger trip. They wear, they break, they go over the side.",
    featured: false,
    image: "https://productimageserver.com/product/xl/34313XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "scotty-370-snubber",
    name: "Scotty 370 Trolling Snubber — with SAMPO Swivel",
    category: "Trolling & Rigging",
    price: 15.49,
    tagline: "Absorbs the shock that snaps cable",
    blurb:
      "Sits between the cable and the cannonball and takes the jolt when the ball swings or the boat drops off a wave. That shock is what parts cable and pulls hooks. The SAMPO ball-bearing swivel on the end kills the line twist that comes with it.",
    specs: [
      { label: "Brand", value: "Scotty" },
      { label: "Color", value: "with SAMPO Swivel" },
      { label: "Swivel", value: "SAMPO ball-bearing" },
      { label: "Fitting", value: "Cannonball snap" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Absorbs shock loading on cable and hooks",
      "SAMPO ball-bearing swivel, real twist control",
      "Cannonball snap fitted",
      "Cheap insurance against a lost ball",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["scotty-1170-release", "downrigger-cable", "downrigger"],
    whenToUse: "Any time there's weight on a wire in a seaway.",
    featured: false,
    image: "https://productimageserver.com/product/xl/34297XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "scotty-1176-stacker",
    name: "Scotty 1176 Power Grip Plus Stacker Release — 6\" Leader",
    category: "Trolling & Rigging",
    price: 15.49,
    tagline: "Two rods off one downrigger cable",
    blurb:
      "Clips onto the cable above the ball so you can run a second rod at a shallower depth on the same wire. Twice the lines in the strike zone for the price of a release rather than the price of another downrigger.",
    specs: [
      { label: "Brand", value: "Scotty" },
      { label: "Size", value: "6\" Leader" },
      { label: "Leader", value: "6\"" },
      { label: "Type", value: "Stacker" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Runs a second line above the cannonball",
      "6\" leader keeps it tight to the cable",
      "Same pad grip as the 1170",
      "Doubles coverage without a second 'rigger",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["scotty-1170-release", "downrigger"],
    whenToUse: "Working a thermocline where the fish are spread over ten feet.",
    featured: false,
    image: "https://productimageserver.com/product/xl/35527XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "scotty-1148-weight-hook",
    name: "Scotty 1148 Weight Hook — 1¼\" Boom Mount",
    category: "Trolling & Rigging",
    price: 16.49,
    tagline: "Somewhere to park the cannonball",
    blurb:
      "Bolts to a 1¼-inch boom and gives the ball a home while you fight and net the fish. Without one the cannonball swings on the end of the cable into your gelcoat, which you will only enjoy once.",
    specs: [
      { label: "Brand", value: "Scotty" },
      { label: "Size", value: "1¼\" Boom Mount" },
      { label: "Fits", value: "1¼\" boom" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Parks the cannonball clear of the hull",
      "Fits 1¼\" downrigger booms",
      "Frees both hands for the net",
      "Stops the swing that chips gelcoat",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["scotty-370-snubber", "downrigger"],
    whenToUse: "The moment a fish is on and the ball is still in the water.",
    featured: false,
    image: "https://productimageserver.com/product/xl/39627XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "scotty-377-sure-stop",
    name: "Scotty 377 Sure Stop Pro — 30\" Boom, with Snubber",
    category: "Trolling & Rigging",
    price: 22.49,
    tagline: "Stops the ball in the same place every time",
    blurb:
      "An electric downrigger retrieving at full speed will drive a cannonball into the boom if nothing stops it. This does, at a repeatable spot, with a snubber built in to soften the arrival. It saves booms.",
    specs: [
      { label: "Brand", value: "Scotty" },
      { label: "Size", value: "30\" Boom" },
      { label: "Color", value: "with Snubber" },
      { label: "Boom", value: "30\"" },
      { label: "Snubber", value: "Included" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Repeatable stop point on retrieve",
      "Integral snubber softens the stop",
      "Sized for a 30\" boom",
      "Protects the boom and the terminal pulley",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["pulley-kit", "downrigger-cable", "scotty-370-snubber"],
    whenToUse: "Running an electric downrigger where retrieve speed isn't in your hand.",
    featured: false,
    image: "https://productimageserver.com/product/xl/73732XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "scotty-358-rodmaster-ii",
    name: "Scotty 358 Rodmaster II — Clamp-On, 1¼\" Boom",
    category: "Trolling & Rigging",
    price: 32.99,
    tagline: "Rod sits right at the release",
    blurb:
      "Clamps straight onto the downrigger boom so the rod rides at the release rather than three feet away from it, which is where you actually want it when you're setting lines single-handed. The removable gimbal pin keeps the butt put when a fish loads up.",
    specs: [
      { label: "Brand", value: "Scotty" },
      { label: "Color", value: "Clamp-On" },
      { label: "Size", value: "1¼\" Boom" },
      { label: "Fits", value: "1¼\" boom" },
      { label: "Gimbal", value: "Removable pin" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Clamps to a 1¼\" downrigger boom",
      "Removable gimbal pin locks the butt",
      "Puts the rod where the release is",
      "Adjustable angle",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rod-short",
    pairsWith: ["scotty-1170-release", "downrigger"],
    whenToUse: "Setting and resetting downrigger lines on your own.",
    featured: false,
    image: "https://productimageserver.com/product/xl/34373XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "taco-outrigger-clips",
    name: "TACO Standard Outrigger Release Clips — Pair",
    category: "Trolling & Rigging",
    price: 28.70,
    tagline: "Holds the bait out, drops it clean",
    blurb:
      "Tension-adjustable stainless and polymer clips that carry your bait out on the halyard and let go when a fish loads up. Sold in pairs, which is the honest quantity, you will lose one before you wear one out.",
    specs: [
      { label: "Brand", value: "TACO Marine" },
      { label: "Color", value: "Pair" },
      { label: "Quantity", value: "Pair" },
      { label: "Tension", value: "Adjustable" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Adjustable release tension",
      "Stainless and polymer, built for salt",
      "Pair, matches a two-rigger set-up",
      "Standard halyard fitting",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["harken-229f-block", "ce-smith-swivel-flush-mount-80"],
    whenToUse: "Spreading baits wide off outriggers for pelagics.",
    featured: false,
    image: "https://productimageserver.com/product/xl/60571XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "harken-229f-block",
    name: "Harken 22mm Triple Micro Block with Becket — Fishing",
    category: "Trolling & Rigging",
    price: 54.95,
    tagline: "Halyards that run under load",
    blurb:
      "Harken makes sailing blocks, and this is the fishing-finish version of one. Three sheaves and a becket in a 2¼-ounce package that runs smoothly with real load on it, which is the whole problem with cheap outrigger hardware.",
    specs: [
      { label: "Brand", value: "Harken" },
      { label: "Color", value: "Fishing" },
      { label: "Sheave", value: "22 mm" },
      { label: "Config", value: "Triple + becket" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Three sheaves plus becket",
      "Low-friction sailing-grade bearings",
      "Rated for serious working load",
      "2.25 oz, negligible weight aloft",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rig",
    pairsWith: ["taco-outrigger-clips"],
    whenToUse: "Rigging outriggers or a kite properly rather than cheaply.",
    featured: false,
    image: "https://productimageserver.com/product/xl/78687XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "yakgear-drain-plug-kit",
    name: "YakGear Universal Drain Plug Kit",
    category: "Kayak & Paddle",
    price: 12.99,
    tagline: "Both common threads, so you don't have to measure",
    blurb:
      "Every kayak eventually loses its drain plug, usually on the water, usually when you notice the footwell filling. This kit has both of the common thread sizes in it so you can fix that without first working out which one you had.",
    specs: [
      { label: "Brand", value: "YakGear" },
      { label: "Type", value: "Drain plug kit" },
      { label: "Fitment", value: "Universal" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Covers both common drain thread sizes",
      "O-ring sealed",
      "Tethers so the spare doesn't go the same way",
      "Fits most sit-in and sit-on-top hulls",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "rig",
    pairsWith: ["yakgear-scupper-plugs", "yakgear-paddle-leash"],
    whenToUse: "Before you need it, not after.",
    featured: false,
    image: "https://productimageserver.com/product/xl/101697XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "yakgear-paddle-leash",
    name: "YakGear Coiled Paddle Leash — 24\"",
    category: "Kayak & Paddle",
    price: 13.99,
    tagline: "Your paddle stays with the boat",
    blurb:
      "You put the paddle down to fight a fish, a gust or a wake takes it, and now you're swimming after your only means of propulsion. A coiled leash costs fourteen dollars and removes that entire scenario.",
    specs: [
      { label: "Brand", value: "YakGear" },
      { label: "Length", value: "24\" coiled" },
      { label: "Type", value: "Paddle leash" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Coiled, stays out of the way until it's needed",
      "24\" relaxed, stretches well beyond",
      "Clips to paddle and to a deck fitting",
      "Also works on a rod or a net",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "rig",
    pairsWith: ["yakgear-drain-plug-kit", "railblaza-rod-holder-ii"],
    whenToUse: "Every trip. It lives on the paddle.",
    featured: false,
    image: "https://productimageserver.com/product/xl/101684XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "yakgear-scupper-plugs",
    name: "YakGear Universal Scupper Plug Kit",
    category: "Kayak & Paddle",
    price: 15.99,
    tagline: "Stay dry in cold water",
    blurb:
      "Sit-on-top scuppers drain the deck, which is excellent in July and miserable in February. Plug them and you stop taking cold water up through the floor; pull them when you want the deck self-draining again.",
    specs: [
      { label: "Brand", value: "YakGear" },
      { label: "Quantity", value: "4" },
      { label: "Fitment", value: "Universal taper" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Seals sit-on-top scupper holes",
      "Tapered to fit a range of hole sizes",
      "Pull tabs, in and out without tools",
      "Four in the kit",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "rig",
    pairsWith: ["yakgear-drain-plug-kit", "yakgear-paddle-leash"],
    whenToUse: "Cold-water months, or any time you'd rather sit dry.",
    featured: false,
    image: "https://productimageserver.com/product/xl/101702XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "yakgear-grapnel-anchor",
    name: "YakGear 3.3 lb Grapnel Anchor Kit — with Storage Bag",
    category: "Kayak & Paddle",
    price: 30.99,
    tagline: "Hold a spot without a 20 lb anchor",
    blurb:
      "A folding galvanised grapnel sized for a kayak, with rope, float and a bag to keep the whole mess contained. Enough to hold you over a reef or a drop-off in moderate current, and it folds down small enough to stow in a hatch.",
    specs: [
      { label: "Brand", value: "YakGear" },
      { label: "Weight", value: "3.3 lb" },
      { label: "Includes", value: "Rope, float, bag" },
      { label: "Type", value: "Folding grapnel" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "3.3 lb folding grapnel, right size for a kayak",
      "Rope, float and storage bag included",
      "Folds flat for hatch storage",
      "Galvanised against salt",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "rig",
    pairsWith: ["scotty-276-anchor-lock", "yakgear-paddle-leash"],
    whenToUse: "Sitting on a structure edge instead of drifting past it.",
    featured: false,
    image: "https://productimageserver.com/product/xl/101690XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "railblaza-rod-holder-ii",
    name: "RAILBLAZA Rod Holder II — with MiniPort TracMount",
    category: "Kayak & Paddle",
    price: 35.99,
    tagline: "Drops into your existing gear track",
    blurb:
      "Slides into the track your kayak already has, holds a spinning or conventional outfit at an adjustable angle, and lifts straight out with no tools when you load the boat on the roof. No drilling, no new holes below the waterline.",
    specs: [
      { label: "Brand", value: "RAILBLAZA" },
      { label: "Mount", value: "MiniPort TracMount" },
      { label: "Fits", value: "Standard gear track" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Fits standard kayak gear track",
      "Takes spinning and conventional reels",
      "Tool-free removal for transport",
      "Adjustable angle and rotation",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "rod-short",
    pairsWith: ["railblaza-hexx-mount", "yakgear-paddle-leash"],
    whenToUse: "Rigging a fishing kayak without drilling it.",
    featured: false,
    image: "https://productimageserver.com/product/xl/105801XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "scotty-276-anchor-lock",
    name: "Scotty 276 Anchor Lock — with 241 Side Deck Mount",
    category: "Kayak & Paddle",
    price: 39.99,
    tagline: "Anchor one-handed, sitting down",
    blurb:
      "Pay out line, lock it, release it, all with one hand, from a seated position, which is the only position available in a kayak. This is the part that makes anchoring from a small boat something you'll actually do rather than something you'll talk about.",
    specs: [
      { label: "Brand", value: "Scotty" },
      { label: "Color", value: "with 241 Side Deck Mount" },
      { label: "Operation", value: "One-handed" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "One-handed lock and release",
      "Works seated, designed for kayaks",
      "241 side or deck mount included",
      "Takes standard anchor line",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "rig",
    pairsWith: ["yakgear-grapnel-anchor", "railblaza-rod-holder-ii"],
    whenToUse: "Anchoring a kayak in current without standing up.",
    featured: false,
    image: "https://productimageserver.com/product/xl/35507XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "railblaza-hexx-mount",
    name: "RAILBLAZA HEXX Fish Finder Mount",
    category: "Kayak & Paddle",
    price: 69.99,
    tagline: "Screen where you can read it",
    blurb:
      "A three-axis mount stiff enough to hold a fish finder steady in chop and adjustable enough to put the screen at an angle you can actually read in sun. Pulls off in seconds when the kayak goes on the roof rack.",
    specs: [
      { label: "Brand", value: "RAILBLAZA" },
      { label: "Adjustment", value: "Three axes" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Three-axis adjustment",
      "Rigid enough for chop, no screen wobble",
      "Removes in seconds for transport",
      "Fits common finder mounting patterns",
    ],
    gradient: ["#1f3340", "#48788f"],
    glyph: "rig",
    pairsWith: ["railblaza-rod-holder-ii", "yakgear-grapnel-anchor"],
    whenToUse: "Running electronics on a kayak or small tiller boat.",
    featured: false,
    image: "https://productimageserver.com/product/xl/102209XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "orion-safety-whistle",
    name: "Orion Safety Whistle with Lanyard — 2-Pack",
    category: "Safety & Flotation",
    price: 9.99,
    tagline: "Meets the sound-signal requirement, costs nothing",
    blurb:
      "Orion rates these at 116 dB at one meter. Clipped to a PFD, a whistle carries when your voice doesn't, and a boat under 40 feet has to carry a sound-producing device anyway. Two in the pack, one for the vest, one for the bag.",
    specs: [
      { label: "Brand", value: "Orion" },
      { label: "Output", value: "116 dB at 1 m" },
      { label: "Quantity", value: "2" },
      { label: "Quantity", value: "2-Pack" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "116 dB at 1 m, per Orion",
      "Two whistles with lanyards",
      "Meets the USCG carriage requirement for a sound-producing device on boats under 40 ft",
      "Clips to a PFD and stays there",
    ],
    gradient: ["#3f2f1c", "#8a6a2e"],
    glyph: "rig",
    pairsWith: ["orion-signal-mirror", "acr-c-strobe-h2o"],
    whenToUse: "On the vest, permanently.",
    featured: false,
    image: "https://productimageserver.com/product/xl/77049XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "orion-signal-mirror",
    name: "Orion Signalling Mirror with Lanyard — 3\" × 4\"",
    category: "Safety & Flotation",
    price: 16.99,
    tagline: "Works when the battery doesn't",
    blurb:
      "A 3-by-4 mirror with a viewfinder so you can actually aim the flash at a boat or a plane. Orion puts visibility at up to ten miles in clear conditions. It weighs three ounces, never needs charging, and doesn't care that your phone is dead.",
    specs: [
      { label: "Brand", value: "Orion" },
      { label: "Size", value: "3\" × 4\"" },
      { label: "Weight", value: "3 oz" },
      { label: "Size", value: "3\" × 4\"" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Viewfinder for aiming the flash",
      "Up to 10 miles in clear conditions, per Orion",
      "3 oz, non-corroding in salt water",
      "Lanyard fitted",
    ],
    gradient: ["#3f2f1c", "#8a6a2e"],
    glyph: "rig",
    pairsWith: ["orion-safety-whistle", "acr-rapidditch-express"],
    whenToUse: "In the dry bag with the whistle and the strobe.",
    featured: false,
    image: "https://productimageserver.com/product/xl/70981XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "acr-c-strobe-h2o",
    name: "ACR C-Strobe H2O — Water-Activated LED Distress Strobe",
    category: "Safety & Flotation",
    price: 29.99,
    tagline: "Fires the moment it hits the water",
    blurb:
      "Water-activated, so if you go over the side at dusk you become a flashing target rather than a dark head in the chop, without having to find a switch. ACR states USCG and SOLAS approval, a 45-lumen LED and over 120 hours of runtime.",
    specs: [
      { label: "Brand", value: "ACR" },
      { label: "Color", value: "Water-Activated LED Distress Strobe" },
      { label: "Approval", value: "USCG / SOLAS, per ACR" },
      { label: "Runtime", value: ">120 hr at 30°C" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Water-activated, or manual",
      "USCG and SOLAS approved, per ACR",
      "45-lumen LED, >120 hr runtime at 30°C",
      "Clips to a PFD",
    ],
    gradient: ["#3f2f1c", "#8a6a2e"],
    glyph: "lamp",
    pairsWith: ["orion-safety-whistle", "mustang-throw-bag-75"],
    whenToUse: "Clipped to the vest before every low-light trip.",
    featured: false,
    image: "https://productimageserver.com/product/xl/59880XL.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "mustang-throw-bag-75",
    name: "Mustang Survival Throw Bag — 75 ft Rope",
    category: "Safety & Flotation",
    price: 79.99,
    tagline: "Reach someone without going in after them",
    blurb:
      "Seventy-five feet of floating 9 mm line you can throw one-handed to someone who's gone in off a jetty or a boat, without leaving your own footing to do it. Retro-reflective tape, mesh top so it dries, quick-release buckles.",
    specs: [
      { label: "Brand", value: "Mustang Survival" },
      { label: "Rope", value: "75 ft, 9 mm floating" },
      { label: "Length", value: "75 ft Rope" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "75 ft of floating 9 mm polypropylene line",
      "Throws one-handed",
      "Retro-reflective tape and light-stick holder",
      "Mesh top, the rope dries instead of rotting",
    ],
    gradient: ["#3f2f1c", "#8a6a2e"],
    glyph: "bag",
    pairsWith: ["acr-c-strobe-h2o", "acr-rapidditch-express"],
    whenToUse: "Jetty, pier and boat fishing, anywhere someone could go in.",
    featured: false,
    image: "https://productimageserver.com/product/xl/93013XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "acr-rapidditch-express",
    name: "ACR RapidDitch Express — Abandon Ship Bag",
    category: "Safety & Flotation",
    price: 99.95,
    tagline: "Everything that matters, in one grab",
    blurb:
      "A buoyant grab bag for the VHF, flares, phone and first-aid kit, so leaving in a hurry is one motion instead of four. ACR rates it to float 15 lb dead weight with the bag flooded. It is water-resistant, not a dry bag, pack accordingly.",
    specs: [
      { label: "Brand", value: "ACR" },
      { label: "Color", value: "Abandon Ship Bag" },
      { label: "Capacity", value: "8 gal (21 × 6 × 14.5 in)" },
      { label: "Flotation", value: "15 lb, per ACR" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Floats 15 lb dead weight when flooded, per ACR",
      "600D reflective exterior, 8 gal capacity",
      "Shoulder straps convert to two 4 ft safety tethers",
      "Water-resistant, not a dry bag",
    ],
    gradient: ["#3f2f1c", "#8a6a2e"],
    glyph: "bag",
    pairsWith: ["mustang-throw-bag-75", "acr-c-strobe-h2o"],
    whenToUse: "Offshore, or any trip where the walk home isn't an option.",
    featured: false,
    image: "https://productimageserver.com/product/xl/50058XL.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "daiwa-ft-surf-9",
    name: "Daiwa FT Surf Spinning Rod — 9', 2-Piece Medium",
    category: "Surf Rods",
    price: 34.99,
    tagline: "Fiberglass, two-piece, honestly priced",
    blurb:
      "The short one, for jetties, piers and beaches where you don't need to reach the horizon. Easier to control in a crowd and easier to fit in a car. Fiberglass rather than graphite, which is the trade Daiwa made deliberately: heavier in the hand, far harder to break, and a third of the price. Two-piece, so it ships as a normal parcel instead of an oversize freight item.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Length", value: "9'" },
      { label: "Pieces", value: "2" },
      { label: "Power", value: "Medium" },
      { label: "Blank", value: "Fiberglass" },
      { label: "Casting weight", value: "1–3 oz" },
      { label: "Line rating", value: "8–20 lb" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Two-piece, ships as a parcel, fits in a car",
      "Fiberglass blank: forgiving, and very hard to break",
      "8–20 lb line, 1–3 oz casting weight",
      "Daiwa's entry surf series, priced accordingly",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rod",
    pairsWith: [ "braided-line", "fluoro-leader"],
    whenToUse: "Beach, jetty and pier fishing on the tide push.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/533342.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "daiwa-ft-surf-11",
    name: "Daiwa FT Surf Spinning Rod — 11', 2-Piece Medium",
    category: "Surf Rods",
    price: 34.99,
    tagline: "Fiberglass, two-piece, honestly priced",
    blurb:
      "The long one. Distance when the bar is far out, and enough tip height to keep line above the wash on a steep beach. Fiberglass rather than graphite, which is the trade Daiwa made deliberately: heavier in the hand, far harder to break, and a third of the price. Two-piece, so it ships as a normal parcel instead of an oversize freight item.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Length", value: "11'" },
      { label: "Pieces", value: "2" },
      { label: "Power", value: "Medium" },
      { label: "Blank", value: "Fiberglass" },
      { label: "Casting weight", value: "1–5 oz" },
      { label: "Line rating", value: "10–25 lb" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Two-piece, ships as a parcel, fits in a car",
      "Fiberglass blank: forgiving, and very hard to break",
      "10–25 lb line, 1–5 oz casting weight",
      "Daiwa's entry surf series, priced accordingly",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rod",
    pairsWith: ["circle-hooks", "braided-line", "fluoro-leader"],
    whenToUse: "Beach, jetty and pier fishing on the tide push.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/533340.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "gamakatsu-octopus-circle-3-0",
    name: "Gamakatsu Octopus Circle Hook — 3/0, Black Nickel, 6-Pack",
    category: "Terminal Tackle",
    price: 4.99,
    tagline: "The one everybody quietly buys",
    blurb:
      "Gamakatsu's steel and their point are the reason this hook costs more than the one next to it, and the reason most serious bait anglers use it anyway. Short shank, offset circle bend, black nickel finish that disappears in the water.",
    specs: [
      { label: "Brand", value: "Gamakatsu" },
      { label: "Size", value: "3/0" },
      { label: "Quantity", value: "6" },
      { label: "Finish", value: "Black nickel" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Gamakatsu high-carbon steel",
      "Offset circle point",
      "Black nickel, low visibility",
      "6 per pack",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "hook",
    pairsWith: ["circle-hooks", "fluoro-leader"],
    whenToUse: "Live and cut bait, when you'd rather not lose the fish of the day.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/5294.gif",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "gamakatsu-octopus-circle-1-0",
    name: "Gamakatsu Octopus Circle Hook — 1/0, Black Nickel, 6-Pack",
    category: "Terminal Tackle",
    price: 4.99,
    tagline: "The one everybody quietly buys",
    blurb:
      "Gamakatsu's steel and their point are the reason this hook costs more than the one next to it, and the reason most serious bait anglers use it anyway. Short shank, offset circle bend, black nickel finish that disappears in the water.",
    specs: [
      { label: "Brand", value: "Gamakatsu" },
      { label: "Size", value: "1/0" },
      { label: "Quantity", value: "6" },
      { label: "Finish", value: "Black nickel" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Gamakatsu high-carbon steel",
      "Offset circle point",
      "Black nickel, low visibility",
      "6 per pack",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "hook",
    pairsWith: ["circle-hooks", "fluoro-leader"],
    whenToUse: "Live and cut bait, when you'd rather not lose the fish of the day.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/5323.gif",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "gamakatsu-worm-hook-3-0",
    name: "Gamakatsu Worm Hook — Straight Shank — Size 3/0, 5-Pack",
    category: "Terminal Tackle",
    price: 5.49,
    tagline: "Texas rig, done properly",
    blurb:
      "The hook a soft plastic lives on. Rigged weedless it comes through wood and grass without collecting either, and Gamakatsu's point sets through a plastic body without you having to lean on it.",
    specs: [
      { label: "Brand", value: "Gamakatsu" },
      { label: "Size", value: "3/0" },
      { label: "Quantity", value: "5" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rigs weedless through cover",
      "Gamakatsu point, sets without brute force",
      "Wide gap for bulky plastics",
      "5 per pack",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "hook",
    pairsWith: ["yamamoto-senko-gp", "strike-king-tungsten-weight-18"],
    whenToUse: "Any Texas-rigged worm, craw or creature bait.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/5241_1709f0ce-78d5-491d-9f43-81906077f3a0.gif",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "gamakatsu-worm-hook-2-0",
    name: "Gamakatsu Worm Hook — Straight Shank — Size 2/0, 6-Pack",
    category: "Terminal Tackle",
    price: 5.49,
    tagline: "Texas rig, done properly",
    blurb:
      "The hook a soft plastic lives on. Rigged weedless it comes through wood and grass without collecting either, and Gamakatsu's point sets through a plastic body without you having to lean on it.",
    specs: [
      { label: "Brand", value: "Gamakatsu" },
      { label: "Size", value: "2/0" },
      { label: "Quantity", value: "6" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rigs weedless through cover",
      "Gamakatsu point, sets without brute force",
      "Wide gap for bulky plastics",
      "6 per pack",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "hook",
    pairsWith: ["yamamoto-senko-gp", "strike-king-tungsten-weight-18"],
    whenToUse: "Any Texas-rigged worm, craw or creature bait.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/5326_3af39903-7d56-4958-bd0c-3d64bc0abee2.gif",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "gamakatsu-offset-worm-hook-1",
    name: "Gamakatsu Offset Worm Hook — Bronze — Size 1, 6-Pack",
    category: "Terminal Tackle",
    price: 5.99,
    tagline: "Texas rig, done properly",
    blurb:
      "The hook a soft plastic lives on. Rigged weedless it comes through wood and grass without collecting either, and Gamakatsu's point sets through a plastic body without you having to lean on it.",
    specs: [
      { label: "Brand", value: "Gamakatsu" },
      { label: "Size", value: "1" },
      { label: "Quantity", value: "6" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rigs weedless through cover",
      "Gamakatsu point, sets without brute force",
      "Wide gap for bulky plastics",
      "6 per pack",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "hook",
    pairsWith: ["yamamoto-senko-gp", "strike-king-tungsten-weight-18"],
    whenToUse: "Any Texas-rigged worm, craw or creature bait.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/5262_da24372f-e526-44fb-be3f-0c687c23a4f9.gif",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "mustad-barrel-swivel-4",
    name: "Mustad High-Speed Multi-Link Swivel — Size 4, 9-Pack, 77 lb",
    category: "Terminal Tackle",
    price: 6.99,
    tagline: "Kills the twist before it reaches your spool",
    blurb:
      "A spinning bait or a trolled lure puts twist into your line every second it's in the water, and twist is what turns a good spool into a bird's nest. This is the cheapest thing you can do about it.",
    specs: [
      { label: "Brand", value: "Mustad" },
      { label: "Size", value: "4" },
      { label: "Quantity", value: "9" },
      { label: "Rating", value: "77 lb" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Multi-link body, turns freely under load",
      "Rated well above the line you'll use it with",
      "Corrosion-resistant finish",
      "Mustad, who have been making these since 1877",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rig",
    pairsWith: ["fluoro-leader", "circle-hooks"],
    whenToUse: "Trolling, spinning, or any bait that rotates.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/25555_17981431-bf71-4f6c-9e48-0b3b32e57e3c.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "mustad-barrel-swivel-2-0",
    name: "Mustad High-Speed Multi-Link Swivel — Size 2/0, 4-Pack, 72 lb",
    category: "Terminal Tackle",
    price: 7.49,
    tagline: "Kills the twist before it reaches your spool",
    blurb:
      "A spinning bait or a trolled lure puts twist into your line every second it's in the water, and twist is what turns a good spool into a bird's nest. This is the cheapest thing you can do about it.",
    specs: [
      { label: "Brand", value: "Mustad" },
      { label: "Size", value: "2/0" },
      { label: "Quantity", value: "4" },
      { label: "Rating", value: "72 lb" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Multi-link body, turns freely under load",
      "Rated well above the line you'll use it with",
      "Corrosion-resistant finish",
      "Mustad, who have been making these since 1877",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rig",
    pairsWith: ["fluoro-leader", "circle-hooks"],
    whenToUse: "Trolling, spinning, or any bait that rotates.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/6544.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "mustad-snap-swivel-12",
    name: "Mustad Rolling Swivel with Diamond Eye & Safety Snap — Size 12, 12-Pack",
    category: "Terminal Tackle",
    price: 3.49,
    tagline: "Change lures without retying",
    blurb:
      "A snap swivel means a lure change costs you five seconds instead of a knot. Small enough at size 12 that it doesn't spook anything, with a safety snap that doesn't open under load the way cheap ones do.",
    specs: [
      { label: "Brand", value: "Mustad" },
      { label: "Size", value: "12" },
      { label: "Quantity", value: "12" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Safety snap, won't spring open on a fish",
      "Rolling swivel body",
      "Black nickel finish",
      "12 per pack",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rig",
    pairsWith: ["kvd-squarebill-sexy-shad", "red-eye-shad-12"],
    whenToUse: "Working through a box of lures to find what they want.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/899478_adb8d278-09b9-48b8-bd4c-10fc5d8e8a57.png",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "strike-king-tungsten-weight-18",
    name: "Strike King Tour Grade Tungsten Weight — 1/8 oz, Green Pumpkin, 4-Pack",
    category: "Terminal Tackle",
    price: 7.99,
    tagline: "Smaller, denser, and you can feel more",
    blurb:
      "Tungsten is roughly twice as dense as lead, so the same weight is a smaller lump, it slips through cover instead of wedging in it, and it transmits far more of what the bottom feels like up the line to your hand. Once you've fished it you don't go back.",
    specs: [
      { label: "Brand", value: "Strike King" },
      { label: "Weight", value: "1/8 oz" },
      { label: "Material", value: "Tungsten" },
      { label: "Quantity", value: "4" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Tungsten, half the size of the same lead weight",
      "Transmits bottom detail lead muffles",
      "Insert protects the line from the weight",
      "Green pumpkin finish, 4 per pack",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rig",
    pairsWith: ["gamakatsu-worm-hook-3-0", "yamamoto-senko-gp"],
    whenToUse: "Texas rigs and flipping, especially around wood.",
    featured: false,
    prop65: true,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/21215.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "mustad-tungsten-worm-weight",
    name: "Mustad TitanX Tungsten Worm Weight — 1/8 oz, 4-Pack",
    category: "Terminal Tackle",
    price: 5.99,
    tagline: "Tungsten at a slightly friendlier price",
    blurb:
      "The same density argument as any tungsten weight, from a company that has been making terminal tackle for a century and a half. Bullet profile, smooth bore, four to a pack.",
    specs: [
      { label: "Brand", value: "Mustad" },
      { label: "Weight", value: "1/8 oz" },
      { label: "Material", value: "Tungsten" },
      { label: "Quantity", value: "4" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Tungsten density in a bullet profile",
      "Smooth bore, easier on line than raw metal",
      "Slides through grass without hanging",
      "4 per pack",
    ],
    gradient: ["#2a2d3a", "#5c6480"],
    glyph: "rig",
    pairsWith: ["gamakatsu-offset-worm-hook-1", "zoom-trick-worm-wrt"],
    whenToUse: "Texas rigging when you'd rather not pay Strike King prices.",
    featured: false,
    prop65: true,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/899597_a069fbd7-5af8-4e99-b539-150f374bce09.png",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "yamamoto-senko-gp",
    name: "Yamamoto 5\" Senko — Green Pumpkin, 10-Pack",
    category: "Soft Baits",
    price: 7.99,
    tagline: "Does nothing, catches everything",
    blurb:
      "The Senko has no action. It is a salt-loaded stick that falls, shimmying very slightly, and bass eat it anyway, nobody has ever fully explained why. Wacky-rigged or Texas-rigged, it is probably the single most productive soft plastic ever made, and it is soft enough that you'll go through them.",
    specs: [
      { label: "Brand", value: "Gary Yamamoto" },
      { label: "Length", value: "5 in" },
      { label: "Color", value: "Green Pumpkin" },
      { label: "Quantity", value: "10" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Heavy salt load, sinks on its own, no weight needed",
      "Fish it wacky or Texas, both work",
      "The original, from Gary Yamamoto",
      "10 per pack",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["gamakatsu-worm-hook-3-0", "strike-king-tungsten-weight-18"],
    whenToUse: "When nothing else is working. Genuinely.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/910670_41fd265d-3c01-422e-ab5a-17f766e9228d.png",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "yamamoto-senko-smoke",
    name: "Yamamoto 5\" Senko — Smoke Pearl Blue, 10-Pack",
    category: "Soft Baits",
    price: 7.99,
    tagline: "Does nothing, catches everything",
    blurb:
      "The Senko has no action. It is a salt-loaded stick that falls, shimmying very slightly, and bass eat it anyway, nobody has ever fully explained why. Wacky-rigged or Texas-rigged, it is probably the single most productive soft plastic ever made, and it is soft enough that you'll go through them.",
    specs: [
      { label: "Brand", value: "Gary Yamamoto" },
      { label: "Length", value: "5 in" },
      { label: "Color", value: "Smoke Pearl Blue" },
      { label: "Quantity", value: "10" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Heavy salt load, sinks on its own, no weight needed",
      "Fish it wacky or Texas, both work",
      "The original, from Gary Yamamoto",
      "10 per pack",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["gamakatsu-worm-hook-3-0", "strike-king-tungsten-weight-18"],
    whenToUse: "When nothing else is working. Genuinely.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/910665.png",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "zoom-trick-worm-wrt",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/30595.jpg",
    name: "Zoom Trick Worm 6½\" — Watermelon Red Tomato, 20-Pack",
    category: "Soft Baits",
    price: 6.99,
    tagline: "Twenty worms for seven dollars",
    blurb:
      "A floating straight-tail worm that you can fish weightless and twitch on the surface, or shaky-head on the bottom. Zoom's plastic is tough enough that one worm survives several fish, and there are twenty in the bag.",
    specs: [
      { label: "Brand", value: "Zoom" },
      { label: "Length", value: "6.5 in" },
      { label: "Color", value: "Watermelon Red Tomato" },
      { label: "Quantity", value: "20" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Floats, fish it weightless on top",
      "Or shaky-head it on the bottom",
      "Tough plastic, survives multiple fish",
      "20 per bag",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["gamakatsu-worm-hook-2-0", "zman-finesse-shroomz"],
    whenToUse: "Post-spawn shallow water, and any time fish are looking up.",
    featured: false,
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "zoom-trick-worm-pc",
    name: "Zoom Trick Worm 6½\" — Pumpkin Chartreuse, 20-Pack",
    category: "Soft Baits",
    price: 6.99,
    tagline: "Twenty worms for seven dollars",
    blurb:
      "A floating straight-tail worm that you can fish weightless and twitch on the surface, or shaky-head on the bottom. Zoom's plastic is tough enough that one worm survives several fish, and there are twenty in the bag.",
    specs: [
      { label: "Brand", value: "Zoom" },
      { label: "Length", value: "6.5 in" },
      { label: "Color", value: "Pumpkin Chartreuse" },
      { label: "Quantity", value: "20" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Floats, fish it weightless on top",
      "Or shaky-head it on the bottom",
      "Tough plastic, survives multiple fish",
      "20 per bag",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["gamakatsu-worm-hook-2-0", "zman-finesse-shroomz"],
    whenToUse: "Post-spawn shallow water, and any time fish are looking up.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/12779.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "zoom-super-fluke-jr",
    name: "Zoom Super Fluke Jr 4\" — Albino, 10-Pack",
    category: "Soft Baits",
    price: 5.49,
    tagline: "Looks like a fleeing baitfish",
    blurb:
      "A soft jerkbait that darts side to side when you twitch it and glides on the pause, the pause is where they take it. The junior size matches smaller bait, which most of the year is what fish are actually eating.",
    specs: [
      { label: "Brand", value: "Zoom" },
      { label: "Length", value: "4 in" },
      { label: "Color", value: "Albino" },
      { label: "Quantity", value: "10" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Erratic darting action on the twitch",
      "Glides on the pause, the strike window",
      "Weightless, weighted or on a swimbait hook",
      "10 per bag",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["zoom-fluke-smokin-shad", "gamakatsu-offset-worm-hook-1"],
    whenToUse: "Schooling fish smashing bait on the surface.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/18614.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "zoom-fluke-smokin-shad",
    name: "Zoom Fluke 4\" — Smokin' Shad, 10-Pack",
    category: "Soft Baits",
    price: 3.99,
    tagline: "Four dollars, and it works",
    blurb:
      "Same darting soft-jerkbait profile in the standard body, in a translucent shad pattern that covers most clear-water situations. At four dollars a bag there is no reason not to have two.",
    specs: [
      { label: "Brand", value: "Zoom" },
      { label: "Length", value: "4 in" },
      { label: "Color", value: "Smokin' Shad" },
      { label: "Quantity", value: "10" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Darts and glides like a dying baitfish",
      "Translucent shad pattern for clear water",
      "Cheap enough to lose without caring",
      "10 per bag",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["zoom-super-fluke-jr", "mustad-snap-swivel-12"],
    whenToUse: "Clear water, bright day, fish chasing bait.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/12399.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "zoom-brush-hog-junebug",
    name: "Zoom Midsize Brush Hog — Junebug, 10-Pack",
    category: "Soft Baits",
    price: 6.79,
    tagline: "Appendages that won't sit still",
    blurb:
      "A creature bait with enough flapping parts that it moves even when you don't. Junebug, dark purple with green flake, is the color that works in stained water when nothing bright will. The midsize is the one to own if you're only owning one.",
    specs: [
      { label: "Brand", value: "Zoom" },
      { label: "Length", value: "4.5–5 in" },
      { label: "Color", value: "Junebug" },
      { label: "Quantity", value: "10" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Multiple appendages, constant movement",
      "Junebug: the stained-water standard",
      "Midsize suits pressured fish",
      "10 per bag",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["gamakatsu-worm-hook-3-0", "strike-king-tungsten-weight-18"],
    whenToUse: "Flipping wood and grass in stained water.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/152850.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "rage-bug",
    name: "Strike King Rage Bug 4\" — Smoke Purple Black Flake, 7-Pack",
    category: "Soft Baits",
    price: 7.49,
    tagline: "The claws do the work",
    blurb:
      "Strike King's Rage claws are cut thin enough that they kick hard on the fall with no input from you at all. Drop it beside a laydown and it swims itself down. The smaller size is for when they've seen everything.",
    specs: [
      { label: "Brand", value: "Strike King" },
      { label: "Color", value: "Smoke Purple Black Flake" },
      { label: "Quantity", value: "7" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rage claws kick on the fall, no action needed",
      "Flips and pitches into cover cleanly",
      "Also a jig trailer",
      "7 per pack",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["gamakatsu-worm-hook-3-0", "strike-king-tungsten-weight-18"],
    whenToUse: "Flipping cover, or as a trailer on a jig.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/37496.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "baby-rage-bug",
    name: "Strike King Baby Rage Bug 3\" — Black/Blue, 9-Pack",
    category: "Soft Baits",
    price: 7.49,
    tagline: "The claws do the work",
    blurb:
      "Strike King's Rage claws are cut thin enough that they kick hard on the fall with no input from you at all. Drop it beside a laydown and it swims itself down. The smaller size is for when they've seen everything.",
    specs: [
      { label: "Brand", value: "Strike King" },
      { label: "Color", value: "Black/Blue" },
      { label: "Quantity", value: "9" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rage claws kick on the fall, no action needed",
      "Flips and pitches into cover cleanly",
      "Also a jig trailer",
      "9 per pack",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["gamakatsu-worm-hook-3-0", "strike-king-tungsten-weight-18"],
    whenToUse: "Flipping cover, or as a trailer on a jig.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/37508.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "zman-big-trd-gp",
    name: "Z-Man Big TRD 4\" — Green Pumpkin, 6-Pack",
    category: "Soft Baits",
    price: 5.49,
    tagline: "ElaZtech floats, and survives",
    blurb:
      "Z-Man's ElaZtech is buoyant, so on a Ned head the bait stands up off the bottom nose-down instead of lying flat, which is the whole reason the Ned rig catches fish when nothing else will. It's also close to indestructible; one bait routinely outlasts a dozen fish.",
    specs: [
      { label: "Brand", value: "Z-Man" },
      { label: "Length", value: "4 in" },
      { label: "Color", value: "Green Pumpkin" },
      { label: "Material", value: "ElaZtech" },
      { label: "Quantity", value: "6" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "ElaZtech floats, bait stands up on the bottom",
      "Survives fish after fish",
      "The big version, for better-sized fish",
      "6 per pack",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["zman-finesse-shroomz", "zman-shroomz-weedless"],
    whenToUse: "Cold water, clear water, pressured fish. The Ned rig's whole point.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/523894_0eee356a-0204-4dcf-bcc9-f4b42c118f63.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "zman-big-trd-bb",
    name: "Z-Man Big TRD 4\" — Black/Blue Flake, 6-Pack",
    category: "Soft Baits",
    price: 5.49,
    tagline: "ElaZtech floats, and survives",
    blurb:
      "Z-Man's ElaZtech is buoyant, so on a Ned head the bait stands up off the bottom nose-down instead of lying flat, which is the whole reason the Ned rig catches fish when nothing else will. It's also close to indestructible; one bait routinely outlasts a dozen fish.",
    specs: [
      { label: "Brand", value: "Z-Man" },
      { label: "Length", value: "4 in" },
      { label: "Color", value: "Black/Blue Flake" },
      { label: "Material", value: "ElaZtech" },
      { label: "Quantity", value: "6" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "ElaZtech floats, bait stands up on the bottom",
      "Survives fish after fish",
      "The big version, for better-sized fish",
      "6 per pack",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["zman-finesse-shroomz", "zman-shroomz-weedless"],
    whenToUse: "Cold water, clear water, pressured fish. The Ned rig's whole point.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/27357_e29d5add-0d12-48d4-8ede-240df9f68673.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "powerbait-general",
    name: "Berkley PowerBait MaxScent The General 5\" — Green Pumpkin, 8-Pack",
    category: "Soft Baits",
    price: 8.99,
    tagline: "A Senko that also smells right",
    blurb:
      "A stick bait built on Berkley's MaxScent plastic, which leaks scent continuously rather than in a burst. In cold or dirty water where fish hunt by smell as much as sight, that difference shows up in the count at the end of the day.",
    specs: [
      { label: "Brand", value: "Berkley" },
      { label: "Length", value: "5 in" },
      { label: "Color", value: "Green Pumpkin" },
      { label: "Quantity", value: "8" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "MaxScent plastic, continuous scent dispersal",
      "Stick profile, fish it wacky or Texas",
      "Works where visual baits stop",
      "8 per pack",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["yamamoto-senko-gp", "gamakatsu-worm-hook-3-0"],
    whenToUse: "Cold or stained water, and heavily pressured fish.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/898448.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "powerbait-chigger-craw",
    name: "Berkley PowerBait MaxScent Chigger Craw 3\" — Green Pumpkin, 8-Pack",
    category: "Soft Baits",
    price: 9.99,
    tagline: "Crawfish, with the smell included",
    blurb:
      "A compact craw with fluttering claws in the same scent-leaching MaxScent plastic. Bass eat crawfish more than they eat anything else, and this is a very good imitation of one that also smells like food.",
    specs: [
      { label: "Brand", value: "Berkley" },
      { label: "Length", value: "3 in" },
      { label: "Color", value: "Green Pumpkin" },
      { label: "Quantity", value: "8" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "MaxScent plastic leaches scent continuously",
      "Fluttering claws on the fall",
      "Compact 3\", a jig trailer or a standalone",
      "8 per pack",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["powerbait-general", "strike-king-tungsten-weight-18"],
    whenToUse: "Any time fish are on crawfish, which is most of the year.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/897555_0025619b-0c5d-4104-90fe-173430ac38f0.png",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "crappie-magnet-bw",
    name: "Leland Crappie Magnet 1½\" — Blue/White, 15-Pack",
    category: "Soft Baits",
    price: 2.99,
    tagline: "Three dollars, fifteen baits, endless crappie",
    blurb:
      "A tiny split-tail grub that crappie cannot leave alone. Fish it on a light jig head under a float and count. Fifteen in the pack, which sounds like a lot until you have a good afternoon.",
    specs: [
      { label: "Brand", value: "Leland" },
      { label: "Length", value: "1.5 in" },
      { label: "Color", value: "Blue/White" },
      { label: "Quantity", value: "15" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Split tail quivers on the smallest movement",
      "Sized for crappie and panfish",
      "Fish it under a float or on a jig head",
      "15 per pack",
    ],
    gradient: ["#1e3a2f", "#3f7a5e"],
    glyph: "lure",
    pairsWith: ["crappie-magnet-minnow-heads", "zman-finesse-shroomz"],
    whenToUse: "Crappie around brush and docks, spring through autumn.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/26168.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "kvd-squarebill-sexy-shad",
    name: "Strike King KVD Square Bill 2.5 — 5/8 oz, Sexy Shad",
    category: "Lures",
    price: 7.99,
    tagline: "Built to hit things",
    blurb:
      "The square lip makes the bait deflect off cover rather than hang in it, and that deflection, the sudden change of direction as it caroms off a stump, is what triggers the strike. Kevin VanDam won a great deal of money doing exactly this.",
    specs: [
      { label: "Brand", value: "Strike King" },
      { label: "Weight", value: "5/8 oz" },
      { label: "Color", value: "Sexy Shad" },
      { label: "Depth", value: "3–6 ft" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Square lip deflects off wood and rock",
      "Runs 3–6 ft, the shallow strike zone",
      "Premium hooks fitted from the factory",
      "Hunting action at speed",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "lure",
    pairsWith: ["mustad-snap-swivel-12", "red-eye-shad-12"],
    whenToUse: "Cranking shallow cover, stumps, riprap, laydowns.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/17402.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "kvd-squarebill-bbc",
    name: "Strike King KVD Square Bill 2.5 — 5/8 oz, Black Back Chartreuse",
    category: "Lures",
    price: 7.99,
    tagline: "Built to hit things",
    blurb:
      "The square lip makes the bait deflect off cover rather than hang in it, and that deflection, the sudden change of direction as it caroms off a stump, is what triggers the strike. Kevin VanDam won a great deal of money doing exactly this.",
    specs: [
      { label: "Brand", value: "Strike King" },
      { label: "Weight", value: "5/8 oz" },
      { label: "Color", value: "Black Back Chartreuse" },
      { label: "Depth", value: "3–6 ft" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Square lip deflects off wood and rock",
      "Runs 3–6 ft, the shallow strike zone",
      "Premium hooks fitted from the factory",
      "Hunting action at speed",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "lure",
    pairsWith: ["mustad-snap-swivel-12", "red-eye-shad-12"],
    whenToUse: "Cranking shallow cover, stumps, riprap, laydowns.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/28956_b9942b1a-b147-4405-96bd-3da471ca8380.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "red-eye-shad-34",
    name: "Strike King Red Eye Shad — 3/4 oz, Chartreuse Sexy Shad",
    category: "Lures",
    price: 9.99,
    tagline: "Rattles, sinks, covers water",
    blurb:
      "A lipless crankbait you can fish at any depth by counting it down, with a rattle chamber loud enough to pull fish from a distance in stained water. The one lure that finds out fastest whether anything is home.",
    specs: [
      { label: "Brand", value: "Strike King" },
      { label: "Weight", value: "3/4 oz" },
      { label: "Color", value: "Chartreuse Sexy Shad" },
      { label: "Type", value: "Lipless crankbait" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Lipless, fish it at any depth by counting down",
      "Loud rattle chamber",
      "Tight shimmy on the fall",
      "Premium hooks fitted",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "lure",
    pairsWith: ["kvd-squarebill-sexy-shad", "mustad-snap-swivel-12"],
    whenToUse: "Searching a flat, or ripping through grass in spring.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/27968.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "red-eye-shad-12",
    name: "Strike King Red Eye Shad — 1/2 oz, Smokey Chrome Blue",
    category: "Lures",
    price: 9.99,
    tagline: "Rattles, sinks, covers water",
    blurb:
      "A lipless crankbait you can fish at any depth by counting it down, with a rattle chamber loud enough to pull fish from a distance in stained water. The one lure that finds out fastest whether anything is home.",
    specs: [
      { label: "Brand", value: "Strike King" },
      { label: "Weight", value: "1/2 oz" },
      { label: "Color", value: "Smokey Chrome Blue" },
      { label: "Type", value: "Lipless crankbait" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Lipless, fish it at any depth by counting down",
      "Loud rattle chamber",
      "Tight shimmy on the fall",
      "Premium hooks fitted",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "lure",
    pairsWith: ["kvd-squarebill-sexy-shad", "mustad-snap-swivel-12"],
    whenToUse: "Searching a flat, or ripping through grass in spring.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/789366_6f9080f0-85bf-4df3-a4d4-ab1c068f4dba.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "strike-king-3xd-wrc",
    name: "Strike King Pro-Model Series 3XD — 7/16 oz, Watermelon Red Craw",
    category: "Lures",
    price: 8.99,
    tagline: "Gets to nine feet and stays there",
    blurb:
      "A medium-diving crankbait for the depth band that sits between a squarebill and a deep diver, the zone fish drop into once the shallows warm up. Casts a long way for its size, which is most of why it reaches depth.",
    specs: [
      { label: "Brand", value: "Strike King" },
      { label: "Weight", value: "7/16 oz" },
      { label: "Color", value: "Watermelon Red Craw" },
      { label: "Depth", value: "8–10 ft" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Dives 8–10 ft and holds it",
      "Long-casting body for its weight",
      "Wide wobble at moderate speed",
      "Premium hooks fitted",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "lure",
    pairsWith: ["red-eye-shad-34", "mustad-snap-swivel-12"],
    whenToUse: "Points, ledges and channel swings in summer.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/807031.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "strike-king-3xd-bbc",
    name: "Strike King Pro-Model Series 3XD — 7/16 oz, Black Back Chartreuse",
    category: "Lures",
    price: 8.99,
    tagline: "Gets to nine feet and stays there",
    blurb:
      "A medium-diving crankbait for the depth band that sits between a squarebill and a deep diver, the zone fish drop into once the shallows warm up. Casts a long way for its size, which is most of why it reaches depth.",
    specs: [
      { label: "Brand", value: "Strike King" },
      { label: "Weight", value: "7/16 oz" },
      { label: "Color", value: "Black Back Chartreuse" },
      { label: "Depth", value: "8–10 ft" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Dives 8–10 ft and holds it",
      "Long-casting body for its weight",
      "Wide wobble at moderate speed",
      "Premium hooks fitted",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "lure",
    pairsWith: ["red-eye-shad-34", "mustad-snap-swivel-12"],
    whenToUse: "Points, ledges and channel swings in summer.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/37325.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "war-eagle-spinnerbait",
    name: "War Eagle Double Willow Spinnerbait — ½ oz, Chartreuse, Painted Frame",
    category: "Lures",
    price: 8.99,
    tagline: "Hand-tied, in Arkansas",
    blurb:
      "War Eagle build these by hand and it shows in the way the head sits and the skirt flares. Double willow blades give flash without much thump, the right choice in clearer water where fish see the bait before they feel it.",
    specs: [
      { label: "Brand", value: "War Eagle" },
      { label: "Weight", value: "1/2 oz" },
      { label: "Blades", value: "Double willow" },
      { label: "Color", value: "Chartreuse" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Hand-tied skirt and painted frame",
      "Double willow blades, flash over vibration",
      "½ oz fishes fast and stays up",
      "Arkansas-built",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "lure",
    pairsWith: ["sk-tour-grade-spinnerbait", "rage-bug"],
    whenToUse: "Clear water, wind on the bank, fish chasing shad.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/760717.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "sk-tour-grade-spinnerbait",
    name: "Strike King Tour Grade Spinnerbait — 3/8 oz, White Silver",
    category: "Lures",
    price: 10.99,
    tagline: "Their tournament-grade wire",
    blurb:
      "The Tour Grade uses a heavier wire frame and better hardware than the standard bait, which matters because the failure point on a cheap spinnerbait is the wire, and it fails on the fish you wanted. White and silver is the shad pattern that works nearly everywhere.",
    specs: [
      { label: "Brand", value: "Strike King" },
      { label: "Weight", value: "3/8 oz" },
      { label: "Color", value: "White Silver" },
      { label: "Series", value: "Tour Grade" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Heavier tournament-grade wire frame",
      "Premium hook and swivel hardware",
      "3/8 oz, the everyday size",
      "White silver: the universal shad color",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "lure",
    pairsWith: ["war-eagle-spinnerbait", "booyah-super-shad"],
    whenToUse: "Shallow shad patterns, spring and autumn.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/525722.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "booyah-super-shad",
    name: "Booyah Super Shad — 3/8 oz, Silver Chartreuse",
    category: "Lures",
    price: 7.99,
    tagline: "Four blades: it looks like a school",
    blurb:
      "Four willow blades on one frame reads underwater as a small group of baitfish rather than a single one, and a bass that won't chase one shad will often chase what looks like several. A cheap way to fish a big profile.",
    specs: [
      { label: "Brand", value: "Booyah" },
      { label: "Weight", value: "3/8 oz" },
      { label: "Blades", value: "Four willow" },
      { label: "Color", value: "Silver Chartreuse" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Four willow blades, imitates a bait school",
      "Big profile without big weight",
      "3/8 oz fishes shallow to mid",
      "Silver chartreuse for stained water",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "lure",
    pairsWith: ["sk-tour-grade-spinnerbait", "red-eye-shad-12"],
    whenToUse: "Fish herding bait in open water.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/2828_c66c6893-27de-4b9b-b7af-e918ca658d33.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "zman-finesse-shroomz",
    name: "Z-Man Finesse ShroomZ Jig Head — 1/5 oz, Green Pumpkin, 5-Pack",
    category: "Lures",
    price: 5.99,
    tagline: "The head the Ned rig is built on",
    blurb:
      "A mushroom head with a keeper barb sized for Z-Man's ElaZtech, which is slick enough that ordinary keepers let go. Pair it with a TRD and you have the Ned rig, the most reliably productive finesse presentation in freshwater.",
    specs: [
      { label: "Brand", value: "Z-Man" },
      { label: "Weight", value: "1/5 oz" },
      { label: "Color", value: "Green Pumpkin" },
      { label: "Quantity", value: "5" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Mushroom head stands the bait up off bottom",
      "Keeper barb sized for ElaZtech",
      "1/5 oz, the everyday Ned weight",
      "5 per pack",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "jig",
    pairsWith: ["zman-big-trd-gp", "zman-shroomz-weedless"],
    whenToUse: "Cold water, clear water, or any day the bites stop.",
    featured: false,
    prop65: true,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/12093.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "zman-shroomz-weedless",
    name: "Z-Man Finesse ShroomZ Weedless Jig Head — 1/6 oz, Green Pumpkin, 5-Pack",
    category: "Lures",
    price: 6.99,
    tagline: "Ned rig, in the rocks",
    blurb:
      "The same mushroom head with a wire weedguard, so you can drag a Ned rig through rock and brush instead of steering around it. Finesse fishing usually means fishing where the fish are, and the fish are usually in something.",
    specs: [
      { label: "Brand", value: "Z-Man" },
      { label: "Weight", value: "1/6 oz" },
      { label: "Color", value: "Green Pumpkin" },
      { label: "Quantity", value: "5" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Wire weedguard, fish it in rock and wood",
      "Mushroom head, stands bait up",
      "1/6 oz for a slower fall",
      "5 per pack",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "jig",
    pairsWith: ["zman-finesse-shroomz", "zman-big-trd-bb"],
    whenToUse: "Ned rigging rock piles, riprap and brush.",
    featured: false,
    prop65: true,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/12107.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "zman-nedlockz-ewg",
    name: "Z-Man NedlockZ EWG Jig Head — 1/6 oz, Green Pumpkin, 4-Pack",
    category: "Lures",
    price: 8.49,
    tagline: "A Ned rig you can throw into cover",
    blurb:
      "An extra-wide-gap hook on a Ned head, so the bait rigs weedless and you still get a proper hook-up on a fish that eats it side-on. This is the one for the days when the finesse bite is happening inside the brush pile.",
    specs: [
      { label: "Brand", value: "Z-Man" },
      { label: "Weight", value: "1/6 oz" },
      { label: "Hook", value: "EWG" },
      { label: "Quantity", value: "4" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "EWG hook, rigs weedless, hooks properly",
      "Locking keeper for ElaZtech",
      "1/6 oz, slow fall",
      "4 per pack",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "jig",
    pairsWith: ["zman-big-trd-gp", "zman-shroomz-weedless"],
    whenToUse: "Finesse fishing inside cover rather than beside it.",
    featured: false,
    prop65: true,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/890359.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "crappie-magnet-minnow-heads",
    name: "Leland Crappie Magnet Eye Hole Jig Head — 1/8 oz, White, 5-Pack",
    category: "Lures",
    price: 3.99,
    tagline: "The head the Magnet is made for",
    blurb:
      "A light head with an eye hole sized to seat a Crappie Magnet properly, so the bait sits straight and the tail works. Four dollars for five, which is the correct price for something you leave in a brush pile.",
    specs: [
      { label: "Brand", value: "Leland" },
      { label: "Weight", value: "1/8 oz" },
      { label: "Color", value: "White" },
      { label: "Quantity", value: "5" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Eye hole seats the bait straight",
      "1/8 oz, slow fall for crappie",
      "Cheap enough to lose in brush",
      "5 per pack",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "jig",
    pairsWith: ["crappie-magnet-bw", "zoom-trick-worm-pc"],
    whenToUse: "Crappie in brush, docks and standing timber.",
    featured: false,
    prop65: true,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/802336_247e81b0-db85-4739-9ac5-a1abfa68c733.jpg",
    role: "add-on",
    shipsIn: "3–7 business days",
  },
  {
    key: "daiwa-crossfire-lt-2000",
    name: "Daiwa Crossfire LT 2000 Spinning Reel",
    category: "Reels",
    price: 34.99,
    tagline: "Three bearings and a real aluminum spool",
    blurb:
      "Daiwa's entry reel, but with the parts that matter: an ABS aluminum spool that takes braid without a mono backing, their Airdrive rotor, and a drag that gives line smoothly rather than in steps. Three bearings plus a roller is more than anything else at this money. Daiwa build and market this as a freshwater reel, they make no saltwater rating and no sealed-bearing claim, and neither will we.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Size", value: "2000" },
      { label: "Bearings", value: "3 + 1 roller" },
      { label: "Gear ratio", value: "5.2:1" },
      { label: "Max drag", value: "11 lb" },
      { label: "Line capacity", value: "6 lb / 110 yd mono · 8 lb / 150 yd braid" },
      { label: "Weight", value: "7.9 oz" },
      { label: "Water", value: "Freshwater. Daiwa states no saltwater rating" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Three ball bearings plus a roller bearing",
      "LC-ABS aluminum spool, braid straight on, no backing",
      "ATD Type-L drag: smooth from the first turn",
      "Tough Digigear drive gear",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "spool",
    pairsWith: ["braid-light", "fluoro-leader", "zman-finesse-shroomz"],
    whenToUse: "Lake and river spinning, and any freshwater rod in the 6–7 ft range.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/133910.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "daiwa-crossfire-lt-3000",
    name: "Daiwa Crossfire LT 3000-C Spinning Reel",
    category: "Reels",
    price: 34.99,
    tagline: "Three bearings and a real aluminum spool",
    blurb:
      "Daiwa's entry reel, but with the parts that matter: an ABS aluminum spool that takes braid without a mono backing, their Airdrive rotor, and a drag that gives line smoothly rather than in steps. Three bearings plus a roller is more than anything else at this money. Daiwa build and market this as a freshwater reel, they make no saltwater rating and no sealed-bearing claim, and neither will we.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Size", value: "3000-C" },
      { label: "Bearings", value: "3 + 1 roller" },
      { label: "Gear ratio", value: "5.3:1" },
      { label: "Max drag", value: "22 lb" },
      { label: "Line capacity", value: "10 lb / 130 yd mono · 10 lb / 185 yd braid" },
      { label: "Weight", value: "9.2 oz" },
      { label: "Water", value: "Freshwater. Daiwa states no saltwater rating" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Three ball bearings plus a roller bearing",
      "LC-ABS aluminum spool, braid straight on, no backing",
      "ATD Type-L drag: smooth from the first turn",
      "Tough Digigear drive gear",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "spool",
    pairsWith: ["braid-light", "fluoro-leader", "daiwa-laguna-ul"],
    whenToUse: "Lake and river spinning, and any freshwater rod in the 6–7 ft range.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/133924.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "abu-max-x-2500",
    name: "Abu Garcia Max X 2500 Spinning Reel",
    category: "Reels",
    price: 39.99,
    tagline: "Four stainless bearings, machined spool",
    blurb:
      "Abu Garcia's Max X gets a machined aluminum braid-ready spool and four stainless bearings plus a roller, five in total, which is unusual under forty dollars. The asymmetric graphite frame keeps the weight down without the flex you feel in cheaper bodies. Abu Garcia specify stainless bearings but publish no saltwater rating and no sealed-bearing claim, so we list it as a freshwater reel.",
    specs: [
      { label: "Brand", value: "Abu Garcia" },
      { label: "Size", value: "2500" },
      { label: "Bearings", value: "4 + 1 roller" },
      { label: "Gear ratio", value: "5.2:1" },
      { label: "Retrieve", value: "27 in per turn" },
      { label: "Line capacity", value: "8 lb / 130 yd mono · 8 lb / 190 yd braid" },
      { label: "Weight", value: "8.1 oz" },
      { label: "Water", value: "Freshwater. Abu Garcia states no saltwater rating" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Four stainless ball bearings + one roller",
      "Machined aluminum spool, braid-ready",
      "Asymmetric graphite frame and rotor",
      "Rocket Line Management to cut wind knots",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "spool",
    pairsWith: ["braid-light", "abu-max-x-combo", "zman-big-trd-gp"],
    whenToUse: "An all-round freshwater reel you won't outgrow in a season.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/897518_b1b63532-32b9-4d59-8c76-6e98f4aaee33.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "abu-max-x-3000",
    name: "Abu Garcia Max X 3000 Spinning Reel",
    category: "Reels",
    price: 39.99,
    tagline: "Four stainless bearings, machined spool",
    blurb:
      "Abu Garcia's Max X gets a machined aluminum braid-ready spool and four stainless bearings plus a roller, five in total, which is unusual under forty dollars. The asymmetric graphite frame keeps the weight down without the flex you feel in cheaper bodies. Abu Garcia specify stainless bearings but publish no saltwater rating and no sealed-bearing claim, so we list it as a freshwater reel.",
    specs: [
      { label: "Brand", value: "Abu Garcia" },
      { label: "Size", value: "3000" },
      { label: "Bearings", value: "4 + 1 roller" },
      { label: "Gear ratio", value: "5.2:1" },
      { label: "Retrieve", value: "29 in per turn" },
      { label: "Line capacity", value: "8 lb / 175 yd mono · 10 lb / 180 yd braid" },
      { label: "Weight", value: "8.3 oz" },
      { label: "Water", value: "Freshwater. Abu Garcia states no saltwater rating" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Four stainless ball bearings + one roller",
      "Machined aluminum spool, braid-ready",
      "Asymmetric graphite frame and rotor",
      "Rocket Line Management to cut wind knots",
    ],
    gradient: ["#22303f", "#46647e"],
    glyph: "spool",
    pairsWith: ["braid-light", "yamamoto-senko-gp", "gamakatsu-worm-hook-3-0"],
    whenToUse: "An all-round freshwater reel you won't outgrow in a season.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/897518_d451df4c-ae88-4f30-92f3-9fddc9e99781.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "dwave-combo-10",
    name: "Daiwa D-Wave Saltwater Spinning Combo — 10 ft, 2-Piece Medium",
    category: "Rod & Reel Combos",
    price: 79.99,
    tagline: "The whole surf setup, one box",
    blurb:
      "Daiwa's own description is the honest one: perfect for saltwater as well as heavy freshwater, for stripers, redfish, snook and baby tarpon. Ten feet is the length most surfcasters settle on, and this is the cheapest way to own that reach with a reel already matched to it, a 50-size spool holding 410 yards of 14 lb, which is a genuine surf reel rather than a bass reel with a long rod bolted to it.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Length", value: "10 ft" },
      { label: "Pieces", value: "2" },
      { label: "Power", value: "Medium" },
      { label: "Blank", value: "Fiberglass" },
      { label: "Reel", value: "DWA-B 50, 1 ball bearing" },
      { label: "Line capacity", value: "14 lb / 410 yd, 17 lb / 310 yd, 20 lb / 240 yd" },
      { label: "Water", value: "Saltwater and heavy freshwater. Daiwa's own rating" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rod and reel matched and balanced by Daiwa",
      "Full fiberglass blank, forgiving, and hard to break",
      "Aluminum oxide guides and a stainless hooded reel seat",
      "Twist Buster II line roller and an ABS aluminum spool",
      "50-size reel, 410 yd of 14 lb, enough for a long cast and a long run",
    ],
    gradient: ["#12384f", "#1f6a8e"],
    glyph: "rod",
    pairsWith: ["braided-line", "circle-hooks", "fluoro-leader", "sand-spike"],
    whenToUse: "A first surf outfit, or a second rod to leave in a spike.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/748816_11d714fc-9440-4b61-a716-302e677aaf4b.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "dwave-combo-9",
    name: "Daiwa D-Wave Saltwater Spinning Combo — 9 ft, 2-Piece Medium",
    category: "Rod & Reel Combos",
    price: 79.99,
    tagline: "Nine feet, and easier to swing all day",
    blurb:
      "The same saltwater outfit as the ten-footer with a foot less rod, which is the trade most people should take on a steep beach or a crowded jetty: slightly less distance, noticeably less work over a long session. Daiwa rate it for saltwater and heavy freshwater, stripers, redfish, snook, and the 50-size reel carries 410 yards of 14 lb.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Length", value: "9 ft" },
      { label: "Pieces", value: "2" },
      { label: "Power", value: "Medium" },
      { label: "Blank", value: "Fiberglass" },
      { label: "Reel", value: "DWA-B 50, 1 ball bearing" },
      { label: "Line capacity", value: "14 lb / 410 yd, 17 lb / 310 yd, 20 lb / 240 yd" },
      { label: "Water", value: "Saltwater and heavy freshwater. Daiwa's own rating" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rod and reel matched and balanced by Daiwa",
      "Full fiberglass blank, forgiving, and hard to break",
      "Aluminum oxide guides and a stainless hooded reel seat",
      "Twist Buster II line roller and an ABS aluminum spool",
      "50-size reel, 410 yd of 14 lb, the same spool as the ten-footer",
    ],
    gradient: ["#12384f", "#1f6a8e"],
    glyph: "rod",
    pairsWith: ["braided-line", "circle-hooks", "fluoro-leader", "pliers"],
    whenToUse: "Steep beaches, jetties, and anywhere a ten-footer is more rod than the spot needs.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/533339.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "dwave-combo-8",
    name: "Daiwa D-Wave Saltwater Spinning Combo — 8 ft, 2-Piece Medium",
    category: "Rod & Reel Combos",
    price: 59.99,
    tagline: "Beach, pier or boat, without picking a side",
    blurb:
      "Eight feet is the honest middle: long enough to keep line above the wash on a gentle beach, short enough to fish from a pier or a boat without apologising to anyone. Daiwa rate the D-Wave for saltwater and heavy freshwater, and the 40-size reel takes 300 yards of 14 lb.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Length", value: "8 ft" },
      { label: "Pieces", value: "2" },
      { label: "Power", value: "Medium" },
      { label: "Blank", value: "Fiberglass" },
      { label: "Reel", value: "DWA-B 40, 1 ball bearing" },
      { label: "Line capacity", value: "12 lb / 350 yd, 14 lb / 300 yd, 17 lb / 220 yd" },
      { label: "Water", value: "Saltwater and heavy freshwater. Daiwa's own rating" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rod and reel matched and balanced by Daiwa",
      "Full fiberglass blank, forgiving, and hard to break",
      "Aluminum oxide guides and a stainless hooded reel seat",
      "Twist Buster II line roller and an ABS aluminum spool",
      "40-size reel, 300 yd of 14 lb",
    ],
    gradient: ["#12384f", "#1f6a8e"],
    glyph: "rod",
    pairsWith: ["braided-line", "circle-hooks", "landing-net", "pliers"],
    whenToUse: "Piers, gentle beaches, and bay fishing where a surf rod is too much stick.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/748815.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "dwave-combo-7",
    name: "Daiwa D-Wave Saltwater Spinning Combo — 7 ft, 2-Piece Medium",
    category: "Rod & Reel Combos",
    price: 59.99,
    tagline: "Bays, harbours and kelp edges",
    blurb:
      "The inshore length of the D-Wave range: seven feet of medium fiberglass on a 40-size reel, rated by Daiwa for saltwater as well as heavy freshwater. This is the one for bays, harbours and kelp edges rather than open beach, halibut and bass water, where casting distance matters less than being able to work a bait with one hand.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Length", value: "7 ft" },
      { label: "Pieces", value: "2" },
      { label: "Power", value: "Medium" },
      { label: "Blank", value: "Fiberglass" },
      { label: "Reel", value: "DWA-B 40, 1 ball bearing" },
      { label: "Line capacity", value: "12 lb / 350 yd, 14 lb / 300 yd, 17 lb / 220 yd" },
      { label: "Water", value: "Saltwater and heavy freshwater. Daiwa's own rating" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rod and reel matched and balanced by Daiwa",
      "Full fiberglass blank, forgiving, and hard to break",
      "Aluminum oxide guides and a stainless hooded reel seat",
      "Twist Buster II line roller and an ABS aluminum spool",
      "40-size reel, 300 yd of 14 lb",
    ],
    gradient: ["#12384f", "#1f6a8e"],
    glyph: "rod",
    pairsWith: ["braided-line", "fluoro-leader", "circle-hooks", "landing-net"],
    whenToUse: "Bay bass, halibut and anywhere you're fishing structure rather than distance.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/748814.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "daiwa-d-shock-combo-7mh",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/786122_bfc8e673-fd7f-4516-b3c1-f43538fcb9f4.jpg",
    name: "Daiwa D-Shock Spinning Combo — 7 ft, 2-Piece Medium-Heavy",
    category: "Rod & Reel Combos",
    price: 34.99,
    tagline: "Rod and reel, matched, thirty-five dollars",
    blurb:
      "A complete outfit: a seven-foot medium-heavy fiberglass blank with a cork grip, and a DSK40 reel already balanced to it. Daiwa name this the D-Shock Freshwater combo and rate it for nothing else, no salt claim, no sealed bearings, so treat it as a lake and river outfit. For someone starting from nothing, it is the cheapest honest way to own a working rod and reel at once.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Length", value: "7 ft" },
      { label: "Pieces", value: "2" },
      { label: "Power", value: "Medium-heavy" },
      { label: "Blank", value: "Fiberglass" },
      { label: "Reel", value: "DSK40-B, 1 ball bearing" },
      { label: "Water", value: "Freshwater. Daiwa's own model name is D-Shock Freshwater" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Rod and reel matched and balanced by Daiwa",
      "7 ft medium-heavy, worm, jig and spinnerbait weights",
      "Two-piece, so it fits in a car",
      "ABS machined aluminum spool with Twist Buster line roller",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rod",
    pairsWith: ["yamamoto-senko-gp", "gamakatsu-worm-hook-3-0", "braided-line"],
    whenToUse: "A first outfit, or a spare you don't mind lending.",
    featured: false,
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "abu-max-x-combo",
    name: "Abu Garcia Max X Spinning Combo — 6 ft 6 in, Medium-Light",
    category: "Rod & Reel Combos",
    price: 64.99,
    tagline: "The Max X reel, on a rod built for it",
    blurb:
      "The same five-bearing Max X reel we sell on its own, paired with a one-piece carbon-composite blank rated 4–10 lb and 3/16–1/2 oz. One-piece means no ferrule to work loose and a cleaner bend through the middle, the trade is that it won't fit in a small car. Abu Garcia make no saltwater claim for either half, so we list it freshwater.",
    specs: [
      { label: "Brand", value: "Abu Garcia" },
      { label: "Length", value: "6 ft 6 in" },
      { label: "Pieces", value: "1" },
      { label: "Power", value: "Medium-light" },
      { label: "Line rating", value: "4–10 lb" },
      { label: "Lure rating", value: "3/16–1/2 oz" },
      { label: "Reel", value: "Max X 2500, 4+1 bearings" },
      { label: "Water", value: "Freshwater. Abu Garcia states no saltwater rating" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "One-piece carbon composite blank, no ferrule to slip",
      "Line 4–10 lb, lure 3/16–1/2 oz",
      "Max X reel: 4 stainless bearings + roller, machined aluminum spool",
      "Medium-light: finesse plastics and small hard baits",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rod",
    pairsWith: ["abu-max-x-2500", "zman-big-trd-gp", "zman-finesse-shroomz"],
    whenToUse: "Finesse plastics, small cranks, and anywhere a light line is the point.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/897415_8a11f533-f9d3-4cbb-ae09-eee201ea354f.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "okuma-tundra-7",
    name: "Okuma Tundra Surf Spinning Rod — 7 ft, 2-Piece",
    category: "Surf Rods",
    price: 25.95,
    tagline: "The cheapest rod here we'd take to the beach",
    blurb:
      "Okuma build the Tundra as a surf series and say so themselves, they describe it as favoured by catfish anglers and cost-conscious surf anglers. Glass fiber blank, stainless guide rings, and a twenty-inch EVA grip so you can get two hands on a cast. At seven feet it is the short end of surf: jetties, piers, and beaches where distance matters less than control.",
    specs: [
      { label: "Brand", value: "Okuma" },
      { label: "Length", value: "7 ft" },
      { label: "Pieces", value: "2" },
      { label: "Blank", value: "Glass fiber" },
      { label: "Casting weight", value: "Not published by Okuma" },
      { label: "Line rating", value: "6–15 lb" },
      { label: "Guides", value: "Stainless steel rings" },
      { label: "Reel seat", value: "Graphite with stainless" },
      { label: "Water", value: "Okuma position the Tundra as a surf series" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "Okuma's own surf series, at the entry price",
      "Extra-long 20¾ in EVA grip for two-handed casting",
      "Stainless steel guide rings",
      "Line 6–15 lb",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rod",
    pairsWith: ["surf-rod", "circle-hooks", "braided-line"],
    whenToUse: "Jetties and piers, and beaches where the bar is close in.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/362064_c7df0fb1-c7ea-4a9f-b785-fc59546fe82f.jpg",
    role: "anchor",
    shipsIn: "3–7 business days",
  },
  {
    key: "daiwa-laguna-ul",
    name: "Daiwa Laguna Spinning Rod — 6 ft 6 in, 2-Piece Ultralight",
    category: "Rod & Reel Combos",
    price: 49.99,
    tagline: "One to four pound line, and you feel everything",
    blurb:
      "An IM-6 graphite blank with woven carbon, rated 1–4 lb line and 1/32–1/8 oz lures. That is genuinely light, a trout rod, a panfish rod, a rod for days when the fish want something tiny and a normal outfit can't cast it. Seven aluminium-oxide guides and split EVA grips. Daiwa make no saltwater claim for the Laguna, so we list it freshwater.",
    specs: [
      { label: "Brand", value: "Daiwa" },
      { label: "Length", value: "6 ft 6 in" },
      { label: "Pieces", value: "2" },
      { label: "Power", value: "Ultralight" },
      { label: "Line rating", value: "1–4 lb" },
      { label: "Lure rating", value: "1/32–1/8 oz" },
      { label: "Blank", value: "IM-6 graphite" },
      { label: "Water", value: "Freshwater. Daiwa states no saltwater rating" },
      { label: "Ships in", value: "3–7 business days" },
    ],
    features: [
      "IM-6 graphite with woven carbon, light and quick",
      "Line 1–4 lb, lure 1/32–1/8 oz",
      "Seven aluminum-oxide guides",
      "Split EVA grips, two-piece",
    ],
    gradient: ["#26364a", "#4a6a8c"],
    glyph: "rod",
    pairsWith: ["daiwa-crossfire-lt-2000", "crappie-magnet-bw", "crappie-magnet-minnow-heads"],
    whenToUse: "Trout, panfish and crappie, and anything that wants a 1/32 oz jig.",
    featured: false,
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/31177.jpg",
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
  // Dropped 11 Aug 2026: CWR's dealer price on these sits within a few dollars
  // of what the market charges retail, so we were working for under $3.50 a
  // unit. Redirected rather than 404'd — the pages were live, however briefly,
  // and a 301 keeps any inbound link and its utm params intact.
  "plano-prolatch-leader-spool-box": "/products/plano-prolatch-xl-stowaway-utility-box",
  "rapala-stealth-fxf-fillet-knife-10-medium-fl": "/products/rapala-fisherman-s-tool-combo",
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
  // surf-rod and circle-hooks came off this list on 12 Aug 2026 when Burch
  // Fishing Tackle opened — they are real, in-stock, priced products now.
  // The remaining five have no supplier behind them and the checkout refuses
  // them, so no one can be charged for something we cannot ship.
  // The four Daiwa D-Wave combos were briefly listed here as unsourced,
  // because their rendered product pages read "Sold out". That was a misread:
  // Shopify's own search/suggest JSON and the collection feed both report
  // available: true for all four SKUs, and the same page that misled us also
  // showed a Fuego LT as sold out while its variant JSON said otherwise.
  // Machine-readable inventory beats a scraped page. Only the 11 ft is
  // genuinely out, and we never listed it.
  "inshore-combo",
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
 * The manufacturer, as shown in the product's own spec table.
 *
 * Product schema used to emit brand.name: "TheAnglerStore" on all 233 pages
 * while the visible spec row two inches below it said Sufix, or Rapala, or
 * Luhr-Jensen. We are a reseller, not a manufacturer: that was schema
 * contradicting the page it described, and it meant an assistant asked "where
 * can I buy Sufix 832 20 lb" could not match this listing to that product.
 *
 * Read from the spec table on purpose, so the two can never disagree again —
 * the visible row IS the source. Never guess a brand out of the product name.
 */
export function brandOf(p: Product): string | undefined {
  return p.specs.find((s) => s.label.toLowerCase() === "brand")?.value;
}

/**
 * Spec labels that must not become schema.org additionalProperty.
 *
 * "Ships in" is a fulfilment term, not an attribute of the thing being sold —
 * it belongs in the Offer, and it was quietly inflating the apparent spec
 * count on 160 of 238 pages. "Brand" has its own schema field.
 */
const NON_ATTRIBUTE_SPECS = new Set(["brand", "ships in"]);

/** The visible spec table, as machine-readable attributes. */
export function structuredSpecs(p: Product): { label: string; value: string }[] {
  return p.specs.filter((s) => !NON_ATTRIBUTE_SPECS.has(s.label.toLowerCase()));
}

/**
 * The one or two specs that decide the purchase, for the product card.
 *
 * The Surf Rods page showed three rods at the same price with the same card
 * line — "Fiberglass, two-piece, honestly priced" — and no way to tell a 9'
 * from an 11'. The single decision a shopper makes on that page got no help
 * until they clicked into each rod individually.
 *
 * These are the filter criteria anglers actually use, in the order they use
 * them, per category. Nothing is invented: if a product has no spec from its
 * category's list, its card shows none rather than a padded one.
 */
const CARD_SPECS: Partial<Record<Category, string[]>> = {
  "Surf Rods": ["Length", "Line rating"],
  "Rod & Reel Combos": ["Length", "Power"],
  Reels: ["Size", "Gear ratio"],
  "Line & Leader": ["Line rating", "Spool length"],
  "Terminal Tackle": ["Size", "Quantity"],
  Lures: ["Weight", "Length"],
  "Soft Baits": ["Length", "Quantity"],
  "Nets & Landing": ["Size", "Length"],
  Tools: ["Length", "Capacity"],
  "Tackle Storage": ["Size", "Capacity"],
  "Trolling & Rigging": ["Size", "Type"],
  Downriggers: ["Type", "Material"],
  "Rod Holders": ["Mount", "Angle"],
  "Kayak & Paddle": ["Type", "Length"],
  "Bait & Live Wells": ["Type", "Power"],
  Lights: ["Power", "Supply"],
  Coolers: ["Capacity", "Ice retention"],
  "Safety & Flotation": ["Size", "Quantity"],
};

/**
 * COLOUR-ONLY VARIANTS.
 *
 * Eleven families here are the same product in different colours — twenty
 * Luhr-Jensen Money Roll Flashers, the Dipsy Divers, the Jet Drivers. Their
 * pages are 90% identical to each other by body text, and each one was a
 * separate self-canonical URL competing with its own siblings for the same
 * query. That is the classic way a small catalogue looks bigger and ranks
 * worse.
 *
 * Detection is data-driven, not name-guessing: a product is a colour variant
 * only if it has a Color spec AND that exact value is the tail of its name.
 * That deliberately excludes "Sufix 832 — 20 lb, 300 yd", where the trailing
 * segment is a length, not a colour — 20 lb braid and 8 lb braid are
 * different products answering different questions and both stay indexable.
 *
 * The representative is the CHEAPEST in the family. Canonicalising six
 * flashers onto a pricier one would land every searcher on the worst price we
 * offer for the thing they searched for.
 */
function colorValue(p: Product): string | undefined {
  return p.specs.find((s) => s.label === "Color" || s.label === "Colour")?.value;
}

export function colorFamilyKey(p: Product): string | null {
  const c = colorValue(p);
  if (!c) return null;
  for (const sep of [", ", " — ", " - "]) {
    if (p.name.endsWith(sep + c)) return p.name.slice(0, p.name.length - (sep + c).length);
  }
  return null;
}

let COLOR_FAMILIES: Map<string, Product[]> | null = null;

function colorFamilies(): Map<string, Product[]> {
  if (COLOR_FAMILIES) return COLOR_FAMILIES;
  COLOR_FAMILIES = new Map();
  for (const p of PRODUCTS) {
    const k = colorFamilyKey(p);
    if (!k) continue;
    if (!COLOR_FAMILIES.has(k)) COLOR_FAMILIES.set(k, []);
    COLOR_FAMILIES.get(k)!.push(p);
  }
  for (const [k, v] of COLOR_FAMILIES) {
    if (v.length < 2) COLOR_FAMILIES.delete(k);
    else v.sort((a, b) => a.price - b.price || a.key.localeCompare(b.key));
  }
  return COLOR_FAMILIES;
}

/** Every colour of this product, cheapest first. Empty if it has no siblings. */
export function colorFamily(p: Product): Product[] {
  const k = colorFamilyKey(p);
  return (k && colorFamilies().get(k)) || [];
}

/** The page that should rank for this family — the cheapest colour. */
export function colorCanonical(p: Product): Product {
  return colorFamily(p)[0] ?? p;
}

/** Is this the page we ask search engines to index for its family? */
export function isColorCanonical(p: Product): boolean {
  return colorCanonical(p).key === p.key;
}

/**
 * Listed products with colour duplicates folded away — for the sitemap and
 * for browsing grids. Every colour still resolves and is still linked from
 * its family's page; they just stop competing with each other.
 */
export function indexed(): Product[] {
  return listed().filter(isColorCanonical);
}

export function cardSpecs(p: Product): { label: string; value: string }[] {
  const wanted = CARD_SPECS[p.category] ?? [];
  const out: { label: string; value: string }[] = [];
  for (const label of wanted) {
    const hit = p.specs.find((s) => s.label === label);
    if (hit) out.push(hit);
  }
  return out.slice(0, 2);
}

/**
 * The <meta name="description">.
 *
 * Was the first 158 characters of the blurb, which is identical across every
 * colour of a lure that only differs by colour — 21 groups of pages, 72 in
 * total, describing themselves in exactly the same words. Google picks one
 * and drops the rest, and a searcher comparing two colours sees two results
 * that say nothing different.
 *
 * So variants lead with the thing that makes them different. "Kelly Green
 * Sparkle." in front of the shared paragraph is a small change that makes
 * every page in the family distinct, and it front-loads the words someone
 * hunting a specific colour or line weight is actually scanning for.
 */
export function metaDescription(p: Product): string {
  const variant = variantLabel(p);
  if (variant) return `${variant}. ${p.blurb}`.slice(0, 158);
  // Two reels can differ only by spool size, with the size inside the name
  // rather than after an em dash — "Daiwa Crossfire LT 2000" and "…LT 3000-C"
  // share every word of their blurb. Where a description would otherwise be
  // an exact duplicate, the model name goes in front, which is the one thing
  // that distinguishes them. Applied only on collision, so the other 230-odd
  // products keep a description that opens on substance rather than a name
  // the searcher can already see in the title.
  const lead = collidingBlurbs().has(p.blurb.slice(0, 158)) ? `${p.name}. ` : "";
  return (lead + p.blurb).slice(0, 158);
}

let COLLIDING: Set<string> | null = null;

function collidingBlurbs(): Set<string> {
  if (COLLIDING) return COLLIDING;
  const seen = new Set<string>();
  COLLIDING = new Set<string>();
  for (const p of PRODUCTS) {
    if (variantLabel(p)) continue;
    const head = p.blurb.slice(0, 158);
    if (seen.has(head)) COLLIDING.add(head);
    else seen.add(head);
  }
  return COLLIDING;
}

/**
 * BUNDLES.
 *
 * Themed kits sold at a discount. There used to be exactly one of these, "The
 * Surf Starter", hard-coded as a singleton: braid, leader, pliers and a net,
 * with no rod, because on the day it was written the catalog had no combo we
 * could ship. It now has seven, so the bundles are built around them and this
 * is a list.
 *
 * WHAT A BUNDLE HAS TO BE
 *
 *   1. A scenario, not a shelf. Every kit here is what you would carry for one
 *      specific kind of day: the beach, the jetty, a salmon troll. If the only
 *      thing the items have in common is a category, it isn't a bundle.
 *   2. Complete. A kit that leaves out the sinker is not a kit, it's a coupon.
 *   3. Profitable at the discount. See the note under DISCOUNT below. This is
 *      the part that is easy to get wrong and expensive to get wrong.
 *
 * DISCOUNT
 *
 * Every bundle is 12%, deliberately one number rather than a per-kit rate, so
 * the offer can be stated once and is the same wherever it appears. But 12% is
 * not free: under dropship every order carries roughly $10 of inbound freight
 * plus Stripe's cut, and above $75 we stop charging shipping and absorb that
 * freight ourselves. A kit made of low-margin parts can clear $75, give away
 * the shipping, take 12% off the top and net two dollars.
 *
 * The old Surf Starter netted about $11 on a $90 sale. Every kit below was
 * costed against that benchmark before it was written down, and three of the
 * first drafts came in at half of it or worse until they were rebuilt.
 *
 * IF YOU ADD OR EDIT A BUNDLE, run `npm run bundles:margin` before you ship
 * it. That script has the dealer costs and a $10 floor. A bundle is the one
 * place on this site where a plausible-looking edit can quietly sell at a
 * loss, because nothing on the page says what the parts cost.
 *
 * SOURCING
 *
 * Keys are filtered through isSourced() everywhere they're used, so an
 * unsourced product silently drops out of a kit instead of advertising
 * something we can't ship. If fewer than minItems survive, that kit is
 * withdrawn entirely rather than shown as a "bundle" of two.
 */
export interface Bundle {
  /** Stable slug. Used in URLs and in Stripe metadata, so don't rename it. */
  id: string;
  name: string;
  /** Who it's for, in one line. */
  tagline: string;
  /** The paragraph on the bundle card. */
  blurb: string;
  keys: readonly string[];
  discount: number;
  /**
   * Withdraw the kit below this many sourced members. Set to keys.length - 1
   * everywhere: a kit survives one item going out of stock, not two.
   */
  minItems: number;
}

export const BUNDLES: readonly Bundle[] = [
  {
    id: "surf-starter",
    name: "The Surf Starter",
    tagline: "Everything to fish a beach, starting from nothing",
    blurb:
      "A rod, a reel, line, hooks, weight and the pliers to get the hook back. If you have never fished the surf and own none of it, this is the whole list. The 8 ft D-Wave is the one we hand people first: long enough to clear the shorebreak, short enough to cast all day without wrecking your shoulder.",
    keys: [
      "dwave-combo-8",
      "braided-line",
      "circle-hooks",
      "bank-sinker-4oz",
      "pliers",
    ],
    discount: 0.12,
    minItems: 4,
  },
  {
    id: "big-surf",
    name: "The Big Surf Kit",
    tagline: "Distance casting, heavy water, bait that has to stay put",
    blurb:
      "The same idea as the Starter, built heavier. A 10 ft rod to get a bait past the second bar, hi-vis braid so you can see where your line is sitting in the wash, and 6 oz sinkers because on a moving tide 4 oz walks. For striper, sturgeon and anywhere the water is doing the work.",
    keys: [
      "dwave-combo-10",
      "braid-hivis",
      "bank-sinker-6oz",
      "circle-hooks",
      "mustad-barrel-swivel-2-0",
    ],
    discount: 0.12,
    minItems: 4,
  },
  {
    id: "beach-day",
    name: "The Beach Day Kit",
    tagline: "You already own a rod. This is everything else",
    blurb:
      "Braid, circle hooks, 4 oz bank sinkers, pliers and a net. The consumables and the two tools a surf session actually turns on, with no rod in the box because you have one. This is the old Surf Starter, brought up to date with weight in it, which it always should have had.",
    keys: [
      "braided-line",
      "circle-hooks",
      "bank-sinker-4oz",
      "pliers",
      "landing-net",
    ],
    discount: 0.12,
    minItems: 4,
  },
  {
    id: "bay-jetty",
    name: "The Bay & Jetty Kit",
    tagline: "Structure, shorter casts, fish with teeth",
    blurb:
      "A 7 ft combo you can work along a wall without catching the rocks behind you, 15 lb low-vis braid, a titanium leader for anything that bites through mono, small circle hooks and a net. Rock cod, perch, mackerel and whatever else is holding on the structure.",
    keys: [
      "dwave-combo-7",
      "sufix-832-advanced-superline-braid-15lb-low-",
      "vmc-titanium-leader-7-strand-30lb-12",
      "gamakatsu-octopus-circle-3-0",
      "landing-net",
    ],
    discount: 0.12,
    minItems: 4,
  },
  {
    id: "rockfish-ling",
    name: "The Rockfish & Lingcod Kit",
    tagline: "Straight down, over hard bottom",
    blurb:
      "Two weights of vertical jig, hi-vis braid so you can tell what your line is doing in 200 ft of water, a swivel rated well past what you'll put on it, and a net. Drop it, work it off the bottom, hang on. Bring more jigs than you think you need, because the bottom keeps some.",
    keys: [
      "jig-assort",
      "jig-mid",
      "braid-hivis",
      "mustad-barrel-swivel-2-0",
      "landing-net",
    ],
    discount: 0.12,
    minItems: 4,
  },
  {
    id: "salmon-troll",
    name: "The Salmon Trolling Kit",
    tagline: "Getting a lure down and keeping it there",
    blurb:
      "Metered lead core so you know exactly how deep you are, a mid-size diver, an 11 in flasher, a release and a snubber. This is the depth-control half of a trolling setup; the bait or hoochie on the end is a personal argument we're not going to settle for you.",
    keys: [
      "sufix-performance-lead-core-36lb-10-color-me",
      "dipsy-mid",
      "flasher",
      "scotty-1170-release",
      "scotty-370-snubber",
    ],
    discount: 0.12,
    minItems: 4,
  },
  {
    id: "bass-day",
    name: "The Bass Day Pack",
    tagline: "One combo, four baits, a box to keep them in",
    blurb:
      "A 6 ft 6 in medium-light spinning combo, 8 lb ghost braid, and the three soft-plastic presentations that catch bass anywhere in the country: a Senko, a Ned head, and a lipless crank for covering water. Four StowAway boxes so it doesn't all end up loose in the bottom of the truck.",
    keys: [
      "abu-max-x-combo",
      "sufix-832-advanced-superline-braid-8lb-ghost",
      "yamamoto-senko-gp",
      "zman-finesse-shroomz",
      "red-eye-shad-12",
      "stowaway-4pack",
    ],
    discount: 0.12,
    minItems: 5,
  },
] as const;

/** The one shown on the homepage. First in the list, by definition. */
export function featuredBundle(): Bundle | undefined {
  return activeBundles()[0];
}

export function bundleById(id: string): Bundle | undefined {
  return BUNDLES.find((b) => b.id === id);
}

/** The members we can actually ship, in the order they're listed. */
export function bundleItems(b: Bundle): Product[] {
  return b.keys
    .map(getProduct)
    .filter((p): p is Product => Boolean(p) && isSourced(p!));
}

export function bundleAvailable(b: Bundle): boolean {
  return bundleItems(b).length >= b.minItems;
}

/** Every bundle we can currently sell, in editorial order. */
export function activeBundles(): Bundle[] {
  return BUNDLES.filter(bundleAvailable);
}

/** What the members cost bought separately. */
export function bundleListPrice(b: Bundle): number {
  return round2(bundleItems(b).reduce((s, p) => s + p.price, 0));
}

/** The bundle price of one unit, rounded to the cent Stripe will charge. */
export function bundleUnitPrice(price: number, discount: number): number {
  return Math.round(price * (1 - discount) * 100) / 100;
}

/**
 * The kit price.
 *
 * Summed from the SAME per-unit rounded prices the checkout charges, never as
 * a percentage of the list total. Those two are not the same number: 12% off
 * $102.71 is $12.3252, which rounds to $12.33, while rounding each of four
 * components first and summing gives $12.32. A cart that displays one total
 * and a Stripe page that charges another is the worst bug a checkout can have,
 * so every price shown anywhere is built out of the same per-unit figures.
 */
export function bundlePrice(b: Bundle): number {
  return round2(
    bundleItems(b).reduce((s, p) => s + bundleUnitPrice(p.price, b.discount), 0),
  );
}

export function bundleSaving(b: Bundle): number {
  return round2(bundleListPrice(b) - bundlePrice(b));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Money off one complete set of this kit, in whole cents. */
function perSetSavingCents(b: Bundle): number {
  return bundleItems(b).reduce(
    (c, p) =>
      c +
      Math.round(p.price * 100) -
      Math.round(bundleUnitPrice(p.price, b.discount) * 100),
    0,
  );
}

export interface CartLine {
  key: string;
  qty: number;
}

/**
 * One line per key, quantities clamped and summed.
 *
 * The client can send the same key twice. Before this existed, the allocator
 * deduplicated by taking the last occurrence while the checkout loop billed
 * both, so a cart with braid listed twice could be discounted twice. Every
 * function below takes merged lines, and the checkout route bills from the
 * merged list rather than the raw one.
 */
export function mergeLines(lines: readonly CartLine[]): CartLine[] {
  const totals = new Map<string, number>();
  for (const l of lines) {
    const key = String(l.key);
    const qty = Math.floor(Number(l.qty) || 0);
    if (qty <= 0) continue;
    totals.set(key, (totals.get(key) ?? 0) + qty);
  }
  return [...totals].map(([key, qty]) => ({ key, qty: Math.min(qty, MAX_QTY) }));
}

export interface BundleAward {
  id: string;
  name: string;
  discount: number;
  /** How many complete sets of this kit the cart earned. */
  sets: number;
}

/**
 * WHICH BUNDLES DOES THIS CART EARN, AND HOW MANY OF EACH?
 *
 * The hard requirement is that NO UNIT IS EVER DISCOUNTED TWICE. Kits share
 * parts on purpose (braid is in four of them), so a cart holding one spool of
 * braid, hooks, sinkers, pliers and a net satisfies the Beach Day Kit on paper
 * and part of three others. Exactly one of them may claim that spool.
 *
 * The allocator therefore works on a budget of units. Each kit it awards
 * consumes its members' quantities, and what is left is what the next kit gets
 * to look at. A kit is awarded min(quantity) times: four spools of braid and
 * one of everything else is one kit plus three spare spools, not four kits.
 *
 * (That last rule is old and was learned the hard way. The discount used to be
 * 12% of every unit of every member in the cart, so adding the bundle and then
 * bumping braid to qty 3 moved the discount from $12.33 to $20.72 — 12% off
 * three spools nobody bundled. At qty 20 it would have taken 12% off twenty.)
 *
 * WHICH kit gets first claim decides how much the customer saves, and taking
 * them in list order is not the same as taking them in the best order. So we
 * try every order and keep the one that saves the most, which is affordable
 * because the candidate set is only ever the kits the cart could complete,
 * usually one or two and in practice never all seven. Above PERMUTATION_LIMIT
 * candidates it degrades to biggest-saving-first, which is a good answer
 * rather than provably the best one; that branch is unreachable with today's
 * catalog and exists so a future eighth bundle can't hang a checkout.
 *
 * Ties go to the earlier permutation, so the same cart always produces the
 * same award. That matters more than it sounds: the cart page and the checkout
 * route both call this, and they have to agree to the cent.
 */
const PERMUTATION_LIMIT = 7;

function runOrder(
  order: readonly Bundle[],
  qty: ReadonlyMap<string, number>,
): { awards: BundleAward[]; cents: number } {
  const remaining = new Map(qty);
  const awards: BundleAward[] = [];
  let cents = 0;

  for (const b of order) {
    const items = bundleItems(b);
    if (items.length < b.minItems) continue;

    let sets = Infinity;
    for (const p of items) sets = Math.min(sets, remaining.get(p.key) ?? 0);
    if (!Number.isFinite(sets) || sets <= 0) continue;

    for (const p of items) remaining.set(p.key, (remaining.get(p.key) ?? 0) - sets);
    cents += sets * perSetSavingCents(b);
    awards.push({ id: b.id, name: b.name, discount: b.discount, sets });
  }

  return { awards, cents };
}

function* permutations<T>(items: readonly T[]): Generator<T[]> {
  if (items.length <= 1) {
    yield [...items];
    return;
  }
  for (let i = 0; i < items.length; i++) {
    const rest = [...items.slice(0, i), ...items.slice(i + 1)];
    for (const tail of permutations(rest)) yield [items[i], ...tail];
  }
}

/**
 * Memoised on the merged cart, because the cart page calls this once for the
 * summary and once per line. Single entry: carts change one at a time, and a
 * stale answer is impossible because the only other input, the catalog, is a
 * module constant.
 */
let ALLOC_CACHE: { signature: string; awards: BundleAward[] } | null = null;

export function allocateBundles(lines: readonly CartLine[]): BundleAward[] {
  const merged = mergeLines(lines).sort((a, b) => a.key.localeCompare(b.key));
  const signature = merged.map((l) => `${l.key}:${l.qty}`).join(",");
  if (ALLOC_CACHE?.signature === signature) return ALLOC_CACHE.awards;

  const qty = new Map(merged.map((l) => [l.key, l.qty]));

  // Only kits the cart could complete outright. Anything else can never be
  // awarded, and leaving it in would multiply the permutation count for free.
  const candidates = activeBundles().filter((b) => {
    const items = bundleItems(b);
    return (
      items.length >= b.minItems && items.every((p) => (qty.get(p.key) ?? 0) > 0)
    );
  });

  let awards: BundleAward[] = [];
  if (candidates.length === 1) {
    awards = runOrder(candidates, qty).awards;
  } else if (candidates.length > PERMUTATION_LIMIT) {
    const greedy = [...candidates].sort(
      (a, b) => perSetSavingCents(b) - perSetSavingCents(a),
    );
    awards = runOrder(greedy, qty).awards;
  } else if (candidates.length > 1) {
    let best: { awards: BundleAward[]; cents: number } | null = null;
    for (const order of permutations(candidates)) {
      const result = runOrder(order, qty);
      if (!best || result.cents > best.cents) best = result;
    }
    awards = best!.awards;
  }

  // Display order is the catalog's, not the winning permutation's, so the cart
  // doesn't reshuffle its own discount lines when a quantity changes.
  awards.sort(
    (a, b) =>
      BUNDLES.findIndex((x) => x.id === a.id) -
      BUNDLES.findIndex((x) => x.id === b.id),
  );

  ALLOC_CACHE = { signature, awards };
  return awards;
}

/** Does this cart earn any bundle at all? */
export function cartEarnsBundle(lines: readonly CartLine[]): boolean {
  return allocateBundles(lines).length > 0;
}

/**
 * Total money off, in dollars.
 *
 * Derived from the same per-unit rounded prices the checkout charges, so the
 * number in the cart summary and the number Stripe bills are the same number
 * by construction rather than by coincidence.
 */
export function bundleDiscountAmount(lines: readonly CartLine[]): number {
  let cents = 0;
  for (const a of allocateBundles(lines)) cents += awardSavingCents(a);
  return cents / 100;
}

function awardSavingCents(award: BundleAward): number {
  const b = bundleById(award.id);
  return b ? award.sets * perSetSavingCents(b) : 0;
}

/**
 * Money off attributable to ONE award, for the per-kit line in the cart
 * summary. Summing these over every award gives bundleDiscountAmount exactly,
 * because that is how bundleDiscountAmount is defined.
 */
export function awardSaving(award: BundleAward): number {
  return awardSavingCents(award) / 100;
}

export interface DiscountSlice {
  qty: number;
  unit: number;
  bundleName: string;
}

/**
 * How a single line splits into discounted and full-price units.
 *
 * Returns one slice per kit that claimed some of this key; the caller bills
 * those quantities at those unit prices and everything left over at list. The
 * slices can never sum past the cart quantity, because the allocator spent the
 * units to produce them.
 */
export function discountSplitFor(
  key: string,
  lines: readonly CartLine[],
): DiscountSlice[] {
  const product = getProduct(key);
  if (!product) return [];
  const slices: DiscountSlice[] = [];
  for (const a of allocateBundles(lines)) {
    const b = bundleById(a.id);
    if (!b || !bundleItems(b).some((p) => p.key === key)) continue;
    slices.push({
      qty: a.sets,
      unit: bundleUnitPrice(product.price, b.discount),
      bundleName: b.name,
    });
  }
  return slices;
}

/**
 * The sellable kits this product is part of.
 *
 * Used on the product page to say "this is in the Surf Starter", which is both
 * the honest thing to tell someone about to buy one part of a set and the
 * cheapest internal link on the site: it points every member product at
 * /bundles and gives the kits a reason to be crawled.
 */
export function bundlesContaining(key: string): Bundle[] {
  return activeBundles().filter((b) =>
    bundleItems(b).some((p) => p.key === key),
  );
}

/** The kits this key is currently earning, for the badge on a cart line. */
export function bundleNamesFor(
  key: string,
  lines: readonly CartLine[],
): string[] {
  return discountSplitFor(key, lines).map((s) => s.bundleName);
}


/**
 * DISPLAY ORDER — editorial, not measured.
 *
 * With no order history there is no real popularity data, so this is a
 * judgement about how many anglers a product is useful to. Roughly:
 *
 *   1-10   almost everyone needs one — line, pliers, a net, somewhere to put it
 *   11-25  common, but a more specific need
 *   26-40  situational, or for a particular style of fishing
 *   41+    installed boat hardware and specialist kit
 *
 * A new angler landing from USTideCharts should see braid and pliers before a
 * flush-mount rod holder, because that's the order they'll actually buy in.
 *
 * REPLACE THIS WITH REAL DATA once there are enough orders to rank by units
 * sold. Anything not listed sorts to the end, so a new product is invisible
 * until someone decides where it belongs — deliberate, so the catalog can't
 * silently fill up with unranked items at the top.
 */
const APPEAL: Record<string, number> = {
  "braided-line": 1, pliers: 2, "landing-net": 3, "fluoro-leader": 4,
  "tackle-bag": 5, cooler: 6, "stowaway-4pack": 7, "jig-assort": 8,
  "tool-holder": 9, "braid-hivis": 10,

  "net-handle": 11, "crab-net": 12, "edge-deep": 13, "rapstack-tray": 14,
  "braid-10": 15, "braid-light": 16, "jig-box": 17, "mag-spring-pliers": 18,
  "gripper-scale": 19, "tool-holder-2": 20, "edge-thin": 21,
  "xrap-magnum": 22, "jig-mid": 23, "fluoro-100": 24, "net-handle-5": 25,

  "rod-rack": 26, "three-pole-holder": 27, "track-holder": 28,
  "flush-mount-ss-top": 29, "curved-adapter": 30, "leader-spool-holder": 31,
  "tool-holder-3": 32, "aerator-floating": 33, "bait-bucket": 34,
  "xrap-20": 35, "xrap-30": 36, flasher: 37, "lead-core": 38,
  "tuna-catcher": 39, "xplode-170": 40,

  "dipsy-mid": 33.1, "jet-driver-20": 33.2, "dipsy-small": 33.3,
  "jet-driver-30": 33.4, "xplode-130": 35.1, "xrap-20-hot": 35.2,
  "jig-220-mack": 36.1, "jig-280-candy": 36.2, "flasher-small": 37.1,
  "tuna-catcher-5": 39.1, "dipsy-large": 40.1, "big-game-catcher": 40.2,

  "side-mount-4": 41, "side-mount-rack": 42, "rod-hanger-single": 43,
  "flush-mount-0": 44, "clamp-on-holder": 45, "flush-mount-70": 46,
  "flush-mount-ss": 47, "rod-hanger": 48, "angled-system": 49,
  "cup-holder-box": 50, "aerator-110": 51, "cull-tags": 52,
  "dock-light": 53, "dock-light-blue": 54, "submersible-light": 55,
  "flood-light": 56, downrigger: 57, "downrigger-cable": 58,
  "weight-retriever": 59, "pulley-kit": 60, "braid-15": 61,

  // Added 11 Aug 2026 — kayak, safety and trolling rigging. A handful are
  // hoisted into the existing ranking with decimals because they belong beside
  // a product already there; the rest sit behind the core catalog.
  "acr-c-strobe-h2o": 19.1, "orion-safety-whistle": 19.2, "railblaza-rod-holder-ii": 28.1,
  "scotty-245-rail-mount": 28.2, "yakgear-paddle-leash": 30.1, "mate-30-rod-cup-holder": 30.2,
  "scotty-1170-release": 38.1, "yakgear-drain-plug-kit": 62, "yakgear-scupper-plugs": 63,
  "scotty-370-snubber": 64, "scotty-1176-stacker": 65, "scotty-1148-weight-hook": 66,
  "yakgear-grapnel-anchor": 67, "scotty-276-anchor-lock": 68, "scotty-358-rodmaster-ii": 69,
  "orion-signal-mirror": 70, "scotty-377-sure-stop": 71, "mate-backing-plate": 72,
  "railblaza-hexx-mount": 73, "mustang-throw-bag-75": 74, "scotty-405-orca-kit": 75,
  "taco-outrigger-clips": 76, "acr-rapidditch-express": 77, "harken-229f-block": 78,
  "mate-15-rod-cup-holder-ss": 79, "ce-smith-swivel-flush-mount-80": 80,
};

/**
 * WHICH WATER IS THIS FOR?
 *
 * Derived rather than stored, because the answer follows from the category and
 * the brand in almost every case, and a derived rule can't drift out of sync
 * with 230 hand-edited entries.
 *
 * This exists because the catalog genuinely spans two fisheries. Our suppliers
 * are strongest in freshwater bass and crappie, and in Great Lakes trolling,
 * while the store's own voice is Californian surf. Rather than pretend, we tag
 * it and let people shop their own water.
 */
export type Water = "salt" | "fresh" | "both";

const FRESH_BRANDS = [
  "Strike King", "Zoom", "Z-Man", "Booyah", "War Eagle", "Leland", "Berkley",
  "Gary Yamamoto", "Blakemore",
];

export function waterOf(p: Product): Water {
  // The visible Water row wins, where there is one. It quotes the
  // manufacturer's own rating, so deriving something different from the
  // category would mean the badge and the spec table disagreeing on the same
  // screen — which is exactly the class of bug the audits kept finding.
  const stated = p.specs.find((s) => s.label === "Water")?.value ?? "";
  if (stated) {
    if (/^freshwater\b/i.test(stated)) return "fresh";
    if (/saltwater|surf/i.test(stated)) return /heavy freshwater|or fresh/i.test(stated) ? "both" : "salt";
  }
  if (p.category === "Soft Baits") return "fresh";
  if (p.category === "Surf Rods") return "salt";
  // Every reel we stock is still a freshwater model — not one of these
  // manufacturers publishes a saltwater rating or a sealed-bearing claim, and
  // "both" would be us quietly implying one. Combos are no longer blanket
  // freshwater: the Daiwa D-Wave outfits are rated for salt by Daiwa.
  if (p.category === "Reels") return "fresh";
  const brand = p.specs.find((s) => s.label === "Brand")?.value ?? "";
  if (FRESH_BRANDS.some((b) => brand.startsWith(b))) return "fresh";
  // Circle and octopus hooks are bait-fishing hooks — sea and surf.
  if (/circle|octopus|seagard/i.test(p.name)) return "salt";
  // Worm hooks and tungsten bullet weights are bass rigging.
  if (/worm hook|tungsten/i.test(p.name)) return "fresh";
  // Everything else — line, tools, storage, holders, nets, trolling hardware —
  // works in either, and claiming otherwise would be inventing a distinction.
  return "both";
}

/**
 * WHAT DOES THIS CATCH?
 *
 * The About page names halibut, surfperch, corbina, calico and spotted bay
 * bass as the reason the store exists — and searching any of them returned
 * nothing at all. Species is how anglers actually think about tackle, so it
 * needs to be searchable even though no product title contains the word.
 *
 * Derived, like water, so it can't drift out of sync with the catalog.
 */
export function speciesOf(p: Product): string[] {
  const n = `${p.name} ${p.tagline} ${p.whenToUse}`.toLowerCase();
  const brand = (p.specs.find((s) => s.label === "Brand")?.value ?? "").toLowerCase();
  const out = new Set<string>();

  // `surf` needs the negative lookahead: without it the regex matches
  // "surface", and every topwater plug in the catalog was being tagged as
  // surf tackle — which is how a 130 mm offshore surface bait ended up
  // recommended for surfperch. It still matches surfcasting and surfperch.
  // `\bsinker\b` is here because tagging must not depend on whether a
  // copywriter happened to use the word "surf" in a tagline. Three bank
  // sinkers went in together and only the one whose tagline said "surf rods"
  // got tagged — the other two were invisible to every species page, which is
  // the kind of silent gap that makes a recommendation engine quietly wrong.
  if (p.category === "Surf Rods" || /\bcircle\b|\bsurf(?!ace)|\bpyramid\b|\bsinker\b/.test(n)) {
    ["halibut", "surfperch", "perch", "corbina", "striped bass", "striper", "shark", "ray"].forEach((x) => out.add(x));
  }
  if (/flasher|dipsy|jet driver|lead core|downrigger|trolling|snubber|cannonball/.test(n)) {
    ["salmon", "king salmon", "coho", "steelhead", "trout", "kokanee", "lake trout"].forEach((x) => out.add(x));
  }
  if (/williamson|tuna|kensaki|jig 300|vortex/.test(n) || /williamson/.test(brand)) {
    ["tuna", "yellowtail", "dorado", "mahi", "albacore", "bonito"].forEach((x) => out.add(x));
  }
  if (p.category === "Soft Baits" || /senko|craw|squarebill|spinnerbait|lipless|trd|ned/.test(n)) {
    ["largemouth", "largemouth bass", "smallmouth", "bass"].forEach((x) => out.add(x));
  }
  if (/crappie|panfish|road runner|magnet|ultralight/.test(n)) {
    ["crappie", "panfish", "bluegill", "trout"].forEach((x) => out.add(x));
  }
  if (waterOf(p) === "salt" || p.category === "Nets & Landing") {
    ["calico bass", "spotted bay bass", "rockfish", "lingcod"].forEach((x) => out.add(x));
  }
  return [...out];
}

export const WATERS: { id: Water; label: string }[] = [
  { id: "salt", label: "Saltwater" },
  { id: "fresh", label: "Freshwater" },
];

/** Does this product suit the water someone asked for? "both" always does. */
export function suitsWater(p: Product, want: Water): boolean {
  const w = waterOf(p);
  return w === "both" || w === want;
}

/**
 * PRODUCT FAMILIES.
 *
 * Twenty Money Roll Flashers, seven Jet Drivers and three rod lengths were all
 * separate, unrelated products with no way to get from one to another. A
 * shopper on the 20 lb braid page who wanted 15 lb had to go back and scroll.
 *
 * Derived from the title rather than stored: everything before the em dash is
 * the family, everything after it is the variant. That is exactly the naming
 * convention the catalog now follows, so the grouping stays correct as long as
 * the titles do.
 */
function familyKey(p: Product): string {
  const head = p.familyKey ?? p.name.split(" — ")[0];
  return head.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** The variant part of the name — what distinguishes this one from its siblings. */
export function variantLabel(p: Product): string {
  const parts = p.name.split(" — ");
  return parts.length > 1 ? parts.slice(1).join(" — ") : "";
}

let FAMILIES: Map<string, Product[]> | null = null;

function families(): Map<string, Product[]> {
  if (FAMILIES) return FAMILIES;
  FAMILIES = new Map();
  for (const p of listed()) {
    const k = familyKey(p);
    if (!FAMILIES.has(k)) FAMILIES.set(k, []);
    FAMILIES.get(k)!.push(p);
  }
  return FAMILIES;
}

/** Other sizes and colors of the same product. Empty when there are none. */
export function siblings(p: Product): Product[] {
  return (families().get(familyKey(p)) ?? [])
    .filter((x) => x.key !== p.key)
    .sort((a, b) => a.price - b.price);
}

/**
 * Is this a thing you fish, or a thing you bring?
 *
 * "How to fish the Coleman CHILLER 28-Can Soft-Sided Backpack Cooler" was
 * funny exactly once, and then it just exposed the template.
 */
/** Categories whose products you actually cast, troll or fish. */
export const FISHABLE: readonly Category[] = [
  "Surf Rods",
  "Reels",
  "Rod & Reel Combos",
  "Line & Leader",
  "Terminal Tackle",
  "Lures",
  "Soft Baits",
  "Downriggers",
  "Trolling & Rigging",
  "Bait & Live Wells",
  "Nets & Landing",
];

const NOT_FISHED: readonly Category[] = [
  "Coolers",
  "Tackle Storage",
  "Safety & Flotation",
  "Kayak & Paddle",
  "Rod Holders",
];

export function walkthroughHeading(p: Product): string {
  const head = p.name.split("—")[0].trim();
  return NOT_FISHED.includes(p.category)
    ? `How to get the most from the ${head}`
    : `How to fish the ${head}`;
}

/**
 * Most we'll let someone add of one item.
 *
 * We hold no stock — every order is placed with a distributor after the fact —
 * so a 40-unit order is a promise we can't check. Ten is enough for anyone
 * restocking a tackle box, and anything larger deserves an email.
 */
export const MAX_QTY = 10;

/** Lower sorts first. Unranked products go to the end. */
export function appealOf(p: Product | string): number {
  return APPEAL[typeof p === "string" ? p : p.key] ?? 999;
}

/**
 * VULGAR FRACTIONS BACK TO NUMBERS, so 8¼ sorts below 11.
 */
const FRACTION: Record<string, number> = {
  "¼": 0.25, "½": 0.5, "¾": 0.75, "⅛": 0.125, "⅜": 0.375,
  "⅝": 0.625, "⅞": 0.875, "⅓": 1 / 3, "⅔": 2 / 3,
};

/**
 * The first measurement in a product's variant label, as a number.
 *
 * Used only to order siblings — a 9 ft rod should sit left of an 11 ft rod,
 * and 8 lb braid left of 20 lb, regardless of the order they were typed into
 * this file. Returns null when there is nothing measurable to sort on.
 */
function sizeRank(p: Product): number | null {
  const tail = p.name.split(" — ")[1] ?? p.name;
  // "6 ft 6 in" → 6.5; "8¼″" → 8.25; "20 lb" → 20; "10'" → 10
  const m = tail.match(/(\d+(?:\.\d+)?)\s*([¼½¾⅛⅜⅝⅞⅓⅔])?/);
  if (!m) return null;
  let n = parseFloat(m[1]);
  if (m[2]) n += FRACTION[m[2]] ?? 0;
  const inches = tail.match(/ft\s*(\d+(?:\.\d+)?)\s*in/i);
  if (inches) n += parseFloat(inches[1]) / 12;
  return Number.isFinite(n) ? n : null;
}

/**
 * Editorial rank first, then — for products we rank equally, which is most of
 * them — family and size. Without the size tiebreak the three Daiwa surf rods
 * came out 10 ft, 9 ft, 11 ft, in the order someone happened to add them.
 */
function byAppeal(a: Product, b: Product): number {
  const rank = appealOf(a) - appealOf(b);
  if (rank !== 0) return rank;

  // Everything below must be a TOTAL order. An earlier version returned 0 for
  // products in different families, which looks harmless and isn't: it makes
  // the comparator intransitive, and V8's sort is then free to return anything
  // — which is why three surf rods came out 10 ft, 9 ft, 11 ft.
  const famA = a.name.split(" — ")[0];
  const famB = b.name.split(" — ")[0];
  if (famA !== famB) return famA.localeCompare(famB);

  const sa = sizeRank(a);
  const sb = sizeRank(b);
  if (sa !== null && sb !== null && sa !== sb) return sa - sb;
  if (a.price !== b.price) return a.price - b.price;
  return a.key.localeCompare(b.key);
}

/** Everything we're willing to show a browsing customer. */
export function listed(): Product[] {
  return PRODUCTS.filter(isSourced).sort(byAppeal);
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
  return listed().filter((p) => p.featured).sort(byAppeal);
}

export function related(p: Product): Product[] {
  return p.pairsWith
    .map(getProduct)
    .filter((x): x is Product => Boolean(x) && isSourced(x!))
    .sort(byAppeal);
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
