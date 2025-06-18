import Link from "next/link";

import { Button } from "../ui/button";
import { formatAmount } from "@/lib/utils/helperFunctions";

const shipping = 4;

const CartTotal = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <section className="flex flex-col gap-4 w-full md:p-4 md:ml-auto md:w-1/2 lg:rounded-3xl lg:shadow-2xl/50">
      <h4 className="text-xl font-bold">Cart Total</h4>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="font-medium">Cart Subtotal</p>
          <p className="font-semibold">${formatAmount(totalPrice)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium">Shipping</p>
          <p className="font-semibold">${formatAmount(shipping)}</p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold">
          <p>Cart Total</p>
          <p>${formatAmount(totalPrice + shipping)}</p>
        </div>
      </div>
      <Link href="#">
        <Button type="button" className="w-full cursor-pointer">
          Continue Checkout
        </Button>
      </Link>
    </section>
  );
};

export default CartTotal;