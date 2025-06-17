'use client';

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackBtn = () => {
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <div
      className="flex items-center gap-1 w-min bg-transparent cursor-pointer ml-4 sm:ml-6 hover:opacity-70"
      onClick={goBack}
    >
      <ArrowLeft />
      <p>Back</p>
    </div>
  );
}

export default BackBtn;