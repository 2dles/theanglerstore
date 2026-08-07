import Link from "next/link";
import { Prose, Section } from "@/components/Prose";
import { PRODUCTS } from "@/lib/products";
import { FLAT_SHIPPING, FREE_SHIPPING_OVER } from "@/lib/stripe";

export const metadata = {
  title: "Shipping",
  description:
    "Free US shipping over $49. Most orders arrive in 2–7 business days, shipped from US warehouses. Exact delivery estimate on every product page.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  // Anything quoted beyond 7 business days gets called out by name rather than
  // hidden behind an average.
  const slower = PRODUCTS.filter((p) => {
    const max = Number(p.shipsIn.split("–")[1]?.split(" ")[0] ?? 0);
    return max > 7;
  });

  return (
    <Prose
      title="Shipping"
      updated="August 2026"
      intro="Most orders arrive in 2–7 business days. Free over $49, $5.95 below that. Everything ships from a US warehouse — nothing on this site comes from overseas."
    >
      <Section heading="Rates">
        <ul className="space-y-2 text-ink-dim">
          <li>
            ▸ <strong className="text-ink">Free</strong> — US orders of $
            {FREE_SHIPPING_OVER} or more
          </li>
          <li>
            ▸ <strong className="text-ink">${FLAT_SHIPPING.toFixed(2)} flat</strong>{" "}
            — US orders under ${FREE_SHIPPING_OVER}
          </li>
        </ul>
        <p>
          One flat rate per order regardless of how many items are in it, which
          is why it&rsquo;s worth adding the small stuff — hooks, leader, rigs —
          to an order rather than buying them on their own.
        </p>
      </Section>

      <Section heading="Delivery time">
        <p>
          <strong className="text-ink">
            Our standard is 2–7 business days from order to doorstep, anywhere in
            the contiguous US.
          </strong>{" "}
          That covers both the time we take to get your order to the warehouse
          and the carrier&rsquo;s transit time. Business days exclude weekends
          and public holidays.
        </p>
        <p>
          Every product page shows that item&rsquo;s own estimate, because they
          genuinely differ — a spool of braid leaves a Wisconsin warehouse the
          next morning, while a rod travels further and takes longer. We&rsquo;d
          rather show you the real number per item than quote one average that is
          wrong for half the catalog.
        </p>

        {slower.length > 0 && (
          <>
            <p>
              <strong className="text-ink">
                The exception, stated plainly:
              </strong>{" "}
              {slower.length === 1 ? "one item is" : `${slower.length} items are`}{" "}
              bulkier than parcel carriers like, and can run past the 7-day mark:
            </p>
            <ul className="space-y-2 text-ink-dim">
              {slower.map((p) => (
                <li key={p.key}>
                  ▸{" "}
                  <Link
                    href={`/products/${p.key}`}
                    className="text-tide hover:text-teal"
                  >
                    {p.name}
                  </Link>{" "}
                  — {p.shipsIn}
                </li>
              ))}
            </ul>
            <p>
              If you order one of these alongside faster items, we ship what
              we can immediately rather than holding the whole order.
            </p>
          </>
        )}
      </Section>

      <Section heading="Tracking">
        <p>
          You get a tracking number by email as soon as a label is created,
          usually within one business day of ordering. If tracking hasn&rsquo;t
          moved in 72 hours,{" "}
          <Link href="/contact" className="text-tide hover:text-teal">
            tell us
          </Link>{" "}
          and we&rsquo;ll chase the carrier — you shouldn&rsquo;t have to.
        </p>
      </Section>

      <Section heading="Where we ship">
        <p>
          United States only for now. Orders to Alaska and Hawaii are accepted
          but transit runs longer than the 2–7 day standard, and some bulkier
          items can&rsquo;t be sent there at all — we&rsquo;ll contact you before
          charging if that applies. We don&rsquo;t ship internationally yet.
        </p>
      </Section>

      <Section heading="Address accuracy">
        <p>
          We ship to the address you enter at checkout. If it&rsquo;s wrong,
          email us within two hours and we&rsquo;ll try to catch it before the
          label prints. After dispatch a wrong address means waiting for the
          parcel to come back to sender, which adds a week or more.
        </p>
      </Section>

      <Section heading="Sales tax">
        <p>
          Tax, where it applies, is calculated at checkout and shown before you
          pay. Prices displayed on product pages are exclusive of tax.
        </p>
      </Section>
    </Prose>
  );
}
