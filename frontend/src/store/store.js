import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlices";
import cartSliceReducer from "../slices/cartSlice";
const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
