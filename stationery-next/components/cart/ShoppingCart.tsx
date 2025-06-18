import { ICartResponse } from "@/lib/types/responses/cart.type";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

const ShoppingCart = ({ cart }: { cart: ICartResponse }) => {
  const cartTotal = cart.data.reduce((acc, product) => acc + (product.product.price * product.quantity), 0);

  return (
    <main className="my-8 w-full flex flex-col gap-8">
      <div className="lg:p-4 lg:rounded-3xl lg:shadow-sm/40">
        <div className="hidden lg:grid lg:grid-cols-6">
          <h2 className="col-span-3 text-lg font-bold">Product</h2>
          <h2 className="text-center text-lg font-bold">Price</h2>
          <h2 className="text-center text-lg font-bold">Quantity</h2>
          <h2 className="text-center text-lg font-bold">Total Price</h2>
        </div>
        {cart.data.length > 0 && cart.data.map((item) => <CartItem key={item._id} item={item} />)}
      </div>
      <CartTotal totalPrice={cartTotal} /><CartTotal totalPrice={cartTotal} />
    </main>
  );
};

export default ShoppingCart;
