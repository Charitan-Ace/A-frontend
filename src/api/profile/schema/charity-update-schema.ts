import { z } from "zod";

export const charityProfileSchema = z.object({
  companyName: z.string().min(1),
  taxCode: z.string().min(1),
  address: z.string().min(1),
  organizationType: z.enum(["INDIVIDUAL", "COMPANY", "NON_PROFIT"]),
  videoUrl: z.string().optional(),
});

export type CharityUpdateInput = z.infer<typeof charityProfileSchema>;
