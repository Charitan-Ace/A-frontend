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
      data: [
        {
          id: "1",
          title: "Food Security Initiative",
          description: "Providing meals to underprivileged communities",
          categoryType: "FOOD",
          goal: 25000,
          currentDonation: 18750,
          statusType: "APPROVED",
          startTime: "2021-09-01T00:00:00Z",
          endTime: "2021-12-31T00:00:00Z",
          countryIsoCode: "US",
        },
      ],
      total: 1,
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
