"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ControlledInput from "../controlled/ControlledInput";
import { SignUpFormValidation } from "@/lib/validation";
import PasswordInputWithHelper from "../PasswordInputWithHelper";
import { ISignUpRequest } from "@/lib/types/requests/user.type";
import { IAuthResponse } from "@/lib/types/responses/user.type";
import { IReactQueryError } from "@/lib/types/responses/error.type";
import { signUp } from "@/lib/tools/api";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignupForm() {
  const router = useRouter();

  const mutation: UseMutationResult<
    IAuthResponse,
    IReactQueryError,
    ISignUpRequest
  > = useMutation({
    mutationFn: signUp,
  });

  const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof SignUpFormValidation>) {
    try {
      await mutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      // TODO: add notifications
      if (res?.ok) {
        console.log("Sign Up Success!");
        router.push("/");
      } else {
        console.log(res?.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
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