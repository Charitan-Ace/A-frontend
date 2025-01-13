import useUploadVideoProfile from "./hooks/useUploadVideoProfile";

const UploadVideoProfileContainer = () => {
  const {
    selectedFile,
    uploading,
    response,
    error,
    handleFileChange,
    handleUpload,
  } = useUploadVideoProfile();
  return (
    <div className="max-w-md mt-10 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Upload Your Introduction Video
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
          className={`w-full py-2 px-4 bg-primary hover:opacity-75 hover:cursor-pointer text-white font-semibold rounded-md shadow focus:outline-none focus:ring ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default UploadVideoProfileContainer;
