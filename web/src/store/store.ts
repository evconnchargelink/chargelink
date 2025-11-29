import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import type { RootState } from './types/types';
import toastReducer from './slices/toast.slice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };