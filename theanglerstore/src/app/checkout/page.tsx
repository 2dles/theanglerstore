import { EmbeddedCheckoutForm } from "@/components/EmbeddedCheckoutForm";

export const metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-3 text-ink-dim">
          You&rsquo;re staying right here. Payment happens on this page.
        </p>
      </div>
      <EmbeddedCheckoutForm />
    </div>
  );
}
