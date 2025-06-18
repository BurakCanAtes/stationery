'use client';

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

import { useCart } from "@/lib/tools/queries";

const CartIcon = () => {
  const { data: session } = useSession();
  const { data: cart } = useCart(session!);

  return (
    <div className="relative rounded-full bg-background p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-offset-2 focus:ring-offset-background">
      <Link href={"/cart"}>
        <span className="sr-only">View cart</span>
        <ShoppingCartIcon aria-hidden="true" className="size-6" />
      </Link>
      <div className="size-4 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/30 absolute -bottom-1 right-0">
        <p className="text-red-500 text-xs font-semibold">{cart?.totalItemsInCart}</p>
      </div>
    </div>
  );
}

export default CartIcon;