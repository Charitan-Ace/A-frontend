import axios from "axios";
import { APIResponse, ValidationError } from "@/api/axios.ts";
import { REGISTER_URL } from "@/api/auth/constant.ts";
import { RegisterInput } from "@/api/auth/schema/signup-schema";
import { AuthModel } from "@/type/auth/model.ts";
import * as jose from "jose";

//DEPRECATED
export const encryptionKey = async () => {
  const response = await axios.get<jose.JWK>("/.well-known/jwk");
  return response.data;
};

const register = async (input: RegisterInput) => {
  try {
    const key = await encryptionKey();

    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(JSON.stringify(input))
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    const { data, status } = await axios.post<string>(REGISTER_URL, jwe, {
      headers: {
        "Content-Type": "application/jose",
      },
    });

    return {
      data: data,
      status: status,
    } as unknown as APIResponse<AuthModel>;
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
