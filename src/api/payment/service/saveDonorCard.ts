import sendHttpRequest, { postRequest } from "@/utils/http-request";
import { SAVE_CARD_URL } from "../constant";

const saveDonorCard = async (payload: { successUrl: string; cancelUrl: string }) => {
  try {
    const response = await sendHttpRequest(
      SAVE_CARD_URL,
      "POST",
      payload,
      "include",
      {
        "Content-Type": "application/json",
      }
    );
    
    const data = await response.json;

    if (response.status === 200) {
      return data;
    } else {
      console.error(`Failed to save donor card. Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error saving donor card:", error);
    return null;
  }
};

export default saveDonorCard;
