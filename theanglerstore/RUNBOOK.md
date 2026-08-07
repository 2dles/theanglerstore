# Setup runbook — TheAnglerStore

Click by click, in order. Steps marked **⛔ YOUR HANDS** need your login and can't be automated — do them yourself and come back.

Budget about 90 minutes, most of it waiting on DNS.

---

## Step 0 — Extract and push

Extract `theanglerstore.zip` to a folder next to your `tidecharts` folder.

**⛔ YOUR HANDS — create the GitHub repo**

1. Go to https://github.com/new
2. Owner: `2dles`. Repository name: `theanglerstore`
3. **Private** or Public, your call
4. Do **not** tick "Add a README", "Add .gitignore", or "Choose a license" — this folder already has them
5. Click **Create repository**

Then in PowerShell, from inside the extracted folder:

```powershell
git init
git add .
git commit -m "TheAnglerStore: Next.js + embedded Stripe storefront"
git branch -M main
git remote add origin https://github.com/2dles/theanglerstore.git
git push -u origin main
```

If git asks you to authenticate, use the browser prompt. `node_modules/` and `.next/` are gitignored so the push is under 1 MB.

---

## Step 1 — Stripe account and keys

**⛔ YOUR HANDS**

1. Go to https://dashboard.stripe.com/register — sign up with `ajbmuse@gmail.com`
2. Confirm the email Stripe sends you
3. You'll land in the dashboard. **Look at the top-right for a "Test mode" toggle and make sure it is ON.** Everything below uses test keys first; we'll switch to live at Step 7.
4. Left sidebar → **Developers** → **API keys**
5. You'll see two values. Copy them somewhere safe for a moment:
   - **Publishable key** — starts `pk_test_`
   - **Secret key** — click **Reveal test key**, starts `sk_test_`

> **Note on activation:** you can take *test* payments immediately, but Stripe needs your business details (legal name, address, bank account, SSN/EIN) before it will release *real* money. Start that at **Settings → Business settings** now so it isn't blocking you at Step 7 — approval sometimes takes a day.

---

## Step 2 — Resend account and key

**⛔ YOUR HANDS**

This is what emails you when an order comes in. Without it you're reading Vercel logs to find out you made a sale.

1. Go to https://resend.com/signup — sign up (free tier: 3,000 emails/month, 100/day)
2. Left sidebar → **API Keys** → **Create API Key**
3. Name it `theanglerstore`, permission **Sending access**, domain **All domains**
4. Click **Add** and copy the key — starts `re_`. **Resend shows it once.** Save it now.

Leave domain verification for later (Step 8). Until then we send from Resend's shared sender, which works immediately.

---

## Step 3 — Create the Vercel project

**⛔ YOUR HANDS**

1. Go to https://vercel.com/new
2. Under **Import Git Repository**, find `2dles/theanglerstore` → **Import**
   - If it's not listed, click **Adjust GitHub App Permissions** and grant access to the new repo
3. **Team/Scope:** `ajbmuse-9126`
4. Framework Preset should auto-detect **Next.js**. Leave build command, output dir, and install command at their defaults.
5. **Before clicking Deploy**, expand **Environment Variables** and add these six.

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | your `sk_test_…` from Step 1 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | your `pk_test_…` from Step 1 |
| `RESEND_API_KEY` | your `re_…` from Step 2 |
| `ORDER_NOTIFICATION_EMAIL` | `ajbmuse@gmail.com` |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` |
| `NEXT_PUBLIC_SITE_URL` | `https://theanglerstore.com` |

For each: type the name, paste the value, make sure **Production, Preview, and Development** are all ticked, click **Add**.

`STRIPE_WEBHOOK_SECRET` is deliberately missing — it doesn't exist yet. Step 4.

6. Click **Deploy**. Two to three minutes.
7. You'll get a URL like `theanglerstore-xxxx.vercel.app`. Open it — the store should be fully browsable.

---

## Step 4 — Register the Stripe webhook

This is the fulfillment trigger. It has to point at a URL that already exists, which is why it comes after the first deploy.

**⛔ YOUR HANDS**

1. Stripe dashboard, still in **Test mode** → **Developers** → **Webhooks**
2. Click **Add endpoint** (or "Add destination")
3. **Endpoint URL:** `https://theanglerstore.com/api/webhooks/stripe`
   - The domain isn't live yet — use your `.vercel.app` URL for now and change it after Step 6. Or do Step 6 first and come back.
4. **Description:** `Order notification`
5. Click **Select events** → search `checkout.session.completed` → tick it → **Add events**
   - Just that one event. Don't select all.
6. Click **Add endpoint**
7. On the endpoint page, find **Signing secret** → **Reveal** → copy it. Starts `whsec_`

Then back in Vercel:

8. Project → **Settings** → **Environment Variables** → **Add Another**
9. Name `STRIPE_WEBHOOK_SECRET`, value the `whsec_…`, all three environments ticked → **Save**
10. Go to **Deployments** → the top deployment → **⋯** menu → **Redeploy** → confirm

