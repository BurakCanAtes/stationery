import { ProductResponse } from "@/lib/types/responses/product.type";
import { formatAmount } from "@/lib/utils/helperFunctions";

const ProductInfo = ({ product }: { product: ProductResponse }) => {
  return (
    <div className="w-full flex flex-col gap-10 max-w-4xl self-center">
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-end gap-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {product.name}
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">${formatAmount(product.price)}</h2>
        </div>
        <h3 className="text-xs sm:text-sm md:text-base text-neutral-500 font-semibold">
          {product.productType.toUpperCase()}
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-medium">
          Color: <span className="font-bold text-neutral-600">Gray</span>
        </h4>
        <h4 className="text-xl font-medium">
          Brand: <span className="font-bold text-neutral-600">Swingline</span>
        </h4>
        <h4 className="text-xl font-medium">
          Stock: <span className="font-bold text-neutral-600">{product.stock}</span>
        </h4>
        <h4 className="text-xl font-medium">
          Product Code:{" "}
          <span className="font-bold text-neutral-600">
            {product._id.slice(0, 11)}
          </span>
        </h4>
      </div>
    </div>
  );
}

export default ProductInfo;