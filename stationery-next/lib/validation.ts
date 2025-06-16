import { z } from "zod";
import zxcvbn from "zxcvbn";

export const LogInFormValidation = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const SignUpFormValidation = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(30, "First name must be at most 30 characters"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(30, "Last name must be at most 30 characters"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .refine((val) => zxcvbn(val).score >= 3, {
        message: "Password is too weak",
      }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ProductFilterFormValidation = z
  .object({
    category: z.string(),
    minPrice: z.number().min(0, "Price cannot be lower than 0"),
    maxPrice: z.number().max(999999, "Price cannot exceed $999.999"),
    inStock: z.boolean(),
  })
  .refine((data) => data.minPrice < data.maxPrice, {
    message: "Max price must be higher than min price",
    path: ["maxPrice"],
  });