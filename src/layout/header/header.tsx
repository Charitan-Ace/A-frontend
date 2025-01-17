import { clsx } from "clsx";
import { Navbar } from "@/layout/navbar";
import { toAbsoluteUrl } from "@/utils/assets.ts";
import { UserIndicator } from "@/layout/header/user-indicator.tsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // const currentLocation = useLocation();
  // const currentNavigation = useNavCurrentItem(
  //   currentLocation.pathname,
  //   NAVBAR_ITEMS
  // );

  // console.log("currentNavigation", currentNavigation, NAVBAR_ITEMS);
  const navigate = useNavigate();

  return (
    <header
      className={clsx(
        "header fixed top-0 z-50 start-0 end-0 flex justify-center items-stretch shrink-0 h-fit pb-3",
        "shadow-sm bg-black bg-opacity-20"
      )}
    >
      <div className="w-full h-full">
        <div className="mt-3 flex justify-around items-center p-2">
          <div className="flex items-center gap-2 basis-1/4">
            <img
              src={toAbsoluteUrl("/media/logo/Charitan_Logo.png")}
              className="h-9 shrink-0 grow-0 hover:cursor-pointer"
              alt="logo-test"
              onClick={() => navigate("/")}
            />
            {/* <p className="text-primary-foreground font-semibold">Charitan</p> */}
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
