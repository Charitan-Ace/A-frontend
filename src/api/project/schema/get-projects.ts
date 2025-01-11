import { generalQuerySchema } from "@/api/query-params";
import { ProjectCategoryEnum, ProjectStatusEnum } from "@/type/enum";
import { z } from "zod";

export const getProjectsSchema = z.object({
  ...generalQuerySchema.shape,
  categoryTypes: z
    .array(
      z.nativeEnum(ProjectCategoryEnum).default(ProjectCategoryEnum.HEALTH)
    )
    .nullish(),
  statuses: z
    .array(z.nativeEnum(ProjectStatusEnum).default(ProjectStatusEnum.ONGOING))
    .nullish(),
  countryIsoCodes: z.array(z.string()).nullish(),
});

export type GetProjectsInput = z.infer<typeof getProjectsSchema>;
