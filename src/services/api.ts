// src/services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the type for an item
type Item = {
  _id: string;
  name: string;
  price: number;
  lens: string;
  gender: string;
  description?: string;
  frameType?: string; // Optional if not used
  material: string;
  productType: string;
  frameStyle: string;
  variants: Array<{
    _id: string;
    frameColor: string;
    inStock: number;
    price: number;
    size: string;
    hidden: boolean;
    images: string[];
  }>;
};

export const api = createApi({
  reducerPath: "api", // unique key in the store
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    credentials: "include",
  }), // base URL
  endpoints: (builder) => ({
    // Example GET endpoint
    getAllProducts: builder.query<Item[], void>({
      query: () => "product",
    }),

    // Add a new product (POST endpoint)
    addProduct: builder.mutation({
      query: (body) => ({
        url: "product",
        method: "POST",
        body,
        // headers: {
        //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2NzcxOGI5MGE0ZGRlODRlMGZiOTA3In0sImlhdCI6MTc1MjI1OTMyNCwiZXhwIjoxNzgzNzk1MzI0fQ.bkpYgUXl0_b9G3UM4vDtQNeW-o3P5i7lkdfBoCXwhD0`,
        // },
      }),
    }),

    // Mutation to create a variant
    createVariant: builder.mutation({
      query: ({ body, productId }) => ({
        url: `variant/${productId}`,
        method: "POST",
        body,
        // headers: {
        //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2NzcxOGI5MGE0ZGRlODRlMGZiOTA3In0sImlhdCI6MTc1MjI1OTMyNCwiZXhwIjoxNzgzNzk1MzI0fQ.bkpYgUXl0_b9G3UM4vDtQNeW-o3P5i7lkdfBoCXwhD0`,
        // },
      }),
    }),

    // Mutation to update a product
    updateProduct: builder.mutation({
      query: ({ body }) => ({
        url: `product`,
        method: "POST",
        body,
      }),
    }),

    // Mutation to update a variant
    updateVariant: builder.mutation({
      query: ({ body, variantId }) => ({
        url: `variant/${variantId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useCreateVariantMutation,
  useUpdateProductMutation,
  useUpdateVariantMutation,
} = api;
