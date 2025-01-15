import { APIResponse } from "@/api/axios";
import { ProjectDto } from "@/type/project/project.dto";
import { postRequest } from "@/utils/http-request";
import { AxiosError } from "axios";
import { PROJECT_CREATE_URL } from "../constant";
import { CreateProjectInput } from "../schema/create-project";
import sendHttpRequest from "@/utils/http-request";

const createProject = async (input: CreateProjectInput) => {
  try {
    // const response = await axios.post<ProjectDto>(
    //   `${PROJECT_CREATE_URL}`,
    //   input
    // );




        const response = await sendHttpRequest<ProjectDto>(
      PROJECT_CREATE_URL,
      "POST",
      input,
      "include",
      { "Content-Type": "application/json" }
    );

    return {
      data: response.data,
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
