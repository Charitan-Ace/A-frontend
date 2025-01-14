const API_URL = import.meta.env.VITE_APP_API_URL ?? "http://localhost:3000";

export const STATISTICS_TOTAL_DONATION_URL = `${API_URL}/api/statistics/totals/me`;
export const DONATION_STATEMENT_URL = `${API_URL}/api/statement/donation`;
