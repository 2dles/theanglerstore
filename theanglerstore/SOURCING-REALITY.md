# Sourcing reality — what the CWR catalog actually contains

Written 10 Aug 2026, from the real 29,471-SKU CWR export. This supersedes the
estimates in SOURCING.md, which were built before we had dealer access.

---

## 1. Half the catalog has no source at CWR

| Key | Status at CWR |
|---|---|
| `surf-rod` | **None.** Zero fishing rods in 29,471 SKUs. Every "rod" match is a rod *holder*. |
| `inshore-combo` | **None.** Two reels in the entire catalog, no combos. |
| `circle-hooks` | **None.** The 130 "hook" matches are boat hooks, S-hooks, utility hooks. |
| `swimbait-kit` | **None.** One match, and it is a Plano storage box. |
| `sand-spike` | **None.** Zero. |
| `headlamp` | **Not viable.** One match, a $67.50-cost helmet lamp against $37.99 retail. |
| `carolina-kit` | **Components only.** VMC swivels and sinkers exist; no assembled rig kits. Assembling them yourself is not dropshipping. |
| `braided-line` | ✅ 185 SKUs, Sufix. |
| `fluoro-leader` | ⚠️ 32 SKUs but thin margin — see §3. |
| `jig-assort` | ✅ 27 SKUs, Williamson. |
| `landing-net` | ✅ 11 SKUs, Attwood / Frabill. |
| `pliers` | ✅ 26 SKUs, Rapala. |
| `tackle-bag` | ✅ 63 SKUs, Plano. |
| `cooler` | ✅ 65 SKUs, Coleman / LAKA. |

CWR is a **marine and boat-outfitting distributor** that carries some tackle,
not a tackle house. That is not a mistake — it is what they are, and their
depth is real: 468 lines & leaders, 356 rod holders, 287 hard & soft baits,
153 tackle storage, 44 coolers.

**Burch Fishing Tackle fills the gap** — rods, reels, hooks, terminal tackle,
soft plastics, and the mainstream brands. Two suppliers, one catalog.

---

## 2. Our retail prices were fiction

Set before we knew what we'd sell. Against CWR's own list prices:

| Product | Our cost | Real retail (list) | We priced it |
|---|---|---|---|
| Attwood Fold-N-Stow net, medium | $10.79 | $19.62 | $49.99 |
| Rapala Angler's Pliers 8.5" | $10.60 | $17.99 | $49.99 |
| Plano KVD Speedbag 3600 | $18.48 | $24.99 | $74.99 |
| Coleman Chiller 16-can | $26.81 | $37.99 | $184.99 |

Two to five times market. Every one of these has to come down, and when it
does the margin goes with it.

**Median wholesale discount across 995 in-stock fishing SKUs: 39.9% off list.**
That is the real number to plan around — not the 50–60% the earlier estimates
assumed.

---

## 3. The shipping rate is set below our actual cost

CWR's cheapest inbound freight is **$9.95**. We charge **$5.95** below the
free-shipping threshold. We lose $4 on every small order before Stripe's 30¢.

On sub-$40 goods that gap is fatal, because $9.95 is 25–50% of the item's own
cost. At honest retail, a single-item order of the Plano Speedbag nets **$1.31**
and the Rapala pliers net **$2.40**.

How many in-stock fishing SKUs clear 25% margin at honest list-price retail:

| Flat shipping rate | SKUs clearing 25% | Median margin |
|---|---|---|
| $5.95 (current) | 228 / 995 | 19.0% |
| **$9.95** | **471 / 995** | **24.9%** |
| $12.95 | 698 / 995 | 28.8% |

**Raising the flat rate from $5.95 to $9.95 roughly doubles the sellable
catalog.** It is the single highest-leverage change available, it costs
nothing to make, and it charges customers what shipping actually costs rather
than subsidising it out of margin.

Change `FLAT_SHIPPING` in `src/lib/stripe.ts`. Leave `FREE_SHIPPING_OVER` at
$49 for now — that threshold is doing its job, which is pushing baskets above
the point where one freight charge is amortised across several items.

---

## 4. Where the money actually is at CWR

The highest-margin in-stock items are **boat-mounted fishing hardware**, not
consumer tackle:

| Margin | Cost | List | Item |
|---|---|---|---|
| 71.9% | $29.99 | $159.99 | C.E. Smith Screwless Flush Mount Rod Holder |
| 48.3% | $43.46 | $109.95 | Sea-Dog LED Rod Holder Cap Light |
| 48.0% | $53.50 | $129.95 | Sea-Dog LED RGB Rod Holder w/Tube Insert |
| 45.1% | $62.49 | $139.99 | Tigress T-Top Aluminum Backing Plates |
| 45.0% | $124.71 | $258.99 | Tigress Ultimate Rigging Kit |

Higher ticket means the $9.95 freight stops mattering. A $159 rod holder
absorbs it at 6% of revenue; a $24 tackle bag cannot.

This is worth a real decision rather than a drift: **USTideCharts sends surf
and shore anglers**, and boat rigging is a different customer. Adding a
boat-outfitting section would monetise CWR's actual strength but weaken the
editorial link between the two sites. Recommend keeping the storefront aimed
at the tide-site audience and using Burch for the tackle core — but revisit if
Burch's terms come back poor.

---

## 5. What the export gives us for free

The feed carries `Image (300x300) Url` and `Image (1000x1000) Url` per SKU —
licensed product photography, self-serve, no email required. That is what
closes the `image` gap on every product page and finally satisfies Search
Console. It is the reason CWR was ranked first and it survives all of the
above.

Also present and worth using: `Shipping Weight`, `Truck Freight`, `Oversized`,
and `Hazardous Materials` flags (freight surprises), plus per-warehouse stock
(`NJ` / `FL`) which drives honest `shipsIn` values — a California order from
Bayville NJ is not the same promise as one from Tampa.

---

## 6. Gated brands

CWR will not sell these until the manufacturer authorises you directly:
Abu Garcia, Berkley, Daiwa, PENN, Pflueger, Minn Kota, Humminbird, Garmin,
Lowrance, Cannon, Furuno, Raymarine, Simrad.

Apply to those makers separately once there is order history to point at.
Burch carries several of them and may have its own authorisation already —
worth asking.
