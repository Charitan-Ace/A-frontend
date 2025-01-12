import axios, { AxiosError } from "axios";
import { REGION_URL } from "./constant";
import { APIResponse } from "../axios";
import { IRegion } from "@/type/geography";

const getAllRegion = async () => {
  try {
    const { data, status } = await axios.get(REGION_URL);
    return {
      data: data,
      status: status,
      error: null,
    } as unknown as APIResponse<IRegion[]>;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return {
        data: null,
        status: error.response.status,
        error: (error.response.data as { message: string }).message,
      } as unknown as APIResponse<IRegion[]>;
    } else {
      return {
        data: null,
        status: 500,
        error: error.message,
      } as unknown as APIResponse<IRegion[]>;
    }
  }
};

export { getAllRegion };
