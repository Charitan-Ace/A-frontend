import { useCallback, useEffect, useMemo, useState } from "react";
import { INavbarItem } from "@/layout/navbar/navbar-config.ts";
import { useLocation } from "react-router-dom";

interface UseNavbarProps {
  items: INavbarItem[];
}

const useNavbar = ({ items }: UseNavbarProps) => {
  const [navbarItems, setNavbarItems] = useState<INavbarItem[]>(items);
  const currentPath = useLocation();

  const getActivePaths = useCallback(
    (navItems: INavbarItem[]) => {
      //set active path for every items
      for (const item of navItems) {
        if (currentPath.pathname.includes(item.path)) {
          item.active = true;
          if (!item.children) {
            return;
          }
          if (currentPath.pathname === item.path) {
            item.active = true;
            return navItems;
          }
          getActivePaths(item.children);
        }
      }
    },
    [currentPath],
  );

  const activePaths = useMemo(() => {
    return getActivePaths(items);
  }, [getActivePaths, items]);

  useEffect(() => {
    if (!activePaths) {
      return;
    }
    setNavbarItems(activePaths ?? []);
  }, [currentPath, activePaths]);

  return { navbarItems, setNavbarItems };
};

export { useNavbar };