Environment variable changes need a redeploy to take effect. Skipping this is the single most common reason webhooks appear broken.

---

## Step 5 — Enable Stripe's own notifications (the backstop)

**⛔ YOUR HANDS**

1. Stripe → **Settings** (gear, top right) → **Business** → **Email notifications** (path is sometimes Settings → Personal → Communication preferences)
2. Tick **Successful payments**

If the webhook ever fails silently, this email is what stops an order going unnoticed. Two independent alerts on the one event the business depends on.

---

## Step 6 — Point the domain (Porkbun)

**⛔ YOUR HANDS**

### 6a. Tell Vercel about the domain

1. Vercel → project → **Settings** → **Domains**
2. Type `theanglerstore.com` → **Add** → choose **Add `theanglerstore.com` and redirect `www` to it** (recommended)
3. Vercel now shows the DNS records it wants. **Leave this tab open** — read values off it rather than trusting the ones below, they change occasionally.

### 6b. Clean up Porkbun's parking records first

This is the step that cost time on ustidecharts. Do it before adding anything.

1. Log in at https://porkbun.com → **Domain Management** → `theanglerstore.com` → **DNS**
2. Look through the existing records and **delete these if present**:
   - An **ALIAS** record on the root (host blank or `theanglerstore.com`) pointing at `pixie.porkbun.com` — this is the parking page and it blocks Vercel's A record
   - A **CNAME** with host `*` (wildcard) — also parking, also blocks
   - Any **TXT** record starting `_acme-challenge` — stale certificate challenges break Vercel's cert issuance in a way that is genuinely hard to diagnose later
3. **Do NOT delete:**
   - **MX records**, if you have email on this domain — deleting these silently kills your mail
   - Porkbun's `_domainconnect` CNAME — harmless
   - Any TXT you added for Google Search Console verification

### 6c. Add the Vercel records

Still on the Porkbun DNS page:

| Type | Host | Answer | TTL |
|---|---|---|---|
| A | *(leave blank)* | `76.76.21.21` | 600 |
| CNAME | `www` | `cname.vercel-dns.com` | 600 |

Use whatever Vercel actually displayed in 6a.

### 6d. Wait

Back in the Vercel Domains tab, refresh every few minutes. You want a green **Valid Configuration** on both entries. Usually 5–30 minutes; Porkbun is normally fast. The TLS certificate issues automatically once Vercel can see the records.

**If it's still failing after an hour:** almost always a leftover parking record. Go back through 6b.

### 6e. Fix the webhook URL if you used the preview domain

If at Step 4 you registered the `.vercel.app` URL, go back to Stripe → Developers → Webhooks → your endpoint → **⋯** → **Update details**, and change the URL to `https://theanglerstore.com/api/webhooks/stripe`.

---

## Step 7 — Test the whole flow, then go live

### 7a. Test mode dry run

On `https://theanglerstore.com`, with test keys still active:

1. Add **VMC SureSet Circle Hooks** ($12.99) to the cart. Confirm shipping shows **$5.95** and a "Add $36.01 for free shipping" prompt.
2. Add the **PENN Wrath II Surf Combo**. Shipping should flip to **Free**.
3. Click **Checkout**. ✅ The Stripe payment form must appear **inline on theanglerstore.com**. If you get sent to `checkout.stripe.com`, something is wrong — tell me.
4. Pay with card `4242 4242 4242 4242`, any future expiry, any 3-digit CVC, any US address.
5. You should land on the success page and the cart should be empty.
6. **Check `ajbmuse@gmail.com`.** You want an email titled "🎣 New order — $172.98 — 2 items" with the line items, quantities, and shipping address. *This is the thing that has to work.*
7. Stripe → Developers → Webhooks → your endpoint → **Events** tab. The delivery should show **200**.

If the email doesn't arrive: check the webhook shows 200 (if not, the signing secret is wrong or you skipped the redeploy), then check Resend → **Logs** for a send failure.

### 7b. Switch to live

**⛔ YOUR HANDS**

1. Stripe: toggle **Test mode OFF** (top right)
2. **Developers → API keys** → copy the **live** `pk_live_…` and `sk_live_…`
   - If these are greyed out, Stripe hasn't finished activating your account — finish the business details from Step 1's note
3. **Developers → Webhooks** → **Add endpoint** again. Test and live webhooks are completely separate objects with different signing secrets. Same URL, same single `checkout.session.completed` event. Copy the new `whsec_…`.
4. Vercel → Settings → Environment Variables → edit all three: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
5. **Redeploy**
6. Buy something cheap from yourself with a real card, confirm the order email, then refund it in the Stripe dashboard. The 2.9% is worth the certainty.

---

## Step 8 — Verify your sending domain in Resend

Optional but do it within the first week — mail from `onboarding@resend.dev` lands in spam more often than mail from your own domain.

