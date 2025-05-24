import * as z from "zod";

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password should be at least 8 characters long" }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "Please confirm password" }),
    avatar: z
      .number()
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Your passwords do not match",
    path: ["passwordConfirmation"],
  });
