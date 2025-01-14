import { getRequest } from "@/utils/http-request";
import { GET_TOP_DONORS_CHARITY_URL } from "../constant";
import { APIResponse } from "@/api/axios";

const getTopDonorsByCharity = async () => {
  try {
    const response = await getRequest(GET_TOP_DONORS_CHARITY_URL);
    const data = await response.json;

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

export default getTopDonorsByCharity;
