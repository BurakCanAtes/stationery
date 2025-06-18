import { z } from "zod";
import zxcvbn from "zxcvbn";

import { ACCEPTED_TYPES, MAX_FILE_SIZE } from "./constants/avatarConfig";

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

export const UpdateProfileValidation = z.object({
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
});

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const AvatarFormValidation = z
  .object({
    file: z
      .custom<FileList>()
      .optional()
      .refine((files) => {
        return Array.from(files ?? []).every(
          (file) => sizeInMB(file.size) <= MAX_FILE_SIZE
        );
      }, `File size should be less than ${MAX_FILE_SIZE}MB`)
      .refine((files) => {
        return Array.from(files ?? []).every((file) =>
          ACCEPTED_TYPES.includes(file.type)
        );
      }, "Only these types are allowed: .jpeg, .png, .webp"),
    avatarUrl: z
      .string()
      .url("Must be a valid URL")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      const hasFile = data.file instanceof FileList;
      const hasUrl = !!data.avatarUrl && data.avatarUrl.trim() !== "";
      return (hasFile && !hasUrl) || (!hasFile && hasUrl);
    },
    {
      message: "Please provide either a file or a URL, not both.",
      path: ["avatarUrl"],
    }
  );