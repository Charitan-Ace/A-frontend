import { icons } from "lucide-react";

export interface INavbarItem {
  name: string;
  path: string;
  icon?: keyof typeof icons;
  active: boolean;
  auth: ("guest" | "donor" | "charity")[];
  children?: INavbarItem[];
}

export const NAVBAR_ITEMS: INavbarItem[] = [
  {
    name: "Home",
    path: "/",
    icon: "House",
    active: false,
    auth: ["guest", "donor", "charity"],
  },
  {
    name: "Projects",
    path: "/project/search",
    icon: "Folder",
    active: false,
    auth: ["donor", "charity", "guest"],
  },
  {
    name: "My projects",
    path: "/project/manage",
    icon: "Folder",
    active: false,
    auth: ["charity"],
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "Users",
    active: false,
    auth: ["donor", "charity"],
  },
  {
    name: "Create Project",
    path: "/project/create",
    icon: "Users",
    active: false,
    auth: ["charity"],
  },

  {
    name: "Login",
    path: "/auth/login",
    icon: "LogIn",
    active: false,
    auth: ["guest"],
  },
  {
    name: "SignUp",
    path: "/auth/signup",
    icon: "UserPlus",
    active: false,
    auth: ["guest"],
  },
];
