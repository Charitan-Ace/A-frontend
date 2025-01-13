import { DONATIONS_URL } from "../constant";
import { DonationInput } from "../schema/donation-schema";
import sendHttpRequest from "@/utils/http-request";

const createDonation = async (data: Partial<DonationInput>) => {
  const response = await sendHttpRequest<DonationInput>(
    DONATIONS_URL,
    "POST",
    data,
    "include",
    {
      "Content-Type": "application/json",
    }
  );

  if (response.status !== 201) {
    throw new Error(`Failed to create donation. Status: ${response.status}`);
  }
  return response.json;
};

export { createDonation };
