import { z } from "zod";

export const subscriptionSchema = z.object({
  amount: z.number().min(1, { message: "Donation amount must be at least $1" }),
  projectId: z.string(),
});

export type SubscriptionInput = z.infer<typeof subscriptionSchema>;