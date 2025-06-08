"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ISideImageLayoutProps {
  children: React.ReactNode;
  imageSrc: string;
}

export default function SideImageLayout({
  children,
  imageSrc,
}: ISideImageLayoutProps) {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const onLoadImage = () => setIsImageLoading(false);

  return (
    <main className="flex max-w-screen">
      <section className="min-w-[50vw] flex-1 pb-14 lg:py-12 lg:px-10">
        <div className="mt-5 mx-5 mb-3.5 lg:m-0 overflow-x-hidden">
          <Link href="/products">
            <Image src="/logo.png" alt="ate logo" width={75} height={75} />
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[calc(100%-130px)] px-5">
          {children}
        </div>
      </section>
      <aside
        className={`relative hidden lg:flex max-w-${
          isImageLoading ? "none" : "[50vw]"
        }`}
      >
        {isImageLoading && (
          <div className="w-[calc(100vh/1.158)] h-screen fixed top-0 right-0 overflow-hidden">
            <div className="w-full h-screen bg-gray-400 animate-pulse"></div>
          </div>
        )}
        <Image
          src={imageSrc}
          alt="stationery"
          width={1000}
          height={1000}
          style={{
            height: "100vh",
            width: "fit-content",
            position: "sticky",
            top: "0",
            opacity: `${isImageLoading ? 0 : 1}`,
            transition: "all 0.5s",
          }}
          priority
          onLoad={onLoadImage}
        />
      </aside>
    </main>
  );
}