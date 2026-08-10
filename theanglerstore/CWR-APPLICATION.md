# CWR application + resale certificate

Everything you need to submit, in the order you'll be asked for it.

**Seller's permit:** `149-149904` — issued 09 Aug 2026, annual filing (period ends 31 Dec 2026)
**CDTFA confirmation:** `0-059-117-470`

---

## 1. Print the permit first

CDTFA online services → **Home** → your Sales and Use Tax account → there's a link to view/print the permit. Save the PDF. CWR may ask you to upload it, and every future supplier will too.

Keep it somewhere you'll find it in a year — a `business/` folder, not Downloads.

---

## 2. CDTFA-230 — the resale certificate

**This is not something CDTFA issues to you. You fill it out and hand it to your supplier.** That trips up nearly everyone the first time.

What it does: it tells CWR "don't charge me California sales tax on this, I'm reselling it and I'll collect the tax from the end customer myself." Without it, CWR charges you tax on every order and your margin dies.

Download: search `CDTFA-230` at cdtfa.ca.gov, or it's usually at `cdtfa.ca.gov/formspubs/cdtfa230.pdf`.

Fill it exactly like this:

| Field | What to put |
|---|---|
| Seller's permit number | `149-149904` |
| I certify that I hold a valid seller's permit... | tick it |
| Purchaser's name | `AUGUSTUS J. MUSE, DBA THEANGLERSTORE` |
| Business address | `8892 Cider Springs Rd, Sebastopol, CA 95472` |
| Description of property to be purchased | `Fishing rods, reels, line, terminal tackle, lures, landing nets, pliers, tackle bags, coolers, headlamps, and related fishing accessories` |
| Name of seller (issued to) | `CWR Wholesale Distribution` |
| Signature / printed name / title | your signature, `Augustus J. Muse`, `Owner` |
| Date | date you sign it |

**Two things that matter legally:**

- Only list categories you genuinely intend to resell. Buying something on a resale certificate and then using it yourself makes you liable for the use tax on it, plus interest. If you order a rod for your own use, order it separately and pay the tax.
- A blanket certificate stays on file with CWR and covers all future orders. You don't re-send it each time.

You'll need a separate copy of the same form for Burch and Printful. Same details, different "name of seller."

---

## 3. CWR signup

**https://cwrdistribution.com/signup**

Answers that are ready to paste:

| Field | Answer |
|---|---|
| Business name | `THEANGLERSTORE` |
| Business type | Sole proprietorship |
| Owner name | Augustus J. Muse |
| Address | 8892 Cider Springs Rd, Sebastopol, CA 95472 |
| Phone | 707-508-7118 |
| Email | ajbmuse@gmail.com |
| Resale / seller's permit number | `149-149904` |
| Federal Tax ID / EIN | *(see note below)* |
| Sales venue | `Own e-commerce website — theanglerstore.com` |
| Website | `https://theanglerstore.com` |
| Years in business | Be accurate — new. Don't inflate it. |
| Product categories of interest | Rods & reels, terminal tackle, lines & leaders, nets & gaffs, storage (Plano), coolers, marine accessories |

**On the EIN:** as a sole proprietor you can legally use your SSN, but don't. An EIN is free, takes about five minutes at irs.gov ("Apply for an Employer ID Number"), issues instantly online, and means your SSN isn't sitting in a distributor's vendor database. Get one before you submit this. You'll want it for the bank account anyway.

**Sales venue is the question that matters.** CWR markets itself to drop-shippers and explicitly welcomes online-only sellers, so "own e-commerce website" is the right answer and not a weakness. Don't claim a physical storefront you don't have.

**Ask them these two things** in the notes field or in a follow-up email:

1. Is a resale certificate required for a credit-card account, or only for COD/Net terms?
2. Confirm the blind-dropship terms — company name and return address on the label are ours, correct?

Expect the account to be active in 24–48 hours with a card on file.

---

## 4. Once the account is live

The reason CWR sits at the top of the supplier list isn't price — it's that **Tools → Download Images / Export Data** gives you licensed product photography and data feeds without writing a single email. That's what unblocks the `image` field on every product and closes the last Search Console gap for real.

Order of operations after approval:

1. Export the catalog, find the real SKUs matching our 14 keys
2. Pull images, drop them at `public/products/<key>.jpg`, add `image:` to each product in `src/lib/products.ts`
3. Update `shipsIn` per product from CWR's actual dispatch and zone transit
4. Update the cost/margin table in `SOURCING.md` with real wholesale numbers
5. Order one sample of a rod and one of a small item — you need to have held the thing you're selling

---

## 5. Still outstanding

- **Sonoma County Fictitious Business Name filing** — required to operate as "THEANGLERSTORE" and to open a business bank account. ~$50 plus four weeks of newspaper publication. Start it now; the clock is the slow part.
- **EIN** — free, five minutes, do it before the CWR form.
- **Covered battery-embedded fee question** — the rechargeable headlamp. Ask CDTFA via Online Chat; don't guess.
- **Sales tax filing** — you're on annual, first return due after 31 Dec 2026. Talk to an accountant before then, not after.