**⛔ YOUR HANDS**

1. Resend → **Domains** → **Add Domain** → `theanglerstore.com` → region closest to you
2. Resend shows 3 records (a DKIM `TXT`, an SPF `TXT` on a `send` subdomain, and a DMARC `TXT`)
3. Add each at Porkbun → DNS → **Add Record**, copying host and value exactly
   - ⚠️ Porkbun sometimes appends the domain to the host automatically. If Resend says host `resend._domainkey`, enter exactly that — not `resend._domainkey.theanglerstore.com`
4. Back in Resend, click **Verify**. Usually minutes.
5. Vercel → Environment Variables → change `RESEND_FROM_EMAIL` to `orders@theanglerstore.com` → **Redeploy**

---

## Step 9 — Google Search Console

**⛔ YOUR HANDS**

Same process you ran for ustidecharts.

1. Go to https://search.google.com/search-console
2. **Add property** → left box, **Domain** (not URL prefix) → `theanglerstore.com` → **Continue**
3. Google gives you a **TXT** record
4. Porkbun → DNS → **Add Record**: Type `TXT`, Host **blank**, Answer = the `google-site-verification=…` string
   - ⚠️ If you already have a TXT on the root (SPF, for instance) that's fine — multiple root TXT records are allowed. Add another, don't overwrite.
5. Wait ~5 minutes, then click **Verify** in Search Console
6. Once verified: left sidebar → **Sitemaps** → enter `sitemap.xml` → **Submit**

The sitemap has 30 URLs — home, all gear, 6 collections, 14 products, and the policy pages.

---

## Step 10 — Update the tide site

Back in your `tidecharts` folder:

```powershell
copy ..\theanglerstore\gear.ts.updated src\lib\gear.ts
git add src/lib/gear.ts
git commit -m "Real TheAnglerStore product names, prices, and images"
git push
```

Vercel redeploys ustidecharts automatically. Then spot-check: open a location page, click a gear card, and confirm it lands on the right product page with `?utm_source=ustidecharts&utm_medium=gear-rec` intact in the address bar.

`gear.ts.updated` also adds an `image` field per product pointing at the store's own generated product cards — real, branded, always matching the current name and price. If you want to render them on the tide site, the `productImage(key)` helper is exported.

---

## Step 11 — Analytics

1. Vercel → project → **Analytics** → **Enable**. Free, no code change.
2. To see which tide-site surfaces actually convert: Stripe → **Payments** → click any payment → scroll to **Metadata**. Every order carries `utm_source`, `utm_medium`, and `landing_path`. That tells you whether the location-page gear cards or the nav links are doing the work.

---

## ⚠️ Sales tax — flagged, not solved

`automatic_tax` is currently set to `false` in `src/app/api/checkout/route.ts`, so no sales tax is collected today.

That is the correct default for a store with no sales yet, but it is **not a permanent answer**. US states impose economic nexus thresholds — commonly around $100,000 in sales or 200 transactions into a single state per year — and once you cross one you're obliged to register in that state and collect. California has its own rules on top, and as a California-based seller you likely have obligations there from your first sale.

**I'm flagging this rather than advising on it — I'm not a tax professional and you should get proper advice before volume builds.** Talk to a CPA who handles e-commerce, ideally before you're doing meaningful revenue.

When you do need it, Stripe Tax handles the calculation:

1. Stripe → **Settings** → **Tax** → complete the setup (origin address, default tax category)
2. Register in each state where you have nexus (Stripe Tax monitors thresholds and warns you, but registration is on you)
3. In `src/app/api/checkout/route.ts`, change `automatic_tax: { enabled: false }` to `{ enabled: true }`
4. Commit, push, and Vercel redeploys

Stripe Tax costs 0.5% per transaction where it calculates tax. Cheap relative to getting it wrong.

---

## Where to look when something breaks

| Symptom | Look here |
|---|---|
| Payment form redirects off-site | `ui_mode: "embedded"` in `src/app/api/checkout/route.ts` |
| "Checkout isn't live yet" on /checkout | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` missing, or no redeploy after adding it |
| Paid but no email | Stripe → Webhooks → Events (should be 200), then Resend → Logs |
| Webhook shows 400 | `STRIPE_WEBHOOK_SECRET` doesn't match the endpoint — test vs live secrets differ |
| Webhook shows 503 | `STRIPE_WEBHOOK_SECRET` not set at all, or no redeploy |
| Domain stuck "Invalid Configuration" | Leftover Porkbun parking ALIAS or wildcard CNAME (Step 6b) |
| Certificate won't issue | Stale `_acme-challenge` TXT at Porkbun (Step 6b) |
| Order email is missing the address | Stripe → the payment → check `shipping_address_collection` captured it |

Vercel function logs: project → **Logs**, filter to `/api/webhooks/stripe`. The webhook logs the full order text there even when Resend is unconfigured, so nothing is ever lost.
