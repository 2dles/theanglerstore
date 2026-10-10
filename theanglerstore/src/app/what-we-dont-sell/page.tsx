import Link from "next/link";
import { Prose, Section } from "@/components/Prose";

/**
 * The gaps, named.
 *
 * Every other tackle shop's site is a list of what they have. This is the list
 * of what they don't, which is the more useful page if you're the one standing
 * on a beach deciding what to buy. It exists because our own guides already
 * send people elsewhere for pyramid sinkers, and a reader who finds that out
 * halfway down a guide deserves to find it in one place instead.
 *
 * Rules for this page: every gap states the real reason, and names somewhere
 * that does carry it. No hedging, no "coming soon" on things that are not
 * coming soon. If a gap closes, the entry comes out.
 */
export const metadata = {
  title: { absolute: "What We Don't Sell, and Where to Get It | TheAnglerStore" },
  description:
    "The gear we can't supply, why, and who does carry it. Pyramid sinkers, reels above a 3000, PENN and Shimano, headlamps.",
  alternates: { canonical: "/what-we-dont-sell" },
};

export default function WhatWeDontSellPage() {
  return (
    <Prose
      title="What we don't sell"
      intro="Four things people ask us for that we can't supply, the real reason for each, and where to buy them instead."
    >
      <Section heading="Why publish this at all?">
        <p>
          Because you'll find out anyway, and finding out after the order is
          worse. We're a two-supplier dropship operation, which means our
          catalogue is the intersection of what two distributors happen to
          carry. That intersection has holes in it, and some of them are in
          places a surf angler will notice.
        </p>
        <p>
          Our sinker guide already tells people that pyramids hold better than
          the bank sinkers we stock and to buy them elsewhere. This is that
          paragraph, generalised.
        </p>
      </Section>

      <Section heading="Pyramid and sputnik sinkers">
        <p>
          <strong>The gap:</strong> we don't have them in any size. Checked
          twice across both distributors, against machine-readable inventory
          rather than a category menu.
        </p>
        <p>
          <strong>Why:</strong> one supplier is a marine and boat-outfitting
          distributor whose catalogue has no sinker category at all. The other
          is a freshwater tackle house with 164 sinkers in stock across bank,
          egg, split shot, pinch-on, drop shot, tungsten and Carolina shapes,
          and no pyramid among them. The houses that do carry pyramids all
          require either a physical retail storefront or that we hold our own
          inventory, and we have neither.
        </p>
        <p>
          <strong>What we'd tell you to do:</strong> a pyramid digs into sand
          and holds against a sweep in a way a bank sinker doesn't. If you fish
          a beach with real lateral current, buy pyramids. Any coastal tackle
          shop has them for a couple of dollars. Our{" "}
          <Link href="/collections/terminal-tackle" className="text-tide hover:text-teal">
            bank sinkers
          </Link>{" "}
          in 3 to 8 oz are the honest substitute and they hold fine off a pier
          or in calm surf.
        </p>
      </Section>

      <Section heading="Spinning reels above a size 3000">
        <p>
          <strong>The gap:</strong> every spinning reel we stock is a 3000 or
          smaller, and every one is rated by its own manufacturer for
          freshwater.
        </p>
        <p>
          <strong>Why:</strong> we read every spinning reel our tackle house
          carries. The sizes run from 750 up to 3000 and stop. The marine
          distributor stocks two reels in total. There is no 4000 or 5000
          available to us at any price.
        </p>
        <p>
          <strong>What we'd tell you to do:</strong> a 3000 will fish surf
          perfectly well if you rinse it in fresh water after every trip, and
          plenty of people fish nothing else. But if you're pairing it with a
          10 or 11 foot rod and throwing six ounces, you want the line capacity
          and drag of a 4000 or 5000 with a sealed body, and you should buy
          that from a coastal shop. Our{" "}
          <Link href="/collections/combos" className="text-tide hover:text-teal">
            Daiwa D-Wave combos
          </Link>{" "}
          arrive as a matched saltwater rod and reel, which sidesteps the
          problem for a first setup.
        </p>
      </Section>

      <Section heading="PENN, Shimano, Ugly Stik and Shakespeare">
        <p>
          <strong>The gap:</strong> none of these brands, in any product.
        </p>
        <p>
          <strong>Why:</strong> two different reasons. PENN, Abu Garcia and
          Pflueger sit behind a Pure Fishing reseller authorisation at our
          marine distributor, and that application states plainly that a
          physical store is required to buy their products. We're online only,
          so that route is closed. Shimano and Ugly Stik are a simpler story:
          neither distributor carries them at all.
        </p>
        <p>
          <strong>What we'd tell you to do:</strong> we do sell Daiwa, Abu
          Garcia, Okuma and Pflueger through our tackle house, so the brand
          gap is narrower than it looks. For PENN specifically, buy direct or
          from a shop with a storefront.
        </p>
      </Section>

      <Section heading="Headlamps">
        <p>
          <strong>The gap:</strong> no head torch of any kind.
        </p>
        <p>
          <strong>Why:</strong> our tackle house stocks two glow sticks and no
          headlamps. The marine distributor has exactly one, at a dealer cost
          above its own retail price, which isn't a product so much as a
          rounding error.
        </p>
        <p>
          <strong>What we'd tell you to do:</strong> buy one before you fish at
          night, because it's the most important thing in the bag and we can't
          help you with it. Get something rechargeable with a red mode, so you
          keep your night vision and don't light up the water in front of you.
          Any outdoor shop. Twenty to forty dollars.
        </p>
      </Section>

      <Section heading="Things we deliberately don't do">
        <p>
          Separate from supply, there are a few things you won't find here
          because we chose not to.
        </p>
        <p>
          There are <strong>no reviews, ratings or testimonials</strong> on this
          site. Not because nobody likes the gear, but because we haven't sold
          enough of it to have real ones, and seeding fake reviews is the
          fastest way to make everything else we say worthless.
        </p>
        <p>
          <strong>Product specifications are the manufacturer's own.</strong> We
          don't write our own numbers for casting weights, line ratings or
          drag figures. If a spec isn't on a product page, it's because the
          manufacturer doesn't publish it.
        </p>
        <p>
          We <strong>don't discount branded rods and reels</strong>. Our margin
          on them doesn't allow it, and pretending otherwise would be a lie you
          could check in thirty seconds. Terminal tackle is priced at or below
          manufacturer suggested retail.
        </p>
      </Section>
    </Prose>
  );
}
