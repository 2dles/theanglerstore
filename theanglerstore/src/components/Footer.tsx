import Link from "next/link";
import { activeCategories } from "@/lib/products";
import { TIDE_FOOTER } from "@/lib/tide-links";

const HELP = [
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="hairline mt-24 bg-abyss/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-semibold">
              The<span className="text-gradient">Angler</span>Store
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-dim">
              Surf and inshore tackle, chosen by people who fish the same beaches
              you do. Sister site to USTideCharts.
            </p>
            <a
              href={TIDE_FOOTER}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-tide hover:text-teal"
             target="_blank" rel="noopener">
              Check the tides before you fish ↗
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Shop
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/bundles" className="link-quiet">
                  Kits &amp; bundles
                </Link>
              </li>
              {activeCategories().filter((c) => c.nav).map((c) => (
                <li key={c.slug}>
                  <Link href={`/collections/${c.slug}`} className="link-quiet">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Help
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {HELP.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-ink-faint">
              ⚠️ Prop 65: products containing lead can expose you to chemicals known
              to the State of California to cause cancer and reproductive harm.
            </p>
          </div>
        </div>

        <div className="hairline mt-10 flex flex-col gap-2 pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} TheAnglerStore. Augustus Muse, sole
            proprietor, Sebastopol, California.{" "}
            <a href="tel:+17075087118" className="hover:text-ink">
              (707) 508-7118
            </a>{" "}
            ·{" "}
            <a href="mailto:help@theanglerstore.com" className="hover:text-ink">
              help@theanglerstore.com
            </a>
          </p>
          <p>Tide and weather data on our sister site courtesy of NOAA CO-OPS and Open-Meteo.</p>
        </div>
      </div>
    </footer>
  );
}
