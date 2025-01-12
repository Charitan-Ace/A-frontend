const API_URL = import.meta.env.VITE_APP_API_URL ?? "http://localhost:3000";

export const DONATIONS_URL = `${API_URL}/donation`;

export const GET_MY_DONATIONS_URL = `${API_URL}/my-donations`;
// export const GET_DONATIONS_BY_USER_URL = `${API_URL}/donation/user`;
// export const GET_DONATIONS_BY_CHARITY_URL = `${API_URL}/donation/charity`;
