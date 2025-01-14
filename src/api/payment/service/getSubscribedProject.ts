import sendHttpRequest from "@/utils/http-request";
import { SUBSCRIPTION_URL } from "../constant";

const getSubscribeProjects = async () => {
  try {
    const response = await sendHttpRequest(
        SUBSCRIPTION_URL,
        "GET",
        undefined,
        "include"
    );
    
    const data = await response.json;

    if (response.status === 200) {
      return data;
    } else {
      console.error(`Failed to get subscribed projects. Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error getting subscribed projects:", error);
    return null;
  }
};

export default getSubscribeProjects;
