"use client";

import { usePathname } from "next/navigation";

import SideImageLayout from "@/components/common/SideImageLayout";
import { IMAGE_SRCS } from "@/lib/constants/imagePaths";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const pathImageMap: Record<string, string | undefined> = {
    "/auth/signup": IMAGE_SRCS.SIGNUP_SIDE,
    "/auth/login": IMAGE_SRCS.LOGIN_SIDE,
  };

  const imageSrc = pathImageMap[pathname] || "";

  return <SideImageLayout imageSrc={imageSrc}>{children}</SideImageLayout>;
}