import { configureStore } from '@reduxjs/toolkit';

// REDUCERS
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
