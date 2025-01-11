import { BaseModel } from "@/type/auth/model.ts";
import * as jose from "jose";
import { APIResponse } from "@/api/axios.ts";
import { LOGIN_URL } from "../constant";
import { LoginInput } from "@/api/login/schema/login-schema";
import { postRequest } from "@/utils/http-request";

const getMe = async (input: LoginInput, key: jose.JWK) => {
  try {
    const { email, password } = input;

    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(JSON.stringify({ email, password }))
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    const response = await postRequest(LOGIN_URL, jwe);
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
