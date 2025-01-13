import uploadVideoCharityProfile from "@/api/media/service/uploadVideoCharityProfile";
import React, { useState } from "react";

const ButtonUploadVideo = () => {
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
      // Validate file type
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

      if (apiResponse.status >= 200 && apiResponse.status < 300) {
        setResponse(apiResponse.data);
      } else {
        setError(apiResponse.error || "Upload failed.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Test Video Upload
      </h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label
            htmlFor="videoUpload"
            className="block text-gray-700 font-medium mb-2"
          >
            Select a Video File:
          </label>
          <input
            type="file"
            id="videoUpload"
            accept="video/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50"
          />
        </div>

        {selectedFile && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Selected File:</strong>
            <span className="block sm:inline">
              {" "}
              {selectedFile.name} (
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
            </span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {response && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <p className="font-bold">Upload successful!</p>
            <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || !selectedFile}
          className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow focus:outline-none focus:ring ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default ButtonUploadVideo;
