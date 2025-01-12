import axios, { AxiosError } from "axios";
import { getProjectByIdInput } from "../schema/get-project-by-Id";
import { ProjectDto } from "@/type/project/project.dto";
import { APIResponse } from "@/api/axios";
import { BASE_PROJECT_URL } from "../constant";

const getProjectById = async ({ projectId }: getProjectByIdInput) => {
  try {
    const { data, status } = await axios.get<ProjectDto>(
      `${BASE_PROJECT_URL}/${projectId}`
    );
    return {
      data: data,
      status: status,
    } as unknown as APIResponse<ProjectDto>;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return {
        data: null,
        status: error.response.status,
        error: (error.response.data as { message: string }).message,
      } as unknown as APIResponse<ProjectDto>;
    } else {
      return {
        data: null,
        status: 500,
        error: error.message,
      } as unknown as APIResponse<ProjectDto>;
    }
  }
};

export { getProjectById };
