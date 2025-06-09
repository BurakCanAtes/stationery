import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { InputHTMLAttributes } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CircleHelp } from "lucide-react";

interface IPasswordInputWithHelpterProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
}

const PasswordInputWithHelper = <T extends FieldValues>({
  control,
  name,
  ...inputProps
}: IPasswordInputWithHelpterProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="tracking-wide">Password*</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                {...inputProps}
                type="password"
                className="pr-10"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    <CircleHelp className="h-5 w-h-5" />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Password Requirements</DialogTitle>
                    <DialogDescription>
                      Your password must be at least 8 characters long and
                      contain a mix of letters, numbers, and symbols. Try to
                      avoid common words or patterns.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInputWithHelper;