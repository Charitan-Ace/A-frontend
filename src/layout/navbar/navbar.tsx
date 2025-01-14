import { useAuthContext } from "@/auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu.tsx";
import { cn } from "@/lib/utils";
import { INavbarItem, NAVBAR_ITEMS, useNavbar } from "@/layout/navbar";
import { useCallback } from "react";

const Navbar = () => {
  const { auth } = useAuthContext();

  const { navbarItems } = useNavbar({
    items: NAVBAR_ITEMS,
    role: (auth?.roleId?.toLowerCase() ?? "guest") as
      | "charity"
      | "donor"
      | "guest",
  });

  const renderLinks = (navItem: INavbarItem) => {
    return (
      <NavigationMenuLink
        key={navItem.path}
        href={navItem.path}
        active={navItem.active}
        className={cn(
          navigationMenuTriggerStyle(),
          "px-4 py-2 text-base font-semibold transition-colors duration-200",
          "text-white hover:text-black/80 bg-transparent",
          navItem.active && "text-white underline underline-offset-4"
        )}
      >
        {navItem.name}
      </NavigationMenuLink>
    );
  };

  const renderNavLinks = useCallback((items: INavbarItem[]) => {
    return (
      <>
        {items.map((item) => {
          if (!item.children) {
            return (
              <NavigationMenuItem key={item.path}>
                {renderLinks(item)}
              </NavigationMenuItem>
            );
          }
          return (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuTrigger 
                className={cn(
                  "px-4 py-2 text-base font-semibold transition-colors duration-200",
                  "text-white hover:text-white/80",
                  item.active && "text-white underline underline-offset-4"
                )}
              >
                <NavigationMenuLink href={item.path}>
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[8rem] rounded-md bg-black/80 backdrop-blur-sm p-1 shadow-lg">
                <div className="grid gap-1">
                  {item.children.map((i) => renderLinks(i))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </>
    );
  }, []);

  return (
    <div className="border-b border-white/10">
      <div className="container mx-auto">
        <NavigationMenu className="py-3">
          <NavigationMenuList className="flex items-center gap-2">
            {renderNavLinks(navbarItems)}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export { Navbar };
