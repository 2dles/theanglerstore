# Stripe test-mode checkout — adapted for the existing account

RUNBOOK.md Step 1 assumes a brand-new Stripe account. You're reusing the qrcodes.gg one, and the site is already deployed, so these are the actual steps.

**The whole point of this pass is to prove the money path works before a real customer finds it.** Test mode costs nothing and touches no real card.

---

## 1. Get test keys from the existing account

https://dashboard.stripe.com

1. **Top right — turn the Test mode toggle ON.** Everything below is test mode. If you skip this you'll wire live keys into a store with no fulfilment behind it.
2. **Developers → API keys**
3. Copy the **Publishable key** (`pk_test_…`)
4. Click **Reveal test key** and copy the **Secret key** (`sk_test_…`)

These are separate from qrcodes.gg's live keys and can't touch its real payments.

---

## 2. Resend key

If you haven't already: https://resend.com/signup → **API Keys → Create API Key** → name `theanglerstore`, **Sending access**, **All domains** → copy the `re_…` value. Resend shows it once.

---

## 3. Environment variables in Vercel

Your project → **Settings → Environment Variables**. Add each with **Production, Preview, and Development** all ticked:

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_…` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_…` |
| `RESEND_API_KEY` | `re_…` |
| `ORDER_NOTIFICATION_EMAIL` | `ajbmuse@gmail.com` |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` |
| `NEXT_PUBLIC_SITE_URL` | `https://theanglerstore.com` |

Don't add `STRIPE_WEBHOOK_SECRET` yet — it doesn't exist until the next step.

---

## 4. Register the webhook

Still in **test mode**: **Developers → Webhooks → Add endpoint**

- **Endpoint URL:** `https://theanglerstore.com/api/webhooks/stripe`
- **Events to send:** search and select **`checkout.session.completed`**. That one event only.
- Click **Add endpoint**
- On the endpoint page, **Signing secret → Reveal**. Starts `whsec_…`

Add it to Vercel as `STRIPE_WEBHOOK_SECRET`, then **redeploy** (Deployments → latest → ⋯ → Redeploy). Environment variables only take effect on a new build.

**Why this store is safe on a shared account:** the webhook checks `session.metadata.store === "theanglerstore"` and ignores anything else. qrcodes.gg payments landing on this endpoint are dropped silently rather than emailing you a fake fishing order.

---

## 5. Run a test order

1. Open https://theanglerstore.com/products/braided-line — add to cart
2. Go to checkout. The Stripe form should render **inline on our domain**, not redirect.
3. Pay with:
   - Card `4242 4242 4242 4242`
   - Any future expiry, any CVC, any ZIP
   - Any name, any US address

**What should happen:**

- Redirect to `/checkout/success`, cart cleared
- The payment appears in Stripe → **Payments** with metadata showing `store: theanglerstore`, the utm fields, and `ship_zone: us`
- An order email arrives at ajbmuse@gmail.com within a few seconds
- Stripe → Webhooks → your endpoint shows a **200** response

**If the email doesn't arrive** but the webhook shows 200, the Resend key is wrong or missing — the handler deliberately logs and returns 200 rather than throwing, so Stripe doesn't retry-loop. Check Vercel runtime logs for `[webhook]`.

**If the webhook shows 400**, the signing secret is wrong or you didn't redeploy after adding it.

---

## 6. Cards worth testing beyond the happy path

| Card | Tests |
|---|---|
| `4000 0000 0000 9995` | Declined — insufficient funds. Should show an error in the form, no order email. |
| `4000 0025 0000 3155` | Requires 3D Secure authentication. Should prompt, then succeed. |
| `4000 0000 0000 0002` | Generic decline. |

You want to see a decline behave gracefully at least once. A store that white-screens on a declined card loses the customer who would have retried with a different card.

---

## 7. Do not go live yet

Switching to live keys means a stranger can buy a rod you have no way to ship. Live mode waits until:

- CWR account is approved
- You've placed at least one real supplier order end to end
- Stripe business activation is complete (Settings → Business settings — legal name, address, bank account, EIN. Start this now, it can take a day.)

Test mode is where this store should live until the supply chain is real.
