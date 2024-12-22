import * as jose from "jose";
import { BaseService } from "./base-service";
import APIClient from "@/api/client";

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

    return this.client.post("/api/auth/login", jwe, {
      headers: {
        "Content-Type": "application/jose",
      },
    });
  }

  async register(
    email: string,
    password: string,
    role: string,
    profile: Record<string, unknown>
  ) {
    const key = await this.encryptionKey();

    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(
        JSON.stringify({ email, password, role, profile })
      )
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    return this.client.post("/api/auth/register", jwe, {
      headers: {
        "Content-Type": "application/jose",
      },
    });
  }

  //Gets encryption public key and its algorithm
  async encryptionKey() {
    return this.client.get<jose.JWK>("/.well-known/jwk");
  }
}
