import * as yup from 'yup';

export const userScheme = yup.object().shape({
  // id: yup.number(),

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
});
