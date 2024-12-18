import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { INavbarItem } from "@/layout/navbar";
import { Fragment } from "react";

interface BreadcrumbsProps {
  currentPage: INavbarItem | null;
}

const Breadcrumbs = ({ currentPage }: BreadcrumbsProps) => {
  const navigationDes = currentPage?.path.split("/");
  if (navigationDes) navigationDes.shift();
  return (
    <Breadcrumb>
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
                        {currentPage?.name}
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
  );
};

export { Breadcrumbs };
