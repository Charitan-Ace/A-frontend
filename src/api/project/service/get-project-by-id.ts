import axios from "axios";
import { getProjectByIdInput } from "../schema/get-project-by-Id";
import { ProjectDto } from "@/type/project/project.dto";
import { APIResponse, ValidationError } from "@/api/axios";

const getProjectById = async ({ projectId }: getProjectByIdInput) => {
  try {
    const { data, status } = await axios.get<ProjectDto>(
      `${PROJECT_URL}/${projectId}`,
    );
    return {
      data: data,
      status: status,
    } as unknown as APIResponse<ProjectDto>;
  } catch (error) {
    if (!axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      return {
        data: null,
        error: JSON.stringify(error),
        status: 400,
      } as unknown as APIResponse<ProjectDto>;
    }
    return {
      data: null,
      error: error.message,
      status: error.status,
    } as unknown as APIResponse<ProjectDto>;
  }
};

export { getProjectById };
