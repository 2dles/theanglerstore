import Link from "next/link";
import { Prose, Section } from "@/components/Prose";

export const metadata = {
  title: "About",
  description:
    "TheAnglerStore is the gear half of a two-site project. USTideCharts tells you when to fish; we sell what you fish with.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Prose
      title="About"
      intro="We are the gear half of a two-site project. USTideCharts tells you when to go. This is what you take with you."
    >
      <Section heading="Why this store exists">
        <p>
          USTideCharts started as a tool for one question: should I go fishing
          today, and when. It scores tide movement, time of day, moon phase,
          wind, and water temperature for every spot it covers, and tells you the
          best two-hour windows.
        </p>
        <p>
          The obvious next question is what to bring. That is this store. Every
          product page here connects back to conditions, what the gear is for,
          and when it earns its place in your bag.
        </p>
      </Section>

      <Section heading="How we pick products">
        <p>
          We are a small operation, so we do not pretend to carry everything.
          What we carry is chosen against a specific coastline: California surf
          and bays, where the fish are halibut, surfperch, corbina, calico, and
          spotted bay bass. Most of what we stock is chosen against that water.
          We also carry a freshwater bass and crappie range, and a Great Lakes
          trolling range, because our suppliers are strong there and plenty of
          you fish both, every product is tagged for the water it suits, so you
          can shop yours and ignore the rest.
        </p>
        <p>
          Two rules govern the catalog. First, anything we call saltwater gear
          has to meet salt-facing specs, sealed bearings, plated hooks,
          anodized aluminum. Untreated hardware fails in one season, and we
          will not sell it to you as something it isn&rsquo;t. Where a
          manufacturer publishes no saltwater rating, the product page says so
          and the item is tagged freshwater, however tempting it would be to
          stay quiet about it. Second,
          if we think a product is a bad buy, we say so on the page rather than
          quietly leaving it out. Most of the small items here carry a note
          telling you <em>not</em> to buy them on their own, they cost nearly as
          much to ship as they do to make, and they only earn their price riding
          along in a bigger box. And our{" "}
          <Link href="/collections/coolers" className="text-tide hover:text-teal">
            coolers page
          </Link>{" "}
          explains why we don&rsquo;t stock the big rotomolded hard coolers
          everyone else pushes: they cost more to freight than they do to make.
        </p>
      </Section>

      <Section heading="Where we are going">
        <p>
          Right now we source from established manufacturers and ship from their
          warehouses. Over time the plan is to move the categories where it
          matters most, braid, hooks, rig kits, and soft plastics, onto our own
          specifications, so we control the hook plating and the color palette
          rather than accepting whatever a generic supplier ships.
        </p>
      </Section>

      <Section heading="Get in touch">
        <p>
          Questions about gear, an order, or a spot you think we should cover on
          the tide site: <Link href="/contact" className="text-tide hover:text-teal">contact us</Link>.
        </p>
      </Section>
    </Prose>
  );
}
