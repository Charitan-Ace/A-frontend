import { getRequest } from "@/utils/http-request";
import { getMe } from "@/api/auth";
import { CharityModel, OrganizationType } from "@/type/auth/model";
import { GET_ME_CHARITY_URL } from "@/api/profile/constant";

const getFullCharityInfo = async (): Promise<CharityModel | null> => {
  try {
    const userResponse = await getMe();
    if (userResponse.status !== 200) {
      console.warn("Failed to fetch user information:", userResponse);
      return null;
    }
    console.log("User Response:", userResponse);

    const charityResponse = await getRequest(GET_ME_CHARITY_URL);
    if (charityResponse.status !== 200) {
      console.warn("Failed to fetch charity information:", charityResponse);
      return null;
    }

    const charityData = (await charityResponse.json) as {
      companyName?: string;
      organizationType?: OrganizationType;
      address?: string;
      taxCode?: string;
      description?: string;
    };
    console.log("Charity Data:", charityData);

    return {
      email: userResponse?.data?.email ?? "",
      roleId: userResponse?.data?.roleId ?? "",
      active: userResponse?.data?.active ?? false,
      companyName: charityData?.companyName ?? "",
      organizationType: charityData?.organizationType,
      address: charityData?.address ?? "",
      taxCode: charityData?.taxCode ?? "",
    };
  } catch (error) {
    console.error(
      "An error occurred while fetching charity information:",
      error
    );
    return null;
  }
};

export default getFullCharityInfo;
