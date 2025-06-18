"use client";

import { useCallback, useState } from "react";
import { SquareMinus, SquarePlus } from "lucide-react";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import { useUpdateCart } from "@/lib/tools/mutations";

const QuantityButtons = ({
  _id,
  quantity,
  stock,
}: {
  _id: string;
  quantity: number;
  stock: number;
}) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: session } = useSession();
  const updateCartMutation = useUpdateCart();

  const debouncedUpdateCart = useCallback(
    debounce(async (newQuantity: number) => {
      if (newQuantity > 0 && newQuantity <= stock) {
        setIsUpdating(true);
        await updateCartMutation.mutateAsync({
          product: { product: _id, quantity: newQuantity },
          user: session!,
        });
        setIsUpdating(false);
      }
    }, 500),
    [session, _id, stock]
  );

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 0) return;

    if (quantity > stock) {
      if (stock === 0) {
        removeItem();
        return;
      }
      setLocalQuantity(stock);
      debouncedUpdateCart(stock);
      return;
    }

    if (newQuantity > stock) {
      toast("There is not enough stock for the selected product.");
      return;
    }
    if (newQuantity < 1) {
      removeItem();
      return;
    }
    setLocalQuantity(newQuantity);
    debouncedUpdateCart(newQuantity);
  };

  const removeItem = async () => {
    await updateCartMutation.mutateAsync({
      product: { product: _id, quantity: 0 },
      user: session!,
    });
    toast.success("Product removed from your cart!", { id: "remove-product" });
  };

  return (
    <div className="flex gap-1 lg:h-full lg:justify-center lg:items-center">
      <SquareMinus
        color="#737373"
        onClick={() => handleQuantityChange(localQuantity - 1)}
        className="cursor-pointer hover:opacity-80"
      />
      <p className="text-neutral-700 font-semibold">
        {isUpdating || updateCartMutation.isPending ? "..." : quantity}
      </p>
      <SquarePlus
        color="#737373"
        onClick={() => handleQuantityChange(localQuantity + 1)}
        className="cursor-pointer hover:opacity-80"
      />
    </div>
  );
};

export default QuantityButtons;