import axios, { AxiosError } from "axios";
import { DONATION_PROJECT_URL } from "./constant";
import { APIResponse } from "../axios";
const getDonationByProjectId = async (projectId: string) => {
  try {
    const response = await axios.get<number>(`${DONATION_PROJECT_URL}`, {
      params: {
        projectId: projectId,
      },
    });
    return {
      data: response.data,
      status: response.status,
      error: null,
    } as unknown as APIResponse<number>;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return {
        data: null,
        status: error.response.status,
        error: (error.response.data as { message: string }).message,
      } as unknown as APIResponse<number>;
    }
    return {
      data: null,
      status: 500,
      error: error.message,
    } as unknown as APIResponse<number>;
  }
};
