/**
 * Vercel Web Analytics — read API.
 *
 * Vercel made this public in May 2026. It lets us pull our own traffic data
 * into this admin panel instead of logging into their dashboard.
 *
 *   GET /v1/query/web-analytics/visits/aggregate?by=<dimension>
 *   GET /v1/query/web-analytics/visits/count
 *
 * Every response carries both `pageviews` and `visitors`, so unique visitors
 * come for free.
 *
 * ── Hobby-plan limits that shape what this file can ask for ──────────────────
 *  · Reporting window is 1 month. Asking for 90 days returns nothing useful.
 *  · Custom events and UTM dimensions are Pro-only, so `by=utmSource` etc.
 *    will come back empty. Order-level attribution still works — that comes
 *    from Stripe metadata, not from here.
 *  · 50,000 events/month, shared across every project on the account.
 *
 * Needs VERCEL_TOKEN and VERCEL_PROJECT_ID. Server-side only — the token is an
 * account-wide credential and must never reach the browser.
 */

const BASE = "https://api.vercel.com/v1/query/web-analytics";

export interface AnalyticsRow {
  key: string;
  pageviews: number;
  visitors: number;
}

export interface AnalyticsTotals {
  pageviews: number;
  visitors: number;
}

export function isAnalyticsConfigured(): boolean {
  return Boolean(process.env.VERCEL_TOKEN && process.env.VERCEL_PROJECT_ID);
}

/** ISO timestamp N days ago, clamped to the Hobby 1-month window. */
export function daysAgo(n: number): string {
  const capped = Math.min(n, 30);
  return new Date(Date.now() - capped * 86_400_000).toISOString();
}

async function call<T>(
  path: string,
  params: Record<string, string | number>,
): Promise<T | null> {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;

  const qs = new URLSearchParams({ projectId, ...toStrings(params) });
  // Personal (Hobby) accounts omit teamId/slug entirely.
  if (process.env.VERCEL_TEAM_ID) qs.set("teamId", process.env.VERCEL_TEAM_ID);

  try {
    const res = await fetch(`${BASE}/${path}?${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
      // Traffic data doesn't need to be to-the-second; one minute of cache
      // keeps a page refresh from burning API calls.
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `[analytics] ${path} → ${res.status} ${body.slice(0, 200)}`,
      );
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error("[analytics] request failed:", err);
    return null;
  }
}

function toStrings(o: Record<string, string | number>): Record<string, string> {
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, String(v)]));
}

/**
 * Aggregate page views by a dimension.
 * `route` rolls /products/surf-rod and /products/pliers into /products/[key];
 * `requestPath` keeps them separate. We want requestPath for a store.
 */
export async function aggregate(
  by:
    | "requestPath"
    | "route"
    | "referrerHostname"
    | "country"
    | "deviceType"
    | "browserName"
    | "osName",
  opts: { days?: number; limit?: number } = {},
): Promise<AnalyticsRow[]> {
  const { days = 30, limit = 20 } = opts;

  const data = await call<{
    data?: { key?: string; pageviews?: number; visitors?: number }[];
  }>("visits/aggregate", {
    by,
    limit,
    since: daysAgo(days),
    until: new Date().toISOString(),
    environment: "production",
  });

  if (!data?.data) return [];
  return data.data
    .map((d) => ({
      key: d.key || "(direct)",
      pageviews: d.pageviews ?? 0,
      visitors: d.visitors ?? 0,
    }))
    .sort((a, b) => b.pageviews - a.pageviews);
}

/** Site-wide totals for a window. */
export async function totals(days = 30): Promise<AnalyticsTotals | null> {
  const data = await call<{
    pageviews?: number;
    visitors?: number;
    data?: { pageviews?: number; visitors?: number };
  }>("visits/count", {
    since: daysAgo(days),
    until: new Date().toISOString(),
    environment: "production",
  });

  if (!data) return null;
  const src = data.data ?? data;
  return { pageviews: src.pageviews ?? 0, visitors: src.visitors ?? 0 };
}

/**
 * Everything the dashboard needs, fetched in parallel.
 * Any individual failure degrades to an empty list rather than blanking
 * the whole page — a partial dashboard beats an error page.
 */
export async function dashboard(days = 30) {
  const [overall, pages, referrers, countries, devices] = await Promise.all([
    totals(days),
    aggregate("requestPath", { days, limit: 25 }),
    aggregate("referrerHostname", { days, limit: 15 }),
    aggregate("country", { days, limit: 10 }),
    aggregate("deviceType", { days, limit: 5 }),
  ]);

  return { overall, pages, referrers, countries, devices };
}
