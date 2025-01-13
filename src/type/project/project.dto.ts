import { ProjectCategoryEnum, ProjectStatusEnum } from "@/type/enum";

export interface ProjectDto {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  categoryType: ProjectCategoryEnum;
  goal: number;
  statusType: ProjectStatusEnum;
  startTime: Date;
  currentDonation: number;
  endTime: Date;
  charityId: string;
  countryIsoCode: string;
}
