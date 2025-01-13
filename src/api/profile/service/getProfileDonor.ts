import { getRequest } from "@/utils/http-request";
import { GET_ME_DONOR_URL } from "../constant";
import { APIResponse } from "@/api/axios";

const getProfileDonor = async () => {
  try {
    const response = await getRequest(GET_ME_DONOR_URL);
    const data = await response.json;

    return {
      data: data,
      status: response.status,
      error: undefined,
    } as unknown as APIResponse<any>;
  } catch (error) {
    return {
      data: undefined,
      error: error.message,
      status: error.status,
    } as unknown as APIResponse<any>;
  }
};

export default getProfileDonor;
