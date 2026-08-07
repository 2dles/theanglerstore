import { CartView } from "@/components/CartView";

export const metadata = {
  title: "Your cart",
  description: "Review your gear before checkout.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your cart</h1>
      <CartView />
    </div>
  );
}
