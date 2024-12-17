import { icons } from "lucide-react";

export interface INavbarItem {
  name: string;
  path: string;
  icon?: keyof typeof icons;
  active: boolean;
  children?: INavbarItem[];
}

export const NAVBAR_ITEMS: INavbarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "LayoutDashboard",
    active: false,
  },
  {
    name: "Users",
    path: "/profile",
    icon: "Users",
    active: false,
    children: [
      {
        name: "User List",
        path: "/profile/list",
        active: false,
      },
      {
        name: "User Settings",
        path: "/users/settings",
        active: false,
      },
    ],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "Settings",
    active: false,
  },
];
