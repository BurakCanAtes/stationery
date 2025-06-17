import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import ImageSlider from "@/components/common/ImageSlider";

export default async function ProductDetails({
  params
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const images = [
    "https://image.ceneostatic.pl/data/products/127812236/p-rubik-s-speed-cube-3x3.jpg",
    "https://m.media-amazon.com/images/I/81c627KqWJL.jpg",
    "https://www.hachettebookgroup.com/wp-content/uploads/2017/06/9780316769488.jpg",
  ];
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:py-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-5 sm:gap-10 my-8 md:my-12 pb:24">
        <div className="flex items-center gap-1 w-min bg-transparent ml-4 sm:ml-6 hover:opacity-70">
          <ArrowLeft />
          <p>Back</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 mt-12 md:mt-0">
          <div className="w-full flex flex-col gap-5 items-center lg:items-start">
            {images.length > 0 ? (
              <ImageSlider images={images} name={"Product Title"} />
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
          <div className="w-full flex flex-col gap-10 max-w-4xl self-center">
            <div className="flex flex-col gap-2">
              <div className="w-full flex justify-between items-end gap-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  Product Title
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  $Price
                </h2>
              </div>
              <h3 className="text-xs sm:text-sm md:text-base text-neutral-500 font-semibold">
                STATIONERY
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
                Stock: <span className="font-bold text-neutral-600">0</span>
              </h4>
              <h4 className="text-xl font-medium">
                Product Code: <span className="font-bold text-neutral-600">{"684ead2418f694a3d9b51176".slice(0, 11)}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}