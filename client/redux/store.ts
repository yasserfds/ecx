"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

// Configure the Redux store with the reducers and middleware
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Initialize the app by calling specific API functions
const initializeApp = async () => {
  try {
    // Check if `refreshToken` endpoint exists
    if (apiSlice.endpoints.refreshToken) {
      await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}));
    }

    // Call `loadUser` endpoint if defined
    if (apiSlice.endpoints.loadUser) {
      await store.dispatch(apiSlice.endpoints.loadUser.initiate({}));
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

initializeApp();
