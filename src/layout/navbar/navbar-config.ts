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
    name: "Profile",
    path: "/profile",
    icon: "Users",
    active: false,
    children: [
      {
        name: "Overview",
        path: "/profile", // Matches the index route (default view)
        active: false,
      },
      {
        name: "Transaction",
        path: "/profile/transaction", // Matches the "transaction" route
        active: false,
      },
      {
        name: "Settings",
        path: "/profile/setting", // Matches the "setting" route
        active: false,
      },
      {
        name: "History",
        path: "/profile/history", // Matches the "history" route
        active: false,
      },
      {
        name: "Projects",
        path: "/profile/projects", // Matches the "projects" route
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
  {
    name: "Donations",
    path: "/donation",
    icon: "Heart",
    active: false,
  },
  {
    name: "Projects",
    path: "/project",
    icon: "Folder",
    active: false,
    children: [
      {
        name: "All Projects",
        path: "/project",
        active: false,
      },
      {
        name: "Project Details",
        path: "/project/:id",
        active: false,
      },
    ],
  },
];
