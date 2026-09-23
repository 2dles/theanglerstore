import { CATEGORIES, getProduct, isSourced, type Product } from "@/lib/products";

/**
 * EDITORIAL CONTENT — GUIDES AND SPECIES PAGES.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT MAY BE WRITTEN HERE, AND WHAT MAY NOT
 *
 * Two independent audits found the same hole: the site answered 6 of the 100
 * questions anglers actually ask, and had nothing worth citing. Eight guides
 * and four species pages now fill part of that, under the same rules.
 *
 * These pages carry a real person's byline. That sets the standard for what
 * can go in them:
 *
 *   ALLOWED. Rig construction. Knots. Line and leader properties. Sinker
 *   weight and shape against current. Tide mechanics and the rule of twelfths.
 *   Casting ratings. Reel care. Established surfcasting practice that any
 *   experienced angler would recognise and that a reader can verify.
 *
 *   NOT ALLOWED. Invented local knowledge, which means named spots, bar
 *   positions, or what is biting where. Regulations stated as fact, since
 *   they vary by state and by water and change without telling us; point the
 *   reader at their own rules instead. First-person catch stories that did
 *   not happen. Any product spec the manufacturer does not state.
 *
 * WHERE WE ARE SHORT, SAY SO. The sinker guide tells the reader outright that
 * pyramids and sputniks hold better than the bank sinkers we stock, and to buy
 * them elsewhere if they fish heavy current. That paragraph is the most
 * valuable one on the page, because it is the only kind of thing a competitor
 * will not write.
 *
 * HOUSE STYLE. Contractions, second person, short sentences next to longer
 * ones. Headings phrased as the question a reader would actually type, because
 * that is both how people search and how people read. No em dashes in prose;
 * they are fine in comments like this one.
 *
 * Pages appear in the nav, the sitemap and the index the moment an entry is
 * added here, and validateEditorial() runs in schema.test.ts to stop one
 * shipping with a broken product reference.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * The byline. A real person, already named on /contact and in the footer.
 *
 * Every editorial page carries one. Anonymous fishing advice is worth what
 * you paid for it, and E-E-A-T aside, a reader deciding whether to trust a
 * rig diagram deserves to know who is telling them.
 */
export const AUTHOR = {
  name: "Augustus Muse",
  url: "https://theanglerstore.com/about",
  jobTitle: "Owner, TheAnglerStore",
} as const;

export interface Section {
  heading?: string;
  /** Paragraphs of plain prose. */
  body?: string[];
  /** Optional table — header row plus rows, rendered as a real <table>. */
  table?: { head: string[]; rows: string[][] };
  /** Product keys to surface inline as cards. Must exist and be sourced. */
  products?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  /** Meta description and the standfirst under the H1. */
  description: string;
  /**
   * ISO dates. `published` never changes. `updated` moves ONLY when the
   * content materially changed — bumping it to look fresh makes the date
   * worthless as a signal to the one audience that matters, which is the
   * reader deciding whether the advice is current.
   */
  published: string;
  updated?: string;
  sections: Section[];
  /** Rendered as a visible Q&A block, and only then as FAQPage schema. */
  faqs?: { q: string; a: string }[];
  related?: string[];
}

/** A row of the "complete setup" table. Each points at something real. */
export interface SetupRow {
  /** "Rod", "Reel", "Line", "Leader", "Hook", "Weight", "Lure", "Bait" */
  part: string;
  /** What to use, in words. */
  choice: string;
  /** A product key we stock — or a collection slug — or neither. */
  productKey?: string;
  collectionSlug?: string;
  /** Say so plainly when we don't sell it. Honesty is the differentiator. */
  weDontStock?: string;
}

