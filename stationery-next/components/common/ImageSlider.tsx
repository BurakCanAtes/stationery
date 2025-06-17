"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

import useIsMobile from "@/lib/hooks/useIsMobile";

type ImageSliderProps = {
  images: string[];
  name: string;
};

const ImageSlider = ({ images, name }: ImageSliderProps) => {
  const isMobile = useIsMobile();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState<number>(5);
  const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
  const [isThumbnailLoading, setIsThumbnailLoading] = useState<boolean>(true);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateVisibleThumbnails = () => {
      const containerWidth = thumbnailContainerRef.current?.offsetWidth || 0;
      const thumbnailSize = 80 + 16;
      const thumbnailsVisible = Math.floor(containerWidth / thumbnailSize);
      if (isMobile) {
        setVisibleThumbnails(thumbnailsVisible);
      } else {
        setVisibleThumbnails(5);
      }
    };

    calculateVisibleThumbnails();
    window.addEventListener("resize", calculateVisibleThumbnails);

    return () => {
      window.removeEventListener("resize", calculateVisibleThumbnails);
    };
  }, [isMobile]);

  const maxThumbnailIndex = Math.max(0, images.length - visibleThumbnails);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    setIsImgLoading(true);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
    setIsImgLoading(true);
  };

  const currentThumbnailIndex = Math.min(currentImage, maxThumbnailIndex);

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col-reverse" : "flex-row"
      } gap-2 w-full sm:w-[550px] md:w-[500px] lg:w-[600px] h-full sm:h-[650px] md:h-[480px] xl:h-[500px]`}
    >
      <div
        ref={thumbnailContainerRef}
        className={`relative min-w-20 min-h-[90px] overflow-hidden ${
          isMobile ? "flex-row" : "flex-col"
        }`}
      >
        <div
          className={`flex ${
            isMobile ? "flex-row" : "flex-col"
          } gap-4 transition-transform duration-500 ease-in-out`}
          style={{
            transform: isMobile
              ? `translateX(-${currentThumbnailIndex * 96}px)`
              : `translateY(-${currentThumbnailIndex * 96}px)`,
          }}
        >
          {images.map((image, index) => (
            <div
              className={`relative w-20 h-20 overflow-hidden cursor-pointer ${
                index === currentImage ? "opacity-35" : "opacity-100"
              } transition-opacity duration-300 ease-in-out`}
              key={index}
              onClick={() => {
                setIsImgLoading(true);
                setCurrentImage(index);
              }}
            >
              {isThumbnailLoading && (
                <div className="w-20 h-20 bg-gray-400 animate-pulse"></div>
              )}
              <Image
                src={image}
                alt={`${name} Thumbnail ${index + 1}`}
                fill
                className="object-contain"
                style={{
                  opacity: `${isThumbnailLoading ? 0 : 1}`,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (e.target instanceof HTMLElement) {
                    e.target.style.filter = "grayscale(100%)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (e.target instanceof HTMLElement) {
                    e.target.style.filter = "grayscale(0%)";
                  }
                }}
                onLoad={() => setIsThumbnailLoading(false)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative aspect-[9/10] w-full h-full">
        {isImgLoading && (
          <div className="w-full h-full bg-gray-400 animate-pulse"></div>
        )}
        <Image
          src={images[currentImage]}
          alt={`${name} Image ${currentImage + 1}`}
          style={{
            objectFit: "contain",
            opacity: `${isImgLoading ? 0 : 1}`,
            transition: "opacity 0.5s",
          }}
          fill
          sizes="100%"
          quality={100}
          onLoad={() => setIsImgLoading(false)}
        />
        {images.length > 1 && (
          <div className="absolute bottom-[5%] right-[5%] gap-[5px] flex">
            <CircleArrowLeft size={28} onClick={prevImage} color="#737373" />
            <CircleArrowRight size={28} onClick={nextImage} color="#737373" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;