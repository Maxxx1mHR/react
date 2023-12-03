import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../../redux/features/FormSlice';
import { RootState } from '../../redux/store/store';
import { userScheme } from '../../validations/UserValidation';
import { ValidationError } from 'yup';
import { clearError, setError } from '../../redux/features/ErrorSlice';

export default function UncontrolForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.user.id);
  const errors = useSelector((state: RootState) => state.error);

  const countries = useSelector((state: RootState) => state.country.country);

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
  const navigate = useNavigate();

  const addNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const age = Number(ageRef.current?.value);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordRepeat = passwordRepeatRef.current?.value;

    let gender = '';
    if (genderMaleRef.current?.checked) {
      gender = genderMaleRef.current?.value;
    }
    if (genderFemaleRef.current?.checked) {
      gender = genderFemaleRef.current?.value;
    }
    const accept = acceptRef.current?.checked;

    const file = imageRef?.current?.files;
    const country = countryRef.current?.value;

    const checkExistValue =
      id &&
      name &&
      age &&
      email &&
      password &&
      passwordRepeat &&
      gender &&
      accept &&
      file &&
      country;

    try {
      await userScheme.validate(
        {
          id,
          name,
          age,
          email,
          password,
          passwordRepeat,
          gender,
          accept,
          file,
          country,
        },
        { abortEarly: false }
      );
      dispatch(clearError());
      if (checkExistValue) {
        const image = await convertBase64(file[0]);
        dispatch(
          addUser({
            id,
            name,
            age,
            email,
            password,
            passwordRepeat,
            gender,
            accept,
            image,
            country,
          })
        );
        navigate('/');
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        dispatch(setError(e.errors));
      }
    }
  };

  return (
    <>
      <h1>Uncontrol Form</h1>
      <div className="navigation">
        <u>
          <li>
            <Link to="/">Main page</Link>
          </li>
          <li>
            <Link to="/hook-form">Hook Form</Link>
          </li>
        </u>
      </div>
      <form className="form" onSubmit={(e) => addNewUser(e)}>
        <div className="form__field">
          <label>
            Name:
            <input type="text" ref={nameRef} />
          </label>
          <p className="form__error">{errors.name ? errors.name : ''}</p>
        </div>
        <div className="form__field">
          <label>
            Age:
            <input type="text" ref={ageRef} />
          </label>
          <p className="form__error">{errors.age ? errors.age : ''}</p>
        </div>
        <div className="form__field">
          <label>
            Email:
            <input type="text" ref={emailRef} autoComplete="username" />
          </label>
          <p className="form__error">{errors.email ? errors.email : ''}</p>
        </div>
        <div className="form__field">
          <label>
            Password:
            <input
              type="password"
              ref={passwordRef}
              autoComplete="new-password"
            />
          </label>
          <p className="form__error">
            {errors.password ? errors.password : ''}
          </p>
        </div>
        <div className="form__field">
          <label>
            Repeat:
            <input
              type="password"
              ref={passwordRepeatRef}
              autoComplete="new-password"
            />
          </label>
          <p className="form__error">
            {errors.passwordRepeat ? errors.passwordRepeat : ''}
          </p>
        </div>
        <div className="form__field">
          <label>
            Male:
            <input
              type="radio"
              name="gender"
              value="male"
              ref={genderMaleRef}
            />
          </label>
          <label>
            Female:
            <input
              type="radio"
              name="gender"
              value="female"
              ref={genderFemaleRef}
            />
          </label>
          <p className="form__error">{errors.gender ? errors.gender : ''}</p>
        </div>
        <div className="form__field">
          <label>
            Accept:
            <input type="checkbox" ref={acceptRef} />
          </label>
          <p className="form__error">{errors.accept ? errors.accept : ''}</p>
        </div>
        <div className="form__field">
          <label>
            Your Image File
            <input type="file" name="myImage" ref={imageRef} />
          </label>
          <p className="form__error">{errors.file ? errors.file : ''}</p>
        </div>
        <div className="form__field">
          <label>
            Country:
            <input
              id="country"
              type="input"
              ref={countryRef}
              onChange={() =>
                searchCountries(String(countryRef.current?.value))
              }
            />
          </label>

          <div className="country">
            {countryMatch.map((item) => (
              <label
                className="country__item"
                key={item}
                htmlFor="country"
                onClick={() => {
                  countryRef.current!.value = item;
                  searchCountries('');
                }}
              >
                {item}
              </label>
            ))}
            <p className="form__error">
              {errors.country ? errors.country : ''}
            </p>
          </div>
        </div>

        <button>Add User</button>
      </form>
    </>
  );
}
