# Get it live in 10 minutes

You don't need Stripe. You don't need images. You don't need a dealer account, a domain, or an email to anybody.

The site builds and browses perfectly with **zero** environment variables — checkout just shows "not configured yet" instead of erroring. So put it up, look at it on your phone, and decide what to fix next from there.

Ignore `RUNBOOK.md` for now. That's for when you're taking money.

---

## Step 1 — See it on your own machine (2 minutes)

Extract the zip, then in PowerShell inside that folder:

```powershell
npm install
npm run dev
```

Open **http://localhost:3000**. That's the whole site.

If `npm` isn't recognised, install Node from [nodejs.org](https://nodejs.org) (LTS), reopen PowerShell, and run it again.

Skip to Step 2 whenever you like — this step is just a fast sanity check.

---

## Step 2 — Put it on GitHub (3 minutes)

Create an empty repo at [github.com/new](https://github.com/new): owner `2dles`, name `theanglerstore`. **Don't** tick README, .gitignore, or licence — the folder already has them.

Then:

```powershell
git init
git add .
git commit -m "TheAnglerStore"
git branch -M main
git remote add origin https://github.com/2dles/theanglerstore.git
git push -u origin main
```

---

## Step 3 — Deploy (5 minutes)

1. [vercel.com/new](https://vercel.com/new)
2. Import `2dles/theanglerstore`
3. Team: `ajbmuse-9126`
4. **Don't add any environment variables.** Leave that section closed.
5. Click **Deploy**

Two minutes later you have a live URL like `theanglerstore-xxxx.vercel.app`.

**That's it.** Open it on your phone. Send it to someone. Every page works — 14 products, 6 collections, the cart with live shipping maths, the walkthroughs, all the policy pages.

---

## What works and what doesn't, at this point

**Works:** everything you can look at. Browsing, cart, quantities, the free-shipping threshold, mobile, SEO tags, sitemap, product images (illustrations), OG cards when you share a link.

**Doesn't:** the Checkout button. It shows a clear message saying payments aren't configured. That's deliberate — it fails honestly instead of half-working.

**Nobody can find it yet.** The `.vercel.app` URL isn't indexed and isn't linked from anywhere. It's yours to look at.

---

## Then, in whatever order suits you

| Want to… | Do this | Time |
|---|---|---|
| Use the real domain | `RUNBOOK.md` Step 6 — Porkbun DNS | 30 min |
| Take actual money | `RUNBOOK.md` Steps 1–5 — Stripe + Resend | 45 min |
| Get real product photos | `IMAGES.md` | varies |
| Improve margins | `SOURCING.md` — dealer accounts | weeks |

None of them block the others, and none of them block deploying.

---

## Changing things

Everything customer-facing is in **`src/lib/products.ts`** — names, prices, descriptions, specs. Edit, then:

```powershell
git add .
git commit -m "updated prices"
git push
```

Vercel redeploys itself in about a minute. Same loop as the tide site.

Free shipping threshold is two numbers in `src/lib/stripe.ts`. Read the note in `SOURCING.md` before changing them — a couple of SKUs go underwater if the threshold moves.
