import DonorProfileDetails from "../../components/donor-card/donor-details-card";
import { DonationHistoryTable } from "../../components/donation-history-table/donation-history-table";
import ShortBanner from "@/components/banner/short-banner/ShortBanner";
import { useEffect } from "react";
import useAuth from "@/hooks/use-auth";
import { CharityModel, DonorModel, OrganizationType } from "@/type/auth/model";
import { getRequest } from "@/utils/http-request";
import { GET_ME_DONOR_URL } from "@/api/profile/constant";

const donorSample: DonorModel = {
  email: "john.doe@example.com", // Assuming this comes from UserModel
  firstName: "John",
  lastName: "Doe",
  address: "123 Elm Street, Springfield, USA",
  avatar: "https://example.com/avatars/john_doe.png",
  donorStripeId: "cus_123abc456def",
};

const charitySample: CharityModel = {
  email: "helping.hands@example.org", // Assuming this comes from UserModel
  companyName: "Helping Hands",
  organizationType: OrganizationType.ORGANIZATION, // Replace with appropriate OrganizationType enum value
  address: "456 Charity Lane, Metropolis, USA",
  taxCode: "TAX123456789",
  description:
    "Helping Hands is dedicated to providing food and shelter to those in need.",
  image: [
    "https://example.com/images/charity_image1.jpg",
    "https://example.com/images/charity_image2.jpg",
  ],
  video: [
    "https://example.com/videos/charity_video1.mp4",
    "https://example.com/videos/charity_video2.mp4",
  ],
  logo: "https://example.com/logos/helping_hands_logo.png",
  charityStripeId: "acct_456xyz789ghj",
};

const ProfilePage = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const fetchDonorProfile = getRequest(GET_ME_DONOR_URL).then((res) => {
      console.log(res);
      const temp = res.json;
      console.log(temp);
    });

    console.log(fetchDonorProfile);
  }, [auth]);

  return (
    <>
      <ShortBanner title="Profile" />
      <div className="container mx-auto p-6">
        {auth ? (
          <DonorProfileDetails {...donorSample} />
        ) : (
          <DonorProfileDetails {...charitySample} />
        )}

        <DonationHistoryTable />
      </div>
    </>
  );
};

export { ProfilePage };
