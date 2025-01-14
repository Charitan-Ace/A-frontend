import sendHttpRequest from "@/utils/http-request";
import { GET_CHARITY_INFO_URL } from "../constant";
import { CharityModel } from "@/type/auth/model";

const getProfileCharityById = async (charityId: string): Promise<CharityModel | null> => {
  try {
    const response = await sendHttpRequest(
      `${GET_CHARITY_INFO_URL}?id=${charityId}`,
      "GET",
      undefined,
      "include",
      {
        "Content-Type": "application/json",
      }
    );

    const data = await response.json;

    if (response.status === 200) {
      return data as CharityModel; 
    } else {
      console.error(`Failed to fetch charity info. Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching charity information:", error);
    return null;
  }
};

export default getProfileCharityById;
