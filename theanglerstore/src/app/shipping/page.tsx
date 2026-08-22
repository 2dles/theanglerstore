import Link from "next/link";
import { Prose, Section } from "@/components/Prose";
import { STANDARD_SHIPS_IN, slowerThanStandard } from "@/lib/products";
import { FLAT_SHIPPING, FREE_SHIPPING_OVER } from "@/lib/stripe";
import { ZONES, shipsInternationally } from "@/lib/shipping-zones";

export const metadata = {
  title: "Shipping",
  description:
    "Free US shipping over $75. Most orders arrive in 3–7 business days, shipped from US warehouses. Exact delivery estimate on every product page.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  // Anything quoted beyond the standard window gets called out by name rather
  // than hidden behind an average.
  const slower = slowerThanStandard();

  const international = shipsInternationally();

  return (
    <Prose
      title="Shipping"
      updated="August 2026"
      intro={`Most US orders arrive in 3–7 business days. Free over $${FREE_SHIPPING_OVER}, $${FLAT_SHIPPING.toFixed(2)} below that. Everything ships from a US warehouse, nothing on this site comes from overseas.`}
    >
      <Section heading="Rates">
        <ul className="space-y-2 text-ink-dim">
          <li>
            ▸ <strong className="text-ink">Free</strong>. US orders of $
            {FREE_SHIPPING_OVER} or more
          </li>
          <li>
            ▸ <strong className="text-ink">${FLAT_SHIPPING.toFixed(2)} flat</strong>{" "}
            on US orders under ${FREE_SHIPPING_OVER}
          </li>
        </ul>
        <p>
          One flat rate per order regardless of how many items are in it,
          which is why it&rsquo;s worth adding the small stuff (hooks, leader,
          rigs) to an order rather than buying them on their own.
        </p>
      </Section>

      <Section heading="Delivery time">
        <p>
          <strong className="text-ink">
            Our standard is {STANDARD_SHIPS_IN} from order to doorstep, anywhere
            in the contiguous US.
          </strong>{" "}
          That covers both the time the distributor takes to pick and hand over
          your order and the carrier&rsquo;s transit time. Business days exclude
          weekends and public holidays.
        </p>
        <p>
          <strong className="text-ink">Where you live decides where you land in
          that range,</strong> and it is not a small difference. Our
          distributors are on the East Coast. If you are fishing the Atlantic or
          the Gulf, your parcel has a short run and you should see the fast end.
          If you are on the West Coast, it crosses the country on the ground and
          you should plan on the slow end.
        </p>
        <p>
          That is measured rather than guessed. Our own first order was placed
          on a Monday, left the distributor the next morning, and reached
          California nine business days after we placed it. The picking was
          quick; the distance was the whole story. We would rather publish the
          number we actually saw than the shorter one we would prefer to
          advertise.
        </p>
        <p>
          So: if you need something for a specific tide, order well before it.
          We would rather you had the gear a week early than watch a tracking
          page on the morning of a trip.
        </p>

        {slower.length > 0 && (
          <>
            <p>
              <strong className="text-ink">
                The exception, stated plainly:
              </strong>{" "}
              {slower.length === 1 ? "one item is" : `${slower.length} items are`}{" "}
              bulkier than parcel carriers like, and can run past even that:
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
                  &middot; {p.shipsIn}
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
          and we&rsquo;ll chase the carrier, you shouldn&rsquo;t have to.
        </p>
      </Section>

      <Section heading="Where we ship">
        <p>
          <strong className="text-ink">
            United States today, including Alaska and Hawaii.
          </strong>{" "}
          Orders to Alaska and Hawaii are accepted but transit runs longer than
          the 3–7 day standard, and a few of the bulkier items can&rsquo;t be
          sent there at all, we&rsquo;ll contact you before charging if that
          applies to something in your cart.
        </p>

        {!international && (
          <>
            <p>
              <strong className="text-ink">
                We don&rsquo;t ship internationally yet, and we&rsquo;d rather
                say why than just say no.
              </strong>{" "}
              Tackle is the problem, not the ambition. Rods, nets and coolers are
              light but enormous, and international carriers charge by the space
              a parcel occupies rather than its weight, a 7-foot surf rod can
              cost more to send abroad than the rod itself. Our distributors are
              domestic, so there is no honest way to quote you a rate we could
              actually honor.
            </p>
            <p>
              When international does open it will most likely open with
              apparel, because print-on-demand is produced regionally rather
              than shipped from the US. We don&rsquo;t sell any apparel yet, so
              treat that as a plan rather than a promise, there is no date on
              it, and we would rather tell you that than list regions we
              can&rsquo;t serve.
            </p>
            <p>
              If you&rsquo;re outside the US and want something from the
              catalog,{" "}
              <Link href="/contact" className="text-tide hover:text-teal">
                email us
              </Link>{" "}
              anyway. For a small item we can sometimes quote it manually,
              and it tells us where to open next.
            </p>
          </>
        )}

        {international && (
          <>
            <p>
              We ship to these regions. Rates and windows are per region and
              shown at checkout before you pay:
            </p>
            <ul className="space-y-2 text-ink-dim">
              {ZONES.filter((z) => z.enabled).map((z) => (
                <li key={z.id}>
                  ▸ <strong className="text-ink">{z.label}</strong>, {" "}
                  {z.freeOver !== null
                    ? `free over $${z.freeOver}, otherwise $${z.flat.toFixed(2)}`
                    : `$${z.flat.toFixed(2)}`}
                  , {z.transit.min}–{z.transit.max} business days
                </li>
              ))}
            </ul>
            <p>
              <strong className="text-ink">
                Outside the US, tackle stays home.
              </strong>{" "}
              Apparel ships to every region listed above; rods, nets, coolers and
              hard tackle are US-only because our distributors are. If your cart
              mixes the two, checkout will tell you which item is the problem
              rather than failing silently.
            </p>
            <p>
              <strong className="text-ink">
                Customs, duty and import VAT are not included
              </strong>{" "}
              and are the recipient&rsquo;s responsibility. Your country may
              charge them before releasing the parcel. We declare the true value
              of every shipment, we won&rsquo;t mark an order as a gift or
              under-declare it, and we&rsquo;d encourage you to check your own
              import thresholds before ordering so the bill isn&rsquo;t a
              surprise.
            </p>
          </>
        )}
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
          We are registered to collect sales tax in{" "}
          <strong className="text-ink">California</strong>, where the business
          is based. California orders have tax calculated at checkout and shown
          before you pay, on the goods and, as California requires, on the
          shipping charge too.
        </p>
        <p>
          Orders to other states are charged no sales tax, because we are not
          registered anywhere else yet. That is not a loophole and it is not
          permanent: once our volume in a state passes its threshold we have to
          register there, and we will. Depending on where you live you may
          still owe use tax on the purchase, most states ask for it on the
          annual return, and whether you pay it is between you and them.
        </p>
        <p>
          Prices on product pages are exclusive of tax.
        </p>
      </Section>
    </Prose>
  );
}
