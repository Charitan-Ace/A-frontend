import * as jose from "jose";
import { BaseService } from "./base-service";
import APIClient from "@/api/client";
import axios from "axios";
import { postRequest } from "@/utils/http-request";

export default class AuthService extends BaseService {
  constructor(client: APIClient) {
    super(client);
  }

  async login(email: string, password: string) {
    const key = await this.encryptionKey();

    const jwe = await new jose.CompactEncrypt(
      // stringify JSON to create JWE claims
      new TextEncoder().encode(JSON.stringify({ email, password }))
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    return await postRequest("http://localhost:8080/api/auth/login", jwe);
  }

  async register(
    email: string,
    password: string,
    role: string,
    profile: { [key: string]: unknown }
  ) {
    const key = await this.encryptionKey();
    console.log(312313, key);

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

    return await postRequest("http://localhost:8080/api/auth/register", jwe);
  }

  async encryptionKey() {
    const response = await fetch("http://localhost:8080/.well-known/jwk");
    const result = await response.json();

    return result;
  }
}
