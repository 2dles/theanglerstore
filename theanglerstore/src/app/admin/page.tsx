import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthed } from "@/lib/admin-auth";
import {
  dashboard,
  isAnalyticsConfigured,
  type AnalyticsRow,
} from "@/lib/vercel-analytics";
import { recentOrders, isStripeConfigured } from "@/lib/orders";
import { getProduct, formatPrice } from "@/lib/products";
import { supplierFor } from "@/lib/supplier";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const RANGES = [7, 14, 30] as const;

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="card p-5">
      <p className="text-xs uppercase tracking-wider text-ink-faint">{label}</p>
      <p className="tnum mt-1.5 text-3xl font-semibold">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-faint">{sub}</p>}
    </div>
  );
}

/** Horizontal bar table — the clearest way to read ranked traffic data. */
function BarTable({
  title,
  rows,
  empty,
  labelFor,
}: {
  title: string;
  rows: AnalyticsRow[];
  empty: string;
  labelFor?: (key: string) => string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.pageviews));

  return (
    <div className="card p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
        {title}
      </h2>

      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-ink-faint">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-1">
          {rows.map((r) => (
            <li key={r.key} className="relative">
              <div
                className="absolute inset-y-0 left-0 rounded-md bg-tide/12"
                style={{ width: `${(r.pageviews / max) * 100}%` }}
                aria-hidden="true"
              />
              <div className="relative flex items-baseline justify-between gap-4 px-2.5 py-1.5">
                <span className="truncate text-sm text-ink-dim">
                  {labelFor ? labelFor(r.key) : r.key}
                </span>
                <span className="tnum shrink-0 text-sm">
                  {r.pageviews.toLocaleString()}
                  <span className="ml-2 text-xs text-ink-faint">
                    {r.visitors.toLocaleString()} vis
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Turn /products/surf-rod into the actual product name. */
function pageLabel(path: string): string {
  const m = path.match(/^\/products\/([a-z-]+)\/?$/);
  if (m) {
    const p = getProduct(m[1]);
    if (p) return p.name;
  }
  return path === "/" ? "Home" : path;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  if (!(await isAuthed())) redirect("/admin/login");

  const { days: dRaw } = await searchParams;
  const days = RANGES.includes(Number(dRaw) as (typeof RANGES)[number])
    ? Number(dRaw)
    : 30;

  const [traffic, orders] = await Promise.all([
    isAnalyticsConfigured()
      ? dashboard(days)
      : Promise.resolve(null),
    isStripeConfigured() ? recentOrders(days) : Promise.resolve(null),
  ]);

  const storeViews =
    traffic?.pages
      .filter((p) => p.key.startsWith("/products/"))
      .reduce((s, p) => s + p.pageviews, 0) ?? 0;

  const tideReferred =
    traffic?.referrers.find((r) => r.key.includes("ustidecharts"))?.pageviews ??
    0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-1 text-sm text-ink-dim">
            Traffic and orders for theanglerstore.com
          </p>
        </div>
        <div className="flex gap-2">
          {RANGES.map((r) => (
            <Link
              key={r}
              href={`/admin?days=${r}`}
              className={`chip ${r === days ? "border-line-hi text-ink" : ""}`}
            >
              {r}d
            </Link>
          ))}
        </div>
      </div>

      {/* ── traffic ─────────────────────────────────────────────── */}
      {!isAnalyticsConfigured() ? (
        <div className="card mt-8 p-6">
          <h2 className="font-semibold">Traffic isn&rsquo;t connected yet</h2>
          <p className="mt-2 leading-relaxed text-ink-dim">
            Add <code className="text-ink">VERCEL_TOKEN</code> and{" "}
            <code className="text-ink">VERCEL_PROJECT_ID</code> in Vercel &rarr;
            Settings &rarr; Environment Variables, then redeploy. Instructions
            are in <code className="text-ink">ADMIN.md</code>.
          </p>
        </div>
      ) : !traffic || traffic.overall === null ? (
        <div className="card mt-8 p-6">
          <h2 className="font-semibold text-[#fb923c]">
            Vercel returned no traffic data
          </h2>
          <p className="mt-2 leading-relaxed text-ink-dim">
            Either the token lacks access, the project ID is wrong, or Web
            Analytics isn&rsquo;t enabled on the project. Check the Vercel
            function logs for the exact status code. A 402 or 403 means the
            API is gated on your plan.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Visitors"
              value={(traffic.overall?.visitors ?? 0).toLocaleString()}
              sub={`last ${days} days`}
            />
            <Stat
              label="Page views"
              value={(traffic.overall?.pageviews ?? 0).toLocaleString()}
              sub={`last ${days} days`}
            />
            <Stat
              label="Product page views"
              value={storeViews.toLocaleString()}
              sub="all /products/* pages"
            />
            <Stat
              label="From USTideCharts"
              value={tideReferred.toLocaleString()}
              sub="referred page views"
            />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <BarTable
              title="Top pages"
              rows={traffic.pages}
              labelFor={pageLabel}
              empty="No page views recorded yet."
            />
            <BarTable
              title="Referrers"
              rows={traffic.referrers}
              empty="No referrers yet. Traffic so far is direct."
            />
            <BarTable
              title="Countries"
              rows={traffic.countries}
              empty="No data yet."
            />
            <BarTable
              title="Devices"
              rows={traffic.devices}
              empty="No data yet."
            />
          </div>
        </>
      )}

      {/* ── orders ──────────────────────────────────────────────── */}
      <h2 className="mt-12 text-xl font-semibold tracking-tight">Orders</h2>

      {!isStripeConfigured() ? (
        <div className="card mt-4 p-6">
          <p className="leading-relaxed text-ink-dim">
            Stripe isn&rsquo;t configured, so there are no orders to show. That
            is expected until you finish <code className="text-ink">RUNBOOK.md</code>{" "}
            steps 1 to 5.
          </p>
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="card mt-4 p-6">
          <p className="leading-relaxed text-ink-dim">
            No paid orders in the last {days} days.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Stat
              label="Revenue"
              value={formatPrice(
                orders.reduce((s, o) => s + o.total, 0) / 100,
              )}
              sub={`last ${days} days`}
            />
            <Stat label="Orders" value={String(orders.length)} />
            <Stat
              label="Average order"
              value={formatPrice(
                orders.reduce((s, o) => s + o.total, 0) / orders.length / 100,
              )}
            />
          </div>

          <div className="card mt-4 overflow-x-auto p-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink-faint">
                  <th className="pb-2 pr-4 font-semibold">When</th>
                  <th className="pb-2 pr-4 font-semibold">Items</th>
                  <th className="pb-2 pr-4 font-semibold">Ship to</th>
                  <th className="pb-2 pr-4 font-semibold">Source</th>
                  <th className="pb-2 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(148,197,255,.08)]">
                {orders.map((o) => (
                  <tr key={o.id} className="align-top">
                    <td className="py-3 pr-4 whitespace-nowrap text-ink-faint">
                      {o.created.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 pr-4 text-ink-dim">
                      {o.items.map((i) => {
                        const sup = i.key ? supplierFor(i.key) : undefined;
                        return (
                          <div key={i.description} className="mb-1 last:mb-0">
                            {i.quantity} × {i.description}
                            {sup && (
                              <div className="tnum text-xs text-ink-faint">
                                CWR{" "}
                                <span className="text-teal">{sup.sku}</span> ·
                                cost ${sup.cost.toFixed(2)} ea
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </td>
                    <td className="py-3 pr-4 text-ink-dim">
                      {o.name ?? "(no name)"}
                      <div className="text-xs text-ink-faint">{o.city}</div>
                    </td>
                    <td className="py-3 pr-4 text-ink-faint">
                      {o.utmSource === "ustidecharts" ? (
                        <span className="text-teal">
                          tides · {o.utmMedium || "none"}
                        </span>
                      ) : (
                        (o.utmSource ?? "direct")
                      )}
                    </td>
                    <td className="tnum py-3 text-right font-medium">
                      {formatPrice(o.total / 100)}
                      {o.cost > 0 && (
                        <div
                          className={`text-xs font-normal ${
                            o.net >= 0 ? "text-teal" : "text-[#f87171]"
                          }`}
                          title="After goods, $9.95 inbound freight and Stripe fees"
                        >
                          net {formatPrice(o.net)} ·{" "}
                          {Math.round((o.net / (o.total / 100)) * 100)}%
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <p className="mt-10 text-xs leading-relaxed text-ink-faint">
        Traffic from the Vercel Web Analytics API · orders from Stripe. On the
        Hobby plan the reporting window is 30 days and UTM dimensions
        aren&rsquo;t available at page level. Per-order attribution (the
        Source column) comes from Stripe metadata and is unaffected.
      </p>
    </div>
  );
}
