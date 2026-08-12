// Per-product walkthroughs.
//
// Every product gets a real "how to actually use this" guide. Three reasons
// this earns its place rather than padding the page:
//
//   1. It reduces returns. Most tackle returns are "it didn't work" when what
//      happened is it was rigged wrong or fished at the wrong stage of tide.
//   2. It is the content the SEO strategy calls for — informational,
//      long-tail, and it links naturally back to the tide site.
//   3. It is the thing a good tackle shop does and a marketplace listing
//      cannot. It's the whole argument for buying here instead of Amazon.
//
// Written to be genuinely useful to someone standing on a beach at 5am, not
// to hit a word count.

export interface Walkthrough {
  /** One line under the heading. */
  intro: string;
  steps: { heading: string; body: string }[];
  /** Short, punchy, skimmable. */
  tips: string[];
  /** The tide/conditions link back to USTideCharts. */
  timing: string;
}

export const WALKTHROUGHS: Record<string, Walkthrough> = {
  "surf-rod": {
    intro:
      "A surf rod is only as good as the way it's set up. The reels we stock are freshwater models, so for surf work assume the reel is your own — a 5000–8000 size spinning reel with sealed bearings is the right pairing for this blank. Twenty minutes at the kitchen table saves you a wasted session.",
    steps: [
      {
        heading: "Spool it properly",
        body: "Put 30 lb braid straight onto the spool — on a 5000–8000 size spinning reel you won't need mono backing if you're filling it. Run the line through the first guide before you start winding, keep firm tension with a cloth, and stop about 1/8\" below the spool lip. Overfilling is the single most common cause of wind knots on a surf reel.",
      },
      {
        heading: "Join the two pieces correctly",
        body: "Line up the guides by eye before you push the ferrule together, then seat it firmly with a slight twist. Guides that are even a few degrees out of line will cost you distance and wear a groove in your braid. Check the alignment again after every few casts on the first trip — ferrules settle.",
      },
      {
        heading: "Add a shock leader",
        body: "With 3–4 oz of lead and a full cast, braid alone will crack off and send a sinker down the beach. Tie about 25 feet of 50 lb mono or fluoro to your braid with an FG or double-uni knot — enough that you have five or six turns on the spool at the start of the cast.",
      },
      {
        heading: "Set the drag before you cast, not after",
        body: "Roughly a third of your line's breaking strain. Pull line off the spool by hand — it should come steadily, not in jerks. A drag set too tight is how you break a rod tip on a surprise run.",
      },
      {
        heading: "Cast with your body, not your arms",
        body: "Let the sinker hang about 3–4 feet below the tip. Rotate your hips and shoulders through the cast rather than punching with your arms. A smooth pendulum beats brute force every time, and this rod loads properly with bait — you don't need to muscle it.",
      },
    ],
    tips: [
      "Rinse the reel with a light freshwater spray after every session — never a pressure hose, which drives salt past the seals",
      "Back the drag off completely when you store it, so the washers don't take a set",
      "Two-piece means you can leave it made up in the truck; break it down for long storage",
    ],
    timing:
      "Best on a moving tide, particularly the two hours either side of high water on an open beach. Check your local window before you commit to the drive.",
  },

  "inshore-combo": {
    intro:
      "A 7-foot medium is the most versatile thing you can own on this coast. Here's how to get the most out of it.",
    steps: [
      {
        heading: "Match line to the water",
        body: "15–20 lb braid is the sweet spot for this reel. Bays and harbors are cleaner than open beach, so you can drop lighter and cast further. Add a 3–4 foot fluorocarbon leader — clear inshore water is exactly where leader visibility costs you bites.",
      },
      {
        heading: "Learn the 6.2:1 retrieve",
        body: "This reel picks up about 37 inches per crank. That speed is a tool, not a default. Burn it to cover water and find fish; slow it right down once you've found them. On halibut, the take often happens on the pause, so build pauses in deliberately.",
      },
      {
        heading: "Rig a swimbait right",
        body: "Thread the bait onto the jighead so the body sits perfectly straight — any curve makes it spin and it'll be ignored. The hook point should exit through the top of the bait, not the side. Sink your thumbnail into the plastic where the hook exits so it seats flush.",
      },
      {
        heading: "Work the structure edges",
        body: "Cast parallel to a jetty or eelgrass edge rather than straight at it. Your bait stays in the productive zone for the whole retrieve instead of crossing it once. Fish sit on the edge, not in the open.",
      },
      {
        heading: "Fight fish with the rod, not the reel",
        body: "Keep the rod at 45° and let the blank absorb the runs. Only reel when the rod is coming down. Winding against a running fish just twists your line and loosens the hook hold.",
      },
    ],
    tips: [
      "Two-piece breaks down to about 45\" — it fits a kayak hatch and most car boots made up",
      "Cork grips clean up with warm soapy water and a light scrub; don't varnish them",
      "On a jetty, keep the drag slightly lighter than you think — barnacles cut line under load",
    ],
    timing:
      "Moving water is everything inshore. An outgoing tide pulling bait out of a bay is the classic window, and the last two hours of the ebb often outfish the whole rest of the day.",
  },

  "braided-line": {
    intro:
      "Braid is the highest-leverage upgrade in fishing, and it's also the easiest to get wrong. Five minutes of care here pays off all season.",
    steps: [
      {
        heading: "Spool under real tension",
        body: "Run the line through a damp cloth held in your off hand as you wind. Braid has no stretch, so slack coils bed down into the spool under load and cause a locked-up cast three trips later. This step is not optional with braid the way it nearly is with mono.",
      },
      {
        heading: "Stop a fingernail below the lip",
        body: "Braid is thin and limp, so an overfilled spool sheds loops the moment tension drops. About 1/8\" below the spool lip. If you have line left over, keep it — you'll want it for a top-up mid-season.",
      },
      {
        heading: "Tie the right knots",
        body: "Braid slips in knots designed for mono. Use a Palomar to terminal tackle, and an FG knot or double-uni to join it to leader. Wet every knot before you cinch it — friction burn genuinely weakens braid, and you'll never see the damage.",
      },
      {
        heading: "Always run a leader",
        body: "Braid is opaque, has zero stretch, and cuts on structure. A few feet of fluorocarbon fixes all three: invisibility for spooky fish, a little shock absorption on the strike, and abrasion resistance where it matters.",
      },
      {
        heading: "Reverse it when it fades",
        body: "You'll only ever use the top 100 yards or so. When that section is worn or faded, strip it off, reverse the spool, and you have a fresh 200 yards. That's effectively three seasons from one purchase.",
      },
    ],
    tips: [
      "Never set a hook with braid the way you would with mono — no stretch means a hard strike pulls hooks straight out",
      "Cut braid with carbide cutters or dedicated braid scissors; ordinary nail clippers just crush and fray it",
      "If you get a wind knot, stop immediately. Picking it out takes two minutes; casting through it costs you the spool.",
    ],
    timing:
      "Nothing tide-specific, but braid's zero stretch is most valuable in deep water or long casts — exactly where a subtle bite at distance would otherwise go unnoticed.",
  },

  "fluoro-leader": {
    intro:
      "Fluorocarbon is the quietest upgrade in the box. Nobody sees it working, which is the entire point.",
    steps: [
      {
        heading: "Pick your length by clarity",
        body: "Two to three feet in stirred-up surf, six to eight feet in clear bay water on a bright day. The dirtier the water, the less it matters; the clearer the water, the more it's the difference between a follow and a bite.",
      },
      {
        heading: "Tie the braid-to-leader connection",
        body: "The FG knot is the best — thin enough to pass through guides on the cast and stronger than the line around it. If you can't tie one in the dark yet, a double-uni is perfectly good and far easier. Practice at home, not on the beach.",
      },
      {
        heading: "Wet it and cinch slowly",
        body: "Fluorocarbon is stiffer than mono and it heats up fast under friction. Wet the knot, pull it down slowly and steadily, then check it by pulling hard against the rod. Better it fails in your hands than on the fish.",
      },
      {
        heading: "Check it after every fish",
        body: "Run the leader through your fingers. Any roughness or nicks and you re-tie — it costs two minutes. Fluorocarbon is abrasion-resistant, not abrasion-proof, and a nicked leader always fails on the best fish of the day.",
      },
      {
        heading: "Use the sink to your advantage",
        body: "Fluoro sinks and mono floats. On a Carolina rig or a jighead that keeps your bait pinned in the strike zone rather than lifting it. On topwater, that same property works against you — use mono there instead.",
      },
    ],
    tips: [
      "50 yards is roughly 25 surf leaders — a full season for most people",
      "Store the spool out of sunlight; UV degrades fluorocarbon over time",
      "Step up a size if you're fishing structure. 15 lb is fine on sand; go heavier around rock",
    ],
    timing:
      "Matters most in bright sun and clear water — midday low tide on a calm day is when fluorocarbon earns its money.",
  },

  "circle-hooks": {
    intro:
      "Circle hooks work brilliantly and fail completely, depending entirely on whether you can stop yourself striking.",
    steps: [
      {
        heading: "Do not set the hook",
        body: "This is the whole thing. When you feel the bite, lower the rod slightly, then wind steadily until the line comes tight and the rod loads. The hook slides to the corner of the mouth and turns. Strike like you would with a J-hook and you'll pull it straight out.",
      },
      {
        heading: "Hook the bait shallow",
        body: "The hook gap has to stay clear for the circle to rotate. Nick the bait once through the edge — never bury the point or thread the bait up the shank. A buried point on a circle hook catches nothing.",
      },
      {
        heading: "Match hook size to bait, not to fish",
        body: "The bait should sit comfortably in the gap. Too large and small fish can't get it in; too small and it won't rotate to the corner. 2/0–3/0 for perch and croaker, 5/0 for corbina and small striper, 7/0 and up for drum and bigger.",
      },
      {
        heading: "Fish with the rod in a holder",
        body: "This is where circle hooks come into their own. In a sand spike with the drag light, the fish hooks itself while you're pouring coffee. It's also why they're mandated in a lot of fisheries — hookups are almost always in the jaw.",
      },
      {
        heading: "Unhook and release cleanly",
        body: "Corner-of-the-mouth means you can usually back the hook out with pliers in seconds and never touch the fish's gills. Keep it in the water if you can, support it upright until it kicks off under its own power.",
      },
    ],
    tips: [
      "Non-offset is legal in more places and honestly works better — offset points can foul-hook",
      "Rinse hooks in fresh water and dry them before they go back in the box; black nickel is a coating, not immunity",
      "Check local regulations — circle hooks are required for some species in some states",
    ],
    timing:
      "Any bait fishing, but they shine when you're fishing two rods and can't watch both. Set them out on a rising tide and let them work.",
  },

  "carolina-kit": {
    intro:
      "The Carolina rig is the most reliable bait presentation in the surf, because it does two things at once: it holds bottom and it lets the bait move naturally.",
    steps: [
      {
        heading: "Understand what the rig does",
        body: "The weight sits on the bottom and stays there. The bait, on a leader behind it, drifts and waves in the current above the sand. That separation is why it outfishes a fixed weight — the fish feels no resistance when it picks the bait up.",
      },
      {
        heading: "Attach it to your main line",
        body: "Tie your shock leader (or main line) directly to the top swivel with a Palomar. The rig arrives ready — you're adding one knot and nothing else. Check the swivel spins freely before you cast.",
      },
      {
        heading: "Bait it for the target",
        body: "Sand crab or mole crab for corbina and perch. Cut anchovy or squid for croaker and rays. Bloodworm where you can get it. Hook it shallow so the circle hook can rotate — the same rule as the hooks themselves.",
      },
      {
        heading: "Cast, then let it settle",
        body: "Cast, let the weight hit bottom, then wind down until the line is just tight — no slack, no drag on the weight. Put the rod in a spike or hold it with a light drag. Now wait. The rig fishes itself.",
      },
      {
        heading: "Read the rod tip",
        body: "A tap-tap is a small fish or a crab. A slow steady pull that keeps going is what you want — that's a fish that's turned away with the bait. Wind down into it steadily; the circle hook does the rest.",
      },
    ],
    tips: [
      "Reposition every 15–20 minutes if nothing happens — a surf trough is a moving target",
      "Heavier weight in a strong sideways current; you want it to hold, not roll",
      "The cable leader version is for toothy fish; the fluoro version for clear water and spooky ones",
    ],
    timing:
      "Classic surf bait fishing, best on a pushing tide into a trough. The two hours before high water is the reliable window on most beaches.",
  },

  "swimbait-kit": {
    intro:
      "Soft plastics catch fish when they're rigged straight and retrieved at the right speed. Almost every blank session with swimbaits comes down to one of those two.",
    steps: [
      {
        heading: "Rig it dead straight",
        body: "Thread the bait onto the jighead so the body runs perfectly in line with the hook shank. Hold it against the hook first to see where the point should exit, then thread it on. A bait rigged with even a slight curve will helicopter, twist your line, and get refused.",
      },
      {
        heading: "Match size to what's in the water",
        body: "2.5\" for surfperch and picky fish, 4\" when there's real bait around and you want a bigger profile. If you're seeing small bait flicking in the shallows, go small. Match the hatch is a cliché because it works.",
      },
      {
        heading: "Choose the head weight for the conditions",
        body: "Just heavy enough to reach bottom and stay in touch, and no heavier. In calm bay water 1/4 oz is plenty; in surf or current step up to 1/2 or 3/4. Too heavy and you plough the bottom; too light and you never feel it.",
      },
      {
        heading: "Retrieve slow, with pauses",
        body: "Cast, let it sink to the bottom, then a slow steady wind with a pause every few turns. ElaZtech floats, so on the pause the tail stands up off the sand — that's exactly what a halibut lying in the sand is looking at. Most takes come on the pause or the first turn after it.",
      },
      {
        heading: "Fish the whole retrieve",
        body: "Don't lift out early. Halibut and calico frequently follow a bait all the way in and eat it at your feet. Slow down as it approaches the shore break rather than speeding up.",
      },
    ],
    tips: [
      "ElaZtech is far tougher than standard plastic — one bait often survives several fish",
      "Don't store ElaZtech in the same compartment as ordinary soft plastics; they react and both melt",
      "Pearl and smelt patterns for clear water, darker patterns when it's stirred up",
    ],
    timing:
      "Moving water, and the low-light hours either end of the day. A moving tide over an eelgrass flat at dawn is as good as it gets for halibut.",
  },

  "jig-assort": {
    intro:
      "Bucktail is the oldest lure that still works, and it works because hair moves in a way silicone never has.",
    steps: [
      {
        heading: "Pick the weight for the current, not the depth",
        body: "You want the lightest jig that still keeps contact with the bottom. 1 oz in calm conditions, 2 oz in moderate current, 3 oz when it's really running or you need distance. If you can't feel the bottom, go heavier; if it's pinned there, go lighter.",
      },
      {
        heading: "Add a trailer if you like",
        body: "A bucktail works bare, but a soft plastic trailer on the hook adds profile and a bit of scent. A 4\" paddle tail from the swimbait kit is a natural pairing. Don't overdo the length — it can foul the hook gap.",
      },
      {
        heading: "Hop it along the bottom",
        body: "Cast out, let it hit the bottom, then lift the rod tip sharply and let it fall on a semi-slack line. Wind up the slack, repeat. The hair breathes and pulses on the drop, and that fall is when nearly every take happens.",
      },
      {
        heading: "Stay in contact on the fall",
        body: "Semi-slack, not fully slack. You want to feel the jig land. If the line goes slack early or twitches sideways, a fish has it — wind down and lean into it rather than striking hard.",
      },
      {
        heading: "Work current seams and structure",
        body: "Cast up-current and let the jig swing down naturally with the flow. Fish sit on the edge where fast water meets slow, waiting for food to be delivered. Let the current do the work rather than fighting it.",
      },
    ],
    tips: [
      "Trokar points are extremely sharp — check them against a thumbnail regularly and touch up or replace",
      "Rinse and dry the hair after use, then fluff it out; matted bucktail loses most of its action",
      "⚠️ Contains lead. Wash your hands after handling, and keep them away from children.",
    ],
    timing:
      "Best on strong moving water. An outgoing tide through a channel or along a jetty is prime bucktail water.",
  },

  "landing-net": {
    intro:
      "A net is the last five seconds of the fight, and it's where most good fish are lost.",
    steps: [
      {
        heading: "Set it up before you need it",
        body: "Extend the handle and open the hoop before you start fishing, not while a fish is thrashing at your feet. Have it within arm's reach and know exactly where it is without looking.",
      },
      {
        heading: "Let the fish tire first",
        body: "The most common mistake is netting too early. A green fish makes one more run at the net and either breaks off or bounces out. Wait until it's turning on its side and coming in without pulling.",
      },
      {
        heading: "Net head-first, always",
        body: "Sink the hoop, lead the fish over it head-first, then lift. Fish swim forwards — chase one from behind and it accelerates away every time. Move the fish to the net, not the net to the fish.",
      },
      {
        heading: "Lift with the frame vertical",
        body: "Once the fish is in, lift smoothly and let the bag take the weight. Don't scoop sideways at the surface — that's how frames bend and fish escape over the rim.",
      },
      {
        heading: "Handle and release",
        body: "Keep the fish in the mesh and in the water while you unhook it. Rubber mesh doesn't strip the slime coat and hooks pull free instead of tangling. Support the fish upright until it swims off under its own power.",
      },
    ],
    tips: [
      "Wet the mesh before the first fish — dry mesh is far harsher on a fish you intend to release",
      "Rinse in fresh water and hang it to dry; a folded wet net grows mildew fast",
      "Check the handle lock periodically. It's the part that fails on every folding net eventually.",
    ],
    timing:
      "Any time you can't slide a fish up a beach — jetties, kayaks, harbor walls, and anywhere with a drop between you and the water.",
  },

  "sand-spike": {
    intro:
      "Sand spikes are the least interesting item you'll buy and one of the most useful. They turn one rod into a spread.",
    steps: [
      {
        heading: "Wet the sand first",
        body: "Push the spike into damp, compacted sand rather than the dry stuff above the tide line. Dry sand won't hold a loaded rod. If you're above the wash, pour a bottle of seawater into the hole first.",
      },
      {
        heading: "Drive it deep and angled",
        body: "At least a third of its length into the sand, angled slightly back away from the water. That angle means a fish loading the tip pulls the spike deeper rather than levering it out.",
      },
      {
        heading: "Set the rods high",
        body: "Butt down, tip up and angled away from the wash. A high tip keeps more line out of the breaking waves, which means less drag pulling your weight along the beach and a much clearer view of a bite.",
      },
      {
        heading: "Set drag light and let the fish hook itself",
        body: "This is the point of the setup. Light drag plus a circle hook means the fish takes the bait, turns, and hooks itself against the rod. Just don't set the drag so light that a wave pulls line.",
      },
      {
        heading: "Space your spread",
        body: "Two rods, ten to fifteen feet apart, fishing different distances — one in the near trough, one further out. You're finding the depth the fish are working, and doubling your chances of finding it fast.",
      },
    ],
    tips: [
      "Push them in before you rig up, so you have somewhere to put a rod while your hands are busy",
      "Mark them with reflective tape or a glow band — they're genuinely hard to find in the dark",
      "Rinse the sand out before they go in the truck; grit gets everywhere",
    ],
    timing:
      "Bait fishing an open beach, especially on a pushing tide when you want two baits out at different distances.",
  },

  pliers: {
    intro:
      "Pliers are the tool you use more than any other and think about least. A few habits make them last years instead of one season.",
    steps: [
      {
        heading: "Wear them, don't pack them",
        body: "Sheath on your belt, lanyard clipped to a belt loop. Pliers in a bag are pliers you don't use, and pliers not clipped to anything are pliers at the bottom of the harbor. The lanyard is not optional on a jetty.",
      },
      {
        heading: "Use the right part of the jaw",
        body: "The tip for hook removal in tight spots, the flat mid-section for crimping sleeves, the carbide cutters at the base for line. Cutting braid with the tip will dull it fast and eventually damage the jaw alignment.",
      },
      {
        heading: "Remove hooks by backing them out",
        body: "Grip the hook shank, not the bend, and push back along the path the point went in. Never rip it sideways. With a circle hook in the corner of the mouth this is usually one movement and a couple of seconds.",
      },
      {
        heading: "Open split rings properly",
        body: "The notched tip slides between the coils. Twist slightly to open a gap, slide the new ring or hook on, then release. Don't lever the coils apart — that deforms the ring and it never closes properly again.",
      },
      {
        heading: "Rinse and oil",
        body: "Fresh water after every salt session, dry them, then a drop of light oil on the pivot. Aluminum doesn't rust, but the stainless jaws and the spring will if you let salt sit in the joint.",
      },
    ],
    tips: [
      "Carbide cutters go through 80 lb braid cleanly — if they're crushing rather than slicing, it's time to replace the inserts",
      "The knot-cinch hole gives you something to pull against without cutting your hands on braid",
      "Keep the sheath rinsed too; salt trapped in the fabric will corrode the jaws that sit in it",
    ],
    timing:
      "Every session. This is a buy-once item that lives in your kit permanently.",
  },

  "tackle-bag": {
    intro:
      "A bag is an organizational system, not a container. How you pack it decides whether you fish or rummage.",
    steps: [
      {
        heading: "One tray, one job",
        body: "Terminal tackle in one, lures in another, leader and line in a third. Don't mix. At 5am in the dark you want to reach for a tray by feel and know what's in it without looking.",
      },
      {
        heading: "Heaviest at the bottom, closest to your back",
        body: "Standard pack-loading principle and it matters over a mile of soft sand. Weight high or far from your spine is what makes a bag feel twice as heavy as it is.",
      },
      {
        heading: "Use the molded base",
        body: "The waterproof base is why this bag suits surf fishing. Put it down on wet sand without a second thought — that's what it's for. A soft-bottomed bag wicks salt water straight up into your trays and rusts everything inside.",
      },
      {
        heading: "Front pockets for what you need constantly",
        body: "Pliers, headlamp, leader spool, scissors. If you reach for it more than twice a session it should not be inside the main compartment. This is the difference between a bag that works and one that annoys you.",
      },
      {
        heading: "Empty and dry it after every trip",
        body: "Take the trays out, tip out the sand, leave it open to dry. Ten minutes. Salt left in a closed bag corrodes every hook you own and the zips seize by mid-season.",
      },
    ],
    tips: [
      "Keep a spare leader spool and a few pre-tied rigs permanently in the bag — you'll need them at the worst moment",
      "Chest and waist straps aren't decoration; do them up for a long walk in",
      "A small dry bag inside for phone and keys costs nothing and saves a very bad day",
    ],
    timing:
      "Long walks to the spot, multi-rod sessions, and any trip where you're carrying everything you own down a beach.",
  },

  cooler: {
    intro:
      "A cooler keeps fish good to eat. Most people get half the performance available to them because of how they pack it.",
    steps: [
      {
        heading: "Pre-chill it the night before",
        body: "Put a sacrificial bag of ice in the empty cooler overnight and pour it out in the morning. A warm cooler spends its first two hours melting ice just to cool its own walls. This single step buys you most of a day.",
      },
      {
        heading: "Use more ice than feels reasonable",
        body: "Roughly two parts ice to one part contents by volume. Block ice lasts far longer than cubes; a mix of both is ideal — blocks for duration, cubes to fill air gaps. Air is what kills ice retention.",
      },
      {
        heading: "Bleed and chill fish immediately",
        body: "Cut the gills and let the fish bleed out in the water for a minute, then straight into the ice. The quality difference between a fish iced immediately and one that sat in a bucket for an hour is enormous — this matters far more than the cooler itself.",
      },
      {
        heading: "Keep the meltwater",
        body: "Counterintuitive but correct. Ice water is a better conductor than air, so draining it makes the remaining ice melt faster. Only drain if you need the space or the fish are sitting in it too long.",
      },
      {
        heading: "Open it as little as possible",
        body: "Every opening dumps the cold air and replaces it with warm. Decide what you need before you unzip. If you're taking drinks all day, bring a separate small cooler for those and keep the fish cooler shut.",
      },
    ],
    tips: [
      "Store it open at home so it doesn't grow mildew — the leakproof zip seals in damp as well as cold",
      "A wet towel over the top in direct sun makes a genuine difference through evaporation",
      "Rinse the zip with fresh water and lubricate it occasionally; the zip is the part that fails on any soft cooler",
    ],
    timing:
      "Any session where you're keeping fish, and any hot day. Long summer sessions on an exposed beach are where pre-chilling really shows.",
  },

  headlamp: {
    intro:
      "The point of a good headlamp isn't brightness. It's keeping your night vision while you tie a knot in the dark.",
    steps: [
      {
        heading: "Charge it fully before the trip",
        body: "USB-C, about an hour from empty. Get in the habit of putting it on charge when you unpack, not when you're leaving. A dead headlamp turns a dawn session into a stumble down a dark beach.",
      },
      {
        heading: "Start in red and stay there",
        body: "Press and hold for 1.5 seconds to go straight to red without cycling through white. Red preserves your night vision — after about 20 minutes in the dark your eyes are properly adapted, and one flash of white resets that completely.",
      },
      {
        heading: "Angle it down",
        body: "Tilt the housing so the beam lands a few feet in front of you, not out at eye level. You'll see the ground better and you won't blind everyone else on the beach, which matters more than you'd think on a busy jetty.",
      },
      {
        heading: "Save white for real tasks",
        body: "Unhooking a fish, finding something dropped in the sand, walking a rocky section. Then straight back to red. White light on the water in shallow conditions genuinely puts fish down — that's not folklore.",
      },
      {
        heading: "Rinse the strap, not the lamp",
        body: "IP66 handles spray and rain, not submersion. Rinse the headband in fresh water and wipe the housing. Make sure the USB-C port is properly closed and dry before charging.",
      },
    ],
    tips: [
      "40 hours of runtime is a season of dawn patrols for most people — but check it before a trip, not on the beach",
      "2.4 oz means it lives on a hat brim comfortably; keep it there rather than in the bag",
      "Carry a spare small light. Every headlamp fails eventually, always in the dark.",
    ],
    timing:
      "Dawn and dusk sessions, which are also the two most productive windows of most days. That's not a coincidence.",
  },
};

export function getWalkthrough(key: string): Walkthrough | undefined {
  return WALKTHROUGHS[key];
}
