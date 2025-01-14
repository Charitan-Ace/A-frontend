import { getRequest } from "@/utils/http-request";
import { DONATION_STATEMENT_URL } from "../constant";
import { APIResponse } from "@/api/axios";

const getDonationStatement = async (id: number) => {
  try {
    const response = await getRequest(`${DONATION_STATEMENT_URL}/${id}`);
    const data = response.json;

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

export default getDonationStatement;
