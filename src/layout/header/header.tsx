import { clsx } from "clsx";
import { Navbar } from "@/layout/navbar";
import { toAbsoluteUrl } from "@/utils/assets.ts";
import { UserIndicator } from "@/layout/header/user-indicator.tsx";
import { useLocation } from "react-router-dom";
import HeadlessButton from "@/components/button/headless-button/HeadlessButton";
import useAuth from "@/hooks/use-auth";

const Header = () => {
  const { logout } = useAuth();

  // const currentLocation = useLocation();
  // const currentNavigation = useNavCurrentItem(
  //   currentLocation.pathname,
  //   NAVBAR_ITEMS
  // );

  // console.log("currentNavigation", currentNavigation, NAVBAR_ITEMS);

  return (
    <header
      className={clsx(
        "header fixed top-0 z-50 start-0 end-0 flex justify-center items-stretch shrink-0 h-24",
        "shadow-sm bg-black bg-opacity-20"
      )}
    >
      <div className="w-full h-full">
        <div className="mt-3 flex justify-around items-center p-2">
          <div className="flex items-center gap-2 basis-1/4">
            <img
              src={toAbsoluteUrl("/media/logo/Charitan_Logo.png")}
              className="max-h-[25px] shrink-0 grow-0"
              alt="logo-test"
            />
            {/* <p className="text-primary-foreground font-semibold">Charitan</p> */}
          </div>
          <div className="flex justify-between gap-2 items-center font-montserrat">
            <Navbar />
          </div>
          <div className="basis-1/4">
            <HeadlessButton
              title="Logout"
              color="green"
              text="white"
              onClick={logout}
            />
            <UserIndicator />
          </div>
        </div>

        {/* <HeaderTitle currentLocation={currentNavigation} /> */}
      </div>
    </header>
  );
};

export { Header };
