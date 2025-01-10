import { ProjectDto } from "@/type/project/project.dto";
import { CreateProjectInput } from "../schema/create-project";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/api/axios";
import { PROJECT_CREATE_URL } from "../constant";

const createProject = async (input: CreateProjectInput) => {
  try {
    const response = await axios.post<ProjectDto>(
      `${PROJECT_CREATE_URL}`,
      input
    );
    return {
      data: response.data,
      status: response.status,
      error: null,
    } as unknown as APIResponse<ProjectDto>;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return {
        data: null,
        status: error.response.status,
        error: error.response.data as {message: string},
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

export { createProject };
