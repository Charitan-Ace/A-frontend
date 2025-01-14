import { CHARITY_VIDEO_UPLOAD_URL } from "../constant";
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

    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (uploadResponse.status == 200) {
      const updateCharityProfileResponse = await updateProfileCharityVideo(url);

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
