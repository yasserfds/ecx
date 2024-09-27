// apiSlice.ts or wherever you define your apiSlice
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI, // Ensure this environment variable is defined and correct
  }),
  endpoints: (builder) => ({
    // Define your endpoints here
    getSampleData: builder.query({
      query: () => "",
    }),
  }),
});
