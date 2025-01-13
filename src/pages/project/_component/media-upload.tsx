import { Upload, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MediaFile } from "@/type/media/media.dto";
import { cn } from "@/lib/utils";

interface MediaUploadFormProps {
  mediaFiles: MediaFile[];
  removeFile: (id: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

const MediaUploadForm = ({
  mediaFiles,
  removeFile,
  handleFileChange,
  isValid,
}: MediaUploadFormProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div
        className={cn(
          `border-2 border-dashed border-gray-300 rounded-lg p-6`,
          !isValid ? "border-red-500" : ""
        )}
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,video/*"
          multiple
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload
            className={cn(
              "w-12 h-12 text-gray-400",
              !isValid ? "text-red-500" : ""
            )}
          />
          <p
            className={cn(
              "mt-2 text-sm text-gray-600",
              !isValid ? "text-red-500" : ""
            )}
          >
            Click to upload images and videos
          </p>
          <p
            className={cn(
              "text-xs text-gray-500",
              !isValid ? "text-red-500" : ""
            )}
          >
            (3-15 images, up to 4 videos)
          </p>
        </label>
      </div>

      {!isValid && (
        <p className="text-red-500">Remember 3-15 images, up to 4 videos!</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {mediaFiles.map((file) => (
          <Card key={file.id} className="relative">
            {file.type === "image" ? (
              <img
                src={file.preview}
                alt="preview"
                className="w-full h-32 object-cover rounded-lg"
              />
            ) : (
              <video
                src={file.preview}
                className="w-full h-32 object-cover rounded-lg"
                controls
              />
            )}
            <button
              type="button"
              onClick={() => removeFile(file.id)}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MediaUploadForm;
