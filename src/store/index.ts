import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { lkwApi } from './api/lkwApi';
import { chassiApi } from './api/chassiApi';
import { fahrerApi } from './api/fahrerApi';
import { messageApi } from './api/messageApi';
import authReducer from './slices/authSlice';
import lkwReducer from './slices/lkwSlice';
import chassiReducer from './slices/chassiSlice';
import fahrerReducer from './slices/fahrerSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [lkwApi.reducerPath]: lkwApi.reducer,
    [chassiApi.reducerPath]: chassiApi.reducer,
    [fahrerApi.reducerPath]: fahrerApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    auth: authReducer,
    lkw: lkwReducer,
    chassi: chassiReducer,
    fahrer: fahrerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      lkwApi.middleware,
      chassiApi.middleware,
      fahrerApi.middleware,
      messageApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;