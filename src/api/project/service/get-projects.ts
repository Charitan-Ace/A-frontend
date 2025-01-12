import axios from "axios";
import { GET_PROJECT_URL } from "../constant";
import { GetProjectsInput } from "../schema/get-projects";
import { ProjectDto } from "@/type/project/project.dto";
import { APIResponse, ValidationError } from "../../axios";
import { ProjectCategoryEnum } from "@/type/enum";

const getProjects = async (input: GetProjectsInput) => {
  const { page, pageSize, category, status } = input;
  let queryUrl = `${GET_PROJECT_URL}?status=${status}&category=${category}&_page=${page}&_per_page=${pageSize}`;

  if (category === ProjectCategoryEnum.ALL) {
    queryUrl = `${GET_PROJECT_URL}?status=${status}&_page=${page}&_per_page=${pageSize}`;
  }

  try {
    const { data, status } = await axios.get<{
      data: ProjectDto[];
      pages: number;
    }>(queryUrl);
    return {
      data: data,
      status: status,
    } as unknown as APIResponse<{
      data: ProjectDto[];
      pages: number;
    }>;
  } catch (error) {
    if (!axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      return {
        data: null,
        error: JSON.stringify(error),
        status: 400,
      } as unknown as APIResponse<{
        data: ProjectDto[];
        pages: number;
      }>;
    }
    return {
      data: null,
      error: error.message,
      status: error.status,
    } as unknown as APIResponse<{
      data: ProjectDto[];
      pages: number;
    }>;
  }
};

export { getProjects };
