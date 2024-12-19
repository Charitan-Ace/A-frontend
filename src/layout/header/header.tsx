import { clsx } from "clsx";
import { Navbar, NAVBAR_ITEMS, useNavCurrentItem } from "@/layout/navbar";
import { toAbsoluteUrl } from "@/utils/assets.ts";
import { UserIndicator } from "@/layout/header/user-indicator.tsx";
import { useLocation } from "react-router-dom";

const Header = () => {
  const currentLocation = useLocation();
  const currentNavigation = useNavCurrentItem(
    currentLocation.pathname,
    NAVBAR_ITEMS
  );

  console.log("currentNavigation", currentNavigation, NAVBAR_ITEMS);

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
              src={toAbsoluteUrl("/media/test/logo-test.jpg")}
              className="max-h-[25px] shrink-0 grow-0"
              alt="logo-test"
            />
            <p className="text-primary-foreground font-semibold">Charitan</p>
          </div>
          <div className="flex justify-between gap-2 items-center font-montserrat">
            <Navbar />
          </div>
          <div className="basis-1/4">
            <UserIndicator />
          </div>
        </div>

        {/* <HeaderTitle currentLocation={currentNavigation} /> */}
      </div>
    </header>
  );
};

export { Header };
