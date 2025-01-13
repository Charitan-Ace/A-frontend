import useAuth from "@/hooks/use-auth";
import getFullDonorInfo from "./api/getFullDonorInfo";
import DonorProfileDetails from "./components/donor-card/donor-details-card";
import updateProfileDonor from "@/api/profile/service/updateProfileDonor";
import CharityProfileDetails from "./components/charity-card/charity-details-card";
import getFullCharityInfo from "./api/getFullCharityInfo";
import updateProfileCharity from "@/api/profile/service/updateProfileCharity";

const ProfileCard = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth && auth.roleId == "DONOR" && (
        <DonorProfileDetails
          loadData={getFullDonorInfo}
          updateProfileDonor={updateProfileDonor}
        />
      )}

      {auth && auth.roleId == "CHARITY" && (
        <CharityProfileDetails
          loadData={getFullCharityInfo}
          updateProfileCharity={updateProfileCharity}
        />
      )}
    </>
  );
};

export default ProfileCard;
