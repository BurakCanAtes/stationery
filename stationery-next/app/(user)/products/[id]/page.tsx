import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import ImageSlider from "@/components/common/ImageSlider";
import { getProductById } from "@/lib/tools/api";
import ProductInfo from "@/components/products/ProductInfo";

export default async function ProductDetails({
  params
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:py-8">
      <main className="mx-auto max-w-7xl flex flex-col gap-5 sm:gap-10 my-8 md:my-12 pb:24">
        <div className="flex items-center gap-1 w-min bg-transparent ml-4 sm:ml-6 hover:opacity-70">
          <ArrowLeft />
          <p>Back</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 mt-12 md:mt-0">
          <div className="w-full flex flex-col gap-5 items-center lg:items-start">
            {product.images.length > 0 ? (
              <ImageSlider images={product.images} name={"Product Title"} />
            ) : (
              <div className="text-center flex items-center justify-center w-full h-full relative">
                <Image
                  data-testid="singleProductPage__withoutSliderImage"
                  width={250}
                  height={250}
                  src="/images/galleryIcon.svg"
                  alt="no image"
                />
              </div>
            )}
          </div>
          <ProductInfo product={product} />
        </div>
      </main>
    </div>
  );
}