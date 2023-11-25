import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import pokemonListReducer from './slices/pokemonSlice';
import inputReducer from './slices/inputSlice';
import paginationReducer from './slices/pageSlice';
import { pokemonsApi } from './slices/pokemonsApi';
import loaderReducer from './slices/loaderSlice';
import { createWrapper } from 'next-redux-wrapper';

const combineReducer = combineReducers({
  inputValue: inputReducer,
  pokemon: pokemonListReducer,
  pokemonList: pokemonListReducer,
  pagination: paginationReducer,
  loader: loaderReducer,
  [pokemonsApi.reducerPath]: pokemonsApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: combineReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
