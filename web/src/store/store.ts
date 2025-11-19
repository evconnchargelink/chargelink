import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import type { RootState } from './types/types';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };