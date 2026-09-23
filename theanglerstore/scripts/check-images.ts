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
 * before a deploy. When it fails, look the SKU up in the supplier's feed and
 * repoint the URL.
 *
 *   npx tsx --conditions=react-server scripts/check-images.ts
 *
 * Run it from your own machine. Sandboxed environments often sit behind an
 * egress proxy that returns 403 for every image host, which looks like total
 * breakage and is not. If every single image reports broken, suspect the
 * network before the catalogue.
 */
import { PRODUCTS, isSourced } from "../src/lib/products";

const withImage = PRODUCTS.filter((p) => isSourced(p) && p.image);
const missing = PRODUCTS.filter((p) => isSourced(p) && !p.image);

async function main() {
  const results = await Promise.all(
    withImage.map(async (p) => {
      try {
        const r = await fetch(p.image!, { method: "GET" });
        return { key: p.key, url: p.image!, ok: r.ok, status: r.status };
      } catch {
        return { key: p.key, url: p.image!, ok: false, status: 0 };
      }
    }),
  );

  const broken = results.filter((r) => !r.ok);
  for (const b of broken) console.log(`BROKEN  ${b.status}  ${b.key}\n        ${b.url}`);
  for (const p of missing) console.log(`NO IMAGE      ${p.key}`);

  console.log(
    `\n${withImage.length} product images checked. ${broken.length} broken, ${missing.length} sourced products with no image.`,
  );
  if (broken.length > 0 || missing.length > 0) process.exit(1);
}

main();
