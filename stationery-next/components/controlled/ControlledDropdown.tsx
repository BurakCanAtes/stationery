import { Control, FieldValues, Path } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DropdownOption {
  label: string;
  value: string;
}

interface IControlledDropdownProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const ControlledDropdown = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  required = false,
  className,
}: IControlledDropdownProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="tracking-wide">
            {label}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className={className || "w-40"}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    ></FormField>
  );
};

export default ControlledDropdown;