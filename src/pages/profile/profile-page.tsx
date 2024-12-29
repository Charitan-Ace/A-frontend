import { toAbsoluteUrl } from "@/utils/assets";
import { UserDto } from "@/type/auth/model";
import ProfileDetails from "./_components/profile-details-card";
import {
  DonationHistory,
  DonationHistoryTable,
} from "./_components/donation-history-table";

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
      <div className="w-screen">
        <div
          className="relative h-[18rem] overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url('${toAbsoluteUrl("/media/home/homeBG.png")}')`,
          }}
        >
          <div className="flex flex-col justify-center items-center w-full h-full text-center gap-5 mt-5">
            <h1 className="text-3xl font-semibold text-primary-foreground tracking-wide w-1/2">
              My Account
            </h1>
          </div>

          <img
            src={toAbsoluteUrl("/media/home/homeBG-deco.png")}
            alt="scroll-down"
            className="absolute bottom-0 right-0"
          />
        </div>
      </div>
      <div className="container mx-auto p-6">
        <ProfileDetails user={user} />
        <DonationHistoryTable />
      </div>
    </>
  );
};

export { ProfilePage };
