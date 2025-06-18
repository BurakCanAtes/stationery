import Image from "next/image";
import Link from "next/link";

import { ProductInCart } from "@/lib/types/cart.type";
import { formatAmount } from "@/lib/utils/helperFunctions";
import QuantityButtons from "../common/buttons/QuantityButtons";
import { ProductTypes } from "@/lib/types/product.type";

const CartItem = ({ item }: { item: ProductInCart }) => {
  const { quantity, product } = item;

  const { _id, images, name, productType, price, stock } = product;

  const thumbnail = images[0] || "/images/galleryIcon.svg";

  const productInfo =
    productType === ProductTypes.STATIONERY
      ? { info1: product.color, info2: product.brand }
      : productType === ProductTypes.BOOK
      ? { info1: product.author, info2: product.publisher }
      : productType === ProductTypes.TOY
      ? { info1: product.ageRange, info2: product.brand }
      : undefined;

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6">
      <div className="flex gap-2 col-span-2 md:gap-3 lg:col-span-3">
        <Link
          href={`/products/${_id}`}
          className="relative w-1/3 aspect-[3/4] lg:w-1/4"
        >
          <Image
            src={thumbnail}
            alt={name}
            fill
            priority
            className="object-contain"
          />
        </Link>
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
              {productInfo?.info1 || ""}
            </p>
            <p className="text-xs md:text-sm text-neutral-700 font-semibold">
              {productInfo?.info2 || ""}
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