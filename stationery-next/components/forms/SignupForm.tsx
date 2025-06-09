"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ControlledInput from "../controlled/ControlledInput";
import { SignUpFormValidation } from "@/lib/validation";
import PasswordInputWithHelper from "../PasswordInputWithHelper";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignupForm() {
  const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof SignUpFormValidation>) {
    // TODO: implement signup logic
    console.log(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-2/3 space-y-3 md:space-y-4"
        >
          <ControlledInput<z.infer<typeof SignUpFormValidation>>
            control={form.control}
            name="firstName"
            label="First Name"
            type="text"
            placeholder="John"
            required={true}
          />
          <ControlledInput<z.infer<typeof SignUpFormValidation>>
            control={form.control}
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
            required={true}
          />
          <ControlledInput<z.infer<typeof SignUpFormValidation>>
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="example@example.com"
            required={true}
          />
          <PasswordInputWithHelper<z.infer<typeof SignUpFormValidation>>
            control={form.control}
            name="password"
            placeholder="**********"
            required={true}
          />
          <ControlledInput<z.infer<typeof SignUpFormValidation>>
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="**********"
            required={true}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </Form>
      <div className="flex mt-2 gap-1.5">
        <p className="flex items-center justify-center gap-1.5 text-base text-gray-700">
          Already have an account?
        </p>
        <p className="text-base text-primary hover:underline">
          <Link href="/auth/login" className="no-underline text-primary">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}