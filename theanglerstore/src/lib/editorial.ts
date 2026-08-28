import { CATEGORIES, getProduct, isSourced, type Product } from "@/lib/products";

/**
 * EDITORIAL CONTENT — GUIDES AND SPECIES PAGES.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT MAY BE WRITTEN HERE, AND WHAT MAY NOT
 *
 * Two independent audits found the same hole: the site answered 6 of the 100
 * questions anglers actually ask, and had nothing worth citing. Five guides
 * now fill part of that. SPECIES is still empty and the same rules apply to it
 * when it stops being.
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
// CONTENT. GUIDES is written; SPECIES is not yet. Rules are in the note above.
// ─────────────────────────────────────────────────────────────────────────────

export const GUIDES: Guide[] = [
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

export const SPECIES: Species[] = [];

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
