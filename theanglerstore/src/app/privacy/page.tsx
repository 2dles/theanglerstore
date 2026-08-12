import { Prose, Section } from "@/components/Prose";

export const metadata = {
  title: "Privacy",
  description: "What TheAnglerStore collects, why, and who we share it with.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Prose
      title="Privacy"
      updated="August 2026"
      intro="Short version: we collect what an order requires, we never sell it, and we don't have your card number."
    >
      <Section heading="What we collect">
        <p>
          When you place an order: your name, email, shipping address, and the
          items you bought. When you browse: standard server logs, and a record
          of which site referred you — including the UTM tags on links from our
          sister site USTideCharts.
        </p>
        <p>
          Your cart lives in your own browser&rsquo;s local storage. It never
          reaches our servers until you check out.
        </p>
      </Section>

      <Section heading="What we never see">
        <p>
          Your card number, expiry, and CVC. Payment is handled entirely by
          Stripe, a PCI Level 1 certified processor. The payment form is embedded
          in our checkout page, but the fields belong to Stripe and the data goes
          straight to them.
        </p>
      </Section>

      <Section heading="Who we share it with">
        <ul className="space-y-2 text-ink-dim">
          <li>▸ <strong className="text-ink">Stripe</strong> — to take payment</li>
          <li>▸ <strong className="text-ink">Our suppliers</strong> — your name and shipping address only, so they can send your order</li>
          <li>▸ <strong className="text-ink">Carriers</strong> — the same, to deliver it</li>
        </ul>
        <p>
          That is the entire list. We do not sell, rent, or trade customer data,
          and we do not run advertising pixels that report your purchases to
          third-party ad networks.
        </p>
      </Section>

      <Section heading="Cookies and storage">
        <p>
          We use browser storage for two things: keeping your cart between page
          loads, and remembering which link brought you here so we can tell which
          of our own pages actually work. No third-party advertising cookies.
        </p>
      </Section>

      <Section heading="Your rights">
        <p>
          Email <a href="mailto:help@theanglerstore.com" className="text-tide hover:text-teal">help@theanglerstore.com</a>{" "}
          and we will tell you exactly what we hold about you, correct it, or
          delete it. California residents have specific rights under the CCPA,
          including the right to know and the right to deletion; the same email
          address handles those requests, and we do not discriminate against
          anyone for exercising them.
        </p>
        <p>
          We keep order records for as long as tax and accounting rules require,
          then delete them.
        </p>
      </Section>

      <Section heading="Children">
        <p>
          This store is not directed at children under 13 and we do not knowingly
          collect their information.
        </p>
      </Section>
    </Prose>
  );
}
