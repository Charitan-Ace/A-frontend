import { useNavCurrentItem, NAVBAR_ITEMS } from "@/layout/navbar";
import { toAbsoluteUrl } from "@/utils/assets";
import { useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";

const BreadcrumbHeader = ({
  isPageTile = true,
  isBreadcrumb = false,
}: {
  isPageTile?: boolean;
  isBreadcrumb?: boolean;
}) => {
  const currentLocation = useLocation();
  const currentNavigation = useNavCurrentItem(
    currentLocation.pathname,
    NAVBAR_ITEMS
  );

  console.log("currentNavigation", currentNavigation, NAVBAR_ITEMS);

  const navigationDes = currentNavigation?.path.split("/");
  if (navigationDes) navigationDes.shift();

  return (
    <div className="w-full">
      <div
        className="relative h-72 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('${toAbsoluteUrl("/media/home/homeBG.png")}')`,
        }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full text-center gap-5 mt-12">
          {isPageTile && (
            <div className="text-3xl font-playfair font-bold text-primary-foreground">
              {currentNavigation?.name}
            </div>
          )}

          {isBreadcrumb && (
            <Breadcrumb className="font-montserrat">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-primary-foreground " href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {navigationDes && (
                  <>
                    {navigationDes.map((des, index) => {
                      if (index === navigationDes.length - 1) {
                        return (
                          <Fragment key={des}>
                            <BreadcrumbSeparator className="text-primary-foreground" />
                            <BreadcrumbItem>
                              <BreadcrumbPage className="text-primary-foreground font-semibold">
                                {currentNavigation?.name}
                              </BreadcrumbPage>
                            </BreadcrumbItem>
                          </Fragment>
                        );
                      }
                      return (
                        <Fragment key={des}>
                          <BreadcrumbSeparator className="text-primary-foreground" />
                          <BreadcrumbItem>
                            <BreadcrumbLink
                              className="text-primary-foreground capitalize"
                              href={`/${des}`}
                            >
                              {des}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        </Fragment>
                      );
                    })}
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>

        <img
          src={toAbsoluteUrl("/media/home/homeBG-deco.png")}
          alt="scroll-down"
          className="absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
};

export default BreadcrumbHeader;
