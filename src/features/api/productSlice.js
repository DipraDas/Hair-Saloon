import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    tagTypes: ["Products"],
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => "/products",
            providesTags: ["Products"]
        }),
        removeProduct: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"]
        }),
    })
})

export const { useGetProductsQuery, useRemoveProductMutation } = productApi;