import { CharityUpdateInput } from "../schema/charity-update-schema";
import { APIResponse } from "@/api/axios";
import { patchRequest } from "@/utils/http-request";
import { UPDATE_ME_CHARITY_URL } from "../constant";

const updateProfileCharity = async (body: CharityUpdateInput) => {
  try {
    const response = await patchRequest(UPDATE_ME_CHARITY_URL, body);
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

export default updateProfileCharity;
