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
      }),
    }),
  }),
});

export const { useGetItemsQuery, useAddProductMutation } = api;
