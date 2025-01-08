import { LOGIN_URL } from "@/api/auth/constant.ts";
import { LoginInput } from "../schema/login-schema";
import * as jose from "jose";
import { postRequest } from "@/utils/http-request";

const login = async (input: LoginInput, key: jose.JWK) => {
  try {
    const { email, password } = input;

    const jwe = await new jose.CompactEncrypt(
      // stringify JSON to create JWE claims
      new TextEncoder().encode(JSON.stringify({ email, password }))
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    const response = await postRequest(LOGIN_URL, jwe);
    console.log(111, response);
    return {
      data: response, //TODO: check if response is correct
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      status: error.status,
    };
  }
};

export { login };
