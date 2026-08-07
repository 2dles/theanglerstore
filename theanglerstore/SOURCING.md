# Sourcing & margin — TheAnglerStore

*Researched August 2026. Every price below was read off a live supplier page unless flagged UNVERIFIED.*

This is the operational document. When an order email arrives, open this file, place each line with its supplier, ship to the customer's address.

**Prices move.** Re-verify anything before a big push, and re-check the flagged rows monthly.

**Sales tax is not handled and is flagged, not solved** — see RUNBOOK.md § Sales tax. `automatic_tax` is off; get advice from a CPA before volume builds.

---

## The equation everything is built on

Manual dropship carries a fixed drag per order: inbound freight plus Stripe's $0.30 fixed leg. Plus 2.9% variable.

```
Net$  = Retail − ProductCost − InboundShipping − (0.029 × Retail + 0.30)
Net%  = Net$ / Retail
```

For a 25% net, the most you can pay for a product is:

```
MaxCost = 0.721 × Retail − InboundShipping − 0.30
```

That single line explains every pricing decision in this catalog. On a $12.99 hook pack with $3.99 inbound, the fixed drag is a third of revenue before you have paid for a hook. **There is a hard floor around $26 retail below which standalone SKUs do not work.** Two of the fourteen keys sit below it and are marked `add-on`.

---

## The catalog

