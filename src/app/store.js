import {configureStore} from "@reduxjs/toolkit";
import cryptoReducer from "./features/crypto/cryptoSlice";
import { cryptoApi } from "./features/crypto/cryptoApi";

export const store = configureStore({
    reducer: {
        crypto: cryptoReducer,
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
   middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});