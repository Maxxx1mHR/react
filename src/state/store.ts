import { configureStore } from '@reduxjs/toolkit';
import pokemonListReducer from './slices/pokemonSlice';
import inputReducer from './slices/inputSlice';
import paginationReducer from './slices/pageSlice';
import { pokemonsApi } from './slices/pokemonsApi';
import loaderReducer from './slices/loaderSlice';

export const store = configureStore({
  reducer: {
    inputValue: inputReducer,
    pokemon: pokemonListReducer,
    pokemonList: pokemonListReducer,
    pagination: paginationReducer,
    loader: loaderReducer,
    [pokemonsApi.reducerPath]: pokemonsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
