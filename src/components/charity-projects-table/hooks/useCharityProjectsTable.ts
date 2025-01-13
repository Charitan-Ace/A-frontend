import getProjectsMe from "@/api/project/service/get-projects-by-charity";

const useCharityProjectsTable = () => {
  const loadData = async (params: {
    pageIndex: number;
    pageSize: number;
  }): Promise<any> => {
    const { pageIndex, pageSize } = params;

    const response: any = await getProjectsMe({
      pageIndex,
      pageSize,
    });

    return {
      data: response.content,
      total: response.totalElements,
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
  };
};

export default useCharityProjectsTable;
