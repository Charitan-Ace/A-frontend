import { ProjectDto } from "@/type/project/project.dto";
import { PROJECT_CREATE_URL } from "../constant";
import { CreateProjectInput } from "../schema/create-project";
import { APIResponse } from "@/api/axios";

import sendHttpRequest from "@/utils/http-request";
import { AxiosError } from "axios";

const createProject = async (input: CreateProjectInput) => {
  try {
    const response = await sendHttpRequest<ProjectDto>(
      PROJECT_CREATE_URL,
      "POST",
      input,
      "include",
      { "Content-Type": "application/json" }
    );
    const data = response.json;

    return {
      data: data,
      status: response.status,
      error: null,
    } as unknown as APIResponse<any>;
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

export { createProject };
