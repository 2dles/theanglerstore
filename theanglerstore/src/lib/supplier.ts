/**
 * SUPPLIER MAP — SERVER ONLY. Never import this from a client component.
 *
 * Maps our product keys to the CWR part number and our dealer cost. It lives
 * apart from products.ts deliberately: that file ships to the browser, and
 * cost is not something a customer should be able to read out of a bundle.
 *
 * The CWR part number is used two ways:
 *   · in the order email, so a supplier order is paste-and-go into CWR's
 *     "Quick Add (SKU/MFG #/UPC)" box rather than a search
 *   · in /admin, to show true margin per order
 *
 * (The part numbers are already discoverable from our public image URLs —
 * productimageserver.com/product/xl/<sku>XL.jpg — so putting them in our own
 * email costs no secrecy we still have. The COST is the part that must stay
 * server-side.)
 *
 * TWO SUPPLIERS now. CWR is a marine distributor (rod holders, nets, tools,
 * downrigger gear); Burch Fishing Tackle is a tackle house in Florence, AL
 * (rods, hooks, soft plastics, hard baits). Every entry carries a `supplier`
 * so the order email can be split into one paste block per house — a single
 * customer order can require two supplier orders.
 *
 * CWR costs generated from their export on 10 Aug 2026. Burch costs read from
 * their dealer storefront on 12 Aug 2026. Re-generate when costs move.
 */

export type SupplierId = "cwr" | "burch";

export const SUPPLIERS: Record<
  SupplierId,
  {
    name: string;
    /** Where you go to place the order. */
    orderUrl: string;
    /**
     * Inbound freight we pay per supplier order, used for margin estimates.
     * CWR bills a real inbound charge. Burch charges no per-order fee, no
     * minimum and no markup on shipping — we paid a one-time $199 membership
     * instead — so their marginal freight is folded into the customer's
     * shipping rather than sitting on top of it.
     */
    freight: number;
    howToOrder: string;
  }
> = {
  cwr: {
    name: "CWR Distribution",
    orderUrl: "https://www.cwrdistribution.com",
    freight: 9.95,
    howToOrder: 'Paste into Quick Add (SKU/MFG #/UPC).',
  },
  burch: {
    name: "Burch Fishing Tackle",
    orderUrl: "https://burchfishingtackle.com",
    freight: 0,
    howToOrder: "Order by SKU on their storefront. No minimum, no per-order fee.",
  },
};

export interface SupplierItem {
  /** CWR part number — paste straight into their Quick Add box. */
  sku: string;
  /** Manufacturer part number, for cross-checking against other suppliers. */
  mfgPart: string;
  /** Our dealer cost, USD. */
  cost: number;
  /** Which house it comes from. Absent means CWR, which was the only one. */
  supplier?: SupplierId;
}

