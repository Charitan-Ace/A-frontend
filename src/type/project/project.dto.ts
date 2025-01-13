import { ProjectCategoryEnum, ProjectStatusEnum } from "@/type/enum";
import { MediaReturnDto } from "../media/media.dto";

export interface ProjectDto {
  id: string;
  title: string;
  mediaDtoList: MediaReturnDto[];
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
