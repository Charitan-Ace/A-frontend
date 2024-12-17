import { z } from "zod";

export const registerSchema = z.object({});

export type RegisterInput = z.infer<typeof registerSchema>;
