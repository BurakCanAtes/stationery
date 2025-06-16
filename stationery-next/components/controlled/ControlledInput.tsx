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
  inputStyles?: string;
  messageStyles?: string;
  preserveMessageSpace?: boolean;
}

const ControlledInput = <T extends FieldValues>({
  control,
  name,
  label,
  type,
  required = false,
  inputStyles,
  preserveMessageSpace,
  messageStyles,
  ...inputProps
}: IControlledInputProps<T>) => {
  const isNumber = type === "number";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={inputStyles}>
          <FormLabel className="tracking-wide">
            {label}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <Input
              required={required}
              {...field}
              {...inputProps}
              type={type}
              onChange={(e) => {
                const value = isNumber
                  ? e.target.valueAsNumber
                  : e.target.value;
                field.onChange(value);
              }}
            />
          </FormControl>
          {preserveMessageSpace ? (
            <div className="min-h-[2rem]">
              <FormMessage className={messageStyles} />
            </div>
          ) : (
            <FormMessage className={messageStyles} />
          )}
        </FormItem>
      )}
    />
  );
};

export default ControlledInput;