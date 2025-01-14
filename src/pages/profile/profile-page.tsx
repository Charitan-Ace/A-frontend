import ProfileCard from "@/components/profile-card/profile-card";
import { DonationHistoryTable } from "../../components/donation-history-table/donation-history-table";
import ShortBanner from "@/components/banner/short-banner/ShortBanner";
import UploadVideoProfileContainer from "@/components/upload-video-container/UploadVideoContainer";
import useAuth from "@/hooks/use-auth";
import useProfilePage from "./hooks/useProfilePage";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";

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
        <Card className="mt-6">
          {auth?.roleId === "CHARITY" && (
            <UploadVideoProfileContainer reload={handleGetCharityProfile} />
          )}
          <div className="mt-6 p-5">
            {charityProfile?.video && (
              <VideoPlayer videoUrl={charityProfile?.video} />
            )}
          </div>
        </Card>

        {/* ------------------ */}

        {auth?.roleId === "DONOR" && <DonationHistoryTable />}
      </div>
    </>
  );
};

export { ProfilePage };
