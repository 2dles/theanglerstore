import Link from "next/link";

export function Prose({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-faint">
        <Link href="/" className="hover:text-tide">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-dim">{title}</span>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {intro && <p className="mt-4 text-lg leading-relaxed text-ink-dim">{intro}</p>}
      {updated && (
        <p className="mt-3 text-sm text-ink-faint">Last updated {updated}</p>
      )}

      <div className="prose-store mt-10 space-y-6">{children}</div>
    </div>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-ink">{heading}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
