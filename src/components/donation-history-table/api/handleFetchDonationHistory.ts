import { getRequest } from "@/utils/http-request";
import { GET_DONATIONS_URL } from "./../../../api/donation/constant";

const handleFetchDonationHistory = async () => {
  try {
    const response = await getRequest(GET_DONATIONS_URL);
    const data = await response.json;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default handleFetchDonationHistory;