| Key | Product | Supplier | Cost | Inbound | Retail | Net $ | Net % | Ship time | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| `surf-rod` | PENN Wrath II Surf Combo 10' H / 8000 (WRTHII8000102H) | [pennfishing.com](https://www.pennfishing.com/products/wrath-ii-spinning-combo-1595547) | $109.99 | **$0** | $159.99 | $45.06 | **28.2%** | 3–6 d | ✅ GO |
| `inshore-combo` | PENN Wrath II Combo 7' M / 4000 (WRTHII4000702M) | [pennfishing.com](https://www.pennfishing.com/products/wrath-ii-spinning-combo-1595547) | $79.99 | **$0** | $129.99 | $45.93 | **35.3%** | 3–6 d | ✅ GO — best in catalog |
| `braided-line` | Reaction Tackle X8 30 lb / 300 yd (FG8-30-300-FBM) | [reactiontackle.com](https://reactiontackle.com/products/reaction-tackle-x8-braided-fishing-line-hi-vis-green-8-strand) | $20.98 | **$0** | $29.99 | $7.84 | **26.1%** | 2–5 d | ✅ GO (repriced) |
| `fluoro-leader` | Reaction Tackle 100% Fluorocarbon 15 lb / 50 yd | [reactiontackle.com](https://reactiontackle.com/products/reaction-tackle-100-pure-fluorocarbon-fishing-line) | $11.98 | **$0** | $17.99 | $5.19 | **28.8%** | 2–5 d | ✅ GO (repriced) |
| `circle-hooks` | VMC 7381 SureSet Circle, black nickel | [Discount Tackle](https://discounttackle.com/products/vmc-7381-sureset-circle-hooks-black-nickel-12-pack) | $4.39 | $0 (rides along) | $12.99 | $7.92 | **61.0%** | 2–5 d | ⚠️ ADD-ON ONLY |
| `carolina-kit` | Terra Firma Carolina Rig × 3 | [terrafirmatackle.com](https://terrafirmatackle.com/products/carolina-rig-kit-for-surf-fishing) | ~$10.50 | ~$6 UNVERIFIED | $24.99 | ~$7.47 | **~29.9%** | 4–7 d | ⚠️ VERIFY FIRST |
| `swimbait-kit` | Z-Man Slim SwimZ 2.5" 8pk ×2 + DieZel MinnowZ 4" 5pk | [Discount Tackle](https://discounttackle.com/collections/saltwater-swimbaits) | $13.17 | $9.99 exp. | $34.99 | $10.52 | **30.1%** | 2–5 d | ✅ GO |
| `jig-assort` | Eagle Claw Trokar Pro-V Bucktail Assortment (1/2/3 oz) | [Discount Tackle](https://discounttackle.com/products/eagle-claw-trokar-pro-v-bucktail-hair-jig-assortment-pack) | $14.02 | $9.99 exp. | $34.99 | $9.67 | **27.6%** | 2–5 d | ✅ GO |
| `landing-net` | KastKing Brutus Foldable, PVC mesh 15×12×10 | [kastking.com](https://kastking.com/products/kastking-brutus-fishing-net) | $29.99 | $7.98 std | $49.99 | $10.27 | **20.5%** † | 2–5 d | ⚠️ BUNDLE |
| `sand-spike` | Sea Striker 27" PVC Sand Spike × 2 | [Beach Bum Outdoors](https://beachbumoutdoors.com/products/sea-striker-rod-holder-sand-spike-pvc-27in) | $15.98 | $6.00 | $34.99 | $11.70 | **33.4%** | **5–8 d** ‡ | ⚠️ SLOW |
| `pliers` | KastKing AlumaStream 7.5" Aluminum | [kastking.com](https://kastking.com/products/kastking-alumastream-aluminum-fishing-pliers-combo) | $25.99 | $7.98 std | $49.99 | $14.27 | **28.5%** | 2–5 d | ✅ GO (repriced) |
| `tackle-bag` | KastKing Everyday Essential Backpack & Tool Set | [kastking.com](https://kastking.com/collections/tackle-bags) | $44.99 | $7.98 std | $74.99 | $19.55 | **26.1%** | 2–5 d | ✅ GO |
| `cooler` | RTIC Ultra-Tough Soft Cooler, 30 can — **substituted** | [rticoutdoors.com](https://rticoutdoors.com/shop/coolers/soft-sided) | ~$129 UNVERIFIED | $0 (free $35+) | $184.99 | $50.32 | **27.2%** | 3–7 d | ⚠️ SUBSTITUTE |
| `headlamp` | Foxelli MX200 Rechargeable | [foxelli.com](https://foxelli.com/products/headlamp-mx200) | $15.97 | ~$5.95 UNVERIFIED | $37.99 | $14.97 | **~39%** | 3–7 d | ✅ GO |

† `landing-net` standalone is 20.5%. In a consolidated KastKing order of 2+ items the supplier order clears their $50 free-shipping threshold and it jumps to **36.5%**. See below.
‡ `sand-spike` is the one key that cannot meet the 2–7 day promise. See below.

**Blended position:** 11 of 14 keys are clean GOs at 26–61%. Every key resolves to a real, orderable US product — the URL contract is intact.

---

## Honoring the 2–7 business day promise

The shipping page states a 2–7 business day standard. That is only true if you buy the **faster service** at each supplier, and the table above is already costed that way. What changed from the first pass:

| Supplier | Service to use | Cost | Transit | Not this |
|---|---|---|---|---|
| pennfishing.com | Free Ground | $0 | 1–5 d | — |
| reactiontackle.com | Free, no minimum | $0 | 2–5 d | — |
| Discount Tackle | **Expedited** | $9.99 | 1–3 d | Economy $3.99 / 4–7 d → lands at 5–8 door-to-door |
| KastKing | **Standard** | $7.98 | 2–5 d | Economy $4.98 / 2–8 d |
| Foxelli | Standard | ~$5.95 | 3–7 d | — |
| Beach Bum Outdoors | Flat | $6.00 | 5–8 d | *no faster option published* |

**Two prices moved to absorb the faster freight:**

| Key | Was | Now | Why |
|---|---|---|---|
| `swimbait-kit` | $29.99 | **$34.99** | Discount Tackle expedited adds $6.00. At $29.99 it nets 18.9%. |
| `pliers` | $44.99 | **$49.99** | KastKing standard adds $3.00. At $44.99 it nets 20.9%. |

**Consolidate per supplier — it is worth real money.** Each customer order becomes one supplier order per supplier, with one freight charge. Two consequences:

- **KastKing:** a supplier order over $50 ships **free**. `landing-net` ($29.99) + `pliers` ($25.99) = $55.98 → free freight → those two go from 20.5% and 28.5% to **36.5% and 40.6%**. The $49 free-shipping threshold on the storefront is deliberately set to encourage exactly this basket.
- **Discount Tackle:** `circle-hooks`, `swimbait-kit`, and `jig-assort` all ship from there. One $9.99 expedited charge covers all three in one box, so a multi-item Discount Tackle order is dramatically better than three single ones.

**The one exception — `sand-spike`.** Beach Bum Outdoors runs 2–3 days processing plus 3–5 days transit and publishes no faster service, so this key is quoted at **5–8 business days** on its product page and named explicitly on the shipping policy page. Do not quietly average it away. Two ways to fix it later:

1. **Promar direct** ([promarahi.com](https://promarahi.com/products/pvc-sand-spikes)) — RH-36P 36" spikes at $10.99 each, next-business-day dispatch, Economy 2–7 days, ~$12 freight. Two-pack at $49.99 retail nets 28.5% and meets the promise. The trade is a $15 price rise and a bulkier product.
2. **A wholesale account** (Step: CWR or Burch below) — Sea Striker is a mainstream US brand and both distributors ship same-day. This is the better answer and it solves several other rows at the same time.

---

## The three decisions you should know about

### 1. `cooler` — the 45 qt rotomolded is not sellable, and the key was substituted

The brief specified a 45 qt rotomolded hard cooler at $189.99. It cannot be done, and the reason is not the one I expected.

Dimensional weight turned out to be **less** of a problem than feared — a real 45 qt carton (26.4 × 18.2 × 15.8) bills at ~54 lb, not the ~77 lb I had assumed, and every major brand absorbs the freight themselves (RTIC ships free over $35). The actual killer is the **price ceiling**: every source you can order from one-at-a-time sells at consumer retail. To make 25% on an RTIC 45 QT bought at $239 you would have to list it at **$332** — about $90 over what the customer pays going direct to RTIC. The one near-miss (CaterGator at $149.99 via WebstaurantStore) fails on diligence: the "free shipping" flag requires a $99/month WebstaurantPlus membership, sales tax applies without a resale certificate, and a restaurant-supply invoice lands in your customer's box.

**What was done:** the `cooler` key still resolves — it now serves an RTIC soft cooler at $184.99 (27.2%), and the product page states plainly why the hard cooler isn't offered. That is better than a 301, because the URL keeps converting.

**If you'd rather redirect instead:** add `cooler: "/collections/coolers"` to `REDIRECTS` in `src/lib/products.ts`. UTM params are preserved through the 301 automatically.

### 2. `carolina-kit` — the 220-piece rig kit does not exist in the US at a workable price

Every multi-piece surf rig kit on the market is the same Chinese white-label box (Dr.Fish, AGOOL, VanRolldex) sold at consumer retail. Dr.Fish's 304-piece kit costs **$36.29 brand-direct** — $13 above the target retail — and their own shipping policy quotes **3–14 working days** with China-consolidation shipping lines you cannot opt out of. That fails the 2–7 day constraint outright.

**What was done:** substituted a Terra Firma Tackle 3-pack of hand-tied Carolina rigs — a real US-made product at ~$10.50 that supports $24.99 retail. The product page is honest about the substitution.

### 3. Four keys were repriced because the brief's prices did not survive sourcing

| Key | Brief | Now | Why |
|---|---|---|---|
| `braided-line` | $24.99 | **$29.99** | At $24.99 the margin is 12%. A name-brand 8-strand 300 yd spool retails $30–40 in the US; $25 was below market. |
| `pliers` | $27.99 | **$44.99** | KastKing and Piscifun sell theirs DTC at $25–26. After freight you are at $31 landed — the $28–32 band nets *negative*. |
| `sand-spike` | $21.99 | **$34.99** | Cheapest US spike is $7.99. Two plus $6 freight is $21.98 landed. $24.99 nets 8%. |
| `tackle-bag` | $59.99 | **$74.99** | Cost $44.99 + freight. $59.99 nets 14%. |
| `swimbait-kit` | $29.99 | **$34.99** | Expedited freight, to meet the 2–7 day promise. |
| `pliers` (2nd move) | $44.99 | **$49.99** | Standard freight, to meet the 2–7 day promise. |

The rods went the other way and are now *better* than the brief assumed, because of the finding below.

---

## The single most useful finding: buy rods brand-direct

Every independent tackle retailer surcharges long rods, which destroys the margin:

| Retailer | Rod penalty |
|---|---|
| TackleDirect | $10 tube fee, excluded from shipping promos |
| Discount Tackle | $20–50 rod shipping, carved out of the $59 free-ship threshold |
| Tackle Warehouse | Free ship "excludes oversized"; rods ship in multiple boxes |
| FishUSA | Oversize carve-out, no published cap |

**pennfishing.com eats it.** Their shipping policy reads "Free Ground Shipping on **all orders** to the contiguous 48" with no oversize, long-rod, or freight exclusion of any kind, and same-day dispatch before 12pm CST. That is what makes both rod keys work at 28% and 35%. `uglystik.com` (free over $50) and `reactiontackle.com` (free, no minimum, ships from Wisconsin in 1 business day) behave the same way.

**Rule: never buy a rod from a general tackle retailer. Always brand-direct.**

---

## Why the free-shipping threshold is $49

Set in `src/lib/stripe.ts` as `FREE_SHIPPING_OVER = 49`, `FLAT_SHIPPING = 5.95`.

The $5.95 collected below $49 covers the $3.99 inbound with buffer, and it converts every low-ticket standalone loss into a profit. Compare a 25-count circle hook pack:

| Scenario | Collected | Costs | Net | Net % |
|---|---|---|---|---|
| Free ship, standalone @ $11.99 | $11.99 | $9.19 + $3.99 + $0.65 | −$1.84 | **−15.3%** |
| $5.95 charged @ $13.99 | $19.94 | $9.19 + $3.99 + $0.88 | $5.88 | **29.5%** |
| Add-on inside a $49+ basket | $16.99 | $9.19 + $0 + $0.49 | $7.31 | **43.0%** |

**Do not raise the threshold to $59** hoping to trigger Discount Tackle's own free-ship tier — your supplier order won't reach $59 until your retail basket is near $120. You will pay the $3.99 on essentially every order. Price for that.

---

## Order these three samples before launch

1. **`carolina-kit` — Terra Firma Carolina Rig 3-pack.** The only key whose supplier and shipping cost are entirely unverified. Order one, record the real shipping charge and transit time, then confirm or adjust the $24.99 price. Highest-risk row in the table.
2. **`headlamp` — Foxelli MX200.** Foxelli's under-$90 shipping rate is not published. At an assumed $5.95 it nets 29.7%; at $9.95 it drops to 17.6%. One order settles it. Also confirm the hold-to-red actually works as documented — the red mode is the entire sales argument.
3. **`landing-net` — KastKing Brutus.** Margin clears at exactly 26.5% and *only* at $49.99 — at $47.99 it fails. Since there is no pricing headroom, the product has to justify $49.99 on quality alone. Check the folding hinge and the push-button handle lock; those are where cheap nets fail.

Optional fourth: **`braided-line`**, because it is the anchor add-on for every rod sale and the no-fade claim is worth verifying on your own reel.

---

## Supplier accounts to open (in order)

These replace retail sourcing with real wholesale and roughly double the margins above. Ranked by verified terms.

### 1. CWR Wholesale Distribution — apply first
*Bayville NJ + Tampa FL.* The only supplier found that publishes **all four** of the things that matter, on its own site: no account fee, no minimum order, no dropship fee, and fully blind shipping ("CWR will be totally blind on this shipment"). Same-day dispatch if ordered by 4pm EST, flat shipping from $9.95, account active in 24–48 hours with a card on file. 18,000 SKUs, 300+ brands. Marine-leaning, so strongest on rod holders, nets, lines/leaders, Plano storage, coolers.
**Ask:** is a resale certificate required for a credit-card account, or only for COD/Net terms?

### 2. Burch Fishing Tackle — apply in parallel
*Florence, AL.* Best catalog fit by a wide margin: 15,000 SKUs, 60+ real brands (Rapala, Berkley, Strike King, Abu Garcia, Daiwa, Okuma, Mustad), and a published program stating they provide **blind drop shipping for any online merchant** selling on their own website. They have no automated order channel at all, which means manual ordering is simply how everyone works with them — an advantage here. None of their terms are published, so you are applying blind.
**Ask:** per-order dropship fee, minimum opening order, ongoing minimums, resale certificate, dispatch time, MAP policy, and whether your name goes on the return label.

### 3. Free Inventory Source directory account — 20 minutes, $0
Their **Supplier Directory Search tier is free** and exposes contact details and stated policies for Hicks Inc., Kroll, Land 'N' Sea, Sports South and others. Use it as a lead list to approach suppliers directly and skip the $199–$599/mo automation tiers entirely.

### Do not pursue
- **Zendrop** — new accounts bill through a Shopify or Wix subscription, and the sample/manual order button does not function without a connected store. Two hard blockers.
- **Spocket** — $40–300/mo, and their Sports & Outdoors category has no fishing subcategory at all.
- **US Direct** — requires a $299/mo Full Automation plan.
- **Big Rock Sports** — requires a brick-and-mortar storefront; explicitly refuses e-commerce-only businesses.
- **Nicklow's** — states plainly "We do not drop-ship."
- **Sportsman's Supply** — "currently not accepting new customers."
- **FishUSA Wholesale** — no minimums, but dealers may not sell online without written authorization. One phone call is worth it; assume no.

### On Amazon / Walmart as a source
Viable only as an **emergency backfill** when a supplier stocks out mid-order. You would be buying at retail — often below your own listed price — so there is no margin model here. Note also that Amazon gift receipts hide the *price*, not the *sender*: the box, return address, and shipping notification are all Amazon's, and returns route to Amazon rather than to you. Prime's terms restrict membership to personal, non-commercial use. Use it to save an order you'd otherwise refund, priced at break-even, and never as a catalog strategy.

---

## Why not just source generic Chinese goods?

Researched August 2026, because it's the obvious question when margins are 26–35%. The answer is no, on three independent grounds — any one of which is sufficient.

### 1. The price points don't exist

This is the decisive one. Verified US retail for the generic versions:

| Category | Our price | What the generic actually sells for |
|---|---|---|
| Pliers | $49.99 | **$17.99–$19.99** (Piscifun, Booms X1, Danco) — and the entire *branded* KastKing plier line tops out at $32.99 |
| Sand spike | $34.99 | **$4.99** Sea Striker PVC · $11.99 Marathon 36" PVC. $35 is the *aluminum* price. |
| Landing net | $49.99 | **$20–$26** for folding rubber-mesh, unbranded |
| Jig assortment | $34.99 | **$4.99** for a 25-piece jig head kit at Jann's Netcraft |
| Tackle backpack | $74.99 | $29.92–$34 generic; $69.99 only with a brand (Piscifun) |

These aren't stretch targets, they're arithmetically unreachable. And the punchline: **Piscifun, KastKing, PLUSINNO and Bassdash *are* the Chinese generics** — they've already built the brand equity, review counts, and Prime shipping. Going generic means entering as an unbranded, slower, review-less version of the incumbent at a *higher* price.

### 2. CJ's US warehouses aren't what they sound like

They're a **seller-funded pre-stocking service**, not a catalog you can draw from. CJ's own [documentation](https://cjdropshipping.com/article-details/80) requires "no less than 10pcs for a variant" and "no less than 100pcs for the total" per SKU — *you* fund the US inventory. Their own list of US-warehoused categories is "beauty + personal care, tech accessories, home & lifestyle, apparel, seasonal products." **Sporting goods aren't mentioned anywhere.**

Assume tackle is China-warehoused: **8–21 days door to door**, against a stated 2–7 day promise.

### 3. The category shapes are hostile

Four of the six candidate categories are bulky or oversize — nets, backpacks, and 36" sand spikes are dimensional-weight problems, which is the worst possible shape for cross-border parcel economics. One reviewer reported "shipping fees of $60 for a $60 Made in China product." Only soft plastics and jig heads are shipping-friendly, and those are the two with no margin left in them.

Add: CJ's QC is visual only, not testing — so the saltwater failure modes that actually matter (corrosion on "aluminum" pliers, whether "tungsten carbide" cutters really cut braid, UV on PVC, salt-fouled zippers) surface at 3–6 months, well past any dispute window. Returns to China are effectively write-offs.

### The diagnosis is wrong

**The problem isn't that we sell branded goods. It's that we buy at consumer retail.** That's the fixable part, and it needs none of the above.

Converting the *same* branded inventory from retail-purchase to wholesale terms is a far bigger margin lever than any generic swap — with no shipping-time cost and no loss of brand credibility. That's what the CWR and Burch applications are for, and it's why they sit at the top of this document.

### If you genuinely want white-label later, use Bassdash not CJ

[Bassdash wholesale/dropship](https://www.bassdash.com/pages/wholesale-dropship): **20 pcs/style** wholesale, **200 pcs/style** with your own logo, existing US fulfillment, and they already have a reputation in fishing. That's a fifth of CJ's 100-piece US-warehouse threshold, and you end up owning a brand asset rather than reselling an anonymous SKU.

The other genuine differentiation play: build house-brand kits from [Jann's Netcraft](https://www.jannsnetcraft.com/) components. Region-specific surf and inshore assortments you curate yourself are light, cheap to ship, have no import lead time, and are something Amazon's generic sellers structurally cannot offer.

---

## Where the margin actually goes next

The catalog above is a *retail-arbitrage* catalog: real products, real US warehouses, honest 26–45% margins, and zero fixed cost. It is the right way to start and the wrong way to finish, because you are paying consumer prices.

Two moves, in order:

1. **Wholesale accounts** (CWR, Burch). Same products, 40–50% off MAP instead of retail. This roughly doubles every row in the table and is the single highest-leverage action available.
2. **Private label**, but only in the categories where it genuinely works: braid, hooks, jig heads, and soft plastics. Verified factory economics from the earlier research pass — 8-strand braid at **$3.00–3.30/spool FOB, MOQ 300–500, branded packaging included** — imply roughly 80% gross at $29.99 retail. The catch is that this requires inventory and 30–50 day lead times, which is a different business from the one described here. Revisit once order volume justifies it.

Do not private-label fluorocarbon leader, coolers, or headlamps. Leader quality is too variable and a leader failure is the most visible product failure an angler can experience; coolers need expensive tooling and warehouse cube; headlamps carry battery certification (UN38.3) and RMA liability a new store shouldn't own.
