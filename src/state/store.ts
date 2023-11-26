import { configureStore } from '@reduxjs/toolkit';
import { pokemonsApi } from './slices/pokemonsApi';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      [pokemonsApi.reducerPath]: pokemonsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
