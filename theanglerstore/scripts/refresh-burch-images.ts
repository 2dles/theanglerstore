/**
 * Re-resolve dead Burch product photographs from Burch's own feed.
 *
 * Burch's Shopify CDN rotates image filenames. The same product keeps its SKU
 * but its photograph moves, and the URL we hardcoded 404s. This has now
 * happened three times: nine listings on 23 Sep, five more nine days later,
 * and five again on 10 Oct. Each round was hunted down by hand. This script
 * does the hunting.
 *
 * It is the companion to check-images.ts. That one tells you something broke;
 * this one tells you what to put in its place.
 *
 *   npx tsx --conditions=react-server scripts/refresh-burch-images.ts
 *   npx tsx --conditions=react-server scripts/refresh-burch-images.ts --write
 *
 * Without --write it prints a diff and changes nothing. With --write it edits
 * src/lib/products.ts in place, replacing only the exact dead URL strings, and
 * refuses if any of them is not found exactly once.
 *
 * It never touches prices. Where Burch's feed disagrees with our recorded
 * dealer cost it says so and leaves the number alone, because a cost change is
 * the owner's call, not a script's.
 *
 * Run it from your own machine. A sandboxed environment behind an egress proxy
 * can 403 every image host, which looks like the whole catalogue is dead and
 * is not.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { PRODUCTS, isSourced } from "../src/lib/products";
import { supplierFor, supplierIdOf } from "../src/lib/supplier";

const WRITE = process.argv.includes("--write");
const PRODUCTS_TS = "src/lib/products.ts";
const BURCH = "https://burchfishingtackle.com";

/** Bounded map. 269 simultaneous fetches once timed out and reported 29
 *  healthy images as dead; six at a time does not. */
async function pooled<T, R>(xs: T[], n: number, f: (x: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(xs.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, xs.length) }, async () => {
      for (;;) {
        const j = i++;
        if (j >= xs.length) return;
        out[j] = await f(xs[j]);
      }
    }),
  );
  return out;
}

async function json(url: string): Promise<any> {
  const r = await fetch(url, { headers: { accept: "application/json" } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

/** The current photograph for a SKU, straight from Burch. */
async function resolve(sku: string): Promise<{ img: string; title: string; price: string } | null> {
  const q = new URLSearchParams({
    q: sku,
    "resources[type]": "product",
    "resources[limit]": "6",
  });
  const hits = (await json(`${BURCH}/search/suggest.json?${q}`))?.resources?.results?.products ?? [];
  for (const hit of hits) {
    const p = (await json(`${BURCH}/products/${hit.handle}.json`))?.product;
    const v = p?.variants?.find((x: any) => (x.sku ?? "").trim() === sku);
    if (!v) continue; // the search matched on words, not this SKU
    const img = p.images?.[0]?.src;
    if (!img) continue;
    return { img: String(img).split("?")[0], title: p.title, price: String(v.price) };
  }
  return null;
}

async function main() {
  const burch = PRODUCTS.filter(
    (p) => isSourced(p) && p.image && supplierIdOf(p.key) === "burch",
  );
  console.log(`${burch.length} sourced Burch listings with a photograph.\n`);

  const checked = await pooled(burch, 6, async (p) => {
    try {
      const r = await fetch(p.image!);
      return { p, ok: r.ok, status: r.status };
    } catch {
      return { p, ok: false, status: 0 };
    }
  });

  const dead = checked.filter((c) => !c.ok);
  if (dead.length === 0) {
    console.log("Every Burch photograph loads. Nothing to do.");
    return;
  }

  const fixes: { key: string; old: string; next: string }[] = [];
  const unresolved: string[] = [];

  for (const { p, status } of dead) {
    const sku = supplierFor(p.key)?.sku;
    if (!sku) {
      unresolved.push(`${p.key}: no supplier row, cannot look it up`);
      continue;
    }
    let found: Awaited<ReturnType<typeof resolve>> = null;
    try {
      found = await resolve(sku);
    } catch (e) {
      unresolved.push(`${p.key} (${sku}): feed lookup failed, ${String(e)}`);
      continue;
    }
    if (!found) {
      unresolved.push(`${p.key} (${sku}): no Burch product carries this SKU any more`);
      continue;
    }
    console.log(`${p.key}  (${status})`);
    console.log(`  was  ${p.image}`);
    console.log(`  now  ${found.img}`);
    console.log(`  Burch: ${found.title}`);

    const cost = supplierFor(p.key)?.cost;
    if (cost != null && Math.abs(Number(found.price) - cost) > 0.005) {
      console.log(`  COST DRIFT: we have ${cost.toFixed(2)}, Burch now lists ${found.price}.`);
      console.log(`              Not changed. Price changes are the owner's call.`);
    }
    console.log("");
    fixes.push({ key: p.key, old: p.image!, next: found.img });
  }

  for (const u of unresolved) console.log(`UNRESOLVED  ${u}`);

  if (!WRITE) {
    console.log(`\n${fixes.length} resolvable, ${unresolved.length} not. Re-run with --write to apply.`);
    process.exit(unresolved.length > 0 ? 1 : 0);
  }

  let src = readFileSync(PRODUCTS_TS, "utf8");
  for (const f of fixes) {
    const n = src.split(f.old).length - 1;
    if (n !== 1) {
      console.error(`\nREFUSING TO WRITE: ${f.old} appears ${n} times, expected 1.`);
      process.exit(1);
    }
    src = src.replace(f.old, f.next);
  }
  writeFileSync(PRODUCTS_TS, src);
  console.log(`\nRepointed ${fixes.length} image URLs in ${PRODUCTS_TS}.`);
  if (unresolved.length > 0) process.exit(1);
}

main();
