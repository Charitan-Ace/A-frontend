import axios from "axios";
import { APIResponse, ValidationError } from "@/api/axios.ts";
import { LOGIN_URL } from "@/api/auth/constant.ts";
import { RegisterInput } from "@/api/auth/schema/register.ts";
import { AuthModel } from "@/type/auth/model.ts";

const register = async (something: RegisterInput) => {
  try {
    const { data, status } = await axios.post<string>(LOGIN_URL, {
      something,
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

export { register };
