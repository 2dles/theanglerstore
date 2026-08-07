import { EmbeddedCheckoutForm } from "@/components/EmbeddedCheckoutForm";

export const metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Checkout</h1>
      <p className="mt-3 text-ink-dim">
        You&rsquo;re staying right here — payment happens on this page.
      </p>
      <EmbeddedCheckoutForm />
    </div>
  );
}
