import { getRequest } from "@/utils/http-request";
import { getMe } from "@/api/auth";
import { DonorModel } from "@/type/auth/model";
import { GET_ME_DONOR_URL } from "@/api/profile/constant";

const getFullDonorInfo = async (): Promise<DonorModel | null> => {
  try {
    const userResponse = await getMe();
    if (userResponse.status !== 200) {
      return null;
    }
    console.log("userResponse", userResponse);

    const donorResponse = await getRequest(GET_ME_DONOR_URL);
    const donorData = (await donorResponse.json) as {
      firstName?: string;
      lastName?: string;
      address?: string;
      stripeId?: string;
    };
    console.log("donorData", donorData);
    if (donorResponse.status !== 200) {
      return null;
    }

    return {
      email: userResponse?.data?.email ?? "",
      roleId: userResponse?.data?.roleId ?? "",
      active: userResponse?.data?.active ?? false,
      firstName: donorData?.firstName ?? "",
      lastName: donorData?.lastName ?? "",
      address: donorData?.address ?? "",
      donorStripeId: donorData?.stripeId ?? "",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getFullDonorInfo;
