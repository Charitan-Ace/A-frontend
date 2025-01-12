import { BaseModel } from "@/type/auth/model.ts";
import { APIResponse } from "@/api/axios.ts";
import { GET_ME_URL } from "../constant";
import { getRequest } from "@/utils/http-request";
// import * as jose from "jose";
// import { LoginInput } from "@/api/login/schema/login-schema";

const getMe = async () => {
  try {
    // TODO: for testing, remove later
    // const { email, password } = input;
    // console.log("login", email, password);

    // const jwe = await new jose.CompactEncrypt(
    //   new TextEncoder().encode(JSON.stringify({ email, password }))
    // )
    //   .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
    //   .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    // const response = await postRequest(LOGIN_URL, jwe);

    // -----------------------------------------
    // TODO: open this later
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
