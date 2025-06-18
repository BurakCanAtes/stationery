'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "../ui/input"
import useDebounce from "@/lib/hooks/useDebounce";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    const initial = searchParams.get("search") || "";
    setSearchInput(initial);
  }, [searchParams]);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";

    if (debouncedSearch.trim() === currentSearch.trim()) return;
    
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    } else {
      params.delete("search");
    }
    router.push(`/products?${params.toString()}`);
  }, [debouncedSearch, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <Input
      name="search"
      type="search"
      aria-label="Search products"
      placeholder="Search for a product"
      onChange={handleChange}
      value={searchInput}
      className="placeholder:text-xs sm:placeholder:text-sm"
    />
  );
}

export default SearchInput;