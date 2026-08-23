# Observed lead times

Every real order, measured. One row per order, added when it **arrives**, not
when it ships.

This file exists because the delivery window on 241 product pages was invented.
"3–7 business days" was an estimate made before we had a dealer account, and it
survived unchallenged until the first parcel missed it by two days. A number
that is quoted 241 times and measured zero times is a liability, not a policy.

## The log

| Ordered | Shipped | Arrived | Handling | Transit | Door to door | Supplier | To | Notes |
|---|---|---|---|---|---|---|---|---|
| Mon 10 Aug 2026 | Tue 11 Aug | Sat 22 Aug | 1 bd | 8 bd | **9 bd** (12 cal) | CWR | CA | **Economy $9.95.** First order on the account, no verification hold. |

`bd` = business days, weekends and public holidays excluded. **Always record
which service was bought** — the first row was logged without it and nearly led
us to treat a purchasing choice as a fact about the supply chain.

## What the first order settled

**The handling assumption was right; the transit assumption was wrong.** Worth
separating, because the two have completely different fixes and only one of
them was broken.

CWR shipped the next morning. That validates the one-day handling figure baked
into `shippingDetails()` in `src/lib/product-schema.ts`, and it means the
supplier is not the problem. It also rules out the obvious excuse: this was the
first order on a brand new dealer account, exactly the kind that gets held for
credit or verification, and it was not held at all.

What is slow is the distance. CWR is on the East Coast. This store sells to
West Coast anglers, because its traffic comes from a West Coast tide chart.
Coast to coast on the ground is eight business days and there is nothing
clever to be done about it. That is not noise to be averaged away over future
orders; it is the single most predictable fact in the supply chain, and it will
be true of every California order we ever take.

So the window moved to **3–10 business days**: the bottom is what an Atlantic
or Gulf buyer should genuinely see, the top is what we measured to California,
which is where most customers are.

## The correction: this measured a CHOICE, not a limit

Worth being blunt about, because the first read of this data was wrong.

CWR's order form offers four flat rates: Economy $9.95, Standard $13.95, Two
Days $24.95, Overnight $49.95. We bought the cheapest and then published its
transit time as though it were the speed of the business. It is not. Nine days
is what $9.95 buys. The distributor can have a parcel in California tomorrow
for $49.95.

That does not make the 3-10 window wrong — it is the honest number for the
service a customer gets by default, and it stays. What it makes wrong is
quoting it as the ONLY number. So the faster services are now sold at
checkout at cost plus $3.00, and the customer decides whether Saturday's tide
is worth $52.95. See `src/lib/shipping-methods.ts`.

## Why not wait for more data

One order is thin evidence for a catalogue-wide change, and normally the answer
would be to keep quoting the old number until a pattern emerges. Not here, for
three reasons.

1. The old number was never evidence either. Replacing a guess with a
   measurement is an improvement at n=1.
2. The failure is structural, not random. It is a distance, and distance does
   not regress to the mean.
3. Quoting 7 and delivering 9 is how a store collects chargebacks and one-star
   reviews about honesty, which is the one thing this storefront sells on. It
   also runs at the FTC Mail Order Rule, which wants a reasonable basis for an
   advertised shipping window and a delay notice offering the buyer a refund
   when you miss it. Not legal advice, but the cheap fix is to quote a window
   we can actually hit.

## What would change this

Tighten the window when there is real evidence to tighten it from. Specifically:

- **Five or more orders to West Coast addresses** landing consistently under 9
  business days. Then the top comes down.
- **Any East Coast order**, which we have never measured. If those land in 3–4
  business days, the honest move may be a destination-aware estimate rather
  than one national range, since the current range is wide enough to be
  useless to a buyer in Florida.
- **A Burch order.** Burch is in Florence, Alabama, which is materially closer
  to the West Coast than CWR is. Every row so far is CWR. If Burch is
  consistently faster, `shipsIn` should vary by supplier rather than sitting as
  one site-wide constant.
- **One order on CWR Standard ($13.95).** This is the gap that is costing us
  money right now. It is the obvious middle tier and it is switched OFF in
  `shipping-methods.ts`, because we have never bought it and refuse to
  advertise a window we have not seen. Buy one, log it here, set the transit
  from the result, flip `enabled: true`. It is very likely the option most
  customers would actually want.
- **Any order at all on Two-day or Overnight.** Their windows are derived from
  the service names plus our measured handling day, which is reasonable but is
  still not a measurement. If Overnight turns out to mean ordered-Monday
  arrives-Wednesday rather than Tuesday, the window here needs a day added.

## Where the number lives

Change it in ONE place and everything follows:

- `STANDARD_SHIPS_IN` in `src/lib/products.ts` — quoted on all 241 sellable
  products and on `/shipping`.
- `transit` for the `us` zone in `src/lib/shipping-zones.ts` — what Stripe
  quotes as a delivery estimate at checkout. Keep it at
  `STANDARD_SHIPS_MAX - 1`, since the handling day is counted separately there.

`shippingDetails()` derives the schema.org `handlingTime` and `transitTime`
from `shipsIn` automatically, so Google's figures follow the product pages
without a second edit. The four products carrying bespoke windows are all
unsourced placeholders that cannot be ordered, so they were left alone.
