import { redirect } from "next/navigation";
import { isAdminConfigured, isAuthed } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthed()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
      <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>

      {!isAdminConfigured() ? (
        <div className="card mt-6 p-6">
          <p className="leading-relaxed text-ink-dim">
            <code className="text-ink">ADMIN_PASSWORD</code> isn&rsquo;t set on
            this deployment. Add it in Vercel &rarr; Settings &rarr; Environment
            Variables and redeploy.
          </p>
        </div>
      ) : (
        <form action="/api/admin/login" method="POST" className="card mt-6 p-6">
          <label htmlFor="pw" className="text-sm text-ink-dim">
            Password
          </label>
          <input
            id="pw"
            name="password"
            type="password"
            autoFocus
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border border-line bg-deep px-3.5 py-2.5 text-ink outline-none focus:border-line-hi"
          />
          {error && <p className="mt-3 text-sm text-[#f87171]">Wrong password.</p>}
          <button type="submit" className="btn btn-primary mt-5 w-full">
            Sign in
          </button>
        </form>
      )}
    </div>
  );
}