const SUPPLIER: Record<string, SupplierItem> = {
  "braided-line": { sku: "90822", mfgPart: "660-120CC", cost: 24.02 },
  "fluoro-leader": { sku: "110924", mfgPart: "700-050F", cost: 12.95 },
  "jig-assort": { sku: "101149", mfgPart: "VSJ300BLK", cost: 16.43 },
  "landing-net": { sku: "103114", mfgPart: "12773-2", cost: 10.79 },
  "pliers": { sku: "110902", mfgPart: "RSSSP8", cost: 18.48 },
  "tackle-bag": { sku: "105698", mfgPart: "RV13BP", cost: 45.28 },
  "cooler": { sku: "98875", mfgPart: "2158133", cost: 34.22 },
  "braid-hivis": { sku: "90826", mfgPart: "660-120Y", cost: 24.02 },
  "braid-light": { sku: "90752", mfgPart: "660-108GH", cost: 24.02 },
  "stowaway-4pack": { sku: "110067", mfgPart: "PLASM374", cost: 20.86 },
  "rapstack-tray": { sku: "101115", mfgPart: "RTT3700D", cost: 14.90 },
  "tool-holder": { sku: "96776", mfgPart: "SMTH3", cost: 21.86 },
  "net-handle": { sku: "34613", mfgPart: "833FS", cost: 67.49 },
  "crab-net": { sku: "32955", mfgPart: "1822", cost: 17.51 },
  "rod-rack": { sku: "77711", mfgPart: "325613-1", cost: 11.88 },
  "jig-box": { sku: "90224", mfgPart: "PLASE341", cost: 27.36 },
  "flasher": { sku: "110805", mfgPart: "5860-011-1757", cost: 17.86 },
  "jig-mid": { sku: "105293", mfgPart: "KSJX220BL", cost: 15.27 },
  "flush-mount-0": { sku: "108260", mfgPart: "53676", cost: 29.99 },
  "flush-mount-70": { sku: "102565", mfgPart: "53676C", cost: 98.05 },
  "flush-mount-ss": { sku: "30232", mfgPart: "53681SA", cost: 123.55 },
  "track-holder": { sku: "104193", mfgPart: "325416-1", cost: 23.00 },
  "three-pole-holder": { sku: "99422", mfgPart: "325034-1", cost: 15.57 },
  "flush-mount-ss-top": { sku: "77702", mfgPart: "325168-1", cost: 24.42 },
  "clamp-on-holder": { sku: "62246", mfgPart: "53710", cost: 72.70 },
  "net-handle-5": { sku: "34612", mfgPart: "760FS", cost: 59.61 },
  "curved-adapter": { sku: "32958", mfgPart: "102CH", cost: 14.05 },
  "tool-holder-3": { sku: "88961", mfgPart: "MTH3", cost: 21.86 },
  "cup-holder-box": { sku: "108208", mfgPart: "DH-2", cost: 16.31 },
  "lead-core": { sku: "96824", mfgPart: "668-218MC", cost: 22.59 },
  "braid-10": { sku: "90766", mfgPart: "660-110Y", cost: 24.02 },
  "braid-15": { sku: "110908", mfgPart: "660-115FT", cost: 24.02 },
  "fluoro-100": { sku: "110926", mfgPart: "700-100F", cost: 22.85 },
  "xrap-magnum": { sku: "89811", mfgPart: "XRMAG15HPU", cost: 17.41 },
  "side-mount-rack": { sku: "78045", mfgPart: "SM6", cost: 27.00 },
  "rod-hanger": { sku: "45916", mfgPart: "F16-2751-1", cost: 129.58 },
  "dock-light": { sku: "64976", mfgPart: "DM260G", cost: 108.24 },
  "flood-light": { sku: "64987", mfgPart: "FL50", cost: 124.71 },
  "xrap-30": { sku: "89851", mfgPart: "XRMAG30BNK", cost: 20.74 },
  "xrap-20": { sku: "89835", mfgPart: "XRMAG20GGH", cost: 18.68 },
  "xplode-170": { sku: "96763", mfgPart: "XRMAGXP170D", cost: 22.12 },
  "tuna-catcher": { sku: "105346", mfgPart: "HSTC8MH", cost: 23.90 },
  "edge-deep": { sku: "79717", mfgPart: "PLASE373", cost: 28.93 },
  "edge-thin": { sku: "79715", mfgPart: "PLASE371", cost: 25.71 },
  "angled-system": { sku: "66576", mfgPart: "787010", cost: 80.43 },
  "side-mount-4": { sku: "78044", mfgPart: "SM4", cost: 23.96 },
  "rod-hanger-single": { sku: "63719", mfgPart: "88544", cost: 21.86 },
  "tool-holder-2": { sku: "88960", mfgPart: "MTH2", cost: 16.53 },
  "mag-spring-pliers": { sku: "96773", mfgPart: "RMSPP4", cost: 23.01 },
  "gripper-scale": { sku: "96767", mfgPart: "DFG50", cost: 57.02 },
  "cull-tags": { sku: "85650", mfgPart: "RLGCT", cost: 27.05 },
  "leader-spool-holder": { sku: "108209", mfgPart: "SK-3", cost: 19.03 },
  "downrigger": { sku: "34281", mfgPart: "1060DPR", cost: 195.27 },
  "weight-retriever": { sku: "35531", mfgPart: "3025", cost: 16.80 },
  "pulley-kit": { sku: "99579", mfgPart: "1014", cost: 19.79 },
  "downrigger-cable": { sku: "34299", mfgPart: "1000K", cost: 22.85 },
  "aerator-floating": { sku: "66342", mfgPart: "RFLAERTR", cost: 25.08 },
  "bait-bucket": { sku: "71462", mfgPart: "PMC4825", cost: 24.10 },
  "aerator-110": { sku: "71480", mfgPart: "PMC14221", cost: 28.55 },
  "dock-light-blue": { sku: "64977", mfgPart: "DM260B", cost: 108.24 },
  "submersible-light": { sku: "86180", mfgPart: "HG1000G", cost: 131.76 },
  "dipsy-small": { sku: "102261", mfgPart: "5560-030-2506", cost: 7.23 },
  "jet-driver-20": { sku: "102252", mfgPart: "5540-020-2501", cost: 7.86 },
  "jet-driver-30": { sku: "102255", mfgPart: "5540-030-1503", cost: 7.74 },
  "tuna-catcher-5": { sku: "105318", mfgPart: "TCRX5CF", cost: 9.21 },
  "dipsy-mid": { sku: "102268", mfgPart: "5560-000-2507", cost: 12.60 },
  "big-game-catcher": { sku: "105314", mfgPart: "BGCX8SJ", cost: 12.81 },
  "flasher-small": { sku: "110783", mfgPart: "5860-008-1751", cost: 13.31 },
  "dipsy-large": { sku: "102274", mfgPart: "5560-001-2507", cost: 14.06 },
  "jig-220-mack": { sku: "105297", mfgPart: "KSJX220MD", cost: 15.27 },
  "jig-280-candy": { sku: "105304", mfgPart: "KSJX280CF", cost: 17.39 },
  "xplode-130": { sku: "105359", mfgPart: "XRMAGXP130CLR", cost: 16.98 },
  "xrap-20-hot": { sku: "89837", mfgPart: "XRMAG20HH", cost: 18.68 },
  "attwood-2-in-1-non-adjustable-rod-holders-2-": { sku: "103109", mfgPart: "RH-4646", cost: 20.00 },
  "attwood-cockpit-caddy": { sku: "52323", mfgPart: "11849-2", cost: 8.07 },
  "attwood-fold-n-stow-fishing-net-small": { sku: "103113", mfgPart: "12772-2", cost: 7.63 },
  "attwood-handheld-spotlight-400-lumens-12v": { sku: "50994", mfgPart: "11794-7", cost: 22.94 },
  "attwood-heavy-duty-adjustable-rod-holder-w-c": { sku: "52282", mfgPart: "5009-4", cost: 18.43 },
  "attwood-heavy-duty-adjustable-rod-holder-w-f": { sku: "52283", mfgPart: "5014-4", cost: 18.21 },
  "attwood-rod-storage-holder": { sku: "52317", mfgPart: "12750-6", cost: 9.36 },
  "attwood-standard-series-rod-holder-30-black-": { sku: "52300", mfgPart: "66362-7", cost: 36.58 },
  "attwood-standard-series-rod-holder-0-black-i": { sku: "52304", mfgPart: "66364-7", cost: 36.58 },
  "frabill-seine-net-4-x-12-mesh": { sku: "71555", mfgPart: "PMC2154", cost: 19.73 },
  "luhr-jensen-20-jet-driver-purple-uv-moon-jel": { sku: "102249", mfgPart: "5540-020-1503", cost: 7.86 },
  "luhr-jensen-20-jet-driver-blue-uv-moon-jelly": { sku: "102250", mfgPart: "5540-020-1507", cost: 7.86 },
  "luhr-jensen-20-jet-driver-black-moon-jelly": { sku: "102251", mfgPart: "5540-020-2500", cost: 7.86 },
  "luhr-jensen-20-jet-driver-silver-crush": { sku: "102253", mfgPart: "5540-020-2502", cost: 7.86 },
  "luhr-jensen-3-1-4-dipsy-diver-black-black-bo": { sku: "102267", mfgPart: "5560-000-2506", cost: 12.60 },
  "luhr-jensen-3-1-4-dipsy-diver-silver-silver-": { sku: "102269", mfgPart: "5560-000-2508", cost: 12.60 },
  "luhr-jensen-3-1-4-dipsy-diver-chartreuse-sil": { sku: "102270", mfgPart: "5560-000-2509", cost: 12.60 },
  "luhr-jensen-30-jet-driver-black-moon-jelly": { sku: "102257", mfgPart: "5540-030-2500", cost: 7.74 },
  "luhr-jensen-30-jet-driver-clear-uv-moon-jell": { sku: "102258", mfgPart: "5540-030-2501", cost: 8.35 },
  "luhr-jensen-30-jet-driver-silver-uv-crush": { sku: "102259", mfgPart: "5540-030-2502", cost: 8.35 },
  "luhr-jensen-4-1-8-dipsy-diver-black-black-bo": { sku: "102273", mfgPart: "5560-001-2506", cost: 14.06 },
  "luhr-jensen-4-1-8-dipsy-diver-fire-silver-bo": { sku: "102277", mfgPart: "5560-001-2510", cost: 14.06 },
  "luhr-jensen-4-1-8-dipsy-diver-kelly-green-si": { sku: "102278", mfgPart: "5560-001-2511", cost: 14.06 },
  "luhr-jensen-money-roll-flasher-8-1-4-blue-ka": { sku: "110782", mfgPart: "5860-008-1750", cost: 13.31 },
  "luhr-jensen-money-roll-flasher-8-1-4-chrome-": { sku: "110784", mfgPart: "5860-008-1752", cost: 13.31 },
  "luhr-jensen-money-roll-flasher-8-1-4-citrus-": { sku: "110786", mfgPart: "5860-008-1754", cost: 13.31 },
  "luhr-jensen-money-roll-flasher-8-1-4-glow-bl": { sku: "110787", mfgPart: "5860-008-1755", cost: 13.31 },
  "luhr-jensen-money-roll-flasher-8-1-4-rainbow": { sku: "110790", mfgPart: "5860-008-1757", cost: 13.31 },
  "luhr-jensen-money-roll-flasher-8-1-4-nuclear": { sku: "110792", mfgPart: "5860-008-1758", cost: 13.31 },
  "luhr-jensen-money-roll-flasher-8-1-4-razzle-": { sku: "110793", mfgPart: "5860-008-1759", cost: 13.31 },
  "luhr-jensen-money-roll-flasher-8-1-4-pearl-b": { sku: "110794", mfgPart: "5860-008-1760", cost: 13.31 },
  "luhr-jensen-money-roll-flasher-8-1-4-2-face-": { sku: "110795", mfgPart: "5860-008-1761", cost: 13.31 },
  "luhr-jensen-money-roll-flasher-11-blue-kamik": { sku: "110796", mfgPart: "5860-011-1750", cost: 17.86 },
  "luhr-jensen-money-roll-flasher-11-brandon-s-": { sku: "110797", mfgPart: "5860-011-1751", cost: 17.86 },
  "luhr-jensen-money-roll-flasher-11-chrome-lad": { sku: "110798", mfgPart: "5860-011-1752", cost: 17.86 },
  "luhr-jensen-money-roll-flasher-11-chrome-sca": { sku: "110799", mfgPart: "5860-011-1753", cost: 17.86 },
  "luhr-jensen-money-roll-flasher-11-citrus-nug": { sku: "110800", mfgPart: "5860-011-1754", cost: 17.86 },
  "luhr-jensen-money-roll-flasher-11-glow-blue-": { sku: "110801", mfgPart: "5860-011-1755", cost: 17.86 },
  "luhr-jensen-money-roll-flasher-11-glow-bioha": { sku: "110804", mfgPart: "5860-011-1756", cost: 17.86 },
  "luhr-jensen-money-roll-flasher-11-nuclear-ca": { sku: "110806", mfgPart: "5860-011-1758", cost: 17.86 },
  "luhr-jensen-money-roll-flasher-11-razzle-daz": { sku: "110807", mfgPart: "5860-011-1759", cost: 17.86 },
  "luhr-jensen-money-roll-flasher-11-pearl-blue": { sku: "110808", mfgPart: "5860-011-1760", cost: 17.86 },
  "luhr-jensen-money-roll-flasher-11-2-face-uv": { sku: "110809", mfgPart: "5860-011-1761", cost: 17.86 },
  "plano-edge-3700-terminal": { sku: "79718", mfgPart: "PLASE400", cost: 48.21 },
  "plano-edge-professional-3600-standard-stowaw": { sku: "79714", mfgPart: "PLASE360", cost: 22.50 },
  "plano-prolatch-xl-stowaway-utility-box": { sku: "66603", mfgPart: "705001", cost: 10.93 },
  "plano-stowaway-3700-thin-stow": { sku: "109932", mfgPart: "P000270", cost: 9.83 },
  "plano-waterproof-stowaway-utility-box-3500-s": { sku: "66587", mfgPart: "354010", cost: 7.71 },
  "plano-waterproof-stowaway-3500": { sku: "109119", mfgPart: "P000272", cost: 11.79 },
  "plano-waterproof-stowaway-3700": { sku: "109117", mfgPart: "P000274", cost: 13.10 },
  "plano-weekend-tackle-bag-3500-slate-plawknd3": { sku: "105273", mfgPart: "P000159", cost: 30.36 },
  "rapala-50lb-high-contrast-digital-scale": { sku: "96772", mfgPart: "RHCDS50", cost: 36.79 },
  "rapala-6-super-stainless-steel-pliers": { sku: "110901", mfgPart: "RSSSP6", cost: 16.01 },
  "rapala-angler-s-pliers-6-1-2": { sku: "66347", mfgPart: "SACP6", cost: 9.15 },
  "rapala-fisherman-s-tool-combo": { sku: "110904", mfgPart: "RFMTC", cost: 33.45 },
  "rapala-floating-fish-gripper-6": { sku: "96769", mfgPart: "RFFG6", cost: 9.76 },
  "rapala-floating-fish-gripper-scale-combo": { sku: "96771", mfgPart: "RFFGSC", cost: 28.93 },
  "rapala-large-lure-wrap-3-pack": { sku: "88209", mfgPart: "RLWRL", cost: 9.59 },
  "rapala-rapstack-3600-open-foam-tackle-tray": { sku: "101113", mfgPart: "RTT3600OF", cost: 8.95 },
  "rapala-rapstack-3600-tackle-tray": { sku: "101112", mfgPart: "RTT3600", cost: 8.95 },
  "shurhold-gopro-camera-adapter": { sku: "51144", mfgPart: "104", cost: 8.54 },
  "shurhold-shur-lok-gaff-hook": { sku: "32953", mfgPart: "1804", cost: 42.14 },
  "shurhold-shur-lok-landing-net-17-x-20-x-30": { sku: "32954", mfgPart: "1820", cost: 28.68 },
  "shurhold-shur-lok-shrimp-shad-dip-net-17-x-2": { sku: "32956", mfgPart: "1825", cost: 34.41 },
  "shurhold-shur-lok-threaded-adapter": { sku: "32957", mfgPart: "101", cost: 6.03 },
  "sufix-832-advanced-lead-core-18lb-10-color-m": { sku: "96812", mfgPart: "658-118MC", cost: 26.00 },
  "sufix-832-advanced-lead-core-27lb-10-color-m": { sku: "110915", mfgPart: "658-127MC", cost: 27.74 },
  "sufix-832-braid-30lb-fire-tiger-300-yds": { sku: "110910", mfgPart: "660-130FT", cost: 24.02 },
  "sufix-832-advanced-superline-braid-8lb-coast": { sku: "90744", mfgPart: "660-008CC", cost: 12.80 },
  "sufix-832-advanced-superline-braid-8lb-low-v": { sku: "90745", mfgPart: "660-008G", cost: 12.80 },
  "sufix-832-advanced-superline-braid-8lb-ghost": { sku: "90746", mfgPart: "660-008GH", cost: 12.80 },
  "sufix-832-advanced-superline-braid-15lb-ghos": { sku: "90788", mfgPart: "660-015GH", cost: 12.80 },
  "sufix-832-advanced-superline-braid-30lb-low-": { sku: "90847", mfgPart: "660-030G", cost: 12.80 },
  "sufix-832-advanced-superline-braid-10lb-neon": { sku: "90765", mfgPart: "660-110L", cost: 24.02 },
  "sufix-832-advanced-superline-braid-15lb-low-": { sku: "90793", mfgPart: "660-115G", cost: 24.02 },
  "sufix-832-advanced-superline-braid-20lb-low-": { sku: "90823", mfgPart: "660-120G", cost: 24.02 },
  "sufix-performance-lead-core-36lb-10-color-me": { sku: "96826", mfgPart: "668-236MC", cost: 27.53 },
  "sufix-revolve-braid-14-lb-coastal-camo-200-y": { sku: "110921", mfgPart: "691-514CC", cost: 15.20 },
  "vmc-titanium-leader-7-strand-15lb-12": { sku: "90980", mfgPart: "TLS1512", cost: 10.95 },
  "vmc-titanium-leader-7-strand-30lb-12": { sku: "90982", mfgPart: "TLS3012", cost: 10.95 },
  "vmc-titanium-leader-multi-strand-50lb-12": { sku: "90975", mfgPart: "TLM5012", cost: 11.77 },
  "williamson-high-speed-tuna-catcher-rigged-7-": { sku: "105325", mfgPart: "HSTC7MC", cost: 20.87 },
  "williamson-high-speed-tuna-catcher-rigged-8-": { sku: "105348", mfgPart: "HSTC8SJ", cost: 23.90 },
  "williamson-kensaki-220-jig-6-75-7-3-4oz-hot-": { sku: "105296", mfgPart: "KSJX220HS", cost: 15.27 },
  "williamson-kensaki-280-jig-7-25-9-7-8oz-char": { sku: "105303", mfgPart: "KSJX280CB", cost: 17.39 },

  // Added 11 Aug 2026 — kayak, safety and trolling rigging.
  "mate-30-rod-cup-holder": { sku: "77189", mfgPart: "P1030DW", cost: 13.70 },
  "scotty-245-rail-mount": { sku: "34348", mfgPart: "245", cost: 12.88 },
  "scotty-405-orca-kit": { sku: "37812", mfgPart: "405-BK", cost: 37.98 },
  "mate-15-rod-cup-holder-ss": { sku: "72502", mfgPart: "C1015D", cost: 112.33 },
  "ce-smith-swivel-flush-mount-80": { sku: "30231", mfgPart: "53680SA", cost: 123.55 },
  "mate-backing-plate": { sku: "103694", mfgPart: "CBPT", cost: 16.44 },
  "scotty-1170-release": { sku: "34313", mfgPart: "1170", cost: 8.76 },
  "scotty-370-snubber": { sku: "34297", mfgPart: "370", cost: 9.03 },
  "scotty-1176-stacker": { sku: "35527", mfgPart: "1176", cost: 10.05 },
  "scotty-1148-weight-hook": { sku: "39627", mfgPart: "1148", cost: 9.83 },
  "scotty-377-sure-stop": { sku: "73732", mfgPart: "0377", cost: 16.44 },
  "scotty-358-rodmaster-ii": { sku: "34373", mfgPart: "358", cost: 20.63 },
  "taco-outrigger-clips": { sku: "60571", mfgPart: "COK-0001B-2", cost: 19.21 },
  "harken-229f-block": { sku: "78687", mfgPart: "229F", cost: 36.47 },
  "yakgear-drain-plug-kit": { sku: "101697", mfgPart: "DPK", cost: 7.25 },
  "yakgear-paddle-leash": { sku: "101684", mfgPart: "CPL24", cost: 8.08 },
  "yakgear-scupper-plugs": { sku: "101702", mfgPart: "SCUP4", cost: 9.28 },
  "yakgear-grapnel-anchor": { sku: "101690", mfgPart: "AB3", cost: 19.41 },
  "railblaza-rod-holder-ii": { sku: "105801", mfgPart: "08-0085-11", cost: 24.96 },
  "scotty-276-anchor-lock": { sku: "35507", mfgPart: "276", cost: 26.43 },
  "railblaza-hexx-mount": { sku: "102209", mfgPart: "11-4174-11", cost: 47.89 },
  "orion-safety-whistle": { sku: "77049", mfgPart: "676", cost: 7.05 },
  "orion-signal-mirror": { sku: "70981", mfgPart: "916", cost: 11.25 },
  "acr-c-strobe-h2o": { sku: "59880", mfgPart: "3964.1", cost: 20.98 },
  "mustang-throw-bag-75": { sku: "93013", mfgPart: "MRD075-0-0-215", cost: 49.39 },
  "acr-rapidditch-express": { sku: "50058", mfgPart: "2279", cost: 54.99 },

  // Added 12 Aug 2026 — Burch Fishing Tackle. Their SKU and manufacturer part
  // number are the same string on their storefront, so both columns match.
  "surf-rod": { sku: "FTS1002MFS", mfgPart: "FTS1002MFS", cost: 22.33, supplier: "burch" },
  "daiwa-ft-surf-9": { sku: "FTS902MFS", mfgPart: "FTS902MFS", cost: 22.33, supplier: "burch" },
  "daiwa-ft-surf-11": { sku: "FTS1102MFS", mfgPart: "FTS1102MFS", cost: 22.33, supplier: "burch" },
  "circle-hooks": { sku: "L197FH-4/0", mfgPart: "L197FH-4/0", cost: 11.25, supplier: "burch" },
  "gamakatsu-octopus-circle-3-0": { sku: "208413", mfgPart: "208413", cost: 3.30, supplier: "burch" },
  "gamakatsu-octopus-circle-1-0": { sku: "208411", mfgPart: "208411", cost: 3.30, supplier: "burch" },
  "gamakatsu-worm-hook-3-0": { sku: "01413", mfgPart: "01413", cost: 3.75, supplier: "burch" },
  "gamakatsu-worm-hook-2-0": { sku: "01412", mfgPart: "01412", cost: 3.75, supplier: "burch" },
  "gamakatsu-offset-worm-hook-1": { sku: "07110", mfgPart: "07110", cost: 3.26, supplier: "burch" },
  "mustad-barrel-swivel-4": { sku: "771046-4-9", mfgPart: "771046-4-9", cost: 4.75, supplier: "burch" },
  "mustad-barrel-swivel-2-0": { sku: "771046-2/0-4", mfgPart: "771046-2/0-4", cost: 5.08, supplier: "burch" },
  "mustad-snap-swivel-12": { sku: "77560-12-12", mfgPart: "77560-12-12", cost: 2.05, supplier: "burch" },
  "strike-king-tungsten-weight-18": { sku: "TGTW18-46", mfgPart: "TGTW18-46", cost: 5.36, supplier: "burch" },
  "mustad-tungsten-worm-weight": { sku: "MTW001-TX-3.5-4", mfgPart: "MTW001-TX-3.5-4", cost: 4.07, supplier: "burch" },
  "yamamoto-senko-gp": { sku: "YAM-9-10-913", mfgPart: "YAM-9-10-913", cost: 5.83, supplier: "burch" },
  "yamamoto-senko-smoke": { sku: "YAM-9-10-240", mfgPart: "YAM-9-10-240", cost: 5.83, supplier: "burch" },
  "zoom-trick-worm-wrt": { sku: "006-338", mfgPart: "006-338", cost: 4.88, supplier: "burch" },
  "zoom-trick-worm-pc": { sku: "006-015", mfgPart: "006-015", cost: 4.88, supplier: "burch" },
  "zoom-super-fluke-jr": { sku: "056-091", mfgPart: "056-091", cost: 3.71, supplier: "burch" },
  "zoom-fluke-smokin-shad": { sku: "015-109", mfgPart: "015-109", cost: 2.68, supplier: "burch" },
  "zoom-brush-hog-junebug": { sku: "145-005", mfgPart: "145-005", cost: 4.78, supplier: "burch" },
  "rage-bug": { sku: "RGBUG-875", mfgPart: "RGBUG-875", cost: 5.16, supplier: "burch" },
  "baby-rage-bug": { sku: "RGBBUG-2", mfgPart: "RGBBUG-2", cost: 5.16, supplier: "burch" },
  "zman-big-trd-gp": { sku: "TRD4-46PK6", mfgPart: "TRD4-46PK6", cost: 3.08, supplier: "burch" },
  "zman-big-trd-bb": { sku: "TRD4-02PK6", mfgPart: "TRD4-02PK6", cost: 3.08, supplier: "burch" },
  "powerbait-general": { sku: "PBMSTG5-GP", mfgPart: "PBMSTG5-GP", cost: 5.97, supplier: "burch" },
  "powerbait-chigger-craw": { sku: "PBMSCHC3-GP", mfgPart: "PBMSCHC3-GP", cost: 5.97, supplier: "burch" },
  "crappie-magnet-bw": { sku: "CM15-B/W", mfgPart: "CM15-B/W", cost: 1.51, supplier: "burch" },
  "kvd-squarebill-sexy-shad": { sku: "HCKVDS2.5-590", mfgPart: "HCKVDS2.5-590", cost: 5.73, supplier: "burch" },
  "kvd-squarebill-bbc": { sku: "HCKVDS2.5-535", mfgPart: "HCKVDS2.5-535", cost: 5.73, supplier: "burch" },
  "red-eye-shad-34": { sku: "REYESD34-538", mfgPart: "REYESD34-538", cost: 6.67, supplier: "burch" },
  "red-eye-shad-12": { sku: "REYESD12-401", mfgPart: "REYESD12-401", cost: 5.94, supplier: "burch" },
  "strike-king-3xd-wrc": { sku: "HC3XD-468", mfgPart: "HC3XD-468", cost: 5.64, supplier: "burch" },
  "strike-king-3xd-bbc": { sku: "HC3XD-535", mfgPart: "HC3XD-535", cost: 5.64, supplier: "burch" },
  "war-eagle-spinnerbait": { sku: "WE12PW43", mfgPart: "WE12PW43", cost: 5.91, supplier: "burch" },
  "sk-tour-grade-spinnerbait": { sku: "TGSB38CW-292", mfgPart: "TGSB38CW-292", cost: 6.89, supplier: "burch" },
  "booyah-super-shad": { sku: "BYSS38612", mfgPart: "BYSS38612", cost: 5.01, supplier: "burch" },
  "zman-finesse-shroomz": { sku: "FJH15-01PK5", mfgPart: "FJH15-01PK5", cost: 3.60, supplier: "burch" },
  "zman-shroomz-weedless": { sku: "FJHW16-01PK5", mfgPart: "FJHW16-01PK5", cost: 4.20, supplier: "burch" },
  "zman-nedlockz-ewg": { sku: "TTNL-3620", mfgPart: "TTNL-3620", cost: 5.09, supplier: "burch" },
  "crappie-magnet-minnow-heads": { sku: "CMEHMH18-WH", mfgPart: "CMEHMH18-WH", cost: 2.47, supplier: "burch" },
};

