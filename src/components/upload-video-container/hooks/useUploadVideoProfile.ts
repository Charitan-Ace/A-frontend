import { useState } from "react";
import uploadVideoCharityProfile from "@/api/media/service/uploadVideoCharityProfile";

const useUploadVideoProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(null);
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("video/")) {
        setError("Please select a valid video file.");
        return;
      }
      setSelectedFile(file);
    }
  };

  // Handle form submission
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    setUploading(true);
    setError(null);
    setResponse(null);

    try {
      const apiResponse = await uploadVideoCharityProfile(selectedFile);

      if (
        apiResponse &&
        apiResponse.status >= 200 &&
        apiResponse.status < 300
      ) {
        setResponse(apiResponse?.data);
      } else {
        setError(apiResponse?.error || "Upload failed.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return {
    selectedFile,
    uploading,
    response,
    error,
    handleFileChange,
    handleUpload,
  };
};

export default useUploadVideoProfile;
