import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { userScheme } from '../../validations/UserValidation';
import { IUserInfo } from '../types/types';
import { RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addUser, changeUserStatus } from '../../redux/features/FormSlice';
import { checkPasswordDifficult, convertBase64 } from './helpers/functions';

export default function HookForm() {
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(userScheme),
  });
  const navigate = useNavigate();

  const id = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  const onSubmitHandler = async (data: IUserInfo): Promise<void> => {
    const accept = Boolean(data.accept);
    const image = data.file && (await convertBase64(data.file[0]));
    dispatch(
      addUser({
        id: id,
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        passwordRepeat: data.passwordRepeat,
        gender: data.gender,
        accept: accept,
        image: image,
        country: data.country,
      })
    );
    reset();
    navigate('/');
    setTimeout(() => dispatch(changeUserStatus()), 1000);
  };

  const countries = useSelector((state: RootState) => state.country.country);
  const [countryMatch, setCountryMatch] = useState<string[]>([]);

  const searchCountries = (searchCountry: string) => {
    const matches = countries.filter((country) => {
      if (searchCountry) {
        return !country
          .toLocaleLowerCase()
          .indexOf(searchCountry.toLocaleLowerCase());
      }
    });
    setCountryMatch(matches);
  };

  return (
    <>
      <h1 className="title">Hook form</h1>
      <div className="navigation">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link className="navigation__link" to="/">
              Main page
            </Link>
          </li>
          <li className="navigation__item">
            <Link className="navigation__link" to="/uncontrol-form">
              Uncontrol Form
            </Link>
          </li>
        </ul>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="form__field">
          <label htmlFor="name">Name:</label>
          <input id="name" {...register('name')} />
          <p className="form__error">
            {errors.name?.message ? errors.name.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label htmlFor="age">Age:</label>
          <input id="age" {...register('age')} />
          <p className="form__error">
            {errors.age?.message ? errors.age.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label htmlFor="email">Email:</label>
          <input id="email" {...register('email')} />
          <p className="form__error">
            {errors.email?.message ? errors.email.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" {...register('password')} />
          <p className="form__error">
            {errors.password?.message ? errors.password.message : ''}
          </p>
          <p className="form__password-difficult">
            {watch('password') && checkPasswordDifficult(watch('password'))}
          </p>
        </div>
        <div className="form__field">
          <label htmlFor="passwordRepeat">Repeat:</label>
          <input
            id="passwordRepeat"
            type="password"
            {...register('passwordRepeat')}
          />
          <p className="form__error">
            {errors.passwordRepeat?.message
              ? errors.passwordRepeat.message
              : ''}
          </p>
        </div>
        <div className="form__field">
          <div className="form__gender">
            <label htmlFor="male">Male:</label>
            <input
              id="male"
              type="radio"
              value="male"
              {...register('gender')}
            />
            <label htmlFor="female">Female:</label>
            <input
              id="female"
              type="radio"
              value="female"
              {...register('gender')}
            />
          </div>
          <p className="form__error">
            {errors.gender?.message ? errors.gender.message : ''}
          </p>
        </div>
        <div className="form__field">
          <div className="form__accept">
            <label htmlFor="accept">Accept:</label>
            <input id="accept" type="checkbox" {...register('accept')} />
          </div>
          <p className="form__error">
            {errors.accept?.message ? errors.accept.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label htmlFor="image">Your Image File:</label>
          <input id="image" type="file" {...register('file')} />
          <p className="form__error">
            {errors.file?.message ? errors.file.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label htmlFor="country">Country:</label>
          <input
            id="country"
            {...register('country', {
              onChange: (e) => {
                searchCountries(e.target.value);
              },
            })}
          />
          <p className="form__error">
            {errors.country?.message ? errors.country.message : ''}
          </p>
          <div className="country">
            {countryMatch.map((item) => (
              <label
                className="country__item"
                key={item}
                htmlFor="country"
                onClick={() => {
                  setValue('country', item);
                  searchCountries('');
                  trigger('country');
                }}
              >
                {item}
              </label>
            ))}
          </div>
        </div>
        <button disabled={!isValid}>Add User</button>
      </form>
    </>
  );
}
