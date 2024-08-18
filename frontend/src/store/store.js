import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        products:productSlice
    }
})

export default store
