import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, "Email must be at least 3 characters")
    .max(50, "Email must be less than 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
