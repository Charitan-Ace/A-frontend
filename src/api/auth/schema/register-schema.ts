import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), // Minimum 6 characters for password
  role: z.string(),
  profile: z.object({
    // Add profile fields here
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string().optional(),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
