import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(6, "Username must be atleast 6 characters")
  .max(20, "Username must not be more than 20 characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }),
});
