import { ProjectCategoryEnum } from "@/type/enum";
import { z } from "zod";

export const createProjectSchema = z
  .object({
    title: z.string().max(50).min(5),
    description: z.string().max(200).min(10),
    goal: z.coerce.number(),
    startTime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/),
    categoryType: z
      .nativeEnum(ProjectCategoryEnum)
      .default(ProjectCategoryEnum.HEALTH),
    countryIsoCode: z.string(),
    endTime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/),
  })
  .refine(
    (data) => {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

export type CreateProjectInput = z.input<typeof createProjectSchema>;
