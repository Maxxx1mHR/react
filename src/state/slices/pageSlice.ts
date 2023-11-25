import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const POKEMON_PER_PAGE = 4;
const COUNT_ALL_POKEMONS = 648;

const initialState = {
  limit: POKEMON_PER_PAGE,
  offset: 0,
  currentPage: 1,
  countPokemons: COUNT_ALL_POKEMONS,
};

const pageSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    incrementPage: (state) => {
      state.currentPage += 1;
      state.offset += state.limit;
    },
    decrementPage: (state) => {
      state.currentPage -= 1;
      state.offset -= state.limit;
    },
    setFirstPage: (state) => {
      state.currentPage = 1;
      state.offset = 0;
    },
    setLastPage: (state) => {
      state.currentPage = state.countPokemons / state.limit;
      state.offset = state.countPokemons - state.limit;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const {
  setLimit,
  setOffset,
  setCurrentPage,
  incrementPage,
  decrementPage,
  setFirstPage,
  setLastPage,
} = pageSlice.actions;

export default pageSlice.reducer;
