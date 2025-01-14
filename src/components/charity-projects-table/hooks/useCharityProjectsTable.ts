import getProjectsByStatus from "@/api/project/service/get-projects-by-status";
import { ProjectStatus } from "@/type/auth/model";
import { useState } from "react";

const useCharityProjectsTable = () => {
  const [status, setStatus] = useState(ProjectStatus.PENDING);

  const loadData = async (params: {
    pageIndex: number;
    pageSize: number;
  }): Promise<any> => {
    const { pageIndex, pageSize } = params;

    const response: any = await getProjectsByStatus({
      status,
      pageIndex,
      pageSize,
    });

    return {
      data: response.data,
      total: response.totalPages,
      pagination: {
        limit: pageSize,
        offset: pageIndex * pageSize,
        page: pageIndex + 1,
        total: response.totalPages,
      },
    };
  };

  return {
    loadData,
    status,
    setStatus,
  };
};

export default useCharityProjectsTable;
