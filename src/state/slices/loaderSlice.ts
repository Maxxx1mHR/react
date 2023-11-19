import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainLoader: true,
  detailsLoader: true,
  searchLoader: true,
  isNotFound: false,
  isBreak: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setMainLoading: (state, action: PayloadAction<boolean>) => {
      state.mainLoader = action.payload;
    },
    setDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.detailsLoader = action.payload;
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.searchLoader = action.payload;
    },
    setNotFound: (state, action: PayloadAction<boolean>) => {
      state.isNotFound = action.payload;
    },
    setBreak: (state, action: PayloadAction<boolean>) => {
      state.isBreak = action.payload;
    },
  },
});

export const {
  setMainLoading,
  setDetailsLoading,
  setSearchLoading,
  setNotFound,
  setBreak,
} = loaderSlice.actions;

export default loaderSlice.reducer;
