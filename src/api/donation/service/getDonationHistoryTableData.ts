import { getRequest } from "@/utils/http-request";
import { GET_MY_DONATIONS_URL } from "./../../../api/donation/constant";

const getDonationHistoryTableData = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    const response = await getRequest(
      `${GET_MY_DONATIONS_URL}?page=${pageIndex}&limit=${pageSize}`
    );
    const data = await response.json;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getDonationHistoryTableData;
