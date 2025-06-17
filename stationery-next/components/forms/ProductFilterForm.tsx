"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Categories } from "@/lib/types/category.type";
import { capitalizeFirstLetter } from "@/lib/utils/helperFunctions";
import { ProductFilterFormValidation } from "@/lib/validation";
import ControlledDropdown from "../controlled/ControlledDropdown";
import ControlledInput from "../controlled/ControlledInput";
import ControlledCheckbox from "../controlled/ControlledCheckbox";

const ProductFilterForm = ({ categories }: { categories: Categories }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      category: searchParams.get("category") || "",
      minPrice: parseInt(searchParams.get("minPrice") || "0", 10) || 0,
      maxPrice:
        parseInt(searchParams.get("maxPrice") || "999999", 10) || 999999,
      inStock: false,
    }),
    [searchParams]
  );

  useEffect(() => {
    const newValues = {
      category: searchParams.get("category") || "",
      minPrice: parseInt(searchParams.get("minPrice") || "0", 10) || 0,
      maxPrice: parseInt(searchParams.get("maxPrice") || "999999", 10) || 999999,
      inStock: searchParams.get("inStock") === "true",
    };

    form.reset(newValues);
  }, [searchParams]);

  const isFilterApplied = useMemo(
    () =>
      (searchParams.has("category") && searchParams.get("category") !== "") ||
      (searchParams.has("inStock") && searchParams.get("inStock") === "true") ||
      (searchParams.has("minPrice") &&
        searchParams.get("minPrice") !== "" &&
        searchParams.get("minPrice") !== "0") ||
      (searchParams.has("maxPrice") &&
        searchParams.get("maxPrice") !== "" &&
        searchParams.get("maxPrice") !== "999999"),
    [searchParams]
  );

  const form = useForm<z.infer<typeof ProductFilterFormValidation>>({
    resolver: zodResolver(ProductFilterFormValidation),
    defaultValues,
  });

  const categoryOptions = categories.map((category) => ({
    label: capitalizeFirstLetter(category.name),
    value: category._id,
  }));

  function onSubmit(data: z.infer<typeof ProductFilterFormValidation>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(data)) {
      if (
        (typeof value === "string" && value !== "") ||
        (typeof value === "number" && !isNaN(value)) ||
        (typeof value === "boolean" && value === true)
      ) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    }
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  }

  const clearFilters = () => {
    form.reset({
      category: "",
      minPrice: 0,
      maxPrice: 999999,
      inStock: false,
    });
    router.push("/products");
  };

  return (
    <Accordion type="single" collapsible className="mt-4">
      <AccordionItem
        value="item-1"
        className="w-full max-w-[21rem] justify-between"
      >
        <AccordionTrigger className="items-center justify-between">
          <div className="w-full flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Filter</h2>
            {isFilterApplied && <p className="text-green-400">Applied</p>}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <ControlledDropdown
                control={form.control}
                name="category"
                label="Category"
                options={categoryOptions}
                placeholder="Select Category"
              />
              <div className="flex gap-2">
                <ControlledInput
                  control={form.control}
                  name="minPrice"
                  label="Min Price"
                  type="number"
                  placeholder="0"
                  inputStyles="max-w-40"
                  preserveMessageSpace={
                    !!(
                      form.formState.errors.minPrice ||
                      form.formState.errors.maxPrice
                    )
                  }
                  messageStyles="text-xs"
                />
                <ControlledInput
                  control={form.control}
                  name="maxPrice"
                  label="Max Price"
                  type="number"
                  placeholder="999999"
                  inputStyles="max-w-40"
                  preserveMessageSpace={
                    !!(
                      form.formState.errors.minPrice ||
                      form.formState.errors.maxPrice
                    )
                  }
                  messageStyles="text-xs"
                />
              </div>
              <ControlledCheckbox
                control={form.control}
                name="inStock"
                label="In Stock"
              />
              <div className="flex gap-2 justify-end">
                <Button type="button" className="cursor-pointer" onClick={clearFilters} disabled={!isFilterApplied}>
                  Clear Filters
                </Button>
                <Button type="submit" className="cursor-pointer">Apply</Button>
              </div>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductFilterForm;
