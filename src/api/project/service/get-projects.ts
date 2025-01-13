import axios from "axios";
import { PROJECT_SEARCH_URL } from "../constant";
import { GetProjectsInput } from "../schema/get-projects";
import { ProjectDto } from "@/type/project/project.dto";
import { APIResponse, ValidationError } from "../../axios";

const getProjects = async (input: GetProjectsInput) => {
  const { page, pageSize, categoryTypes, status, q, countryIsoCodes } = input;

  const queryUrl = `${PROJECT_SEARCH_URL}?page=${page}&size=${pageSize}`;

  try {
    let totalPage = 0;
    const { data, status: queryStatus, headers } = await axios.post<ProjectDto[]>(queryUrl, {
      name: q,
      categoryTypes,
      status,
      countryIsoCodes,
    });

    if (headers["Total-Pages"]) {
      totalPage = parseInt(headers["Total-Pages"]);
    } else {
      totalPage = 1;
    }

    return {
      data: {
        data: data,
        pages: totalPage,
      },
      status: queryStatus,
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
