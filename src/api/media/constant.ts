const API_URL = import.meta.env.VITE_APP_API_URL ?? "http://localhost:8080";
const BASE_MEDIA_URL = `${API_URL}/media`;
export const IMAGE_UPLOAD_URL = `${BASE_MEDIA_URL}/upload/image/project`;
export const VIDEO_UPLOAD_URL = `${BASE_MEDIA_URL}/upload/video/project`;

export const CHARITY_VIDEO_UPLOAD_URL = `${API_URL}/api/profile/asset/upload`;
