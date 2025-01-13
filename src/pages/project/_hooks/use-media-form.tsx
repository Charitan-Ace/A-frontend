import { toast } from "@/hooks/use-toast";
import { MediaFile } from "@/type/media/media.dto";
import imageCompression from "browser-image-compression";
import { useState } from "react";

interface UseMediaFormProps {
  maxSizeMB: number;
  maxNumberImageFiles: number;
  maxNumberVideoFiles: number;
  maxWidthOrHeight?: number;
  minNumberImages?: number;
  minNumberVideos?: number;
}

const useMediaForm = ({
  maxNumberImageFiles,
  maxNumberVideoFiles,
  minNumberImages,
  maxWidthOrHeight,
  maxSizeMB,
}: UseMediaFormProps) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

  const [isValid, setIsValid] = useState(false);

  const [options] = useState({
    maxSizeMB,
    maxWidthOrHeight: maxWidthOrHeight ?? 760,
    useWebWorker: true,
  });

  const compressImage = async (file: File) => {
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return file;
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    // Validate file count
    const currentImages = mediaFiles.filter((f) => f.type === "image").length;
    const currentVideos = mediaFiles.filter((f) => f.type === "video").length;
    const newImages = files.filter((f) => f.type.startsWith("image/")).length;
    const newVideos = files.filter((f) => f.type.startsWith("video/")).length;

    if (currentImages + newImages > maxNumberImageFiles) {
      setIsValid(false);

      toast({
        title: "Error",
        description: `Maximum ${maxNumberImageFiles} images allowed`,
        variant: "destructive",
      });
      return;
    }

    if (currentVideos + newVideos > maxNumberVideoFiles) {
      setIsValid(false);

      toast({
        title: "Error",
        description: "Maximum 4 videos allowed",
        variant: "destructive",
      });
      return;
    }

    if (currentImages + newImages < (minNumberImages ?? 3)) {
      setIsValid(false);

      toast({
        title: "Error",
        description: "Minimum 3 images required",
        variant: "destructive",
      });
      return;
    }

    const processedFiles = await Promise.all(
      files.map(async (file) => {
        const isImage = file.type.startsWith("image/");
        const processedFile = isImage ? await compressImage(file) : file;

        return {
          id: new Date().getTime().toString(),
          file: processedFile,
          preview: URL.createObjectURL(processedFile),
          type: isImage ? ("image" as const) : ("video" as const),
        };
      })
    );

    setMediaFiles((prev) => [...prev, ...processedFiles]);
    setIsValid(true);
  };

  const removeFile = (id: string) => {
    setMediaFiles((prev) => {
      const newFiles = prev.filter((file) => file.id !== id);
      if (newFiles.length > 15 || newFiles.length < 3) {
        setIsValid(false);
      }
      return newFiles;
    });
  };

  return { mediaFiles, handleFileChange, removeFile, setMediaFiles, isValid };
};

export { useMediaForm };
