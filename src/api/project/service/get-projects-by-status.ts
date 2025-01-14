import { ProjectStatus } from "@/type/auth/model";
import { postRequest } from "@/utils/http-request";
import { GET_PROJECTS_BY_STATUS_URL } from "../constant";
import { APIResponse } from "@/api/axios";

const getProjectsByStatus = async ({
  status,
  pageIndex,
  pageSize,
}: {
  status: ProjectStatus;
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    const response = await postRequest(
      `${GET_PROJECTS_BY_STATUS_URL}/${status}?page=${pageIndex}&limit=${pageSize}`,
      {}
    );
    const data = response.json;
    console.log(data);

    return {
      data: data,
      status: response.status,
      error: undefined,
    } as unknown as APIResponse<any>;
  } catch (error: any) {
    return {
      data: undefined,
      error: error.message,
      status: error.status,
    } as unknown as APIResponse<any>;
  }
};

export default getProjectsByStatus;
