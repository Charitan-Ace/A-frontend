import { LOGOUT_URL } from "@/api/auth/constant.ts";
import { postRequest } from "@/utils/http-request";
import { APIResponse } from "@/api/axios";
import { BaseModel } from "@/type/auth/model";

const logout = async () => {
  try {
    const response = await postRequest(LOGOUT_URL, {});

    return {
      data: undefined,
      status: response.status,
      error: undefined,
    } as unknown as APIResponse<BaseModel>;
  } catch (error: any) {
    return {
      data: undefined,
      error: error.message,
      status: error.status,
    } as unknown as APIResponse<BaseModel>;
  }
};

export { logout };
