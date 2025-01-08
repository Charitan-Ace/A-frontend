import { UserModel } from "@/type/auth/model.ts";
import axios from "axios";
import { APIResponse, ValidationError } from "@/api/axios.ts";

const getMe = async () => {
  try {
    const data = await fetch("http://localhost:8080/notification", {
      method: "POST",
      credentials: "include",
    });
    const id = await data.text();

    return {
      data: id,
      status: data.status,
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
