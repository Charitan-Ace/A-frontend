import { CHARITY_VIDEO_UPLOAD_URL } from "../constant";
import sendHttpRequest from "@/utils/http-request";
import { APIResponse } from "@/api/axios";
import updateProfileCharityVideo from "@/api/profile/service/updateProfileCharityVideo";

const uploadVideoCharityProfile = async (file: File) => {
  try {
    const videoResponse = await fetch(CHARITY_VIDEO_UPLOAD_URL, {
      method: "POST",
      body: "intro.mp4",
      credentials: "include",
      headers: {
        "Content-Type": "text/plain",
      },
    });

    const url = await videoResponse.text();

    const uploadResponse = await sendHttpRequest(url, "PUT", file, "include", {
      "Content-Type": file.type,
    });

    if (uploadResponse.status == 200) {
      const updateCharityProfileResponse = await updateProfileCharityVideo(url);
      console.log(
        87565,
        "updateCharityProfileResponse",
        updateCharityProfileResponse
      );

      if (updateCharityProfileResponse?.status == 200) {
        return {
          data: uploadResponse,
          status: uploadResponse.status,
        } as unknown as APIResponse<any>;
      }
    }
  } catch (error: any) {
    return {
      data: undefined,
      error: error.message,
      status: error.status,
    } as unknown as APIResponse<any>;
  }
};

export default uploadVideoCharityProfile;
