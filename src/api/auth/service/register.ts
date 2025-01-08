import axios from "axios";
import { APIResponse, ValidationError } from "@/api/axios.ts";
import { REGISTER_URL } from "@/api/auth/constant.ts";
import { RegisterInput } from "@/api/auth/schema/signup-schema";
import { AuthModel } from "@/type/auth/model.ts";
import * as jose from "jose";
import { postRequest } from "@/utils/http-request";

const register = async (input: RegisterInput, key: jose.JWK) => {
  try {
    console.log("Registering user with data:", input);
    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(JSON.stringify(input))
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    const url = REGISTER_URL;
    const response = await postRequest(url, jwe);
    return {
      data: response,
      status: response.status,
    };
  } catch (error) {
    if (!axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      return {
        data: null,
        error: JSON.stringify(error),
        status: 400,
      } as unknown as APIResponse<AuthModel>;
    }
    return {
      data: null,
      error: error.message,
      status: error.response?.status || 400,
    } as unknown as APIResponse<AuthModel>;
  }
};

export { register };
