import { z } from "zod";

export const donorSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  profile: z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    phoneNumber: z.string().optional(),
  }),
});

export type DonorFormValues = z.infer<typeof donorSchema>;
