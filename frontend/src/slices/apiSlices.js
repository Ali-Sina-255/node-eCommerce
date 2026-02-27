import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // This MUST be here
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.userInfo?.token;
    console.log("Token from Redux:", token ? "Present" : "Not present");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Add logging wrapper
const baseQueryWithLogging = async (args, api, extraOptions) => {
  console.log("Making request to:", args);
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    console.error("Request error:", result.error);
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithLogging,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
