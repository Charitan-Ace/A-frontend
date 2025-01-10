import { generalQuerySchema } from "@/api/query-params";
import { ProjectCategoryEnum, ProjectStatusEnum,  } from "@/type/enum";
import { z } from "zod";

export const getProjectsSchema = z.object({
    ...generalQuerySchema.shape,
    category: z.nativeEnum(ProjectCategoryEnum).default(ProjectCategoryEnum.HEALTH).optional(),
    status: z.nativeEnum(ProjectStatusEnum).default(ProjectStatusEnum.ONGOING).optional(),
    countryIsoCode: z.string().optional(),
    
})

export type GetProjectsInput = z.infer<typeof getProjectsSchema>;