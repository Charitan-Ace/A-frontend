const API_URL = import.meta.env.VITE_LOCALHOST_API_URL ?? "http://localhost:8080";
export const BASE_PROJECT_URL = `${API_URL}/project`;
export const PROJECT_CREATE_URL = `${BASE_PROJECT_URL}/create`;
export const PROJECT_SEARCH_URL = `${BASE_PROJECT_URL}/search`;
export const PROJECT_GET_URL = `${BASE_PROJECT_URL}/project`;
export const GET_PROJECT_URL = `${API_URL}/project`;
export const GET_PROJECT_BY_USERS_URL = `${API_URL}/project/user`;
export const GET_PROJECT_BY_CHARITY_URL = `${API_URL}/project/charity`;

export const GET_PROJECTS_ME_URL = `${API_URL}/project/me`;

export const GET_PROJECTS_ME_TEMP_URL = `${API_URL}/project/my-projects/status/APPROVED`;
