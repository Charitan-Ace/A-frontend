import axios from "axios";
import { APIResponse, ValidationError } from "@/api/axios.ts";
import { LOGIN_URL } from "@/api/auth/constant.ts";
import { LoginInput } from "@/api/auth/schema/login.ts";
import { AuthModel } from "@/type/auth/model.ts";

const login = async ({ email, password }: LoginInput) => {
  try {
    const { data, status } = await axios.post<string>(LOGIN_URL, {
      email,
      password,
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
      status: error.status,
    } as unknown as APIResponse<AuthModel>;
  }
};

export { login };
