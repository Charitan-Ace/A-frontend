// import { DONATIONS_URL } from "../constant";
import { DonationInput } from "../schema/donation-schema";
import { postRequest } from "@/utils/http-request";

const createDonation = async (data: Partial<DonationInput>) => {
  const DONATIONS_URL = "https://gateway.tail03350e.ts.net/donation"
  const COOKIE = "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0.Mc7Na-Lf_M4gTAROVT3QJJUrsorR5RYM97fgzNoi3ZCkB9fyGjc7gDAeywu9-86VH_l4uF3cuJFkvHBrKddMuHIvy-V5mziDbEPD_0Ox3SMbCmDPXoeWpt00lHOLIoeIGk0uHgVGtvAuD52DZwU7h3hMOoCCyswGJ4K51oLUgiR8jaYthwzkd9m7p7j8NsD3odeWd3Zto3o2nPnr_TZotJKbD0nQ4iZ_bOe7rQE8pwXIoZmFNofhNKz1o4uoap1LhYkAUPJUL2eU39R1wGy8ogrYDRR-WJk8yUBuitYOPHSivBnHNtV-ooM3CUB_hZsy90b2qVd6F9afEjboU_cV9Q.uPitM6mvYhXk3VgP.mi_yKMXJk1sztj_IK9p2kcf87Kgh4Xtq1R8bncBb9MWNBjt44u7haAMb61JYfACrefPm36dEER3ykXnyvv3rJKHor0N-VG6HyKdfGwmL_K0dxFGK4moa6rRvU5vmIjXIRVkLXwAmo9Qoxq6vllaM881CTkku9SwMIjwa66QcO2j8SEcEvqQRSSjz9OG0Rahq1vJEpx0iQgyEiu6ucUdxPSeyzNkMcrPjDxJ6lQXrtdaO4W3e1ngohefJO3oAcE9yvV6p8vjCIL67eoM_fetuXSsf5DvjPVE8sNfixSip_0zsexRGcLEYkjlGchoQItA--BX6y04w2HfOG7tYzhcfS8bAa-VgffgvTFUlvuhbLhE9blCOs4jqktb2y2mxMw.HqqOWyrRaAtuQlEKGaQy_w"
  const response = await postRequest<DonationInput>(
    DONATIONS_URL,
    data,
    "include",
    {
      "Content-Type": "application/json",
      Cookie: `charitan=${COOKIE}`,
    }
  );

  if (response.status !== 201) {
    throw new Error(`Failed to create donation. Status: ${response.status}`);
  }
  return response.json;
};

export { createDonation };
