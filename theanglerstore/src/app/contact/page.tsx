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
          <a href="mailto:help@theanglerstore.com" className="text-tide hover:text-teal">
            help@theanglerstore.com
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
          {/* City and state only, deliberately. The registered address is a
              private residence; a sole proprietor's home address does not
              belong on a public page that scrapers read. Swap in a PO box or a
              registered agent's address here whenever there is one. */}
          <strong className="text-ink">Augustus Muse</strong>, sole proprietor,
          trading as TheAnglerStore under a fictitious business name filed in
          Sonoma County, California.
          <br />
          Sebastopol, California, United States
          <br />
          California seller&rsquo;s permit 215727328
        </p>
        <p>
          <a href="tel:+17075087118" className="text-tide hover:text-teal">
            (707) 508-7118
          </a>{" "}
          — one person, one phone. If it rings out, we are on the water or in
          the post office queue; email gets a faster answer.
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
