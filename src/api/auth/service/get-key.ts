import { GET_KEY_URL } from "../constant";

export const encryptionKey = async () => {
  const url = GET_KEY_URL;
  console.log(url);
  const response = await fetch(url);
  const result = await response.json();

  return result;
};
