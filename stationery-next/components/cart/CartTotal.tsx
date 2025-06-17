import Link from "next/link";

import { Button } from "../ui/button";

const CartTotal = () => {
  return (
    <section className="flex flex-col gap-4 ml-auto w-1/2 p-4 rounded-3xl shadow-2xl/50">
      <h4 className="text-xl font-bold">Cart Total</h4>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="font-medium">Cart Subtotal</p>
          <p className="font-semibold">$79,98</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium">Shipping</p>
          <p className="font-semibold">$6,00</p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold">
          <p>Cart Total</p>
          <p>$85,98</p>
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