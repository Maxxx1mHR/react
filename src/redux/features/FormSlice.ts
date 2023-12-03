import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IUser {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  accept: boolean;
  image: string | unknown;
  country: string;
}

const initialState = {
  id: 1,
  userInfo: <IUser[]>[],
  addNewUser: true,
};

const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.userInfo.push(action.payload);
      state.id += 1;
      state.addNewUser = true;
    },
    changeUserStatus: (state) => {
      state.addNewUser = false;
    },
  },
});

export const { addUser, changeUserStatus } = userInfoSlice.actions;

export default userInfoSlice.reducer;
