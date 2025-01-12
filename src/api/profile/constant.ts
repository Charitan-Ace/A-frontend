const API_URL = import.meta.env.VITE_APP_API_URL ?? "http://localhost:3000";

export const GET_ME_DONOR_URL = `${API_URL}/api/profile/donor/info`;
export const GET_ME_CHARITY_URL = `${API_URL}/api/profile/charity/info`;
