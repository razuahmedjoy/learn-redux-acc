import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";
// import logger from "redux-logger";
import { productApi } from "../features/api/apiSlice";

export const store = configureStore({
    reducer: {
        cart:cartSlice,
        filter:filterSlice,
        [productApi.reducerPath]: productApi.reducer
    },
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware)  
})