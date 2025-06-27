// src/services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the type for an item
type Item = {
  id: number;
  name: string;
  price: number;
};

export const api = createApi({
  reducerPath: "api", // unique key in the store
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }), // base URL
  endpoints: (builder) => ({
    // Example GET endpoint
    getItems: builder.query<Item[], void>({
      query: () => "items",
    }),

    // Add a new product (POST endpoint)
    addProduct: builder.mutation({
      query: (body) => ({
        url: "product",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1NmVhMTFmMDhjZTI1NmM2NzAwNGM3In0sImlhdCI6MTc1MDYxNTQxNiwiZXhwIjoxNzUwNjE5MDE2fQ.07ByVC_zv2ZBPvGxJOU3RA7-AMQ3iJzRLEiG2uct5fM"}`, // Replace with your actual token
        },
      }),
    }),
  }),
});

export const { useGetItemsQuery, useAddProductMutation } = api;
