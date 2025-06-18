"use client";

import { useSession } from "next-auth/react";

import { useCart } from "@/lib/tools/queries";

const CartHeaderInfo = () => {
  const { data: session } = useSession();
  const { data: cart, isLoading } = useCart(session!);

  if (isLoading || !cart) return null;

  return (
    <p>
      <span className="font-semibold">{cart.totalItemsInCart} items</span> in
      your cart
    </p>
  );
};

export default CartHeaderInfo;