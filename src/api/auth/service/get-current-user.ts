import { UserModel } from "@/type/auth/model.ts";
import axios from "axios";
import { GET_ME_URL } from "@/api/auth/constant.ts";
import { APIResponse, ValidationError } from "@/api/axios.ts";

const getMe = async () => {
  try {
    const { data, status } = await axios.get<UserModel>(GET_ME_URL);
    return {
      data: data,
      status: status,
    } as unknown as APIResponse<UserModel>;
  } catch (error) {
    if (!axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      return {
        data: null,
        error: JSON.stringify(error),
        status: 400,
      } as unknown as APIResponse<UserModel>;
    }
    return {
      data: null,
      error: error.message,
      status: error.status,
    } as unknown as APIResponse<UserModel>;
  }
};

export { getMe };
