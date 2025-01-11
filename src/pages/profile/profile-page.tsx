import ProfileDetails from "./_components/profile-details-card";
import { DonationHistoryTable } from "../../components/donation-history-table/donation-history-table";
import ShortBanner from "@/components/banner/short-banner/ShortBanner";
import HeadlessTable from "@/components/tanstack-table/HeadlessTable";
import { useEffect } from "react";
import useAuth from "@/hooks/use-auth";

const ProfilePage = () => {
  const { auth } = useAuth();

  useEffect(() => {
    console.log(333, auth);
  }, [auth]);

  return (
    <>
      <ShortBanner title="Profile" />
      <div className="container mx-auto p-6">
        <ProfileDetails user={auth} />
        <DonationHistoryTable />
        <HeadlessTable />
      </div>
    </>
  );
};

export { ProfilePage };
