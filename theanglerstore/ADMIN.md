# The admin panel

`theanglerstore.com/admin` — traffic and orders in one place, no database, no extra accounts, no cost.

Two data sources, both already yours:

- **Traffic** from the Vercel Web Analytics API (public since May 2026)
- **Orders** from Stripe, read live — Stripe is the system of record, there's no orders table

Blocked behind one password. `/admin` is excluded in `robots.txt`.

---

## Setup — about 10 minutes

### 1. Turn on Web Analytics

Vercel → your project → **Analytics** → **Enable**. Free on Hobby, 50,000 events/month.

Nothing else to install — `@vercel/analytics` is already wired into the layout, so collection starts on your next deploy.

### 2. Create a Vercel API token

1. https://vercel.com/account/tokens
2. **Create Token** → name it `theanglerstore-admin`
3. Scope: your personal account. Expiration: your call — no expiry means one less thing to fix later.
4. Copy it. Vercel shows it once.

⚠️ This token can read your whole Vercel account. It's used **server-side only** and never reaches the browser. Don't paste it anywhere client-side.

### 3. Find your project ID

Vercel → project → **Settings** → **General**. It starts `prj_`.

### 4. Pick an admin password

Any long random string. A password manager will generate one.

### 5. Add three env vars

Vercel → **Settings** → **Environment Variables**, all three environments ticked:

| Name | Value |
|---|---|
| `VERCEL_TOKEN` | the `...` token from step 2 |
| `VERCEL_PROJECT_ID` | the `prj_...` from step 3 |
| `ADMIN_PASSWORD` | your password from step 4 |

Then **redeploy** — env var changes don't apply until you do.

### 6. Open it

`theanglerstore.com/admin` → enter the password. The session cookie lasts 30 days, and changing `ADMIN_PASSWORD` invalidates it immediately.

---

## What it shows

**Traffic** — visitors, page views, product page views, and referred views from USTideCharts. Then ranked tables: top pages (product paths resolve to real product names), referrers, countries, devices. Switch between 7 / 14 / 30 days.

**Orders** — revenue, order count, average order value, and a table with line items, shipping destination, and the traffic source that produced each sale. The Source column shows `tides · gear-rec` when a sale came from a USTideCharts location-page product card. That's the number that tells you whether the tide site is worth the effort.

---

## Hobby-plan limits, honestly

| Limit | Effect |
|---|---|
| **30-day reporting window** | No dashboard can show more history than that. Pro gets 12 months. |
| **50,000 events/month** | Shared across *all* projects on the account, including USTideCharts. |
| **No custom events** | Pro-only. Not used here. |
| **No UTM dimensions at page level** | `by=utmSource` returns nothing on Hobby. |

That last one sounds worse than it is. **Per-order attribution still works** — the Source column reads UTM data from Stripe metadata that our own checkout wrote, which has nothing to do with Vercel's plan. What you lose is UTM breakdown of *page views*, not of *sales*.

⚠️ **Worth knowing:** Vercel's Hobby plan is documented as non-commercial use only. A store taking payments arguably falls outside that. Nothing may ever come of it, but if the store starts earning, Pro at $20/month also removes the 30-day window and the event cap.

---

## If the traffic panel says "Vercel returned no traffic data"

The page tells you to check the function logs, and the log line carries the status code:

- **401 / 403** — token is wrong, expired, or lacks access to the project
- **402** — the API is gated on your plan; fall back to the Vercel dashboard, or PostHog's free tier (1M events/month, documented read API)
- **404** — `VERCEL_PROJECT_ID` is wrong
- **200 but empty** — Web Analytics isn't enabled yet (step 1), or nobody has visited since you enabled it

Vercel → project → **Logs**, filter to `/admin`.

---

## Extending it

- **A fulfilment queue** — mark orders shipped, store a tracking number. State goes in Stripe payment metadata, so still no database.
- **USTideCharts traffic in the same panel** — same API, different `VERCEL_PROJECT_ID`. Add a second env var and a second column.
- **Product-level conversion** — product page views are already here and orders are already here; dividing one by the other per SKU is a small addition.
