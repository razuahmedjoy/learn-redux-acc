import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    tagTypes:["Products"],

    endpoints: (builder) => {

        return {
            getProducts: builder.query({
                query: () => "/products",
                providesTags:["Products"]
            }),

            addProduct: builder.mutation({
                query:(data)=>{
                    return {
                        url:"/product",
                        method:"POST",
                        body:data,
                        
                    }
                },
                invalidatesTags:["Products"],
            }),
            removeProduct: builder.mutation({
                query:(id)=>{
                    return {
                        url:`/product/${id}`,
                        method:"DELETE",
                      
                        
                    }
                },
                invalidatesTags:["Products"],
            })

        }
    }
})


export const {useGetProductsQuery,useAddProductMutation,useRemoveProductMutation} = productApi;