import Image from "next/image";
import { SquareMinus, SquarePlus } from "lucide-react";

const CartItem = () => {
  return (
    <div className="grid grid-cols-6">
      <div className="flex gap-3 col-span-3">
        <div className="relative w-1/4 aspect-[3/4]">
          <Image
            src="https://image.ceneostatic.pl/data/products/127812236/p-rubik-s-speed-cube-3x3.jpg"
            alt="Product Name"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="h-full w-full flex flex-1 shrink-0 flex-col justify-evenly">
          <div className="flex flex-col">
            <p className="text-xs text-neutral-500 font-semibold">STATIONERY</p>
            <h3 className="text-xl font-semibold">Product Title</h3>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-neutral-700 font-semibold">
              Author or Color or Age
            </p>
            <p className="text-sm text-neutral-700 font-semibold">
              Publisher or Brand
            </p>
          </div>
        </div>
      </div>
      <p className="h-full flex justify-center items-center font-semibold">
        $39,99
      </p>
      <div className="h-full flex justify-center items-center gap-1">
        <SquareMinus color="#737373" />
        <p className="text-neutral-700 font-semibold">2</p>
        <SquarePlus color="#737373" />
      </div>
      <p className="h-full flex justify-center items-center font-semibold text-red-400">
        $799999,989
      </p>
    </div>
  );
};

export default CartItem;