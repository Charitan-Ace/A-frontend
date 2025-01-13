import { GET_ME_CHARITY_URL } from "@/api/profile/constant";
import { CharityProfileData, DonorModel } from "@/type/auth/model";
import { getRequest } from "@/utils/http-request";
import React from "react";

const useProfilePage = () => {
  const [donorProfile, setDonorProfile] = React.useState<DonorModel | null>(
    null
  );

  const [charityProfile, setCharityProfile] =
    React.useState<CharityProfileData | null>(null);

  const handleGetCharityProfile = async () => {
    try {
      const response = await getRequest(GET_ME_CHARITY_URL);
      const getMeData = (await response.json) as CharityProfileData;
      if (response.status == 200) {
        setCharityProfile(getMeData);
        return getMeData;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleGetDonorProfile = async () => {
    try {
      const response = await getRequest(GET_ME_CHARITY_URL);
      const getMeData = (await response.json) as DonorModel;
      if (response.status == 200) {
        setDonorProfile(getMeData);
        return getMeData;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    charityProfile,
    donorProfile,
    handleGetCharityProfile,
    handleGetDonorProfile,
  };
};

export default useProfilePage;
