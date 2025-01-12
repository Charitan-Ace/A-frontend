import getDonationHistoryTableData from "@/api/donation/service/getDonationHistoryTableData";

export const useDonationHistoryTable = () => {
  const loadData = async (params: {
    pageIndex: number;
    pageSize: number;
  }): Promise<any> => {
    const { pageIndex, pageSize } = params;

    const response: any = await getDonationHistoryTableData({
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
