import Image from "next/image";

import { ProductResponse } from "@/lib/types/responses/product.type";
import { textOverflowEllipsis } from "@/styles/commonStyles";
import TextWithPopover from "../common/TextWithPopover";
import { formatAmount } from "@/lib/utils/helperFunctions";

interface IProductCardProps {
  product: ProductResponse;
}

export default function ProductCard({ product }: IProductCardProps) {
  const thumbnail = product.images[0];

  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={thumbnail}
          alt={`${product.name} thumbnail`}
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="h-full flex flex-col p-1 gap-2">
        <div className="flex flex-col">
          <TextWithPopover tooltip={product.name}>
            <h2
              title={product.name}
              className="text-base sm:text-2xl md:text-2xl font-bold"
              style={textOverflowEllipsis.singleLine}
            >
              {product.name}
            </h2>
          </TextWithPopover>
          <h3 className="text-sm md:text-base text-neutral-500 font-semibold">
            {product.productType}
          </h3>
        </div>
        <h4 className="mt-auto text-base md:text-xl font-bold">
          ${formatAmount(product.price)}
        </h4>
      </div>
    </div>
  );
}