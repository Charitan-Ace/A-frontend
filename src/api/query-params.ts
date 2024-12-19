import { z } from "zod";

export const generalQuerySchema = z.object({
    pageSize: z.number().default(10).optional(),
    page: z.number().default(0).optional(),
    sort: z.string().optional(),
    filter: z.string().optional(),
    q: z.string().optional(),
})

export type GeneralQueryParams = z.infer<typeof generalQuerySchema>;