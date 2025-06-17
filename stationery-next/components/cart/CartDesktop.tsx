import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

// Window width > 1024px
const CartDesktop = () => {
  return (
    <main className="my-8 w-full flex flex-col gap-8">
      <div className="p-4 rounded-3xl shadow-lg/20">
        <div className="grid grid-cols-6">
          <h2 className="col-span-3 text-lg font-bold">Product</h2>
          <h2 className="text-center text-lg font-bold">Price</h2>
          <h2 className="text-center text-lg font-bold">Quantity</h2>
          <h2 className="text-center text-lg font-bold">Total Price</h2>
        </div>
        <CartItem />
      </div>
      <CartTotal />
    </main>
  );
};

export default CartDesktop;