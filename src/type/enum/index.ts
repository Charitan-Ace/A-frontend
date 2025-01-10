
import {
    CheckCircle2,
    Church,
    Clock,
    Globe,
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
  FOOD = "Food",
  HEALTH = "Health",
  EDUCATION = "Education",
  ENVIRONMENT = "Environment",
  RELIGION = "Religion",
  HUMANITARIAN = "Humanitarian",
  HOUSING = "Housing",
  OTHER = "Other",
  ALL = "All"
}

export enum ProjectStatusEnum {
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
    value: "Ongoing",
    label: "Ongoing",
    classes: "border-blue-400 text-blue-700 bg-blue-100",
    icon: "PlayCircle" as keyof typeof icons,
    LucideIcon: PlayCircle,
  },
  {
    value: "Completed",
    label: "Completed",
    classes: "border-green-400 text-green-700 bg-green-100",
    icon: "CheckCircle2" as keyof typeof icons,
    LucideIcon: CheckCircle2,
  },
  {
    value: "Pending",
    label: "Pending",
    classes: "border-yellow-400 text-yellow-700 bg-yellow-100",
    icon: "Clock" as keyof typeof icons,
    LucideIcon: Clock,
  },
  {
    value: "Deleted",
    label: "Deleted",
    classes: "border-red-400 text-red-700 bg-red-100",
    icon: "Trash2" as keyof typeof icons,
    LucideIcon: Trash2,
  },
  {
    value: "Approved",
    label: "Approved",
    classes: "border-emerald-400 text-emerald-700 bg-emerald-100",
    icon: "ThumbsUp" as keyof typeof icons,
    LucideIcon: ThumbsUp,
  },
  {
    value: "Ended",
    label: "Ended",
    classes: "border-gray-400 text-gray-700 bg-gray-100",
    icon: "XCircle" as keyof typeof icons,
    LucideIcon: XCircle,
  },
  {
    value: "Halted",
    label: "Halted",
    classes: "border-orange-400 text-orange-700 bg-orange-100",
    icon: "PauseCircle" as keyof typeof icons,
    LucideIcon: PauseCircle,
  },
];

export const projectCategories = [
  {
    value: "Food",
    label: "Food",
    classes: "border-orange-400 text-orange-700 bg-orange-100",
    icon: "Pizza" as keyof typeof icons,
    LucideIcon: Pizza,
  },
  {
    value: "Health",
    label: "Health",
    classes: "border-red-400 text-red-700 bg-red-100",
    icon: "Heart" as keyof typeof icons,
    LucideIcon: Heart,
  },
  {
    value: "Education",
    label: "Education",
    classes: "border-blue-400 text-blue-700 bg-blue-100",
    icon: "GraduationCap" as keyof typeof icons,
    LucideIcon: GraduationCap,
  },
  {
    value: "Environment",
    label: "Environment",
    classes: "border-green-400 text-green-700 bg-green-100",
    icon: "Leaf" as keyof typeof icons,
    LucideIcon: Leaf,
  },
  {
    value: "Religion",
    label: "Religion",
    classes: "border-purple-400 text-purple-700 bg-purple-100",
    icon: "Church" as keyof typeof icons,
    LucideIcon: Church,
  },
  {
    value: "Humanitarian",
    label: "Humanitarian",
    classes: "border-pink-400 text-pink-700 bg-pink-100",
    icon: "Users" as keyof typeof icons,
    LucideIcon: Users,
  },
  {
    value: "Housing",
    label: "Housing",
    classes: "border-yellow-400 text-yellow-700 bg-yellow-100",
    icon: "Home" as keyof typeof icons,
    LucideIcon: Home,
  },
  {
    value: "Other",
    label: "Other",
    classes: "border-gray-400 text-gray-700 bg-gray-100",
    icon: "MoreHorizontal" as keyof typeof icons,
    LucideIcon: MoreHorizontal,
  },
  {
    value: "All",
    label: "All",
    classes: "border-slate-400 text-slate-700 bg-slate-100",
    icon: "Globe" as keyof typeof icons,
    LucideIcon: Globe,
  },
];