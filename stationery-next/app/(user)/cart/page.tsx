import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ShoppingCart from "@/components/cart/ShoppingCart";
import { prefetchCart } from "@/lib/tools/queries";
import CartHeaderInfo from "@/components/cart/CartHeaderInfo";

export default async function Cart() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/auth/login");
  }

  const queryClient = new QueryClient();
  await prefetchCart(queryClient, session);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-7xl p-4 sm:p-6 md:py-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Shopping Cart
          </h1>
          <CartHeaderInfo />
        </header>
        <ShoppingCart />
      </div>
    </HydrationBoundary>
  );
}
