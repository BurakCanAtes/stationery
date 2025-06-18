'use client';

import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "../ui/button";
import { useUpdateCart } from "@/lib/tools/mutations";
import { useCart } from "@/lib/tools/queries";

const AddToCart = ({ _id, stock }: { _id: string; stock: number }) => {
  const { data: session, status } = useSession();
  const { mutateAsync, isSuccess, isPending } = useUpdateCart();
  const { data: cart, isLoading } = useCart(session!);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product added to your cart!", { id: "add-to-cart" });
    }
  }, [isSuccess]);

  const debouncedUpdateCart = useCallback(
    debounce(async () => {
      if (!session) return;

      const itemInCart = cart?.data.find((item) => item.product._id === _id);
      const currentQuantity = itemInCart?.quantity ?? 0;
      const newQuantity = Math.min(currentQuantity + 1, stock);

      if (newQuantity === currentQuantity) {
        toast("You've reached the stock limit for this item.");
        return;
      }

      await mutateAsync({
        product: { product: _id, quantity: newQuantity },
        user: session,
      });

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }, 500),
    [session, _id, stock, cart, mutateAsync, queryClient]
  );

  const addToCart = () => {
    if(status === "unauthenticated") {
      toast("Please login to add products to your cart");
    }
    if(stock === 0) {
      toast("This product is currently out of stock.");
    }
    if(status === "authenticated" && stock > 0) {
      debouncedUpdateCart();
    }
  }

  return (
    <Button
      type="button"
      disabled={status === "loading" || isPending || isLoading}
      onClick={addToCart}
      className="max-w-80 cursor-pointer"
    >
      Add To Cart
    </Button>
  );
}

export default AddToCart;