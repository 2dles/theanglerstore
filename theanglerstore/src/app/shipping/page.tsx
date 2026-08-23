import Link from "next/link";
import { Prose, Section } from "@/components/Prose";
import { STANDARD_SHIPS_IN, slowerThanStandard } from "@/lib/products";
import { FREE_SHIPPING_OVER } from "@/lib/stripe";
import { ZONES, shipsInternationally } from "@/lib/shipping-zones";
import { SHIPPING_METHODS, enabledMethods } from "@/lib/shipping-methods";

export const metadata = {
  title: "Shipping",
  description:
    "Free economy shipping over $75, or pay for two-day or overnight at cost. Every service priced, with the delivery window we actually measured.",
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
      intro={`Economy is ${STANDARD_SHIPS_IN} and free over $${FREE_SHIPPING_OVER}. If you need it sooner, faster services are offered at checkout at what they cost us. Everything ships from a US warehouse, nothing on this site comes from overseas.`}
    >
      <Section heading="Rates">
        <p>
          Four services. Each is priced at what our distributor charges us plus
          $3.00, which covers the card fee and the handling. We do not make
          money on shipping, and we are not going to pretend the fast ones are
          cheap.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[26rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-ink-faint">
                <th className="py-2 pr-4 font-medium">Service</th>
                <th className="py-2 pr-4 font-medium">Cost</th>
                <th className="py-2 font-medium">Order to doorstep</th>
              </tr>
            </thead>
            <tbody>
              {enabledMethods().map((m) => (
                <tr key={m.id} className="border-b border-line/60">
                  <td className="py-2.5 pr-4 font-medium text-ink">{m.label}</td>
                  <td className="py-2.5 pr-4 text-ink-dim">
                    {m.freeOverThreshold ? (
                      <>
                        <span className="text-teal">
                          Free over ${FREE_SHIPPING_OVER}
                        </span>
                        , else ${m.price.toFixed(2)}
                      </>
                    ) : (
                      <>${m.price.toFixed(2)}</>
                    )}
                  </td>
                  <td className="py-2.5 text-ink-dim">
                    {m.transit.min}&ndash;{m.transit.max} business days
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="space-y-2 text-ink-dim">
          {enabledMethods().map((m) => (
            <li key={m.id}>
              ▸ <strong className="text-ink">{m.label}.</strong> {m.note}
            </li>
          ))}
        </ul>
        <p>
          One rate per order regardless of how many items are in it, which is
          why it&rsquo;s worth adding the small stuff (hooks, leader, rigs) to
          an order rather than buying them on their own.
        </p>
        <p>
          The free-shipping threshold applies to Economy. An upgrade is charged
          in full even on a large order, because we pay for it in full.
        </p>

        {SHIPPING_METHODS.filter((m) => !m.enabled && m.blockedReason).map((m) => (
          <p key={m.id} className="text-sm text-ink-faint">
            <strong className="text-ink">
              One service we are not offering yet:
            </strong>{" "}
            our distributor sells a {m.label} rate that sits between Economy and
            two-day. We have left it off deliberately. We have never run an
            order on it, so we cannot tell you how long it takes, and a delivery
            window we have not measured is how this page came to be wrong once
            already.
          </p>
        ))}
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
          For most of the country, Economy is 3 to 7 business days. The reason
          the range on this page runs to 10 is the West Coast, and that number
          is measured rather than guessed: our own first order was placed on a
          Monday, left the distributor the next morning, and reached California
          nine business days after we placed it. The picking was quick. The
          distance was the whole story.
        </p>
        <p>
          We quote the longer figure in the small print a checkout holds us to,
          and tell you the common one here, because being early is a nice
          surprise and being late is a ruined trip.
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
