"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "./ProductCard";
import {
  activeCategories,
  listed,
  type Category,
  type Water,
} from "@/lib/products";
import { WATERS } from "@/lib/products";
import {
  EMPTY_FILTERS,
  PRICE_BANDS,
  SORTS,
  applyFilters,
  categoryCounts,
  didYouMean,
  gapNotice,
  isFiltered,
  type Filters,
  type PriceBandId,
  type SortId,
} from "@/lib/search";

/**
 * THE FINDER.
 *
 * One control surface for 200+ products. The design brief was "easy to use",
 * which in a shop means three things:
 *
 *   1. Never make someone press Enter. Results update as they type.
 *   2. Never let someone filter their way into an empty page without telling
 *      them why and offering the way out.
 *   3. Never lose their place. Filters live in the URL, so the back button
 *      works, a refresh keeps state, and a filtered view can be sent to
 *      someone else.
 *
 * Everything runs client-side against the catalog already in the bundle —
 * there is no API to be slow.
 */

const CATEGORIES_SHOWN_COLLAPSED = 7;

function parse(sp: URLSearchParams): Filters {
  const cats = (sp.get("cat") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) as Category[];
  const bands = (sp.get("price") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) as PriceBandId[];
  const waters = (sp.get("water") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((w): w is Water => w === "salt" || w === "fresh");
  const sort = (sp.get("sort") ?? "popular") as SortId;
  return {
    query: sp.get("q") ?? "",
    categories: cats,
    bands,
    waters,
    sort: SORTS.some((s) => s.id === sort) ? sort : "popular",
  };
}

function serialise(f: Filters): string {
  const sp = new URLSearchParams();
  if (f.query.trim()) sp.set("q", f.query.trim());
  if (f.categories.length) sp.set("cat", f.categories.join(","));
  if (f.bands.length) sp.set("price", f.bands.join(","));
  if (f.waters.length) sp.set("water", f.waters.join(","));
  if (f.sort !== "popular") sp.set("sort", f.sort);
  return sp.toString();
}

export function ProductFinder({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() =>
    parse(new URLSearchParams(searchParams.toString())),
  );
  const [showAllCategories, setShowAllCategories] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Push filter state into the URL, but lazily. Rewriting the URL on every
  // keystroke floods the history stack and makes the back button useless, so
  // we replace rather than push and wait for a pause in typing.
  useEffect(() => {
    const t = setTimeout(() => {
      const qs = serialise(filters);
      const next = qs ? `${pathname}?${qs}` : pathname;
      if (next !== window.location.pathname + window.location.search) {
        router.replace(next, { scroll: false });
      }
    }, 250);
    return () => clearTimeout(t);
  }, [filters, pathname, router]);

  // "/" focuses search the way it does in every developer tool, but only when
  // the person isn't already typing into something.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && el === inputRef.current) {
        setFilters((f) => ({ ...f, query: "" }));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => applyFilters(filters), [filters]);
  const counts = useMemo(() => categoryCounts(filters), [filters]);
  const active = isFiltered(filters);
  const total = listed().length;

  const toggleCategory = useCallback((name: Category) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(name)
        ? f.categories.filter((c) => c !== name)
        : [...f.categories, name],
    }));
  }, []);

  const toggleWater = useCallback((id: Water) => {
    setFilters((f) => ({
      ...f,
      waters: f.waters.includes(id)
        ? f.waters.filter((w) => w !== id)
        : [...f.waters, id],
    }));
  }, []);

  const toggleBand = useCallback((id: PriceBandId) => {
    setFilters((f) => ({
      ...f,
      bands: f.bands.includes(id)
        ? f.bands.filter((b) => b !== id)
        : [...f.bands, id],
    }));
  }, []);

  // Selected categories are pinned to the front and never collapse. Hiding an
  // ACTIVE filter behind "+9 more" is the worst thing this component could do:
  // results are narrowed by something the shopper cannot see or switch off.
  const cats = activeCategories();
  const chosen = cats.filter((c) => filters.categories.includes(c.name));
  const rest = cats.filter((c) => !filters.categories.includes(c.name));
  const ordered = [...chosen, ...rest];
  const visibleCats = showAllCategories
    ? ordered
    : ordered.slice(0, Math.max(CATEGORIES_SHOWN_COLLAPSED, chosen.length));
  const hiddenCount = ordered.length - visibleCats.length;

  return (
    <>
      {/* ── control bar ──────────────────────────────────────────────────
          Sticks under the 4rem header so filters stay reachable while you
          scroll a long result list, the moment you most want to change them. */}
      <div className="z-30 -mx-4 mt-8 border-y border-line bg-abyss/85 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 md:sticky md:top-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
              >
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M12.8 12.8 17 17"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <input
                ref={inputRef}
                type="search"
                role="searchbox"
                value={filters.query}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, query: e.target.value }))
                }
                placeholder={`Search ${total} products, "braid", "kayak", "senko"`}
                aria-label="Search products"
                className="w-full rounded-xl border border-line bg-card/70 py-2.5 pl-10 pr-10 text-[0.9375rem] text-ink placeholder:text-ink-faint focus:border-line-hi focus:outline-none focus:ring-2 focus:ring-tide/30"
              />
              {filters.query && (
                <button
                  type="button"
                  onClick={() => {
                    setFilters((f) => ({ ...f, query: "" }));
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-sm text-ink-faint hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>

            <label className="flex shrink-0 items-center gap-2 text-sm text-ink-faint">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, sort: e.target.value as SortId }))
                }
                aria-label="Sort results"
                className="rounded-xl border border-line bg-card/70 px-3 py-2.5 text-[0.9375rem] text-ink focus:border-line-hi focus:outline-none focus:ring-2 focus:ring-tide/30"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-deep">
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* category chips, counts are live against the other filters, so a
              chip showing 0 tells you the truth before you click it */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {visibleCats.map((c) => {
              const on = filters.categories.includes(c.name);
              const n = counts.get(c.name) ?? 0;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => toggleCategory(c.name)}
                  aria-pressed={on}
                  disabled={!on && n === 0}
                  className={`chip transition-colors ${
                    on
                      ? "!border-tide/50 !bg-tide/12 !text-ink"
                      : n === 0
                        ? "opacity-35"
                        : "hover:border-line-hi hover:text-ink"
                  }`}
                >
                  {c.name}
                  <span className="tnum ml-1.5 text-ink-faint">{n}</span>
                </button>
              );
            })}
            {(hiddenCount > 0 || showAllCategories) && (
              <button
                type="button"
                onClick={() => setShowAllCategories((v) => !v)}
                className="chip hover:border-line-hi hover:text-ink"
              >
                {showAllCategories ? "Fewer" : `+${hiddenCount} more`}
              </button>
            )}
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {WATERS.map((w) => {
              const on = filters.waters.includes(w.id);
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => toggleWater(w.id)}
                  aria-pressed={on}
                  className={`chip transition-colors ${
                    on
                      ? "!border-tide/50 !bg-tide/12 !text-ink"
                      : "hover:border-line-hi hover:text-ink"
                  }`}
                >
                  {w.label}
                </button>
              );
            })}
            {PRICE_BANDS.map((b) => {
              const on = filters.bands.includes(b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => toggleBand(b.id)}
                  aria-pressed={on}
                  className={`chip transition-colors ${
                    on
                      ? "!border-teal/50 !bg-teal/12 !text-ink"
                      : "hover:border-line-hi hover:text-ink"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}

            <p
              aria-live="polite"
              className="ml-auto text-sm text-ink-faint"
            >
              {active ? (
                <>
                  <span className="tnum text-ink">{results.length}</span> of{" "}
                  <span className="tnum">{total}</span>
                </>
              ) : (
                <span className="hidden sm:inline">
                  Press <kbd className="rounded border border-line px-1">/</kbd>{" "}
                  to search
                </span>
              )}
            </p>

            {active && (
              <button
                type="button"
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="text-sm text-tide hover:text-teal"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── results, or the curated browse below ─────────────────────────── */}
      {active ? (
        <section className="mt-10" aria-label="Search results">
          <GapNotice query={filters.query} />
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {results.map((p, i) => (
                <ProductCard key={p.key} product={p} priority={i < 4} />
              ))}
            </div>
          ) : (
            <EmptyState
              filters={filters}
              onClear={() => setFilters(EMPTY_FILTERS)}
              onSuggest={(q) => setFilters((f) => ({ ...f, query: q }))}
            />
          )}
        </section>
      ) : (
        children
      )}
    </>
  );
}

/**
 * Some searches are better answered than matched — see gapNotice().
 */
function GapNotice({ query }: { query: string }) {
  const notice = gapNotice(query);
  if (!notice) return null;
  return (
    <div className="card mb-6 border-l-2 border-l-tide p-5">
      <p className="font-semibold text-ink">{notice.title}</p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-dim">
        {notice.body}
      </p>
    </div>
  );
}

/**
 * The empty state does actual work: it names which filter is most likely to
 * blame and offers to drop just that one, rather than a dead end and a
 * shrug. A shopper who filters into nothing should never have to start over.
 */
function EmptyState({
  filters,
  onClear,
  onSuggest,
}: {
  filters: Filters;
  onClear: () => void;
  onSuggest: (q: string) => void;
}) {
  // A curated panel is a better answer than a guess at a misspelling, so when
  // one is showing we don't also ask "did you mean silver?" of someone who
  // typed "sinker".
  const suggestion =
    filters.query.trim() && !gapNotice(filters.query)
      ? didYouMean(filters.query)
      : null;
  const withoutPrice = applyFilters({ ...filters, bands: [] }).length;
  const withoutCats = applyFilters({ ...filters, categories: [] }).length;
  const withoutQuery = applyFilters({ ...filters, query: "" }).length;

  return (
    <div className="card mx-auto max-w-xl p-8 text-center">
      <p className="text-lg font-semibold">Nothing matches all of that.</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-dim">
        {filters.query.trim()
          ? `We don't carry anything for “${filters.query.trim()}”, or not with the other filters on.`
          : "That combination of filters is empty."}
      </p>

      {suggestion && (
        <p className="mt-3 text-sm text-ink-dim">
          Did you mean{" "}
          <button
            type="button"
            onClick={() => onSuggest(suggestion)}
            className="text-tide underline underline-offset-2 hover:text-teal"
          >
            {suggestion}
          </button>
          ?
        </p>
      )}

      <div className="mt-5 flex flex-col items-center gap-2 text-sm">
        {filters.bands.length > 0 && withoutPrice > 0 && (
          <p className="text-ink-dim">
            Dropping the price filter would show{" "}
            <strong className="text-ink">{withoutPrice}</strong> products.
          </p>
        )}
        {filters.categories.length > 0 && withoutCats > 0 && (
          <p className="text-ink-dim">
            Dropping the category filter would show{" "}
            <strong className="text-ink">{withoutCats}</strong>.
          </p>
        )}
        {filters.query.trim() && withoutQuery > 0 && (
          <p className="text-ink-dim">
            Clearing the search would show{" "}
            <strong className="text-ink">{withoutQuery}</strong>.
          </p>
        )}
      </div>

      <button type="button" onClick={onClear} className="btn btn-primary mt-6">
        Clear all filters
      </button>

      <p className="mt-5 text-xs leading-relaxed text-ink-faint">
        If it&rsquo;s something we ought to stock,{" "}
        <Link href="/contact" className="text-tide hover:text-teal">
          tell us
        </Link>
        . We read all of it.
      </p>
    </div>
  );
}