export function supplierFor(key: string): SupplierItem | undefined {
  return SUPPLIER[key];
}

/** Which house a key comes from. Defaults to CWR for entries written before Burch existed. */
export function supplierIdOf(key: string): SupplierId | undefined {
  const s = SUPPLIER[key];
  return s ? (s.supplier ?? "cwr") : undefined;
}

type Line = { key?: string | null; quantity: number };

/**
 * Order lines grouped by the house that has to fill them.
 *
 * A cart can span both suppliers, in which case this returns two groups and
 * you place two orders. The customer only ever pays one shipping charge — we
 * decided to absorb the second inbound leg rather than show them a shipping
 * total that jumps for reasons they cannot see.
 */
export function bySupplier(
  items: Line[],
): { supplier: SupplierId; lines: string[] }[] {
  const groups = new Map<SupplierId, string[]>();
  for (const i of items) {
    const s = i.key ? supplierFor(i.key) : undefined;
    if (!s) continue;
    const id = s.supplier ?? "cwr";
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id)!.push(`${s.sku} x ${i.quantity}`);
  }
  return [...groups.entries()].map(([supplier, lines]) => ({ supplier, lines }));
}

/** Flat paste lines, all suppliers. Kept for callers that don't care. */
export function quickAddLines(items: Line[]): string[] {
  return bySupplier(items).flatMap((g) => g.lines);
}

/** Total dealer cost of a set of lines, for margin display. */
export function supplierCost(items: Line[]): number {
  return items.reduce((sum, i) => {
    const s = i.key ? supplierFor(i.key) : undefined;
    return sum + (s ? s.cost * i.quantity : 0);
  }, 0);
}

/**
 * Inbound freight for an order — summed over the DISTINCT suppliers it touches,
 * not per line. Two CWR items cost one inbound leg; one CWR item and one Burch
 * item cost CWR's leg plus Burch's.
 */
export function inboundFreight(items: Line[]): number {
  return bySupplier(items).reduce(
    (sum, g) => sum + SUPPLIERS[g.supplier].freight,
    0,
  );
}

/**
 * Cheapest CWR inbound freight, per order.
 * @deprecated Use inboundFreight(items) — it knows about Burch.
 */
export const INBOUND_FREIGHT = 9.95;
