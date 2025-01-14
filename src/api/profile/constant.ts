const API_URL = import.meta.env.VITE_APP_API_URL ?? "http://localhost:3000";
const BASE_PROFILE_URL = `${API_URL}/api/profile/`;

export const GET_ME_DONOR_URL = `${BASE_PROFILE_URL}/donor/me`;
export const GET_ME_CHARITY_URL = `${BASE_PROFILE_URL}/charity/me`;

export const UPDATE_ME_DONOR_URL = `${BASE_PROFILE_URL}/donor/update/me`;
export const UPDATE_ME_CHARITY_URL = `${BASE_PROFILE_URL}/charity/update/me`;

export const GET_CHARITY_INFO_URL = `${BASE_PROFILE_URL}/charity/info`