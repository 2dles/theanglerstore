import { Prose, Section } from "@/components/Prose";

export const metadata = {
  title: "Contact",
  description: "Questions about gear or an order — how to reach TheAnglerStore.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Prose
      title="Contact"
      intro="Real replies from a small team, usually within one business day."
    >
      <Section heading="Email">
        <p>
          <a href="mailto:support@theanglerstore.com" className="text-tide hover:text-teal">
            support@theanglerstore.com
          </a>{" "}
          — orders, returns, shipping, and anything that has gone wrong.
        </p>
        <p>
          <a href="mailto:gear@theanglerstore.com" className="text-tide hover:text-teal">
            gear@theanglerstore.com
          </a>{" "}
          — what to buy, what to pair it with, and whether a product is right for
          the water you fish. We would rather talk you out of the wrong purchase
          than process the return.
        </p>
      </Section>

      <Section heading="Include this and we will be faster">
        <ul className="space-y-2 text-ink-dim">
          <li>▸ Your order number, if it is about an order</li>
          <li>▸ Where you fish — it changes almost every gear recommendation</li>
          <li>▸ Photos, for anything damaged or defective</li>
        </ul>
      </Section>

      <Section heading="Who you are dealing with">
        <p>
          {/* REQUIRES OWNER INPUT — replace the two placeholders below with the
              registered entity name and a mailing address (a PO box or the
              registered agent's address is fine). Deliberately left as visible
              placeholders rather than invented: a wrong address is worse than
              none. */}
          <strong className="text-ink">[LEGAL ENTITY NAME]</strong>, trading as
          TheAnglerStore.
          <br />
          [BUSINESS ADDRESS]
          <br />
          Sebastopol, California, United States
        </p>
        <p>
          We are a small operation and there is no phone line yet — email is
          answered by the person who packed your order, usually the same day.
        </p>
      </Section>

      <Section heading="Hours">
        <p>
          Monday to Friday, 9am–5pm Pacific. Messages sent over a weekend get
          answered Monday morning, which is also when we are least likely to be
          fishing.
        </p>
      </Section>
    </Prose>
  );
}
