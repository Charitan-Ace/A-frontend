import {
  CheckCircle2,
  Church,
  Clock,
  GraduationCap,
  Heart,
  Home,
  icons,
  Leaf,
  MoreHorizontal,
  PauseCircle,
  Pizza,
  PlayCircle,
  ThumbsUp,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";

export enum ProjectCategoryEnum {
  FOOD = "FOOD",
  HEALTH = "HEALTH",
  EDUCATION = "EDUCATION",
  ENVIRONMENT = "ENVIRONMENT",
  RELIGION = "RELIGION",
  HUMANITARIAN = "HUMANITARIAN",
  HOUSING = "HOUSING",
  OTHER = "OTHER",
}

export enum ProjectStatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  ENDED = "ENDED",
  HALTED = "HALTED",
  DELETED = "DELETED",
}

export enum ProjectCategoryEnumText {
  FOOD = "Food",
  HEALTH = "Health",
  EDUCATION = "Education",
  ENVIRONMENT = "Environment",
  RELIGION = "Religion",
  HUMANITARIAN = "Humanitarian",
  HOUSING = "Housing",
  OTHER = "Other",
}

export enum ProjectStatusEnumText {
  PENDING = "Pending",
  APPROVED = "Approved",
  ONGOING = "Ongoing",
  COMPLETED = "Completed",
  ENDED = "Ended",
  HALTED = "Halted",
  DELETED = "Deleted",
}

export const projectStatuses = [
  {
    value: "ONGOING",
    label: "Ongoing",
    classes: "border-blue-400 text-blue-700 bg-blue-100",
    icon: "PlayCircle" as keyof typeof icons,
    LucideIcon: PlayCircle,
  },
  {
    value: "COMPLETED",
    label: "Completed",
    classes: "border-green-400 text-green-700 bg-green-100",
    icon: "CheckCircle2" as keyof typeof icons,
    LucideIcon: CheckCircle2,
  },
  {
    value: "PENDING",
    label: "Pending",
    classes: "border-yellow-400 text-yellow-700 bg-yellow-100",
    icon: "Clock" as keyof typeof icons,
    LucideIcon: Clock,
  },
  {
    value: "DELETED",
    label: "Deleted",
    classes: "border-red-400 text-red-700 bg-red-100",
    icon: "Trash2" as keyof typeof icons,
    LucideIcon: Trash2,
  },
  {
    value: "APPROVED",
    label: "Approved",
    classes: "border-emerald-400 text-emerald-700 bg-emerald-100",
    icon: "ThumbsUp" as keyof typeof icons,
    LucideIcon: ThumbsUp,
  },
  {
    value: "ENDED",
    label: "Ended",
    classes: "border-gray-400 text-gray-700 bg-gray-100",
    icon: "XCircle" as keyof typeof icons,
    LucideIcon: XCircle,
  },
  {
    value: "HALTED",
    label: "Halted",
    classes: "border-orange-400 text-orange-700 bg-orange-100",
    icon: "PauseCircle" as keyof typeof icons,
    LucideIcon: PauseCircle,
  },
  //   {
  //     value: "ALL",
  //     label: "All",
  //     classes: "border-slate-400 text-slate-700 bg-slate-100",
  //     icon: "Globe" as keyof typeof icons,
  //     LucideIcon: Globe,
  //   },
];

export const projectCategories = [
  {
    value: "FOOD",
    label: "Food",
    classes: "border-orange-400 text-orange-700 bg-orange-100",
    icon: "Pizza" as keyof typeof icons,
    LucideIcon: Pizza,
  },
  {
    value: "HEALTH",
    label: "Health",
    classes: "border-red-400 text-red-700 bg-red-100",
    icon: "Heart" as keyof typeof icons,
    LucideIcon: Heart,
  },
  {
    value: "EDUCATION",
    label: "Education",
    classes: "border-blue-400 text-blue-700 bg-blue-100",
    icon: "GraduationCap" as keyof typeof icons,
    LucideIcon: GraduationCap,
  },
  {
    value: "ENVIRONMENT",
    label: "Environment",
    classes: "border-green-400 text-green-700 bg-green-100",
    icon: "Leaf" as keyof typeof icons,
    LucideIcon: Leaf,
  },
  {
    value: "RELIGION",
    label: "Religion",
    classes: "border-purple-400 text-purple-700 bg-purple-100",
    icon: "Church" as keyof typeof icons,
    LucideIcon: Church,
  },
  {
    value: "HUMANITARIAN",
    label: "Humanitarian",
    classes: "border-pink-400 text-pink-700 bg-pink-100",
    icon: "Users" as keyof typeof icons,
    LucideIcon: Users,
  },
  {
    value: "HOUSING",
    label: "Housing",
    classes: "border-yellow-400 text-yellow-700 bg-yellow-100",
    icon: "Home" as keyof typeof icons,
    LucideIcon: Home,
  },
  {
    value: "OTHER",
    label: "Other",
    classes: "border-gray-400 text-gray-700 bg-gray-100",
    icon: "MoreHorizontal" as keyof typeof icons,
    LucideIcon: MoreHorizontal,
  },
  //   {
  //     value: "ALL",
  //     label: "All",
  //     classes: "border-slate-400 text-slate-700 bg-slate-100",
  //     icon: "Globe" as keyof typeof icons,
  //     LucideIcon: Globe,
  //   },
];
