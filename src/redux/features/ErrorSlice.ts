import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { ValidationError } from 'yup';

const initialState = {
  name: '',
  age: '',
  email: '',
  password: '',
  passwordRepeat: '',
  gender: '',
  accept: '',
  // image: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, errors: PayloadAction<string[]>) => {
      for (const keys in state) {
        state[keys as keyof typeof state] = '';
      }
      const objKeys = Object.keys(state);
      errors.payload.map((err) => {
        // console.log(err);
        const test = err.split(' ')[0];
        if (objKeys.includes(test)) {
          state[test as keyof typeof state] = err;
        }
      });
    },
    clearError: (state) => {
      for (const keys in state) {
        state[keys as keyof typeof state] = '';
      }
    },
    // addUser: (state, action: PayloadAction<IUser>) => {
    //   state.userInfo.push(action.payload);
    //   state.id += 1;
    // },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
