import { UserDto } from "@/type/auth/model";
import ProfileDetails from "./_components/profile-details-card";
import { DonationHistoryTable } from "./_components/donation-history-table";
import ShortBanner from "@/components/banner/short-banner/ShortBanner";
import HeadlessTable from "@/components/tanstack-table/HeadlessTable";

const ProfilePage = () => {
  // mock
  const user: UserDto = {
    id: 1,
    username: "johndoe",
    email: "johndoe@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+880123456789",
    profilePictureUrl: "/media/test/logo-test.jpg",
  };

  return (
    <>
      <ShortBanner title="Profile" />
      <div className="container mx-auto p-6">
        <ProfileDetails user={user} />
        <DonationHistoryTable />
        <HeadlessTable />
      </div>
    </>
  );
};

export { ProfilePage };
