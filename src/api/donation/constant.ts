const API_URL = import.meta.env.VITE_APP_API_URL ?? "http://localhost:3000";

export const DONATIONS_URL = `${API_URL}/donation`;

export const GET_MY_DONATIONS_URL = `${API_URL}/donation/donor/my-donations`;
export const GET_TOP_DONORS_CHARITY_URL = `${API_URL}/api/statistics/top/donors/charity`;
