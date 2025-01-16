import { getRequest } from "@/utils/http-request";
import { GET_ME_CHARITY_URL } from "../constant";
import { CharityModel } from "@/type/auth/model";

const getProfileCharityById = async () => {
  try {
    // const response = await sendHttpRequest(
    //   `${GET_CHARITY_INFO_URL}?id=${charityId}`,
    //   "GET",
    //   undefined,
    //   "include",
    //   {
    //     "Content-Type": "application/json",
    //   }
    // );
    const response = await getRequest(`${GET_ME_CHARITY_URL}`);

    const data = await response.json;

    return {
      data: data as CharityModel,
      status: response.status,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching charity information:", error);
    return null;
  }
};

export default getProfileCharityById;
