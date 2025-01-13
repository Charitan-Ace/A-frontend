import { z } from "zod";

export const donateProjectsSchema = z.object({
  donationAmount: z.number(),
});
