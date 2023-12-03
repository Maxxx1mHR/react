import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/FormSlice';
import countryReducer from '../features/CountrySlice';
import errorReducer from '../features/ErrorSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    country: countryReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
