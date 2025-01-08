import * as jose from "jose";
import { BaseService } from "./base-service";
import APIClient from "@/api/client";
import { postRequest } from "@/utils/http-request";
import { API_URL, GET_KEY_URL } from "../constant";

export default class AuthService extends BaseService {
  constructor(client: APIClient) {
    super(client);
  }

  async login(email: string, password: string) {
    const key = await this.encryptionKey();

    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(JSON.stringify({ email, password }))
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    const url = `${API_URL}/api/auth/login`;
    return await postRequest(url, jwe);
  }

  async register(
    email: string,
    password: string,
    role: string,
    profile: { [key: string]: unknown }
  ) {
    const key = await this.encryptionKey();

    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(
        JSON.stringify({
          email,
          password,
          role,
          profile,
        })
      )
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    const url = `${API_URL}/api/auth/register`;
    return await postRequest(url, jwe);
  }

  async encryptionKey() {
    const url = GET_KEY_URL;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  }
}
