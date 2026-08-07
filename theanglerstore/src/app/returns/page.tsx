import { Prose, Section } from "@/components/Prose";

export const metadata = {
  title: "Returns",
  description:
    "30-day returns on unused gear. Defective items replaced at our cost. Straightforward, no restocking games.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <Prose
      title="Returns"
      intro="Thirty days, unused and in original packaging, for any reason. Defective gear is our problem, not yours."
    >
      <Section heading="The standard return">
        <p>
          Email us within 30 days of delivery and we will send a return
          authorisation. Send the item back unused and in its original packaging
          and we refund the product price to your original payment method within
          five business days of it arriving.
        </p>
        <p>
          Return shipping on a change-of-mind return is yours to cover. Original
          shipping is not refunded. We do not charge a restocking fee.
        </p>
      </Section>

      <Section heading="If something is defective or wrong">
        <p>
          Different rules, and they favour you. If an item arrives damaged,
          faulty, or simply is not what you ordered, tell us within 30 days and
          we cover return shipping and send a replacement or a full refund
          including original shipping. Photos help but we are not going to make
          you prove it.
        </p>
      </Section>

      <Section heading="What we cannot take back">
        <ul className="space-y-2 text-ink-dim">
          <li>▸ Line that has been spooled onto a reel</li>
          <li>▸ Hooks, rigs, or soft plastics removed from sealed packaging</li>
          <li>▸ Rods with guide or blank damage from use</li>
          <li>▸ Special-order and freight items, unless defective</li>
        </ul>
        <p>
          The reason is simple: we cannot resell them, and pretending otherwise
          would just mean pricing the loss into everything else.
        </p>
      </Section>

      <Section heading="Manufacturer warranties">
        <p>
          Several items carry a manufacturer warranty that outlasts our 30-day
          window. If a rod or reel fails outside that window, contact us anyway —
          we will tell you whether a warranty claim applies and help you file it.
        </p>
      </Section>
    </Prose>
  );
}
