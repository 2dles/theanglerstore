/**
 * Every product photograph must actually load.
 *
 * Nine listings shipped with dead images and nobody noticed until one showed
 * up as a broken icon on the homepage. The cause is that Burch's Shopify CDN
 * rotates filenames: the same product keeps its SKU but its image goes from
 * 27482_5ac4310f-....jpg to 27482_c4159951-....jpg, and the old URL 404s.
 * CWR's productimageserver.com is stable by comparison, built from the SKU,
 * and all 184 of those were fine.
 *
 * So this is not a one-off fix, it is rot that will happen again. Run it
 * before a deploy. When it fails, refresh-burch-images.ts looks the SKU up in
 * Burch's own feed and prints the replacement URL.
 *
 *   npx tsx --conditions=react-server scripts/check-images.ts
 *
 * Run it from your own machine. Sandboxed environments often sit behind an
 * egress proxy that returns 403 for every image host, which looks like total
 * breakage and is not. If every single image reports broken, suspect the
 * network before the catalogue.
 */
import { PRODUCTS, isSourced } from "../src/lib/products";

/**
 * Six at a time, not all 269 at once.
 *
 * This file originally fired every request in parallel. Twenty-nine of them
 * timed out under the load and were reported as dead images; the real number
 * that round was five. A false alarm on a quarter of the catalogue is worse
 * than a slow check.
 */
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

const withImage = PRODUCTS.filter((p) => isSourced(p) && p.image);
const missing = PRODUCTS.filter((p) => isSourced(p) && !p.image);

async function main() {
  const results = await pooled(withImage, 6, async (p) => {
    try {
      const r = await fetch(p.image!, {
        method: "GET",
        signal: AbortSignal.timeout(15_000),
      });
      return { key: p.key, url: p.image!, ok: r.ok, status: r.status };
    } catch {
      return { key: p.key, url: p.image!, ok: false, status: 0 };
    }
  });

  const broken = results.filter((r) => !r.ok);
  for (const b of broken) console.log(`BROKEN  ${b.status}  ${b.key}\n        ${b.url}`);
  for (const p of missing) console.log(`NO IMAGE      ${p.key}`);

  console.log(
    `\n${withImage.length} product images checked. ${broken.length} broken, ${missing.length} sourced products with no image.`,
  );
  if (broken.length > 0 || missing.length > 0) process.exit(1);
}

main();
