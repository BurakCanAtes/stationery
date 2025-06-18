import Image from "next/image";

import { ProductInCart } from "@/lib/types/cart.type";
import { formatAmount } from "@/lib/utils/helperFunctions";
import QuantityButtons from "../common/buttons/QuantityButtons";

const CartItem = ({ item }: { item: ProductInCart }) => {
  const {
    quantity,
    product: { _id, images, name, productType, price, stock },
  } = item;
  const thumbnail = images[0] || "/images/galleryIcon.svg";

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6">
      <div className="flex gap-2 col-span-2 md:gap-3 lg:col-span-3">
        <div className="relative w-1/3 aspect-[3/4] lg:w-1/4">
          <Image
            src={thumbnail}
            alt={name}
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="h-full w-full flex flex-1 shrink-0 flex-col justify-evenly gap-2 lg:gap-0">
          <div className="flex flex-col">
            <p className="text-xs text-neutral-500 font-semibold">
              {productType.toUpperCase()}
            </p>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">
              {name}
            </h3>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs md:text-sm text-neutral-700 font-semibold">
              Author or Color or Age
            </p>
            <p className="text-xs md:text-sm text-neutral-700 font-semibold">
              Publisher or Brand
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-evenly sm:justify-center sm:gap-4 lg:col-span-3 lg:grid lg:grid-cols-3">
        <p className="font-semibold text-sm md:text-base lg:h-full lg:flex lg:justify-center lg:items-center">
          ${formatAmount(price)}
        </p>
        <QuantityButtons _id={_id} quantity={quantity} stock={stock} />
        <p className="font-semibold text-red-400 text-sm md:text-base lg:h-full lg:flex lg:justify-center lg:items-center">
          ${formatAmount(price * quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;