# TheAnglerStore

The monetization half of the USTideCharts ecosystem. Next.js storefront, embedded Stripe Checkout, manual fulfillment, zero fixed monthly cost.

```bash
npm install
npm run dev        # http://localhost:3000
```

**Just want to see it live? → [QUICKSTART.md](./QUICKSTART.md)** — 10 minutes, no Stripe, no accounts.

Setting it up properly? → **[RUNBOOK.md](./RUNBOOK.md)** (click by click)
Deploying? → **[DEPLOY.md](./DEPLOY.md)**
Placing a supplier order? → **[SOURCING.md](./SOURCING.md)**
Product photos? → **[IMAGES.md](./IMAGES.md)**

---

## Architecture

No database. No CMS. No Shopify. The catalog is a TypeScript file and Stripe's dashboard is the order system.

```
Customer browses  →  static pages, prerendered at build
Adds to cart      →  React context + localStorage (their browser only)
Checks out        →  POST /api/checkout  →  prices recomputed server-side
                                          →  Stripe embedded session
Pays              →  Stripe Checkout, inline on theanglerstore.com
Stripe fires      →  POST /api/webhooks/stripe  →  Resend  →  your inbox
You fulfill       →  place the supplier order by hand, email tracking
```

The only recurring cost is Stripe's 2.9% + 30¢. Vercel Hobby, Resend free tier, and GitHub are all $0.

| Route | What it is |
|---|---|
| `/` | Hero, featured products, starter bundle, tide-site cross-promo |
| `/products` | Everything, grouped by category |
| `/products/[key]` | **The URL contract** — 14 keys, Product + HowTo JSON-LD, usage walkthrough |
| `/collections/[slug]` | Six category pages |
| `/cart` | Line items, quantities, shipping threshold |
| `/checkout` | Embedded Stripe form — no redirect off-site |
| `/checkout/success` | Confirmation, clears the cart |
| `/api/checkout` | Creates the embedded session, prices server-side |
| `/api/webhooks/stripe` | `checkout.session.completed` → order email |
| `/sitemap.xml`, `/robots.txt` | Generated |

Plus `/about`, `/shipping`, `/returns`, `/contact`, `/privacy`, `/terms`.

---

## The URL contract

USTideCharts links here as:

```
https://theanglerstore.com/products/<key>?utm_source=ustidecharts&utm_medium=gear-rec
```

`utm_medium` values in the wild: `gear-rec`, `nav`, `footer`, `home`, `location`.

**All 14 keys must resolve. Never delete one.** They are: `surf-rod`, `inshore-combo`, `braided-line`, `fluoro-leader`, `circle-hooks`, `carolina-kit`, `swimbait-kit`, `jig-assort`, `landing-net`, `sand-spike`, `pliers`, `tackle-bag`, `cooler`, `headlamp`.

To retire a product, add it to `REDIRECTS` in `src/lib/products.ts`:

```ts
export const REDIRECTS: Record<string, string> = {
  "cooler": "/collections/coolers",
};
```

That issues a 301 **with the utm params preserved**, so attribution survives the redirect. Deleting a key instead would 404 live links on the tide site.

---

## Attribution

First-touch UTM capture lands in `sessionStorage` on the first page view (`src/lib/attribution.ts`), rides through the cart, and is written into the Stripe Checkout session's `metadata`. Every payment in the Stripe dashboard therefore carries the `utm_source`, `utm_medium`, and landing path that produced it — so you can see not just that the tide site converts, but which surface on it does.

---

## Editing the catalog

Everything customer-facing lives in `src/lib/products.ts`. Change a price, a spec, a blurb, and redeploy — that's the whole workflow.

Cost, supplier, and margin are deliberately **not** in that file, because it ships to the browser. They live in `SOURCING.md`.

Per-product **walkthroughs** live separately in `src/lib/walkthroughs.ts` — a real "how to fish it" guide on every product page (71 steps across 14 products), emitted as `HowTo` structured data. They exist to cut returns (most tackle comes back rigged wrong, not faulty) and because it's the one thing a marketplace listing can't do.

Two fields drive behaviour:

- `role: "anchor" | "add-on"` — `add-on` SKUs are low-ticket items whose shipping cost eats them standalone. They render a note explaining the free-shipping threshold and get a card badge.
- `shipsIn` — shown on the product page and in the cart. Keep it honest; it's set from real supplier transit times.

Product art has two paths (`src/components/ProductArt.tsx`):

- `image` set on a product → a real photograph, served through `next/image`
- otherwise → our own illustration of that product (`ProductIllustration.tsx`)

Drop a file at `public/products/<key>.jpg`, add `image: "/products/<key>.jpg"` to that product, and it takes over everywhere. Products migrate one at a time. **Read [IMAGES.md](./IMAGES.md) before using any image you didn't take yourself** — we deliberately do not hotlink supplier photography.

---

## Shipping economics

Set in `src/lib/stripe.ts`:

```ts
export const FREE_SHIPPING_OVER = 49;
export const FLAT_SHIPPING = 5.95;
```

These are not arbitrary. Manual dropship carries roughly $4.29 of fixed drag per order (cheapest verified inbound freight + Stripe's 30¢). On a $12.99 item that is a third of revenue. $5.95 below $49 covers it; above $49 the basket absorbs it. Changing these numbers without reading the math in SOURCING.md will quietly sell several SKUs at a loss.

---

## Safety properties worth knowing

- **Prices are never trusted from the client.** `/api/checkout` accepts only product keys and quantities, then recomputes every amount from `products.ts`. A tampered cart cannot change what you charge.
- **The build never needs secrets.** Stripe is constructed lazily; `next build` succeeds with no env vars and the site renders, with checkout showing a clear "not configured" message instead of erroring.
- **A missing Resend key doesn't break the webhook.** It logs the order and returns 200 rather than throwing into a Stripe retry loop.
- **The webhook returns 500 on a genuine send failure**, so Stripe retries. A missed order email means a missed order.

---

## Tech

Next.js 16 (App Router, TypeScript, Tailwind 4), self-hosted Geist, `stripe` + `@stripe/react-stripe-js` for embedded Checkout, `resend` for order mail. Design tokens match ustidecharts.com — same ocean-dark palette, same card treatment, one notch brighter.
