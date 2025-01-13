import { patchRequest } from "@/utils/http-request";
import { DonorUpdateInput } from "../schema/donor-update-schema";
import { UPDATE_ME_DONOR_URL } from "../constant";
import { APIResponse } from "@/api/axios";

const updateProfileDonor = async (body: DonorUpdateInput) => {
  try {
    const response = await patchRequest(UPDATE_ME_DONOR_URL, body);
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

export default updateProfileDonor;
