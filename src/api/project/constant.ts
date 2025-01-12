const API_URL = import.meta.env.VITE_APP_API_URL ?? "http://localhost:3000";

export const GET_PROJECT_URL = `${API_URL}/projects`;
export const GET_PROJECTS_BY_USERS_URL = `${API_URL}/projects/user`;
export const GET_PROJECT_BY_CHARITY_URL = `${API_URL}/projects/charity`;
