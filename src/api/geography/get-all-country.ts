import axios, { AxiosError } from "axios";
import { COUNTRY_URL } from "./constant";
import { APIResponse } from "../axios";
import { ICountry } from "@/type/geography";

const getAllCountry = async () => {
  try {
    const { data, status } = await axios.get(COUNTRY_URL);
    return {
      data: data,
      status: status,
      error: null,
    } as unknown as APIResponse<ICountry[]>;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return {
        data: null,
        status: error.response.status,
        error: (error.response.data as { message: string }).message,
      } as unknown as APIResponse<ICountry[]>;
    } else {
      return {
        data: null,
        status: 500,
        error: error.message,
      } as unknown as APIResponse<ICountry[]>;
    }
  }
};

export { getAllCountry };
