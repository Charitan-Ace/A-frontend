import useAuth from "@/hooks/use-auth";
import React from "react";
import getFullDonorInfo from "./api/getFullDonorInfo";
import DonorProfileDetails from "./components/donor-card/donor-details-card";

const ProfileCard = () => {
  return (
    <>
      {/* {auth && auth.roleId == "DONOR" ? (
        <DonorProfileDetails loadData={getProfileDonor} />
      ) : (
        <DonorProfileDetails />
      )} */}

      <DonorProfileDetails loadData={getFullDonorInfo} />
    </>
  );
};

export default ProfileCard;
