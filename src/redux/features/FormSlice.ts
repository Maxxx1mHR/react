import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUser {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  accept: boolean;
  image: string | unknown;
}

const initialState = {
  id: 1,
  userInfo: <IUser[]>[],
};

const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.userInfo.push(action.payload);
      state.id += 1;
    },
  },
});

export const { addUser } = userInfoSlice.actions;

export default userInfoSlice.reducer;
