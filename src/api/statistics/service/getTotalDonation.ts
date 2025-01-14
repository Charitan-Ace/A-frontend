import { getRequest } from "@/utils/http-request";
import { STATISTICS_TOTAL_DONATION_URL } from "../constant";
import { APIResponse } from "@/api/axios";

const getTotalDonation = async () => {
  try {
    const response = await getRequest(STATISTICS_TOTAL_DONATION_URL);
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

export default getTotalDonation;
