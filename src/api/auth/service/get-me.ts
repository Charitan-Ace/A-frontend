import { BaseModel } from "@/type/auth/model.ts";
import * as jose from "jose";
import { APIResponse } from "@/api/axios.ts";
import { GET_ME_URL } from "../constant";

const getMe = async () => {
  try {
    const response = await fetch(GET_ME_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log(response);

    const responseData = await response.json;

    return {
      data: responseData,
      status: response.status,
      error: undefined,
    } as unknown as APIResponse<BaseModel>;
  } catch (error: any) {
    return {
      data: undefined,
      error: error.message,
      status: error.status,
    } as unknown as APIResponse<BaseModel>;
  }
};

export { getMe };
