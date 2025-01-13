export interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

export interface MediaReturnDto {
  id: string;
  mediaUrl: string;
  mediaFormat: string;
  resourceType: "image" | "video";
  isThumbnail: boolean;
  projectId: string;
}
