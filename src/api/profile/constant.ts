const API_URL = import.meta.env.VITE_APP_API_URL ?? "http://localhost:3000";

export const GET_ME_DONOR_URL = `${API_URL}/api/profile/donor/me`;
export const GET_ME_CHARITY_URL = `${API_URL}/api/profile/charity/me`;

export const UPDATE_ME_DONOR_URL = `${API_URL}/api/profile/donor/update/me`;
export const UPDATE_ME_CHARITY_URL = `${API_URL}/api/profile/charity/update/me`;
