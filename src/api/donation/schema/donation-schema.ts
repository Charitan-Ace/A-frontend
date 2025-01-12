import { z } from "zod";

export const donationSchema = z.object({
  amount: z.number().min(1, { message: "Donation amount must be at least $1" }),
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().max(250, { message: "Message cannot exceed 250 characters" }).optional(),
  projectId: z.string(),
});

export type DonationInput = z.infer<typeof donationSchema>;
