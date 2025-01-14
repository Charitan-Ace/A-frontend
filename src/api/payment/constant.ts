const API_URL = import.meta.env.VITE_APP_API_URL ?? "http://localhost:3000";

export const SAVE_CARD_URL = `${API_URL}/payment/card-setup`;
export const SUBSCRIPTION_URL = `${API_URL}/payment/monthly-subscription`;