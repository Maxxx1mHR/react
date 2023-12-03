import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { userScheme } from '../../validations/UserValidation';
import { IUserInfo } from '../types/types';
import { RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addUser, changeUserStatus } from '../../redux/features/FormSlice';

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

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

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
          <label>
            Name:
            <input {...register('name')} />
          </label>
          <p className="form__error">
            {errors.name?.message ? errors.name.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label>
            Age:
            <input {...register('age')} />
          </label>
          <p className="form__error">
            {errors.age?.message ? errors.age.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label>
            Email:
            <input {...register('email')} />
          </label>
          <p className="form__error">
            {errors.email?.message ? errors.email.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label>
            Password:
            <input type="password" {...register('password')} />
          </label>
          <p className="form__error">
            {errors.password?.message ? errors.password.message : ''}
          </p>
          <p className="form__password-difficult">
            {Boolean(watch('password') && watch('password').length < 4) && (
              <li>Easy</li>
            )}
            {Boolean(
              watch('password') &&
                watch('password').length >= 4 &&
                watch('password').length < 7
            ) && <li>Medium</li>}
            {Boolean(watch('password') && watch('password').length >= 7) && (
              <li>Hard</li>
            )}
          </p>
        </div>
        <div className="form__field">
          <label>
            Repeat:
            <input type="password" {...register('passwordRepeat')} />
          </label>
          <p className="form__error">
            {errors.passwordRepeat?.message
              ? errors.passwordRepeat.message
              : ''}
          </p>
        </div>
        <div className="form__field">
          <label>
            Male:
            <input type="radio" value="male" {...register('gender')} />
          </label>
          <label>
            Female:
            <input type="radio" value="female" {...register('gender')} />
          </label>
          <p className="form__error">
            {errors.gender?.message ? errors.gender.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label>
            Accept:
            <input type="checkbox" {...register('accept')} />
          </label>
          <p className="form__error">
            {errors.accept?.message ? errors.accept.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label>
            Your Image File
            <input type="file" {...register('file')} />
          </label>
          <p className="form__error">
            {errors.file?.message ? errors.file.message : ''}
          </p>
        </div>
        <div className="form__field">
          <label>
            Country:
            <input
              id="country"
              {...register('country', {
                onChange: (e) => {
                  console.log(e.target.value);
                  searchCountries(e.target.value);
                },
              })}
            />
          </label>

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
          <p className="form__error">
            {errors.country?.message ? errors.country.message : ''}
          </p>
        </div>
        <button disabled={!isValid}>Add User</button>
      </form>
    </>
  );
}
