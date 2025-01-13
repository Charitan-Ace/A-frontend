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
    name: "Home",
    path: "/",
    icon: "House",
    active: false,
  },
  {
    name: "Projects",
    path: "/project",
    icon: "Folder",
    active: false,
    // children: [
    //   {
    //     name: "Search Projects",
    //     path: "/project/search",
    //     active: false,
    //   },
    //   {
    //     name: "Project Details",
    //     path: "/project/:id",
    //     active: false,
    //   },
    // ],
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "Users",
    active: false,
  },
  {
    name: "Login",
    path: "/auth/login",
    icon: "LogIn",
    active: false,
  },
  {
    name: "SignUp",
    path: "/auth/signup",
    icon: "UserPlus",
    active: false,
  },
];
