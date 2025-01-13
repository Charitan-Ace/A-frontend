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
        className={navigationMenuTriggerStyle()}
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
          } else {
            return (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuTrigger>
                  <NavigationMenuLink href={item.path}>
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.children.map((i) => renderLinks(i))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
        })}
      </>
    );
  }, []);
  return (
    <NavigationMenu>
      <NavigationMenuList>{renderNavLinks(navbarItems)}</NavigationMenuList>
    </NavigationMenu>
  );
};

export { Navbar };
