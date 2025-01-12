import { z } from "zod";

const donorProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string().optional(),
});

const charityProfileSchema = z.object({
  companyName: z.string(),
  taxCode: z.string(),
  address: z.string(),
  organizationType: z.enum(["INDIVIDUAL", "ORGANIZATION"]),
});

export const registerSchema = z.discriminatedUnion("role", [
  z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.literal("DONOR"),
    profile: donorProfileSchema,
  }),
  z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.literal("CHARITY"),
    profile: charityProfileSchema,
  }),
]);

export type RegisterInput = z.infer<typeof registerSchema>;
