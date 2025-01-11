import { GET_DONATIONS_URL } from "./../../../api/donation/constant";

const handleFetchDonationHistory = async () => {
  try {
    const response = await fetch(GET_DONATIONS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default handleFetchDonationHistory;
