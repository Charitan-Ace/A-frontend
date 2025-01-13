import { CHARITY_VIDEO_UPLOAD_URL } from "../constant";
import sendHttpRequest from "@/utils/http-request";
import { APIResponse } from "@/api/axios";

const uploadVideoCharityProfile = async (file: File) => {
  try {
    const videoResponse = await fetch(CHARITY_VIDEO_UPLOAD_URL, {
      method: "POST",
      body: file.name,
      credentials: "include",
      headers: {
        "Content-Type": "text/plain",
      },
    });

    const url = await videoResponse.text();

    const uploadResponse = await sendHttpRequest(url, "PUT", file, "include", {
      "Content-Type": file.type,
    });
    console.log(87565, "response", uploadResponse);

    const data = await uploadResponse.json;
    console.log(5435, data);

    return {
      data: uploadResponse,
      status: uploadResponse.status,
      error: undefined,
    } as unknown as APIResponse<any>;
  } catch (error: any) {
    return {
      data: undefined,
      error: error.message,
      status: error.status,
    } as unknown as APIResponse<any>;
  }
};

export default uploadVideoCharityProfile;
