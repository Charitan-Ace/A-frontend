const API_URL = import.meta.env.VITE_APP_API_URL ?? "http://localhost:8080";
const BASE_PROJECT_URL = `${API_URL}/project`;
export const PROJECT_CREATE_URL = `${BASE_PROJECT_URL}/create`;
export const PROJECT_SEARCH_URL = `${BASE_PROJECT_URL}/search`;
export const PROJECT_GET_URL = `${BASE_PROJECT_URL}/project`;
