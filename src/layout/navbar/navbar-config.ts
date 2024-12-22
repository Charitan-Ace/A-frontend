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
    name: "Login",
    path: "/auth/login",
    icon: "LogIn",
    active: false,
  },
  {
    name: "SignUp",
    path: "/auth/sign-up",
    icon: "UserPlus",
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
        path: "/profile",
        active: false,
      },
      {
        name: "Profile Settings",
        path: "/profile/setting",
        active: false,
      },
      {
        name: "Donation History",
        path: "/profile/history",
        active: false,
      },
      {
        name: "Your Projects",
        path: "/profile/projects",
        active: false,
      },
    ],
  },
  {
    name: "Donation",
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
        name: "Search Projects",
        path: "/project/search",
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
