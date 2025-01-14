import sendHttpRequest from "@/utils/http-request";
import { SUBSCRIPTION_URL } from "../constant";

const cancelSubscription = async (subscriptionId: string) => {
  try {
    const response = await sendHttpRequest(
      `${SUBSCRIPTION_URL}/${subscriptionId}`,
      "DELETE",
      undefined,
      "include",
      {
        "Content-Type": "application/json",
      }
    );

    const data = await response.json;

    if (response.status === 200 && data === true) {
      return true;
    } else {
      console.error(`Failed to cancel subscription. Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return false;
  }
};

export default cancelSubscription;
