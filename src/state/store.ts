import { configureStore } from '@reduxjs/toolkit';
import pokemonListReducer from './pokemon/pokemonSlice';
import inputSliceReducer from './pokemon/inputSlice';
import { pokemonsApi } from './pokemon/pokemonsApi';

export const store = configureStore({
  reducer: {
    inputValue: inputSliceReducer,
    pokemon: pokemonListReducer,
    pokemonList: pokemonListReducer,
    [pokemonsApi.reducerPath]: pokemonsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
