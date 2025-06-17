import CartDesktop from "@/components/cart/CartDesktop";

export default function Cart() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Shopping Cart
        </h1>
        <p>2 items in your cart</p>
      </header>
      <CartDesktop />
    </div>
  );
}