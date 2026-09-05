import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get base URL from .env
const baseUrl = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1`;

// Enhanced base query with error handling
const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Accept", "application/json");

    // Get token from Redux state
    const token = getState().auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch({ type: "auth/logoutSuccess" });
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  // Enhanced tag types for better cache invalidation
  tagTypes: ["User", "Transport", "Booking"],
  // Optimal cache configuration
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 300,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
