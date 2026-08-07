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
          product page here connects back to conditions — what the gear is for,
          and when it earns its place in your bag.
        </p>
      </Section>

      <Section heading="How we pick products">
        <p>
          We are a small operation, so we do not pretend to carry everything.
          What we carry is chosen against a specific coastline: California surf
          and bays, where the fish are halibut, surfperch, corbina, calico, and
          spotted bay bass, and where the wrong gear is usually gear designed for
          Midwest largemouth.
        </p>
        <p>
          Two rules govern the catalog. First, salt-facing specs are
          non-negotiable — sealed bearings, plated hooks, anodized aluminum.
          Untreated hardware fails in one season and we will not sell it. Second,
          if we think a product is a bad buy, we say so on the product page
          rather than quietly leaving it out. Our{" "}
          <Link href="/products/cooler" className="text-tide hover:text-teal">
            45 qt cooler page
          </Link>{" "}
          is the clearest example: it exists, you can order it, and we explain
          why you probably should not.
        </p>
      </Section>

      <Section heading="Where we are going">
        <p>
          Right now we source from established manufacturers and ship from their
          warehouses. Over time the plan is to move the categories where it
          matters most — braid, hooks, rig kits, and soft plastics — onto our own
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
