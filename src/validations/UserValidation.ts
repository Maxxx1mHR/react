import * as yup from 'yup';
import { store } from '../redux/store/store';

const countries = store.getState().country.country;

export const userScheme = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[A-Z]/, 'name must contain at first uppercase letter'),

  age: yup.number().required().positive(),

  email: yup.string().required().email(),

  password: yup
    .string()
    .required()
    .matches(/^(?=.*[0-9])/, 'password must contain one number')
    .matches(/^(?=.*[A-Z])/, 'password must contain one uppercase letter')
    .matches(/^(?=.*[a-z])/, 'password must contain one lower letter')
    .matches(
      /^(?=.*[~!@#$%^&*()_+"№;:?*])/,
      'password must contain one special character'
    ),

  passwordRepeat: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'passwordRepeat not match'),

  gender: yup.string().required(),

  accept: yup.string().oneOf(['true']),

  file: yup
    .mixed<FileList>()
    .test('extension', 'file is required', (value) => {
      return value?.length == 1;
    })
    .test('fileSize', 'file is too large. Max size 2MB', (value) => {
      if (!value?.length) {
        return false;
      } else {
        return value && value[0].size <= 2000000;
      }
    })
    .test('type', 'file is only png or jpeg', (value) => {
      if (!value?.length) {
        return false;
      } else {
        return (
          value &&
          (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
        );
      }
    })
    .test('extension', 'file is required', (value) => {
      return value?.length == 1;
    }),

  country: yup
    .string()
    .required()
    .test('exist', 'country does not exist', (value) => {
      return countries.includes(value);
    }),
});
