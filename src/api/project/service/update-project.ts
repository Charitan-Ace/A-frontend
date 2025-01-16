import { AxiosError } from "axios";
import { CreateProjectInput } from "../schema/create-project";
import { ProjectDto } from "@/type/project/project.dto";
import { PROJECT_UPDATE_URL } from "../constant";
import { APIResponse } from "@/api/axios";
import { putRequest } from "@/utils/http-request";

const updateProject = async (input: CreateProjectInput, projectId: string) => {
  try {
    // const response = await axios.put<ProjectDto>(
    //   `${PROJECT_UPDATE_URL}/${projectId}`,
    //   input
    // );
    const response = await putRequest<ProjectDto>(
      `${PROJECT_UPDATE_URL}/${projectId}`,
      input
    );
    const data = response.json;

    return {
      data: data,
      status: response.status,
      error: null,
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

export { updateProject };
