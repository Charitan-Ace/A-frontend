import { getRequest } from "@/utils/http-request";
import { GET_ME_DONOR_URL } from "../constant";

const getProfileDonor = async () => {
  try {
    const response = await getRequest(GET_ME_DONOR_URL);
    const data = await response.json;

    if (response.status === 200) {
      return data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getProfileDonor;
