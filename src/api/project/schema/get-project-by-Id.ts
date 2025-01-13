import { z } from "zod";

export const getProjectByIdSchema = z.object({
  projectId: z.string(),
});

export type getProjectByIdInput = z.input<typeof getProjectByIdSchema>;
