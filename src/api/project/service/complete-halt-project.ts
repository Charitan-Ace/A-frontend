import { ProjectStatusEnum } from "@/type/enum";
import { ProjectDto } from "@/type/project/project.dto";
import axios, { AxiosError } from "axios";
import { PROJECT_COMPLETE_URL, PROJECT_HALT_URL } from "../constant";
import { APIResponse } from "@/api/axios";

const completeHaltProject = async (
  projectId: string,
  projectStatus: ProjectStatusEnum.COMPLETED | ProjectStatusEnum.HALTED
) => {
  if (projectStatus === ProjectStatusEnum.COMPLETED) {
    try {
      const response = await axios.post<ProjectDto>(
        `${PROJECT_COMPLETE_URL}/${projectId}`
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
  } else {
    try {
      const response = await axios.post<ProjectDto>(
        `${PROJECT_HALT_URL}/${projectId}`
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
  }
};
export { completeHaltProject };
