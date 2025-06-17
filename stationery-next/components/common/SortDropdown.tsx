'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }

  return (
    <Select
      defaultValue={searchParams.get("sort") || "-createdAt"}
      onValueChange={handleSortChange}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="-createdAt">Recent</SelectItem>
        <SelectItem value="createdAt">Oldest</SelectItem>
        <SelectItem value="price">Lowest Price</SelectItem>
        <SelectItem value="-price">Highest Price</SelectItem>
        <SelectItem value="name">Alphabetical</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortDropdown;