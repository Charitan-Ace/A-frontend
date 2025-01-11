import { BaseModel } from "@/type/auth/model.ts";
import * as jose from "jose";
import { APIResponse } from "@/api/axios.ts";
import { GET_ME_URL } from "../constant";
import { LoginInput } from "@/api/login/schema/login-schema";
import { getRequest } from "@/utils/http-request";

const getMe = async (input: LoginInput, key: jose.JWK) => {
  try {
    const response = await getRequest(GET_ME_URL);
    const responseData = await response.json;

    console.log(12312, response);

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
