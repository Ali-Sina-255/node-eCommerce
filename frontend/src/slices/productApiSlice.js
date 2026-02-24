import { PRODUCT_URL } from "../constance";

import { apiSlice } from "./apiSlices";
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}/`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductQuery, useGetProductDetailsQuery } =
  productApiSlice;
