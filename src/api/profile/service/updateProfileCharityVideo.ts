import { APIResponse } from "@/api/axios";
import { getRequest, patchRequest } from "@/utils/http-request";
import { GET_ME_CHARITY_URL, UPDATE_ME_CHARITY_URL } from "../constant";
import { CharityProfileData } from "@/type/auth/model";

const updateProfileCharityVideo = async (url: string) => {
  try {
    const videoUrl = url.split("/").slice(3).join("/");
    const filename = videoUrl.split("/").pop()?.split("?")[0];

    const getMeResponse = await getRequest(GET_ME_CHARITY_URL);
    const getMeData = (await getMeResponse.json) as CharityProfileData;
    console.log(653432, "getMeData", getMeData);

    if (getMeResponse.status == 200) {
      const response = await patchRequest(UPDATE_ME_CHARITY_URL, {
        companyName: getMeData?.companyName,
        address: getMeData?.address,
        organizationType: getMeData?.organizationType,
        taxCode: getMeData?.taxCode,
        avatar: null,
        video: filename,
      });
      const data = await response.json;

      return {
        data: data,
        status: response.status,
        error: undefined,
      } as unknown as APIResponse<any>;
    }
  } catch (error: any) {
    return {
      data: undefined,
      error: error.message,
      status: error.status,
    } as unknown as APIResponse<any>;
  }
};

export default updateProfileCharityVideo;
