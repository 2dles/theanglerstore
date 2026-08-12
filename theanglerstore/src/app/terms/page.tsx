import Link from "next/link";
import { Prose, Section } from "@/components/Prose";

export const metadata = {
  title: "Terms",
  description: "The terms that apply when you buy from TheAnglerStore.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Prose
      title="Terms"
      updated="August 2026"
      intro="The rules that apply when you buy from us. Written to be read, not to be impenetrable."
    >
      <Section heading="Orders and pricing">
        <p>
          Prices are in US dollars and are calculated on our server at checkout,
          not in your browser. If a price is listed in obvious error — a decimal
          in the wrong place — we may cancel the order and refund you in full
          rather than honor it. We will tell you if that happens.
        </p>
        <p>
          Placing an order is an offer to buy. The contract forms when we accept
          it, which in practice means when we charge your card.
        </p>
      </Section>

      <Section heading="Shipping and returns">
        <p>
          Covered in detail on the{" "}
          <Link href="/shipping" className="text-tide hover:text-teal">shipping</Link> and{" "}
          <Link href="/returns" className="text-tide hover:text-teal">returns</Link> pages.
          Those pages form part of these terms.
        </p>
      </Section>

      <Section heading="Product information">
        <p>
          We describe specifications as accurately as we can from manufacturer
          data, and we say plainly when we haven&rsquo;t verified something
          ourselves. Manufacturers change specs without notice. If what arrives
          does not match what we described, that is a defect under our returns
          policy and we will make it right.
        </p>
        <p>
          Colors vary between screens. Fishing outcomes vary considerably more.
          Nothing on this site is a promise that you will catch fish.
        </p>
      </Section>

      <Section heading="Safe use">
        <p>
          Fishing tackle includes sharp hooks, and some products contain lead.
          Keep hooks away from children. Wash your hands after handling lead
          jigs and sinkers. Know and follow your local fishing regulations —
          circle hook requirements, size and bag limits, and closures are your
          responsibility, not ours, and they change.
        </p>
      </Section>

      <Section heading="Liability">
        <p>
          We stand behind what we sell and will refund or replace anything
          defective. Beyond that, our liability is limited to what you paid for
          the product. We are not liable for indirect or consequential losses —
          a missed tide, a ruined trip, a lost tournament.
        </p>
      </Section>

      <Section heading="Governing law">
        <p>
          These terms are between you and Augustus Muse, sole proprietor,
          trading as TheAnglerStore, of Sebastopol, California — a fictitious
          business name registered in Sonoma County. They are governed by the
          laws of the State of California.
          Nothing here limits any right you have under consumer protection law
          that cannot be limited by agreement.
        </p>
      </Section>

      <Section heading="Changes">
        <p>
          We may update these terms. The version in force for your order is the
          one published when you placed it.
        </p>
      </Section>
    </Prose>
  );
}
