import {ProjectCategoryEnum, ProjectStatusEnum} from "@/type/enum";

export interface ProjectDto {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  category: ProjectCategoryEnum;
  goal: number;
  currentDonation: number;
  status: ProjectStatusEnum;
}
