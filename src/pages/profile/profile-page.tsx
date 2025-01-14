import ProfileCard from "@/components/profile-card/profile-card";
import { DonationHistoryTable } from "../../components/donation-history-table/donation-history-table";
import ShortBanner from "@/components/banner/short-banner/ShortBanner";
import UploadVideoProfileContainer from "@/components/upload-video-container/UploadVideoContainer";
import useAuth from "@/hooks/use-auth";
import useProfilePage from "./hooks/useProfilePage";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import getTotalDonation from "@/api/statistics/service/getTotalDonation";
import { DonationStatisticsTable } from "@/components/donation-statistic-table/donation-statistic-table";
import { DonorLeaderboard } from "@/components/donor-leaderboard-table/donor-leaderboard-table";
import getTopDonorsByCharity from "@/api/donation/service/getTopDonorsByCharity";

const ProfilePage = () => {
  const { auth } = useAuth();
  const {
    charityProfile,
    donorProfile,
    handleGetCharityProfile,
    handleGetDonorProfile,
  } = useProfilePage();

  useEffect(() => {
    if (auth?.roleId === "CHARITY") {
      handleGetCharityProfile();
    } else if (auth?.roleId === "DONOR") {
      handleGetDonorProfile();
    }
  }, []);

  return (
    <>
      <ShortBanner title="Profile" />
      <div className="container mx-auto p-6">
        <ProfileCard />

        {/* ----------------- */}
        {auth?.roleId === "CHARITY" && (
          <div>
            <DonorLeaderboard
              loadData={async () => {
                const apiResponse = await getTopDonorsByCharity();
                if (apiResponse.error) {
                  throw new Error(apiResponse.error);
                }
                // Return the actual data field
                return apiResponse.data;
              }}
            />
            <Card className="mt-6">
              <UploadVideoProfileContainer reload={handleGetCharityProfile} />
              <div className="mt-6 p-5">
                {charityProfile?.video && (
                  <VideoPlayer videoUrl={charityProfile?.video} />
                )}
              </div>
            </Card>
          </div>
        )}

        {/* ------------------ */}
        {auth?.roleId === "DONOR" && <DonationHistoryTable />}
        <DonationStatisticsTable
          loadData={getTotalDonation}
          columnHeading="Project Id"
        />
      </div>
    </>
  );
};

export { ProfilePage };
