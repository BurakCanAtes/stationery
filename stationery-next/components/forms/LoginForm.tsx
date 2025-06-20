"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import ControlledInput from "../controlled/ControlledInput";
import { LogInFormValidation } from "@/lib/validation";

const defaultValues = {
  email: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LogInFormValidation>>({
    resolver: zodResolver(LogInFormValidation),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof LogInFormValidation>) {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login successful!", { id: "login-success" });
        router.push("/products");
      } else {
        toast.error(res?.error || "Something went wrong", { id: "login-error" });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong. Please try again.", { id: "login-server-error" });
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3 md:space-y-4"
        >
          <ControlledInput<z.infer<typeof LogInFormValidation>>
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="example@example.com"
            required={true}
            autoComplete="email"
          />
          <ControlledInput<z.infer<typeof LogInFormValidation>>
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="**********"
            required={true}
            autoComplete="current-password"
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
      <div className="flex mt-2 gap-1.5">
        <p className="flex items-center justify-center gap-1.5 text-base text-gray-700">
          Don't have an account?
        </p>
        <p className="text-base text-primary hover:underline">
          <Link href="/auth/signup" className="no-underline text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}