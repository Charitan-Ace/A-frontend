import { useCallback, useEffect, useMemo, useState } from "react";
import { INavbarItem } from "@/layout/navbar/navbar-config.ts";
import { matchPath, useLocation } from "react-router-dom";

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
        if (currentPath.pathname === item.path) {
          item.active = true;
          return navItems;
        }
      }
    },
    [currentPath]
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

const useNavCurrentItem = (
  pathname: string,
  items: INavbarItem[] | null
): INavbarItem | null => {
  pathname = pathname.trim();

  const findCurrentItem = (items: INavbarItem[] | null): INavbarItem | null => {
    if (!items) return null;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.path && matchPath(pathname, item.path)) {
        return item ?? null;
      } else if (item.children) {
        const childItem = findCurrentItem(item.children as INavbarItem[]);
        if (childItem) {
          return childItem;
        }
      }
    }

    return null;
  };

  return findCurrentItem(items);
};

export { useNavbar, useNavCurrentItem };
