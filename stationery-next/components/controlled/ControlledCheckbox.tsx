import { Control, FieldValues, Path } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Checkbox } from "../ui/checkbox";

interface IControlledCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
}

const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  label,
  required = false,
}: IControlledCheckboxProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-1">
          <FormLabel className="tracking-wide">
            {label}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              required={required}
            />
          </FormControl>
        </FormItem>
      )}
    ></FormField>
  );
};

export default ControlledCheckbox;