// UTM attribution.
//
// USTideCharts sends traffic as:
//   /products/<key>?utm_source=ustidecharts&utm_medium=gear-rec
// utm_medium values in the wild: gear-rec, nav, footer, home, location.
//
// We capture the FIRST touch per browser session and carry it all the way into
// the Stripe Checkout session metadata, so revenue can be attributed back to the
// tide site — and to the specific surface that sent it.

export const ATTRIBUTION_KEY = "tas_attribution";

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_path?: string;
  referrer?: string;
  first_seen?: string;
}

const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** Read attribution out of a URLSearchParams. */
export function fromParams(params: URLSearchParams): Attribution {
  const out: Attribution = {};
  for (const f of UTM_FIELDS) {
    const v = params.get(f);
    if (v) out[f] = v.slice(0, 120);
  }
  return out;
}

/** Persist first-touch attribution. Later touches do not overwrite it. */
export function capture(): Attribution | null {
  if (typeof window === "undefined") return null;

  const existing = read();
  const incoming = fromParams(new URLSearchParams(window.location.search));

  if (existing && Object.keys(existing).some((k) => k.startsWith("utm_"))) {
    return existing;
  }
  if (Object.keys(incoming).length === 0 && existing) return existing;

  const record: Attribution = {
    ...incoming,
    landing_path: window.location.pathname,
    referrer: document.referrer ? document.referrer.slice(0, 200) : undefined,
    first_seen: new Date().toISOString(),
  };

  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(record));
  } catch {
    /* private browsing — attribution is best-effort, never block the sale */
  }
  return record;
}

export function read(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/**
 * Preserve incoming utm params when we redirect a retired product key.
 * Attribution must survive a 301 or the tide site's numbers go quietly wrong.
 */
export function withParams(target: string, search: URLSearchParams): string {
  const keep = new URLSearchParams();
  for (const f of UTM_FIELDS) {
    const v = search.get(f);
    if (v) keep.set(f, v);
  }
  const qs = keep.toString();
  return qs ? `${target}?${qs}` : target;
}
