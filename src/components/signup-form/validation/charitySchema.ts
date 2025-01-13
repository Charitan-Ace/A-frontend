import { z } from "zod";

export const charitySchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  profile: z.object({
    companyName: z.string().nonempty("Company name is required"),
    taxCode: z.string().nonempty("Tax code is required"),
    address: z.string().nonempty("Address is required"),
    organizationType: z.enum(["INDIVIDUAL", "ORGANIZATION", "NON_PROFIT"]),
  }),
});

export type CharityFormValues = z.infer<typeof charitySchema>;
