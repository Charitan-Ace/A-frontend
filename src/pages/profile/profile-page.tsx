import ProfileCard from "@/components/profile-card/profile-card";
import { DonationHistoryTable } from "../../components/donation-history-table/donation-history-table";
import ShortBanner from "@/components/banner/short-banner/ShortBanner";
import ButtonUploadVideo from "@/components/upload-video-container/buttonUploadVideo";

const ProfilePage = () => {
  return (
    <>
      <ShortBanner title="Profile" />
      <div className="container mx-auto p-6">
        <ProfileCard />
        <ButtonUploadVideo />
        <DonationHistoryTable />
      </div>
    </>
  );
};

export { ProfilePage };
