import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ShoppingCart from "@/components/cart/ShoppingCart";
import { getUserCart } from "@/lib/tools/api";

export default async function Cart() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/auth/login");
  }

  const cart = await getUserCart(session);
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Shopping Cart
        </h1>
        <p>
          <span className="font-semibold">{cart.totalItemsInCart} items</span> in your cart
        </p>
      </header>
      <ShoppingCart cart={cart} />
    </div>
  );
}
