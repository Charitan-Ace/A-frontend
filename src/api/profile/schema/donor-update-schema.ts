import { z } from "zod";

export const donorUpdateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string().optional(),
});

export type DonorUpdateInput = z.infer<typeof donorUpdateSchema>;
