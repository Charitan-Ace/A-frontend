import { BaseModel } from "@/type/auth/model.ts";
import { APIResponse } from "@/api/axios.ts";
import { GET_ME_URL } from "../constant";
import { getRequest } from "@/utils/http-request";
// import * as jose from "jose";
// import { LoginInput } from "@/api/login/schema/login-schema";

const getMe = async () => {
  try {
    const response = await getRequest(GET_ME_URL);
    const responseData = await response.json;

    return {
      data: responseData,
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

export { getMe };
