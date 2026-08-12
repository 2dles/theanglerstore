# Pricing review — within-family price spread

Generated 12 Aug 2026 from `src/lib/products.ts`. **No prices were changed.**
The audit asked for a diff to approve rather than a silent edit, so this is it.

## What this is

Products in the same family, at the same size, priced differently by color.
Each price here traces back to a real street price we audited from named US
retailers — the spread is genuine market variation, not a mistake. But a
shopper sees only "the same flasher is $22.99 in one color and $25.99 in
another", and reads that as a store that doesn't know its own prices.

`proposed` is the median of the group. It is a suggestion, not a
recommendation — moving a price down costs margin, moving one up may lose the
sale. Decide per family.

## Read these two caveats first

1. **Groups marked `(no spec)` may not be true siblings.** The Attwood
   Fold-N-Stow Net "Small vs Medium" and the Rapala Tool Holder "Two Place vs
   3-Place" are genuinely different products whose price difference is correct.
   Ignore those. The real candidates are the ones where only the *color* differs
   — the flashers, the Dipsy Divers, the Jet Drivers, the X-Rap and the Kensaki.
2. **The Sufix 15 lb entry that looked like an 85% spread was a false alarm** —
   that was 150 yd against 300 yd. Grouping now includes spool length, and it
   no longer appears.

## Odd cents endings

Fourteen products carry feed-derived endings ($34.84, $22.09, $18.69, $15.97,
$19.24, $28.70, $35.25, $37.75, $93.15, $164.94, $27.65, $15.29). Every one is
a real audited street price. Rounding them to .99/.49 would read as more
deliberate but would also mean either giving up margin or quietly charging
above the market. Worth a decision, not an automatic change.

---

### Attwood Fold-N-Stow Fishing Net — (no spec)

2 colors, $11.99–$19.24 (spread $7.25)

| color | current | proposed |
|---|---|---|
| Small | $11.99 | $19.24 |
| Medium | $19.24 | — |

### Attwood Standard Series Rod Holder — (no spec)

2 colors, $45.99–$46.99 (spread $1.00)

| color | current | proposed |
|---|---|---|
| 30°, Black Insert | $45.99 | $46.99 |
| 0° Black Insert | $46.99 | — |

### Luhr-Jensen 20' Jet Driver — (no spec)

4 colors, $11.99–$12.49 (spread $0.50)

| color | current | proposed |
|---|---|---|
| Purple UV Moon Jelly | $11.99 | $12.49 |
| Blue UV Moon Jelly | $11.99 | $12.49 |
| Black Moon Jelly | $12.49 | — |
| Silver Crush | $12.49 | — |

### Luhr-Jensen 30' Jet Driver — (no spec)

3 colors, $10.99–$12.99 (spread $2.00)

| color | current | proposed |
|---|---|---|
| Clear UV Moon Jelly | $10.99 | $12.49 |
| Black Moon Jelly | $12.49 | — |
| Silver UV Crush | $12.99 | $12.49 |

### Luhr-Jensen 3¼″ Dipsy Diver — (no spec)

4 colors, $16.99–$18.99 (spread $2.00)

| color | current | proposed |
|---|---|---|
| Clear UV | $16.99 | $18.99 |
| Chartreuse/Silver Bottom Moon Jelly | $16.99 | $18.99 |
| Black/Black Bottom Moon Jelly | $18.99 | — |
| Silver/Silver Bottom Crush | $18.99 | — |

### Luhr-Jensen 4⅛″ Dipsy Diver — (no spec)

4 colors, $18.99–$23.99 (spread $5.00)

| color | current | proposed |
|---|---|---|
| Clear UV | $18.99 | $19.49 |
| Fire/Silver Bottom Moon Jelly | $19.49 | — |
| Kelly Green/Silver Bottom Moon Jelly | $19.49 | — |
| Black/Black Bottom Moon Jelly | $23.99 | $19.49 |

### Luhr-Jensen Money Roll Flasher — 11″

12 colors, $22.99–$25.99 (spread $3.00)

| color | current | proposed |
|---|---|---|
| Rainbow Crush | $22.99 | $24.99 |
| Chrome Ladder | $23.99 | $24.99 |
| Razzle Dazzle | $23.99 | $24.99 |
| Brandon's Secret | $24.99 | — |
| Chrome Scale | $24.99 | — |
| Citrus Nugget | $24.99 | — |
| Glow Blue Crush | $24.99 | — |
| Nuclear Carbon Glow | $24.99 | — |
| Pearl Blue Skeleton | $24.99 | — |
| 2 Face UV | $24.99 | — |
| Blue Kamikaze UV | $25.99 | $24.99 |
| Glow Biohazard | $25.99 | $24.99 |

### Luhr-Jensen Money Roll Flasher — 8¼″

9 colors, $17.99–$19.99 (spread $2.00)

| color | current | proposed |
|---|---|---|
| Nuclear Carbon Glow | $17.99 | $19.99 |
| Rainbow Crush | $18.99 | $19.99 |
| Blue Kamikaze UV | $19.99 | — |
| Chrome Ladder | $19.99 | — |
| Citrus Nugget | $19.99 | — |
| Glow Blue Crush | $19.99 | — |
| Razzle Dazzle | $19.99 | — |
| Pearl Blue Skeleton | $19.99 | — |
| 2 Face UV | $19.99 | — |

### Rapala Magnetic Tool Holder — (no spec)

2 colors, $24.99–$29.99 (spread $5.00)

| color | current | proposed |
|---|---|---|
| Two Place | $24.99 | $29.99 |
| 3-Place | $29.99 | — |

### Rapala X-Rap Magnum 20 — (no spec)

2 colors, $25.99–$28.99 (spread $3.00)

| color | current | proposed |
|---|---|---|
| Hot Head | $25.99 | $28.99 |
| Glass Ghost | $28.99 | — |

### Sufix 832 Advanced Superline Braid — 20 lb, 300 yd

2 colors, $34.84–$34.99 (spread $0.15)

| color | current | proposed |
|---|---|---|
| Low-Vis Green | $34.84 | $34.99 |
| — | $34.99 | — |

### Sufix 832 Advanced Superline Braid — 8 lb, 150 yd

3 colors, $18.69–$19.99 (spread $1.30)

| color | current | proposed |
|---|---|---|
| Low-Vis Green | $18.69 | $18.99 |
| Coastal Camo | $18.99 | — |
| Ghost | $19.99 | $18.99 |

### Williamson Kensaki 220 Jig — 7¾ oz

2 colors, $19.99–$20.99 (spread $1.00)

| color | current | proposed |
|---|---|---|
| Mack Daddy | $19.99 | $20.99 |
| Blue Lagoon | $20.99 | — |

