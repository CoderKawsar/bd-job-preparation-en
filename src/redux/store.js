import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
// import { apiSlice } from "./api/apiSlice";

import {reducer} from './rootReducer';
// import { baseApi } from "./api/baseApi";


export const store = configureStore({
    reducer,
    // reducer:{
    //     [apiSlice.reducerPath]: apiSlice.reducer,
       

    // },
    middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
  
}
    
);




