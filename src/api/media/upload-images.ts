import { MediaFile, MediaReturnDto } from "@/type/media/media.dto";
import axios from "axios";
import { IMAGE_UPLOAD_URL } from "./constant";

const uploadImages = async (mediaFiles: MediaFile[], projectId: string) => {
  const formData = new FormData();
  mediaFiles.forEach((mediaFile) => {
    formData.append("files", mediaFile.file);
  });
  formData.append("projectId", projectId);
  try {
    const response = await axios.post<MediaReturnDto[]>(
      `${IMAGE_UPLOAD_URL}/${projectId}`,
      formData
    );
    console.log(response);
    return {
      data: response,
      status: response.status,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      status: 500,
      error: err.message,
    };
  }
};

export { uploadImages };
