import { LOGIN_URL } from "@/api/auth/constant.ts";
import { LoginInput } from "../../login/schema/login-schema";
import * as jose from "jose";
import { postRequest } from "@/utils/http-request";
import { BaseModel } from "@/type/auth/model";
import { APIResponse } from "@/api/axios";
import { encryptionKey } from "./get-key";

const login = async (input: LoginInput) => {
  try {
    const key = await encryptionKey();

    const { email, password } = input;

    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(JSON.stringify({ email, password }))
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    const response = await postRequest(LOGIN_URL, jwe);

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

export { login };
