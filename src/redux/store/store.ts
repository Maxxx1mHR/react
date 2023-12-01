import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/FormSlice';
import countryReducer from '../features/CountrySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
