import sendHttpRequest from "@/utils/http-request";
import { SUBSCRIPTION_URL } from "../constant";

const subscribeToProject = async (payload: { 
    projectId: string;
    amount: number;
    successUrl: string;
    cancelUrl: string; 
}) => {
  try {
    const response = await sendHttpRequest(
        SUBSCRIPTION_URL,
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

export default subscribeToProject;
