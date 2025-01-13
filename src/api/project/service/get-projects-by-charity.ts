import { getRequest } from "@/utils/http-request";
import { GET_PROJECTS_ME_TEMP_URL, GET_PROJECTS_ME_URL } from "../constant";
import { APIResponse } from "@/api/axios";
import { AxiosError } from "axios";

const getProjectsMe = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    const response = await getRequest(`${GET_PROJECTS_ME_TEMP_URL}`);
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
      } as unknown as APIResponse<any>;
    }
    return {
      data: null,
      status: 500,
      error: error.message,
    } as unknown as APIResponse<any>;
  }
};

export default getProjectsMe;
