# Deploying TheAnglerStore

Same workflow as ustidecharts.com: extract → push to GitHub → Vercel builds → point DNS.
Total time is about 30 minutes, most of it waiting on DNS.

---

## 1. Push to GitHub

Extract this folder somewhere sensible, then from PowerShell inside it:

```powershell
git init
git add .
git commit -m "TheAnglerStore: Next.js + Stripe storefront"
git branch -M main
git remote add origin https://github.com/2dles/theanglerstore.git
git push -u origin main
```

Create the empty `theanglerstore` repo on GitHub first (no README, no .gitignore — this folder has one).

`node_modules/` and `.next/` are gitignored, so the push is small.

---

## 2. Create the Vercel project

Vercel → Add New → Project → import `2dles/theanglerstore`. Framework detects as Next.js; every default is correct. Don't deploy yet — set the environment variables first, or the first build will succeed but checkout will be dead.

---

## 3. Stripe

### 3a. Keys

Stripe Dashboard → Developers → API keys. Start in **test mode** — the toggle is top-right and the keys differ.

In Vercel → Settings → Environment Variables, add for **Production, Preview, and Development**:

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_…` (then `sk_live_…` when you go live) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_…` |
| `NEXT_PUBLIC_SITE_URL` | `https://theanglerstore.com` |

### 3b. Webhook — this is the fulfillment trigger

Deploy once first so the endpoint exists. Then Stripe → Developers → Webhooks → Add endpoint:

- **URL:** `https://theanglerstore.com/api/webhooks/stripe`
- **Event:** `checkout.session.completed` (just that one)

Copy the signing secret (`whsec_…`) into Vercel as `STRIPE_WEBHOOK_SECRET` and redeploy.

### 3c. Turn on Stripe's own notifications as a backstop

Stripe → Settings → Business → **Email notifications** → enable "Successful payments". If the webhook ever fails silently, this email is what stops an order being missed. Belt and braces — the whole business depends on you finding out that an order happened.

---

## 4. Resend (order emails)

1. [resend.com](https://resend.com) → sign up. Free tier is 3,000 emails/month, 100/day — far more than you need.
2. API Keys → Create → copy the `re_…` key.
3. In Vercel add:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | `re_…` |
| `ORDER_NOTIFICATION_EMAIL` | `ajbmuse@gmail.com` |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` at first |

`onboarding@resend.dev` is Resend's shared sender and works immediately. Once theanglerstore.com DNS is live, verify the domain in Resend (it gives you DKIM/SPF records to add at Porkbun) and switch this to `orders@theanglerstore.com` so the emails don't land in spam.

**If `RESEND_API_KEY` is missing the webhook does not crash** — it logs the full order to the Vercel function log and returns 200. You'd still have Stripe's own email. But set it up; reading Vercel logs to fulfill orders gets old fast.

---

## 5. Point the domain (Porkbun)

In Vercel → Project → Settings → Domains, add `theanglerstore.com` and `www.theanglerstore.com`. Vercel shows the records it wants.

At Porkbun → theanglerstore.com → DNS. **Two gotchas from the ustidecharts deploy, both of which will bite again:**

1. **Delete the parking records first.** Porkbun pre-populates an `ALIAS` record on the root and a wildcard `CNAME` (`*`). Vercel's A record cannot coexist with them. Delete both before adding anything.
2. **Check for stale `_acme-challenge` TXT records.** If any exist from a previous certificate attempt, delete them — they break Vercel's cert issuance in a way that's genuinely hard to diagnose.

Then add:

| Type | Host | Answer |
|---|---|---|
| A | *(blank / root)* | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Use whatever values Vercel actually displays — they change occasionally. Propagation is usually 5–30 minutes; the cert issues automatically once Vercel sees the records.

---

## 6. Test the whole flow before going live

With test keys still active, on the deployed site:

1. Add a rod and a hook pack to the cart. Confirm shipping shows **Free** above $49 and **$5.95** below.
2. Go to checkout. The Stripe form must render **inline on theanglerstore.com** — if you get bounced to `checkout.stripe.com`, `ui_mode: "embedded"` isn't taking effect.
3. Pay with `4242 4242 4242 4242`, any future expiry, any CVC, any US address.
4. You should land on `/checkout/success` and the cart should be empty.
5. **Check your inbox for the order email** — line items, quantities, shipping address. This is the thing that must work.
6. Stripe → Developers → Webhooks → your endpoint → check the delivery shows 200.

Then swap `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to live values, create a **second** webhook endpoint in live mode (test and live webhooks are separate, and the signing secret is different), update `STRIPE_WEBHOOK_SECRET`, and redeploy.

Do one real £/$ purchase of a cheap item on yourself and refund it. Worth the 2.9%.

---

## 7. Update the tide site

`gear.ts.updated` in this folder is a drop-in replacement for `src/lib/gear.ts` in the tidecharts repo — real names and prices matching this catalog, same keys, same shape.

```powershell
# in the tidecharts repo
copy ..\theanglerstore\gear.ts.updated src\lib\gear.ts
git add src/lib/gear.ts
git commit -m "Real TheAnglerStore product names and prices"
git push
```

Vercel redeploys ustidecharts automatically.

---

## 8. Analytics + Search Console

- **Vercel Analytics** — Project → Analytics → Enable. Free tier, no code changes.
- **Google Search Console** — add `theanglerstore.com` as a domain property (verify with the TXT record Porkbun accepts), then submit `https://theanglerstore.com/sitemap.xml`. Same process you ran for ustidecharts.
- Watch the `utm_source=ustidecharts` metadata on Stripe payments to see which tide-site surfaces actually convert. That number decides where the next round of work goes.

---

## Environment variables, all together

| Name | Required | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | yes | Creating checkout sessions |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | yes | Rendering embedded checkout |
| `STRIPE_WEBHOOK_SECRET` | yes | Verifying webhook signatures |
| `RESEND_API_KEY` | strongly | Order emails |
| `ORDER_NOTIFICATION_EMAIL` | strongly | Where order emails land |
| `RESEND_FROM_EMAIL` | no | Defaults to `orders@theanglerstore.com` |
| `NEXT_PUBLIC_SITE_URL` | no | Falls back to request origin |

The site builds and browses fine with none of them set — only checkout is disabled, and it says so on screen rather than erroring.

---

## Local development

```powershell
npm install
copy .env.example .env.local   # fill in your test keys
npm run dev
```

For webhooks locally:

```powershell
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

That prints a `whsec_…` for your `.env.local`.
