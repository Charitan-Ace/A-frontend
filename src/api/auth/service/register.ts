import axios from "axios";
import { APIResponse, ValidationError } from "@/api/axios.ts";
import { REGISTER_URL } from "@/api/auth/constant.ts";
import { RegisterInput } from "@/api/signup/schema/signup-schema";
import { BaseModel } from "@/type/auth/model.ts";
import * as jose from "jose";
import { postRequest } from "@/utils/http-request";
import { encryptionKey } from "./get-key";
// import { error } from "console";

const register = async (
  input: RegisterInput
): Promise<APIResponse<BaseModel>> => {
  try {
    const key = await encryptionKey();

    console.log("Registering user with data:", input);
    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(JSON.stringify(input))
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    const url = REGISTER_URL;
    const response = await postRequest(url, jwe);

    return {
      data: undefined,
      status: response.status,
      error: undefined,
    };
  } catch (error) {
    if (!axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      return {
        data: undefined,
        error: JSON.stringify(error),
        status: 400,
      };
    }
    return {
      data: undefined,
      error: error.message,
      status: error.response?.status || 400,
    };
  }
};

export { register };