export interface Species {
  slug: string;
  /** "Barred surfperch" */
  name: string;
  /** "Amphistichus argenteus" — shown, and used in schema. */
  scientificName?: string;
  description: string;
  published: string;
  updated?: string;
  sections: Section[];
  setup?: SetupRow[];
  faqs?: { q: string; a: string }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT. Both GUIDES and SPECIES are written. Rules are in the note above.
// ─────────────────────────────────────────────────────────────────────────────

export const GUIDES: Guide[] = [
  {
    slug: "free-fishing-piers-san-diego",
    title: "Free Fishing Piers in San Diego (No License Needed)",
    description:
      "Every public pier in San Diego County you can fish without a license, which ones are actually open right now, and what the rules still are once you get there.",
    published: "2026-08-25",
    sections: [
      {
        body: [
          "San Diego is one of the few places where you can walk out over deep water, catch dinner, and not pay a cent for the privilege. California doesn't require a fishing licence on a public pier, and the county has a string of them from Imperial Beach up to Oceanside.",
          "The catch, and there's always one, is that half the pier lists you'll find online are out of date. Two of the biggest piers in the county are not in the state those articles think they are. Here's what's actually true as of August 2026.",
        ],
      },
      {
        heading: "Do you need a fishing license on a San Diego pier?",
        body: [
          "No, not on a public pier. California Fish and Wildlife puts it plainly: \"When recreationally fishing from a 'public pier' in ocean or bay waters, a fishing license is not required.\"",
          "What counts as a public pier is narrower than people assume. CDFW says it has to be connected to the shoreline, allow \"free, unrestricted public access,\" and have been built or currently function primarily for fishing. Jetties and breakwaters only qualify if they form the most seaward protective boundary of an ocean harbour.",
          "That definition is worth reading twice before you rely on it at a privately operated pier with gates and opening hours. If in doubt, buy the licence.",
        ],
      },
      {
        heading: "What rules still apply without a license?",
        body: [
          "All of them except the licence itself. CDFW is explicit: \"Even though a fishing license is not required on a public pier, all other regulations (including minimum size, bag limits, report cards, and seasons) apply while fishing from a public pier.\"",
          "So size limits, bag limits, closed seasons and report cards are all still on you. There's also a gear limit specific to piers: two rods and lines per person, and salmon may only be taken on one rod in ocean waters.",
          "Regulations change and we're a tackle shop, not the state. Check the current CDFW rules for the species you're targeting before you go.",
        ],
      },
      {
        heading: "Which San Diego piers are open right now?",
        table: {
          head: ["Pier", "Where", "Hours", "Status"],
          rows: [
            ["Imperial Beach Pier", "Imperial Beach", "7:00am to 8:30pm", "Open, 1,491 ft, restrooms and fish-cleaning stations"],
            ["Coronado Ferry Landing", "Coronado", "5:00am to 11:00pm", "Open, 377 ft, bay fishing"],
            ["Embarcadero Marina Park South", "Downtown", "6:00am to 10:30pm", "Open, short pier with a wide T end"],
            ["Shelter Island Pier", "Point Loma", "24 hours", "Open, bait and tackle on site"],
            ["Oceanside Pier", "Oceanside", "4:00am to 10:00pm", "Mostly open, far west end still closed"],
            ["Ocean Beach Pier", "Ocean Beach", "Closed", "Permanently closed since Oct 2023"],
            ["Crystal Pier", "Pacific Beach", "Restricted, hotel operated", "Check access and licence status first"],
          ],
        },
      },
      {
        heading: "Why is Ocean Beach Pier closed?",
        body: [
          "Because it's falling down, and it isn't coming back soon. The longest pier in the county closed permanently in October 2023 after 57 years, and it's being replaced rather than repaired.",
          "As of August 2026 the replacement is still in permitting and environmental review. The city's own projection has environmental review finishing around spring 2027, design and bidding through 2028, and construction starting in early 2029. A city spokesman noted the review process alone \"can typically take anywhere from two to five years.\"",
          "If you read a guide that tells you to fish OB Pier, that guide hasn't been updated in three years. It's a good test for whether the rest of it is worth trusting.",
        ],
      },
      {
        heading: "Can you still fish Oceanside Pier after the fire?",
        body: [
          "Yes, most of it. The April 2024 fire took out the far western end, and about 90 percent of the pier reopened in May 2024. You can walk out past the bait shop, the restrooms and the fish-cleaning station.",
          "The far west end, the hammerhead where the restaurant was, is still closed and will stay closed until reconstruction finishes. The city awarded the engineering contract in April 2026, with construction possibly starting spring 2027.",
          "Practically, that means you lose the deepest water at the very end. Everything shoreward of that is fishable and always held fish anyway.",
        ],
      },
      {
        heading: "What gear do you need for pier fishing?",
        body: [
          "Shorter than you'd use on the beach. You're fishing more or less straight down or lobbing short, so a 7 foot rod is easier to handle in a crowd than a 10 footer, and you don't need the length to hold line over surf.",
          "Bank sinkers are the right shape here. On sand they roll, which is why we say so on the sinker guide, but dropped vertically off a pier there's nothing to roll and their teardrop shape comes through pilings and rock better than a pyramid would.",
          "Go lighter on line and hooks than surf gear. Most pier fish are perch, croaker, mackerel and bass, and 15 lb braid with a small circle hook covers nearly all of it.",
        ],
        products: ["okuma-tundra-7", "dwave-combo-7", "sufix-832-advanced-superline-braid-15lb-low-", "gamakatsu-octopus-circle-1-0"],
      },
      {
        heading: "The one thing we can't sell you",
        body: [
          "A pier drop net. On a high pier, a decent fish will break off if you try to lift it straight up on the line, and the answer is a hoop net you lower on a rope. We don't stock one, and the folding net we do sell is a wading and small-fish net, not a pier net.",
          "Buy one locally. Shelter Island and Oceanside both have tackle shops on the pier itself, which is the easiest place to get the right thing.",
        ],
      },
      {
        heading: "Sources, and when this was last checked",
        body: [
          "Licence rules and the public pier definition: California Department of Fish and Wildlife. Ocean Beach Pier status: Times of San Diego, 18 August 2026. Oceanside Pier status: City of Oceanside pier fire recap. Pier lengths, hours and amenities: San Diego Tourism Authority.",
          "Checked August 2026. Hours change seasonally, piers close for storms and repairs, and the two examples above show how fast a pier list goes stale. Call ahead or check the operator before you drive.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you need a fishing license on a pier in California?",
        a: "Not on a public pier in ocean or bay waters. You do need one on a private pier, from a boat, or from shore away from a public pier. Every other regulation, including size and bag limits, still applies.",
      },
      {
        q: "Is Ocean Beach Pier open for fishing?",
        a: "No. It closed permanently in October 2023 and is being replaced. City projections have construction starting around early 2029, so it will be closed for years yet.",
      },
      {
        q: "How many rods can you use on a California pier?",
        a: "Two rods and lines per person on a public pier, per CDFW. Salmon is the exception and may only be taken on one rod in ocean waters.",
      },
      {
        q: "What's the best San Diego pier for a beginner?",
        a: "Shelter Island is open 24 hours, has a tackle shop on the pier and sits on protected bay water, so it's the most forgiving place to learn. Imperial Beach gives you more open ocean species if you want variety.",
      },
    ],
    related: ["surf-fishing-sinker-size", "beginner-surf-fishing-setup", "how-to-catch-sand-crabs-for-bait"],
  },
  {
    slug: "how-to-catch-sand-crabs-for-bait",
    title: "How to Catch Sand Crabs for Bait",
    description:
      "Sand crabs are the best surfperch bait on the West Coast and they're free, sitting in the sand at your feet. Here's how to find them, which ones to keep, and how to hook them.",
    published: "2026-08-25",
    sections: [
      {
        body: [
          "If you're fishing the California surf for perch and buying bait, you're doing it the hard way. The thing perch eat most is a sand crab, also called a mole crab, and there are thousands of them in the swash at your feet.",
          "They're free, they're fresh, and they're what the fish are already looking for. It takes about ten minutes to get a session's worth.",
        ],
      },
      {
        heading: "Where do you find sand crabs?",
        body: [
          "In the swash zone, the strip of wet sand where waves run up and drain back. They move up and down the beach with the tide, so they're always somewhere in that band rather than in one fixed spot.",
          "Look for a V-shaped ripple in the thin sheet of water draining back down the sand. That's water breaking around a crab's antennae just under the surface. Where you see a cluster of those Vs, there's a colony.",
          "Wait for a wave to recede, then dig fast with both hands or a scoop about two to four inches down, right where you saw the ripples. Lift the sand and let it sieve through your fingers. They'll be wriggling in what's left.",
        ],
      },
      {
        heading: "Which sand crabs should you keep?",
        body: [
          "Soft ones. A crab that's recently moulted has a shell you can dent with a thumbnail, and those are worth more than the hard ones. Softer shell means more scent in the water and a hook that sets cleanly instead of skidding off a hard back.",
          "Size matters less than most people think. Small crabs catch plenty of perch, and a couple of small ones on a hook often beats one big one. If you find crabs carrying orange egg masses underneath, those are excellent bait, though plenty of anglers put the egg-bearing females back on principle.",
          "Keep them in damp sand in a bucket or a bait pouch, out of standing water and out of the sun. They'll live for hours that way and die quickly in a sealed container of seawater.",
        ],
      },
      {
        heading: "How do you hook a sand crab?",
        body: [
          "Point the hook up through the underside, entering at the rear where the tail tucks under, and bring it out through the top of the shell. That way the crab sits naturally, and the hook point is exposed where it needs to be.",
          "Use a small hook. A 1/0 or smaller is plenty for perch, and a big surf hook just tears the crab apart on the cast. Two small crabs on one hook is a normal presentation.",
          "Cast gently. A crab is a soft bait and a full-power cast will fling it off. If you keep losing bait in the air, you're casting too hard rather than hooking wrong.",
        ],
        products: ["gamakatsu-octopus-circle-1-0", "gamakatsu-octopus-circle-3-0"],
      },
      {
        heading: "When is the best time to collect them?",
        body: [
          "A dropping tide, and the lower the better. As the water pulls back it exposes more of the band they live in, and you can work sand that was under three feet of water an hour ago.",
          "Which is convenient, because a dropping tide is also when a lot of perch fishing turns on. Collect on the way down, fish through the run.",
          "They're seasonal too. Numbers are highest through the warmer months and thin out in winter on a lot of beaches, which is when a bag of frozen bait earns its place in the cooler.",
        ],
      },
      {
        heading: "Do you need a license to collect sand crabs?",
        body: [
          "Take this one seriously rather than taking our word for it. California regulates the take of invertebrates, and the rules differ depending on where you are and whether you're on a public pier.",
          "Check the current CDFW regulations before you fill a bucket. It's a two minute job and it's your responsibility, not ours.",
        ],
      },
    ],
    faqs: [
      {
        q: "What do sand crabs catch?",
        a: "Barred surfperch above all, which eat them as a staple. Corbina, croaker and a range of other surf species take them too. It's the closest thing to a default bait on a California beach.",
      },
      {
        q: "Do you need a sand crab rake?",
        a: "No. Your hands work fine and most people never buy one. A rake or a mesh scoop speeds things up if you're collecting for a group or working coarse sand.",
      },
      {
        q: "Can you freeze sand crabs?",
        a: "You can, and plenty of people do for the winter months. They're noticeably softer and less effective than live ones, so use fresh when you can get them.",
      },
      {
        q: "Why can't I find any sand crabs?",
        a: "You're probably looking in the wrong band or at the wrong tide. Work the wet sand where waves are actively draining, on a falling tide, and watch for the V ripples rather than digging at random.",
      },
    ],
    related: ["surf-fishing-rigs", "free-fishing-piers-san-diego", "how-to-read-a-tide-chart"],
  },
  {
    slug: "how-to-keep-fish-fresh",
    title: "How to Keep a Fish Fresh: Bleed It, Ice It, Eat It",
    description:
      "Most fish that tastes muddy or mushy was ruined in the first ten minutes on the beach, not in the kitchen. Here's what to do the moment you decide to keep one.",
    published: "2026-08-25",
    sections: [
      {
        body: [
          "The difference between a fish that tastes clean and one that tastes like the bottom of a bucket is almost never the cooking. It's what happened in the first ten minutes after it came out of the water.",
          "This is the part of fishing nobody teaches beginners, and it's the part that experienced anglers do without thinking.",
        ],
      },
      {
        heading: "Should you bleed a fish?",
        body: [
          "If you're keeping it, yes, and do it straight away while the heart's still pumping. Blood left in the flesh is what turns it dark, strong-tasting and quick to spoil.",
          "Cut through the gill arches on one side, or make a cut just behind the pectoral fin, then put the fish head down in a bucket of seawater for a couple of minutes. The heart does the work for you. A fish bled in the first minute empties out properly; one bled ten minutes later barely bleeds at all.",
          "You need something sharp and something to hold the fish with. Bleeding a live fish with a blunt knife and bare hands is how people end up in urgent care.",
        ],
        products: ["pliers"],
      },
      {
        heading: "What's the fastest way to cool a fish?",
        body: [
          "An ice slurry, which is ice and seawater mixed to a slush. Not dry ice in a bag, not a fish laid on top of a block.",
          "The reason is contact. Slurry touches every surface of the fish at once and pulls the temperature down in minutes. Dry ice in a cooler chills the fish nearest it and leaves the rest sitting in its own warmth, which is exactly where spoilage starts.",
          "Aim to get the fish cold within minutes of bleeding it, not at the end of the session when you pack up. On a warm beach the difference is enormous.",
        ],
        products: ["cooler"],
      },
      {
        heading: "How long does fish keep on ice?",
        body: [
          "Properly bled and held in slurry, a day or two comfortably, and that's a whole fish rather than fillets. Once you've cut it, you're on a shorter clock.",
          "Keep it drained though. A fish sitting in a bath of meltwater goes soft and waterlogged, so a cooler with the plug cracked open, or a rack that keeps it above the water, is better than a sealed bucket of slush.",
        ],
      },
      {
        heading: "How should you handle a fish you're releasing?",
        body: [
          "Opposite of everything above. Wet your hands first, because dry hands strip the slime coat that protects it from infection. Keep it in the water if you can, support its weight rather than hanging it by the jaw, and get the hook out fast.",
          "If it's hooked deep, cut the leader and leave the hook rather than digging for it. A hook rusts out; a torn throat doesn't heal.",
          "This is where circle hooks earn their keep. They catch in the jaw corner instead of the gut, so the fish you didn't plan to keep goes back with a real chance.",
        ],
        products: ["pliers", "circle-hooks"],
      },
      {
        heading: "One thing worth knowing before you keep anything",
        body: [
          "Some fish carry consumption advisories, and they vary by species, by water body and sometimes by who's eating them. That's a public health matter and it changes.",
          "Check your state's current advisories for where you're fishing rather than assuming. Size and bag limits are your responsibility too.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have to bleed fish right away?",
        a: "As close to immediately as you can manage. The heart is what pushes the blood out, so bleeding in the first minute empties the fish properly. Wait ten minutes and you'll barely get anything.",
      },
      {
        q: "Is an ice slurry better than ice?",
        a: "Much. Slurry contacts the whole fish at once and cools it in minutes. Ice on its own only chills what it touches, leaving the rest warm.",
      },
      {
        q: "Should I gut a fish on the beach?",
        a: "If you can do it cleanly and get it on ice, gutting early helps, since the guts are where spoilage starts. Check local rules on cleaning fish where you are, and never leave the waste on the sand.",
      },
    ],
    related: ["beginner-surf-fishing-setup", "free-fishing-piers-san-diego"],
  },
  {
    slug: "surf-fishing-rigs",
    title: "Surf Fishing Rigs: The Two You Actually Need",
    description:
      "How to tie the fish-finder rig and the high-low rig, and how to tell which one the conditions are asking for. Nearly every other surf rig is a variation on these two.",
    published: "2026-08-25",
    sections: [
      {
        body: [
          "There are dozens of surf rigs and almost all of them answer the same question: how do you keep a bait where the fish are, in water that's actively trying to move it somewhere else?",
          "Two rigs answer it well enough that you can fish a beach for years and never tie a third. The difference is where the bait ends up. A fish-finder rig puts it flat on the sand, where anything rooting along the beach will find it. A high-low holds it up in the water column, where anything hunting by sight will. Neither is better. Knowing which to reach for is most of the skill.",
        ],
      },
      {
        heading: "What is a fish-finder rig and how do you tie one?",
        body: [
          "It's the sliding-sinker rig, sometimes called a Carolina rig. From the mainline down: slide a sinker slide or a plain snap swivel onto your line so it runs free, add a small bead to protect the knot, tie on a barrel swivel, then 18 to 30 inches of leader, then the hook. The weight hangs off the slide. The bait sits on the sand.",
          "The name is the explanation. Because the sinker isn't tied into the line, a fish that picks up the bait and moves off pulls line through the slide instead of dragging a lump of lead. It feels almost nothing, so it doesn't drop the bait. On a rig with a fixed weight, a cautious fish feels four ounces of dead lead the second it turns, and lets go.",
          "That's the whole argument, and it's why this rig outfishes everything else on an open beach. If you only ever learn one, learn this one.",
          "Leader length is the part worth thinking about. Short, around 18 inches, pins the bait in the strike zone and casts cleanly. Long, out past 30 inches, lets it wash around and look alive, at the cost of tangles in the air. Start at 24 and adjust to what the water's doing.",
        ],
        products: ["circle-hooks", "fluoro-leader", "mustad-barrel-swivel-2-0"],
      },
      {
        heading: "What is a high-low rig and when should you use it?",
        body: [
          "Two dropper loops tied into a length of leader, a hook on each, sinker on the bottom. The baits stand off the line on short droppers, a few inches to a foot above the sand.",
          "Reach for it when the bottom is doing something you don't want your bait sitting in. Heavy weed. Soft mud that'll bury it. Crab so thick that anything on the sand gets stripped in ninety seconds. It's also the better prospecting rig, because two hooks means two baits at two heights, and that tells you where the fish are feeding twice as fast.",
          "The cost is that the sinker's fixed, so a fish feels the weight. That matters less with aggressive fish and a lot with cautious ones, which is why the fish-finder is still the default.",
        ],
        products: ["gamakatsu-octopus-circle-3-0", "fluoro-leader"],
      },
      {
        heading: "Which surf rig should you use, and when?",
        table: {
          head: ["Conditions", "Rig", "Why"],
          rows: [
            ["Clean sand, fish feeding on the bottom", "Fish-finder", "Bait sits where they're looking, and they feel nothing when they take it"],
            ["Weed, mud, or heavy crab", "High-low", "Holds the bait up out of the mess"],
            ["A beach you don't know yet", "High-low", "Two baits at two depths is a faster survey"],
            ["Cautious or heavily fished water", "Fish-finder", "The sliding weight is your only real defence against a dropped bait"],
            ["Hard current, everything on the move", "Fish-finder, short leader", "Less line in the water for the current to push around"],
          ],
        },
      },
      {
        heading: "Why circle hooks, and how do you set them?",
        body: [
          "Both rigs above get fished with the rod in a holder while you wait, and that's exactly what a circle hook is built for. It doesn't need a hookset. As the fish moves off, the hook slides to the corner of the jaw and turns, and the fish sets it against its own weight.",
          "So don't strike. If you swing on a circle hook the way you would a J hook, you'll pull it straight back out of its mouth. Let the rod load up, then wind steadily until it comes tight. It's the hardest habit for an experienced angler to break and the easiest thing in the world for someone who was never taught the other way.",
          "The practical payoff is that circle hooks catch in the jaw instead of the gut, so a fish you didn't mean to keep goes back with a real chance. Some fisheries require them. Check your own rules rather than taking our word for it.",
        ],
        products: ["circle-hooks", "gamakatsu-octopus-circle-1-0"],
      },
      {
        heading: "What knots do you need for surf fishing?",
        body: [
          "Three, and that's it. An FG knot or a double uni to join braid to leader. A uni or a loop-to-loop to attach the leader to your swivel. And a snell or a uni for the hook, though the snell is worth learning for circle hooks specifically, because it presents the hook at a better angle for the way a circle works.",
          "Tie them at home, in good light, with dry hands, until you don't have to think. Then tie them on a dark beach with cold hands, because that's the only test that counts.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a shock leader on a surf rig?",
        a: "Only if you're casting heavy lead. The old surfcasting rule is roughly 10 lb of shock leader per ounce of lead, so 3 oz wants about 30 lb. Under 3 oz on a rod rated for it, your rig leader is already doing that job.",
      },
      {
        q: "Is mono or fluorocarbon better for a surf leader?",
        a: "Fluorocarbon is harder to see and takes more abrasion, and both matter over clear water and shell. Mono is cheaper and floats a touch, which holds a bait slightly higher. The gap is small enough that the honest answer is to use whichever you already own.",
      },
      {
        q: "How long should a surf fishing leader be?",
        a: "Start at 24 inches on a fish-finder rig. Shorten it in hard current or heavy weed, lengthen it in calm clear water where you want the bait moving naturally.",
      },
    ],
    related: ["surf-fishing-sinker-size", "best-line-for-surf-fishing"],
  },
  {
    slug: "surf-fishing-sinker-size",
    title: "What Size Sinker for Surf Fishing?",
    description:
      "How to pick a sinker weight for the conditions in front of you, why shape matters as much as ounces, and an honest note about the one type we don't stock.",
    published: "2026-08-25",
    sections: [
      {
        body: [
          "The right sinker is the lightest one that stays put. That's the whole rule. Everything below is just working out what that weight is today.",
          "Too light and your bait rolls down the beach, drags your line across everyone else's, and finishes up in the wash forty yards from the fish. Too heavy and you lose distance, feel nothing through the rod, and every bite arrives as a mystery.",
        ],
      },
      {
        heading: "What size sinker should you start with?",
        table: {
          head: ["Conditions", "Weight", "What you should see"],
          rows: [
            ["Calm day, little sideways current, small surf", "2 to 3 oz", "Line holds with a gentle bow in it"],
            ["Normal beach, some push, moderate swell", "3 to 4 oz", "The working weight on most days"],
            ["Strong sweep, big swell, tide running hard", "5 to 6 oz", "Anything lighter walks within a minute"],
            ["Pier or jetty, fishing straight down", "1 to 3 oz", "You're fighting depth, not current"],
          ],
        },
        body: [
          "Then adjust by feel, not by the table. Cast, set the rod in the holder, and watch your line. If the bow keeps growing and the tip starts nodding in a slow rhythm instead of sitting still, your weight is walking and you need to go up. If it holds and you can still feel the sinker tap bottom when you lift, you're about right.",
          "The tide will change this on you mid-session. A weight that sat perfectly at slack won't hold two hours into a run. Carry at least two sizes.",
        ],
        products: ["bank-sinker-3oz", "bank-sinker-4oz", "bank-sinker-6oz"],
      },
      {
        heading: "Does sinker shape matter more than weight?",
        body: [
          "Often, yes. Weight decides how hard the current has to work. Shape decides whether the sinker grips sand or rolls across it.",
          "A pyramid digs its flat faces in and holds. A sputnik, sometimes called a breakaway, has wire arms that anchor like a grapnel and fold on the retrieve, and it's the best holding weight there is in serious current. Those are what a surfcaster reaches for when the beach is moving.",
          "We don't sell either one. Our distributors don't carry them in a form we can ship, and we'd rather tell you that than quietly sell you the wrong shape.",
          "What we do sell is bank sinkers, the teardrop ones. They're very good fished straight down off a pier, jetty or boat, they come through rock better than a pyramid because there's nothing to snag, and they're fine on a calm beach. In a hard lateral sweep they'll roll, and you'll need more weight to hold than a pyramid would need in the same water. That's a real tradeoff and you should know it before you spend anything.",
          "If you fish an exposed beach in heavy current most weekends, buy pyramids or sputniks from someone who stocks them. We'll still be here for the line and the hooks.",
        ],
        products: ["bank-sinker-4oz", "bank-sinker-6oz"],
      },
      {
        heading: "How heavy can your rod actually cast?",
        body: [
          "Check the casting rating printed just above the handle. That number is the total payload, lead plus bait, not lead on its own. A rod rated 1 to 4 oz is happy with 3 oz and a bait chunk. Four ounces plus a whole squid is over the top of the range, and finding that out costs you a rod.",
          "Going over doesn't usually snap it on the spot. It shortens the rod's life, costs you distance because the blank never loads properly, and turns one rushed cast into a broken tip.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does my sinker keep rolling down the beach?",
        a: "It's either too light for the current or the wrong shape. Bank sinkers roll more readily than pyramids because they've got no flat faces to dig in. Go up a size, and if it still walks, the answer is a pyramid or a sputnik rather than more lead.",
      },
      {
        q: "How many sinkers should I carry surf fishing?",
        a: "Two weights minimum, and more of each than you think you need. Sinkers are the thing you lose. Anyone fishing over structure should expect to leave several on the bottom in a session, which is why they come in packs.",
      },
      {
        q: "Are lead sinkers legal?",
        a: "Lead is restricted in some waters and for some species, and the rules vary by state and by water body. Wash your hands after handling them, keep them away from kids, and check your local regulations, which are your responsibility rather than ours.",
      },
    ],
    related: ["surf-fishing-rigs", "how-to-read-a-tide-chart"],
  },
  {
    slug: "how-to-read-a-tide-chart",
    title: "How to Read a Tide Chart for Fishing",
    description:
      "Why moving water beats high water, how to find the two hours actually worth fishing, and how to plan a session around the tide instead of around your day off.",
    published: "2026-08-25",
    sections: [
      {
        body: [
          "Most people open a tide chart looking for high tide. That's the wrong number.",
          "What matters isn't where the water is, it's whether it's moving and how fast. Moving water carries food. It lifts sand crabs and worms out of the beach, pulls baitfish off structure, and funnels the whole lot into lanes you can predict. The fish worked this out long before we did. They feed on the move and rest on the slack.",
        ],
      },
      {
        heading: "Why is slack tide the worst time to fish?",
        body: [
          "At the top and bottom of the tide there's a stretch where the water pauses before it turns. Nothing's being carried anywhere. On most beaches that's the deadest part of the whole cycle, and it's also, annoyingly, the time printed in bold on every tide table.",
          "Fishing normally switches on in the first hour after the water starts moving again, builds while the flow is strongest, and fades as it slackens toward the next turn.",
        ],
      },
      {
        heading: "When is the best time to fish a tide?",
        body: [
          "The middle of it. Between a high and the next low, the water doesn't move at a steady speed. It starts slow, peaks around the middle, then slows again.",
          "The rule of twelfths is the quick way to picture it. Of the total range, roughly one twelfth moves in the first hour, two in the second, three in the third, three in the fourth, two in the fifth, one in the sixth.",
          "Which means hours three and four carry half the entire movement between them. That's your window. If you've got two hours to fish and a six hour tide, fish those two.",
          "This is arithmetic, not folklore, and it's the most useful thing on a tide chart once you know to look for it.",
        ],
      },
      {
        heading: "Do bigger tides mean better fishing?",
        body: [
          "Not automatically. A big tide moves more water and moves it faster. Around the new and full moon the range is at its biggest, which is called a spring tide and has nothing to do with the season. Around the quarter moons it's smallest, called a neap.",
          "But a big spring tide on an exposed beach can throw so much sand and weed into the water that nothing feeds, and it'll drag a 4 oz sinker down the beach no matter what you do. A modest tide on a calm day is often the more fishable one. What you want is enough movement to bring food through without turning the water to soup.",
        ],
      },
      {
        heading: "How do you plan a session around the tide?",
        body: [
          "Look at the chart the night before. Find the turn, count forward about two hours, and that's roughly when you want a bait in the water. Then check swell and wind, because a perfect tide on a beach with eight feet of unfishable surf isn't a fishing trip, it's a drive.",
          "Our sister site USTideCharts does this arithmetic for you. It scores every two hour window at a given spot using live NOAA tide data, wind and moon phase, so you can see the good windows for the week without counting twelfths in your head. It's free, and it's the first thing to check before you spend a dollar on tackle or a tank of fuel on a drive.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is high tide or low tide better for surf fishing?",
        a: "Neither on its own. What matters is that the water's moving. On most beaches the most productive stretch is the middle of a tide, in either direction, because that's when the flow is fastest.",
      },
      {
        q: "How long before the tide should I arrive?",
        a: "Aim to be fishing about an hour after the turn, so you're already set up when the flow builds. Turning up at the turn itself usually means you spend the best part of the window rigging up.",
      },
      {
        q: "Do I need a heavier sinker on a big tide?",
        a: "Usually. A spring tide moves water faster, so a weight that held through a neap will walk. Carry a heavier size for the middle of the cycle and change down as it slackens.",
      },
    ],
    related: ["surf-fishing-sinker-size", "beginner-surf-fishing-setup"],
  },
  {
    slug: "best-line-for-surf-fishing",
    title: "Best Line for Surf Fishing: Braid, Mono and Leader",
    description:
      "Braid or mono for the mainline, what pound test you actually need, what the leader is really for, and when a shock leader stops being optional.",
    published: "2026-08-25",
    sections: [
      {
        body: [
          "Your line is the only thing physically connecting you to a fish two hundred feet away. It's also the cheapest part of the setup to get right and the most expensive to get wrong, because nothing else on the rod matters the moment it parts.",
        ],
      },
      {
        heading: "Should you use braid or mono for surf fishing?",
        body: [
          "Braid, in almost every case, and the reason is stretch. Braid has effectively none. At surf distances that's the whole argument: two hundred feet of mono stretches enough that a gentle bite arrives at your hand as nothing at all, and your hookset arrives at the fish as a polite suggestion. With braid you feel the sinker tap bottom and you feel a fish breathe on the bait.",
          "It's also much thinner for the same strength, so you fit more on the spool, the current pushes it around less, and you cast further for the same effort.",
          "The tradeoffs are real though. Braid has almost no abrasion resistance, so it won't survive rock or shell, which is exactly why you tie a leader to it. It's highly visible in clear water, same reason. And because it doesn't stretch, a hard cast or a sudden snag has nowhere to dump that shock, so something else in the system absorbs it.",
        ],
        products: ["braided-line", "braid-hivis"],
      },
      {
        heading: "What pound test line for surf fishing?",
        table: {
          head: ["What you're fishing", "Braid", "Why"],
          rows: [
            ["Light surf, perch, small structure fish", "10 to 15 lb", "Thinner line, longer casts, still plenty for the fish"],
            ["General beach fishing", "20 lb", "The sensible default, handles a surprise"],
            ["Heavy surf, big baits, rough ground", "30 lb and up", "Abrasion, and the size of what might turn up"],
          ],
        },
        body: [
          "Most people fish heavier than they need to. Twenty pound braid already breaks well above what a rod rated 10 to 20 lb can even apply, and going heavier doesn't make you stronger. It just means that when something has to give, the weakest link is no longer your line. It's your rod.",
          "Hi-vis is worth thinking about for the mainline. Seeing where your line sits in the wash tells you what the current's doing to your rig, and you'll often spot a bite as a change in the line before you feel it. The fish is looking at your leader, not your mainline.",
        ],
        products: ["braided-line", "braid-15", "braid-light"],
      },
      {
        heading: "What is a leader for, and what size?",
        body: [
          "A leader isn't just a continuation of your mainline in a different strength. It's there for two jobs: to be invisible where the fish is looking, and to survive contact with things that would cut braid instantly.",
          "Fluorocarbon has a refractive index close to water, which is the technical way of saying it's hard to see. It's also stiffer and takes more abrasion than mono. For surf work, 20 to 40 lb covers most fish over sand. Step up over rock, and step up again if there's anything with teeth around.",
          "For genuinely toothy fish, no mono or fluoro will do the job. That's what wire is for.",
        ],
        products: ["fluoro-leader", "fluoro-100", "vmc-titanium-leader-7-strand-30lb-12"],
      },
      {
        heading: "When do you need a shock leader?",
        body: [
          "A shock leader is a length of heavier line between braid and rig, long enough that you've got five or six turns on the spool as you start the cast. Its job is to absorb the enormous instant load of launching several ounces of lead, so your mainline doesn't part mid-cast and send a sinker somewhere it shouldn't go.",
          "Rule of thumb is about 10 lb of shock leader per ounce of lead. Three ounces wants 30 lb, five ounces wants 50 lb. That's a guideline that's kept surfcasters safe for decades, not a precise engineering figure.",
          "Under about 3 oz on a rod rated for it, you can usually skip a dedicated shock leader, because your rig leader is already covering it. Above that, or any time you're properly leaning into a cast, tie one. A sinker that lets go mid-cast on a busy beach is the one genuinely dangerous failure in surf fishing.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much braid do I need on a surf reel?",
        a: "Fill to about an eighth of an inch below the spool lip. Underfilling costs you distance, and overfilling is the single most common cause of wind knots on a surf reel.",
      },
      {
        q: "Do I need mono backing under braid?",
        a: "On a big surf reel you're genuinely filling with 300 yards, usually not. On a smaller reel, backing saves you buying more braid than you'll ever cast and stops the braid slipping on a bare spool.",
      },
      {
        q: "How often should I change my line?",
        a: "Braid lasts seasons rather than trips, but the last twenty or thirty feet takes all the punishment. Cut back and retie your leader connection regularly, and once that section starts feeling fuzzy, cut off more.",
      },
    ],
    related: ["surf-fishing-rigs", "beginner-surf-fishing-setup"],
  },
  {
    slug: "beginner-surf-fishing-setup",
    title: "Beginner Surf Fishing Setup: What to Buy First",
    description:
      "What you actually need to fish a beach, what each piece is doing, roughly what it costs, and the gear you can safely skip until you know your beach.",
    published: "2026-08-25",
    sections: [
      {
        body: [
          "You need less than the internet will tell you. A rod, a reel, line, a leader, hooks, weight, and something to cut with. Everything past that is convenience, and most of it can wait until you know whether you actually enjoy standing in cold water at dawn.",
        ],
      },
      {
        heading: "What length surf rod should a beginner buy?",
        body: [
          "Nine feet, if you're not sure. It's the length that suits the widest range of days.",
          "Rod length buys two things: casting distance, and the ability to hold line up above the breaking surf. Both matter, and both cost you in weight and handling.",
          "A 9 footer is short enough to cast all day without wrecking your shoulder and long enough for most beaches. A 10 or 11 will get a bait past the second bar and hold line clear of the wash, which is the real reason to go long, and it'll tire you out faster. A 7 footer is a pier and jetty rod, where you're fishing more or less straight down and a long rod is just in the way.",
        ],
        products: ["daiwa-ft-surf-9", "surf-rod", "daiwa-ft-surf-11", "okuma-tundra-7"],
      },
      {
        heading: "What size reel for surf fishing?",
        body: [
          "A 3000 to 5000 size spinning reel covers almost all beach fishing. Smaller is fine for perch and pier work, bigger is for people chasing things that run.",
          "This is where the money matters. A surf reel is going to have sand and salt water thrown at it all day, so the two things worth paying for are a sealed or shielded drag and a spool that holds 200 yards of braid.",
          "Then rinse it with a light freshwater spray after every session. Never a pressure hose, which drives salt past the seals instead of washing it off. That one habit is the difference between a cheap reel lasting five seasons and lasting one.",
        ],
        products: ["abu-max-x-3000", "abu-max-x-2500"],
      },
      {
        heading: "Is a rod and reel combo worth it?",
        body: [
          "At this end of the market, usually yes. The manufacturer has already matched the reel to the blank, it's balanced, and you're not paying twice for packaging and shipping.",
          "Buy separately once you know what you want and you're upgrading half of a setup you've already been fishing.",
        ],
        products: ["dwave-combo-8", "dwave-combo-10", "dwave-combo-7"],
      },
      {
        heading: "What terminal tackle do you actually need?",
        table: {
          head: ["Part", "What to get", "Worth spending more?"],
          rows: [
            ["Mainline", "20 lb braid, 300 yd", "No, this is the cheap part"],
            ["Leader", "20 to 40 lb fluorocarbon", "No"],
            ["Hooks", "Circle hooks, 1/0 to 4/0 by bait size", "No, but buy more than you think"],
            ["Weight", "Two sizes, 3 oz and 4 oz to start", "No, you're going to lose them"],
            ["Pliers", "Stainless, side cutter, lanyard point", "Yes, this is the one"],
            ["Net", "Only if you're landing fish you can't lift", "Later"],
          ],
        },
        body: [
          "The pliers are the one place we'd tell a beginner to spend properly. You'll use them every session to cut braid, crimp, and get a hook out of a fish that's thrashing. Cheap ones seize with rust inside a month, and then you're unhooking fish by hand.",
          "The lanyard point matters more than it sounds. Pliers dropped off a jetty are simply gone.",
        ],
        products: ["pliers", "circle-hooks", "bank-sinker-4oz", "braided-line"],
      },
      {
        heading: "What should you skip until later?",
        body: [
          "A rod holder, until you've fished enough to know how you like to fish. A tackle bag, until you own enough tackle to need one, which is later than the shops would prefer. A fish finder, a gaff, a scale, a second rod. It's all real gear that real anglers use, and none of it catches you a first fish.",
          "The honest order is: get out there with a working setup, find out what you actually fish for, then buy the specific thing that fixes the specific problem you keep running into.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a beginner surf fishing setup cost?",
        a: "A matched combo, a spool of braid, a leader, hooks, two sizes of sinker and a decent pair of pliers runs roughly $150 to $180 new. You can do it cheaper second hand, and the reel is the part worth buying new.",
      },
      {
        q: "Do I need saltwater specific gear?",
        a: "For the reel, yes. Freshwater reels corrode fast in salt and the drag washers go first. For the rod it matters less, though saltwater rods use corrosion resistant guides and reel seats, which is worth having.",
      },
      {
        q: "Can I use my bass rod for surf fishing?",
        a: "Off a pier or jetty, often yes. For casting several ounces of lead off an open beach, no. The rod isn't rated for the weight and the reel won't hold enough line.",
      },
    ],
    related: ["surf-fishing-rigs", "best-line-for-surf-fishing", "how-to-read-a-tide-chart"],
  },
];

export const SPECIES: Species[] = [
  {
    slug: "barred-surfperch",
    name: "Barred surfperch",
    scientificName: "Amphistichus argenteus",
    description:
      "The fish most people actually catch from a California beach. What to put on the end of your line, how to read the trough they sit in, and why light gear beats heavy gear for them.",
    published: "2026-09-23",
    sections: [
      {
        body: [
          "If you walk onto a sand beach anywhere on the California coast with a rod, the fish you're most likely to catch is a barred surfperch. They're there year round, they feed within a cast of dry sand, and they don't require a dawn start or a secret spot.",
          "They're also the best fish to learn on. Everything that works for perch teaches you something that transfers to bigger fish later: reading a trough, timing a tide, keeping a bait moving in moving water.",
        ],
      },
      {
        heading: "Where are barred surfperch on a beach?",
        body: [
          "Closer than you think. The mistake almost everyone makes is casting as far as they can, which puts the bait past the fish and into empty water.",
          "Perch sit in the trough, which is the deeper channel of water that runs parallel to the beach between the dry sand and the first sandbar. At low tide you can see it: a darker band of water where the waves aren't breaking, with white water on either side of it. That band is where you're fishing.",
          "On many beaches the trough is inside thirty yards. Some days it's inside ten. A long cast is a wasted cast if it clears the trough entirely.",
        ],
      },
      {
        heading: "What's the best rig for surfperch?",
        body: [
          "A Carolina rig, which most surf anglers call a fish-finder rig. Slide a sinker slide onto your main line, thread on a bead, tie on a swivel, then add a leader of eighteen inches to three feet and a hook.",
          "The point of the slide is that the line runs free through it. A perch picks up a bait, moves off with it, and feels almost nothing because it isn't dragging the sinker. With a fixed sinker they feel the weight and drop the bait, and you never know they were there.",
          "Keep the sinker as light as the conditions allow. Three ounces holds in most calm surf. Go heavier only when the sweep is moving your rig down the beach faster than you can fish it.",
        ],
        products: ["sinker-slide-glow", "bank-sinker-3oz", "mustad-barrel-swivel-4"],
      },
      {
        heading: "What hook size for surfperch?",
        body: [
          "Smaller than you'd guess. A barred surfperch has a small mouth built for picking sand crabs out of the wash, and a big hook simply won't fit in it.",
          "Size 4 through 1/0 covers almost all perch fishing. If you're getting rattles and taps that never turn into a hooked fish, your hook is too big before it's anything else.",
        ],
        products: ["gamakatsu-octopus-circle-1-0"],
      },
      {
        heading: "What bait works best for barred surfperch?",
        body: [
          "Sand crabs, and it isn't close. Perch eat them almost exclusively through the warmer months, and you can dig them out of the wash on the same beach you're fishing, for free. Look for the little V-shaped ripples in the receding water and scoop the sand underneath.",
          "If you can't find crabs, a strip of market shrimp or a small piece of bloodworm will get bites. Soft plastics work too, particularly a small paddle tail or grub worked slowly along the bottom of the trough.",
          "We've a guide on catching and keeping sand crabs if you want the detail.",
        ],
      },
      {
        heading: "What rod and reel do I need?",
        body: [
          "Less than the tackle shop will sell you. Perch are a one to two pound fish, so the rod is about casting a three ounce sinker and handling surf, not about fighting power.",
          "A nine or ten foot two piece rod and a 3000 size spinning reel covers it comfortably. Fifteen to twenty pound braid or twenty five pound mono, and a fluorocarbon leader if the water's clear.",
          "Being straight with you: every spinning reel our suppliers carry tops out at size 3000, and they're all rated by their manufacturers for freshwater. They work fine in surf if you rinse them properly after every trip. If you want a sealed saltwater reel in a 4000 or 5000, you'll need to buy that elsewhere, and we'd rather say so than pretend.",
        ],
        products: ["daiwa-ft-surf-9", "daiwa-sweepfire-3000", "vicious-mono-25"],
      },
      {
        heading: "When is the best tide for surfperch?",
        body: [
          "Moving water, more than any particular height. A tide that's actively pushing or pulling stirs sand crabs out of the sand and puts them in the wash, which is when perch feed.",
          "The two hours either side of low tide are popular because that's when the trough is easiest to see and easiest to reach. A pushing tide over a shallow beach also works well because it opens up water that was dry an hour before.",
          "Slack water, at the top or bottom of the tide, is usually the slowest hour of the day.",
        ],
      },
    ],
    setup: [
      { part: "Rod", choice: "9 to 10 ft, two piece, medium", productKey: "daiwa-ft-surf-9" },
      { part: "Reel", choice: "3000 size spinning", productKey: "daiwa-sweepfire-3000" },
      { part: "Line", choice: "25 lb mono, or 15 lb braid", productKey: "vicious-mono-25" },
      { part: "Leader", choice: "12 lb fluorocarbon, 18 in to 3 ft", productKey: "floroclear-12" },
      { part: "Hook", choice: "Size 1/0 octopus circle", productKey: "gamakatsu-octopus-circle-1-0" },
      { part: "Weight", choice: "3 oz bank, on a sinker slide", productKey: "bank-sinker-3oz" },
      { part: "Bait", choice: "Sand crabs, dug on the beach", weDontStock: "Free from the wash in front of you. Nobody sells these and nobody should." },
      { part: "Rod holder", choice: "A sand spike, so you can rig the second rod", productKey: "sand-spike" },
    ],
    faqs: [
      {
        q: "Do I need a fishing license for surfperch?",
        a: "From a beach, yes, in California. From a public pier, no. Rules vary by state and change, so check your own state's wildlife agency before you go rather than trusting a tackle shop's website.",
      },
      {
        q: "Can you eat barred surfperch?",
        a: "Yes, they're good eating, and they're commonly kept. Size and bag limits apply and vary by state and sometimes by county, so look up the current limits where you fish.",
      },
      {
        q: "Why am I getting bites but not hooking anything?",
        a: "Almost always a hook that's too big. Drop to a size 4 or 1 and the same bites start converting. After that, check that you're letting a circle hook load rather than striking at it.",
      },
    ],
  },

  {
    slug: "california-halibut",
    name: "California halibut",
    scientificName: "Paralichthys californicus",
    description:
      "The best fish you can catch from the sand on the West Coast. Where they lie, why a slow retrieve matters more than the lure, and the honest gaps in what we can sell you for them.",
    published: "2026-09-23",
    sections: [
      {
        body: [
          "A halibut is what turns a beach session into a story. They're flat, they're ambush feeders, and a good one from the sand will take line off a 3000 reel in a way a perch never will.",
          "They're also catchable from shore far more often than people assume. You don't need a boat, you need to be fishing the right water slowly enough.",
        ],
      },
      {
        heading: "Where do halibut sit on a beach?",
        body: [
          "Flat on the bottom, buried, waiting for something to swim over them. That single fact drives everything else about how you fish for them.",
          "They favour the edges of structure rather than open sand: the lip of a trough, the slope of a sandbar, the mouth of a bay or harbour where current pushes bait through. Anywhere a moving bait gets funnelled past a place a flat fish can hide.",
          "Because they're lying on the bottom looking up, your bait or lure needs to pass above them, close, and slowly.",
        ],
      },
      {
        heading: "What's the best way to catch halibut from shore?",
        body: [
          "Two methods, and they suit different days.",
          "A live bait on a fish-finder rig, fished on the bottom, is the highest percentage approach. Smelt, anchovies or small shiner perch, hooked through the nose and given room to swim. This is why a sabiki rig is worth carrying: you catch your own bait first, and live bait out-fishes anything frozen.",
          "The second method is a soft plastic on a jig head, cast out and retrieved slowly along the bottom with the occasional lift and drop. Slow is the whole trick. If you think you're going too slowly, go slower.",
        ],
        products: ["sabiki-6", "sinker-slide-glow", "circle-hook-6-0"],
      },
      {
        heading: "What lure do halibut hit?",
        body: [
          "A paddle tail or jerk shad in a light, baitfish colour, three to five inches, on a lead head heavy enough to stay in contact with the bottom.",
          "Here's where we'll be straight with you. Our lure range is honest about what it is: mostly freshwater bass plastics and offshore trolling lures. A four inch Zoom Fluke on a jig head does catch halibut and plenty of people use exactly that. But we don't currently stock a dedicated saltwater swimbait range, and if you want one you'll do better at a coastal tackle shop than here.",
          "We'd rather tell you that than sell you a bass crankbait and let you find out.",
        ],
        products: ["zoom-super-fluke-jr"],
      },
      {
        heading: "What gear do I need for halibut?",
        body: [
          "Heavier than perch gear, but not by much. The fish isn't the problem; the sinker and the surf are.",
          "A nine to ten foot rod with a medium or medium heavy rating, a 3000 reel, and twenty to thirty pound line. Fluorocarbon leader of fifteen to twenty pound, because halibut have real teeth and a light leader gets sawn through.",
          "A net matters more here than for perch. A halibut in the wash is a slab of muscle that will throw a hook in six inches of water, and most fish are lost in the last two seconds.",
        ],
        products: ["okuma-tundra-9", "abu-max-pro-3000", "floroclear-20"],
      },
      {
        heading: "What time of day is best for halibut?",
        body: [
          "First and last light, as with most ambush predators, and around a moving tide.",
          "Halibut feed by sight, so they want enough light to see a silhouette above them but not so much that they're exposed. Dawn and dusk give them both. A tide pushing bait through a harbour mouth or along a bar at either of those times is the classic window.",
        ],
      },
    ],
    setup: [
      { part: "Rod", choice: "9 to 10 ft, medium-heavy", productKey: "okuma-tundra-9" },
      { part: "Reel", choice: "3000 size, best drag you can get", productKey: "abu-max-pro-3000" },
      { part: "Line", choice: "30 lb mono, or 20 lb braid", productKey: "vicious-mono-30" },
      { part: "Leader", choice: "20 lb fluorocarbon, 2 to 3 ft", productKey: "floroclear-20" },
      { part: "Hook", choice: "6/0 circle for a live bait", productKey: "circle-hook-6-0" },
      { part: "Weight", choice: "4 oz bank on a sinker slide", productKey: "bank-sinker-4oz" },
      { part: "Bait", choice: "Live smelt or anchovy, caught on a sabiki", productKey: "sabiki-6" },
      { part: "Net", choice: "Get one under it before the last wave", productKey: "landing-net" },
      { part: "Lure", choice: "4 in soft plastic on a lead head", weDontStock: "We don't carry a proper saltwater swimbait range. A Zoom Fluke on a jig head works; a dedicated coastal shop will do better." },
    ],
    faqs: [
      {
        q: "What size halibut can you keep?",
        a: "There's a legal minimum and it differs between northern and southern California, with separate bag limits. Those numbers change, so check the current CDFW regulations rather than a tackle shop page.",
      },
      {
        q: "Do I need a leader for halibut?",
        a: "Yes. They have a mouth full of small sharp teeth and a straight braid-to-hook connection gets cut. Two to three feet of 20 lb fluorocarbon is standard.",
      },
      {
        q: "Can you catch halibut on a pier?",
        a: "Yes, and piers over sand near a harbour mouth are among the better places to try from shore. Same rig, same slow presentation, and a drop net to get one up the rail.",
      },
    ],
  },

  {
    slug: "california-corbina",
    name: "California corbina",
    scientificName: "Menticirrhus undulatus",
    description:
      "The hardest fish to catch from a California beach on purpose, and the most rewarding. Sight fishing in a foot of water, why they spook, and what to use.",
    published: "2026-09-23",
    sections: [
      {
        body: [
          "Corbina are the surf fish that experienced beach anglers get obsessive about. They feed in water shallow enough that you can watch them do it, they eat one thing almost exclusively, and they'll refuse a bait for reasons that make no sense until they suddenly don't.",
          "If perch teach you to fish the surf, corbina teach you to hunt.",
        ],
      },
      {
        heading: "How do you sight fish for corbina?",
        body: [
          "You walk and look before you cast. On a calm day with decent light, corbina show themselves in the wash as a dark shape or a tail breaking the surface while they root in the sand.",
          "The technique is to spot a fish, get ahead of where it's moving, and place a bait in its path without landing the sinker on its head. Then you leave it there.",
          "This is the opposite of most surf fishing. You're not covering water, you're waiting for a specific fish to find a specific bait.",
        ],
      },
      {
        heading: "What do corbina eat?",
        body: [
          "Sand crabs, to the point of near obsession. They're built for it, with a mouth angled down for rooting through sand and a single chin barbel for finding what's buried.",
          "A soft shell sand crab, which is one that's recently moulted and feels squashy rather than hard, is the single best bait. They're worth picking out of a scoop and keeping separate.",
          "Some people catch them on ghost shrimp or a small piece of mussel. Almost nobody catches them consistently on anything else.",
        ],
      },
      {
        heading: "Why do corbina spook so easily?",
        body: [
          "Because they're feeding in a foot of clear water with nowhere to hide, and everything above them is a threat.",
          "That means your line, your leader and your shadow all matter more than they do for any other surf fish. Light fluorocarbon, the smallest sinker that will hold, and standing back from the water rather than wading into it.",
          "It also means a heavy splash from a four ounce sinker landing near a fish ends that opportunity. Lighter is better in every part of this rig.",
        ],
        products: ["floroclear-12", "bank-sinker-3oz"],
      },
      {
        heading: "What rig for corbina?",
        body: [
          "The same fish-finder rig as surfperch, scaled down. Sinker slide, bead, swivel, then a long light fluorocarbon leader of two to four feet and a small hook.",
          "Hook size 4 to 2 is right. Corbina have soft mouths and small ones at that, and a big hook pulls or simply doesn't get taken.",
          "Some anglers fish no weight at all in very shallow calm water, just a hook and a crab, letting the wash carry it. It's a difficult way to fish and it catches fish that a weighted rig won't.",
        ],
        products: ["sinker-slide-glow", "gamakatsu-octopus-circle-1-0"],
      },
    ],
    setup: [
      { part: "Rod", choice: "8 to 9 ft, lighter than you'd use for perch", productKey: "eagle-claw-glass-8" },
      { part: "Reel", choice: "2500 or 3000 spinning", productKey: "abu-max-x-2500" },
      { part: "Line", choice: "20 lb mono, or light braid", productKey: "vicious-mono-20" },
      { part: "Leader", choice: "12 lb fluorocarbon, 2 to 4 ft, and go lighter if refused", productKey: "floroclear-12" },
      { part: "Hook", choice: "Size 4 to 2, small and sharp", productKey: "gamakatsu-octopus-circle-1-0" },
      { part: "Weight", choice: "As little as holds. 3 oz maximum, often less", productKey: "bank-sinker-3oz" },
      { part: "Bait", choice: "Soft shell sand crab", weDontStock: "Dig them yourself from the wash. The soft ones are worth separating out." },
    ],
    faqs: [
      {
        q: "What's the best tide for corbina?",
        a: "A pushing tide over a shallow beach, which floods sand that was dry and gets crabs moving. Calm water and good light matter more than the specific tide height, because you need to be able to see fish.",
      },
      {
        q: "Can you keep corbina?",
        a: "There are bag and size rules, and in California it's illegal to take them by spear or net. Regulations change, so check the current rules for where you fish.",
      },
      {
        q: "Why won't corbina take my bait?",
        a: "Usually leader or weight. Drop your leader test, lengthen it, and use the lightest sinker that will stay put. After that, check your crab is fresh and hooked so it looks natural.",
      },
    ],
  },

  {
    slug: "striped-bass",
    name: "Striped bass",
    scientificName: "Morone saxatilis",
    description:
      "Stripers from the shore, on either coast. How to read structure and current, when to fish bait against lures, and the gear that actually holds up.",
    published: "2026-09-23",
    sections: [
      {
        body: [
          "Striped bass are the reason a lot of people fish from shore at night. They're big, they hunt in the wash, and a good one on a surf rod is about as much fun as shore fishing gets.",
          "They're an East Coast fish by origin and a West Coast fish by introduction, so the advice below holds on both coasts even though the seasons and the regulations do not.",
        ],
      },
      {
        heading: "Where do striped bass feed from shore?",
        body: [
          "Wherever current pushes bait into a place they can ambush it. Stripers are structure and current fish before they're anything else.",
          "That means rips, the edges of jetties and rock walls, river and creek mouths on a dropping tide, and the white water where waves break over a bar. On a featureless beach, look for the cut in the bar where water drains back out.",
          "The pattern is always the same: bait gets disorganised by moving water, and stripers sit where that happens.",
        ],
      },
      {
        heading: "Bait or lures for striped bass?",
        body: [
          "Both work and they suit different situations.",
          "Bait on a fish-finder rig is the approach for a beach at night with a big bait sitting still. Bunker, mackerel chunks, clams or a live eel depending on what's around. Big bait, big hook, and patience.",
          "Lures are for when you can see or hear fish working, or when you're covering a rip or a jetty and want to find them. Here we'll be honest again: our lure range is heavy on offshore trolling plugs and freshwater bass baits, not on the swimming plugs and bucktails that shore stripers are usually caught on. A coastal shop will serve you better for that.",
        ],
        products: ["circle-hook-7-0", "sinker-slide-boss"],
      },
      {
        heading: "What hook size for striped bass?",
        body: [
          "Big, and circle rather than J where you can. A 6/0 to 8/0 circle handles a chunk of bunker or a whole mackerel fillet, and a circle hooks a striper in the jaw corner almost every time, which matters because plenty of them get released.",
          "Don't strike a circle hook. Let the rod load and start winding. Striking pulls it straight out of the fish's mouth, which is the single most common way beginners lose them.",
        ],
        products: ["circle-hook-7-0", "circle-hook-8-0"],
      },
      {
        heading: "What gear holds up for shore stripers?",
        body: [
          "The heaviest end of what we sell, and honestly the edge of it.",
          "A ten or eleven foot rod for a beach, or seven to eight feet on a jetty where a long rod is a liability. Thirty pound mono or braid. A leader of thirty to fifty pound fluorocarbon, because a big striper in rocks will test everything.",
          "The gap we can't fill is the reel. Every spinning reel either of our suppliers stocks tops out at size 3000, and a serious striper angler on the East Coast is usually running a 5000 or larger with a sealed saltwater drag. A 3000 will land fish, and it will also wear out faster doing it. We'd rather you knew.",
        ],
        products: ["daiwa-ft-surf-11", "abu-max-pro-3000", "vicious-mono-30"],
      },
      {
        heading: "Why fish for stripers at night?",
        body: [
          "Because they feed then, and because they come shallower in the dark than they ever will in daylight.",
          "Fish you'd need a long cast to reach at noon will be in the first wave at midnight. That changes the gear too: a shorter rod is fine, and a high visibility line is genuinely useful when you can't see anything.",
          "Night fishing means a head torch is the most important thing in your bag, and we don't currently stock one. Buy a decent rechargeable one with a red mode before you go.",
        ],
        products: ["stren-hivis-25"],
      },
    ],
    setup: [
      { part: "Rod", choice: "10 to 11 ft on a beach, 7 to 8 ft on a jetty", productKey: "daiwa-ft-surf-11" },
      { part: "Reel", choice: "3000, the largest we can get", productKey: "abu-max-pro-3000" },
      { part: "Line", choice: "30 lb mono, or 30 lb braid", productKey: "vicious-mono-30" },
      { part: "Leader", choice: "20 lb plus fluorocarbon, heavier around rock", productKey: "floroclear-20" },
      { part: "Hook", choice: "7/0 circle for chunk bait", productKey: "circle-hook-7-0" },
      { part: "Weight", choice: "4 to 8 oz depending on current", productKey: "bank-sinker-6oz" },
      { part: "Rig", choice: "Heavy sinker slide, not the light one", productKey: "sinker-slide-boss" },
      { part: "Light", choice: "Rechargeable head torch with a red mode", weDontStock: "Neither of our suppliers carries a headlamp worth selling. Buy one elsewhere before you fish at night." },
      { part: "Pliers", choice: "For unhooking in the dark", productKey: "pliers" },
    ],
    faqs: [
      {
        q: "What's the best tide for striped bass from shore?",
        a: "Moving water, and usually the two hours either side of a tide change. A dropping tide draining a creek or a bay mouth concentrates bait and is a classic window.",
      },
      {
        q: "Should I use a circle hook for stripers?",
        a: "Yes for bait, and in some places it's required rather than optional. Circles hook in the jaw corner, which means a released fish swims off in better shape. Check whether your state mandates them.",
      },
      {
        q: "Can I catch stripers on the same gear I use for surfperch?",
        a: "You can start there, but a perch setup is light for a big striper. Move up to 30 lb line and a 7/0 hook before you go looking for a serious fish.",
      },
    ],
  },
];

// ── lookups ──────────────────────────────────────────────────────────────────

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getSpecies(slug: string): Species | undefined {
  return SPECIES.find((s) => s.slug === slug);
}

/**
 * Resolve the product keys referenced by a section.
 *
 * Silently drops anything that doesn't exist or isn't currently sourced, so a
 * guide can never advertise a product the checkout would refuse. Use
 * validateEditorial() to find those references before they ship.
 */
export function sectionProducts(section: Section): Product[] {
  return (section.products ?? [])
    .map(getProduct)
    .filter((p): p is Product => Boolean(p) && isSourced(p!));
}

/**
 * Every reference in every guide and species page, checked.
 *
 * Run by schema.test.ts. Editorial content that links to a product we removed
 * is the exact failure mode that put fabricated gear on USTideCharts for
 * months — this is the check that would have caught it.
 */
export function validateEditorial(): string[] {
  const problems: string[] = [];
  const slugs = new Set(CATEGORIES.map((c) => c.slug));

  const checkSections = (where: string, sections: Section[]) => {
    for (const s of sections) {
      for (const key of s.products ?? []) {
        const p = getProduct(key);
        if (!p) problems.push(`${where}: product "${key}" does not exist`);
        else if (!isSourced(p)) problems.push(`${where}: product "${key}" is not sourced`);
      }
      if (s.table && s.table.rows.some((r) => r.length !== s.table!.head.length)) {
        problems.push(`${where}: a table row does not match its header width`);
      }
    }
  };

  const seenGuide = new Set<string>();
  for (const g of GUIDES) {
    if (seenGuide.has(g.slug)) problems.push(`duplicate guide slug "${g.slug}"`);
    seenGuide.add(g.slug);
    checkSections(`guide/${g.slug}`, g.sections);
    for (const r of g.related ?? []) {
      if (!GUIDES.some((x) => x.slug === r)) problems.push(`guide/${g.slug}: related "${r}" not found`);
    }
  }

  const seenSpecies = new Set<string>();
  for (const sp of SPECIES) {
    if (seenSpecies.has(sp.slug)) problems.push(`duplicate species slug "${sp.slug}"`);
    seenSpecies.add(sp.slug);
    checkSections(`species/${sp.slug}`, sp.sections);
    for (const row of sp.setup ?? []) {
      if (row.productKey) {
        const p = getProduct(row.productKey);
        if (!p) problems.push(`species/${sp.slug}: setup product "${row.productKey}" does not exist`);
        else if (!isSourced(p)) problems.push(`species/${sp.slug}: setup product "${row.productKey}" is not sourced`);
      }
      if (row.collectionSlug && !slugs.has(row.collectionSlug)) {
        problems.push(`species/${sp.slug}: setup collection "${row.collectionSlug}" does not exist`);
      }
      if (!row.productKey && !row.collectionSlug && !row.weDontStock) {
        problems.push(`species/${sp.slug}: setup row "${row.part}" points at nothing and says nothing`);
      }
    }
  }
  return problems;
}
