import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

interface IControlledInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
}

const ControlledInput = <T extends FieldValues>({
  control,
  name,
  label,
  type,
  required = false,
  ...inputProps
}: IControlledInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="tracking-wide">
            {label}{required && "*"}
          </FormLabel>
          <FormControl>
          <Input required={required} {...field} {...inputProps} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledInput;