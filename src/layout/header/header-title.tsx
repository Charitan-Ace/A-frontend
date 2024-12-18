import { INavbarItem } from "@/layout/navbar";
import { Breadcrumbs } from "@/layout/breadcrumbs";

interface HeaderTitleProps {
  currentLocation: INavbarItem | null;
}

const HeaderTitle = ({ currentLocation }: HeaderTitleProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="font-bold text-primary-foreground">
        {currentLocation
          ? currentLocation.name
          : "Day la Trang chinh roi! Di dau?"}
      </p>
      <Breadcrumbs currentPage={currentLocation} />
    </div>
  );
};

export { HeaderTitle };
