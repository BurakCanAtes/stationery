import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Categories } from "@/lib/types/category.type";
import { capitalizeFirstLetter } from "@/lib/utils/helperFunctions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const ProductFilterForm = ({ categories }: { categories: Categories }) => {
  return (
    <Accordion type="single" collapsible className="mt-4">
      <AccordionItem
        value="item-1"
        className="w-full max-w-[21rem] justify-between"
      >
        <AccordionTrigger className="items-center justify-between">
          <div className="w-full flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Filter</h2>
            <p className="text-green-400">Applied</p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <p className="font-semibold">Category:</p>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {capitalizeFirstLetter(category.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="font-semibold">Price:</p>
              <div className="flex gap-2">
                <Input type="number" placeholder="0" className="max-w-40" />
                <Input
                  type="number"
                  placeholder="999999"
                  className="max-w-40"
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <p className="font-semibold">In Stock:</p>
              <Checkbox />
            </div>
            <div className="w-full flex justify-end">
              <Button type="submit">Apply</Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductFilterForm;