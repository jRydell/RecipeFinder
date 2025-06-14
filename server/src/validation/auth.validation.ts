import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(10, "Username can max be 10 characters long"),
  email: z.string().email("Invalid e-mail"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").max(50),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password too long"),
});
