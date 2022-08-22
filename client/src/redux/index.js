import { configureStore } from "@reduxjs/toolkit";

// REDUCERS
import userReducer from "./userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
