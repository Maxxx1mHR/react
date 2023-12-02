import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
        return !country.indexOf(searchCountry);
      }
    });
    setCountryMatch(matches);
  };

  // const [errorsMessages, setErrorsMessages] = useState({
  //   name: '',
  //   age: '',
  //   email: '',
  //   password: '',
  //   passwordRepeat: '',
  //   gender: '',
  //   accept: '',
  //   image: '',
  // });
  // const errorsMessages = {
  //   name: '',
  //   age: '',
  //   email: '',
  //   password: '',
  //   passwordRepeat: '',
  //   gender: '',
  //   accept: '',
  //   image: '',
  // };

  const addNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
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

    const checkExistValue =
      name &&
      age &&
      email &&
      password &&
      passwordRepeat &&
      gender &&
      accept &&
      file;

    // if (checkExistValue) {
    // const image = await convertBase64(file[0]);

    const data = {
      id,
      name,
      age,
      email,
      password,
      passwordRepeat,
      gender,
      accept,
      // image,
    };
    // const keys = Object.keys(errorsMessages);
    try {
      await userScheme.validate(data, { abortEarly: false });
      dispatch(clearError());
      dispatch(addUser(data));
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.errors);
        dispatch(setError(e.errors));
        // e.errors.map((err) => {
        //   const test = err.split(' ')[0];
        //   if (keys.includes(test)) {
        //     setErrorsMessages((prev) => ({
        //       ...prev,
        //       [`${test as keyof typeof errorsMessages}`]: err,
        //     }));
        //   }
        // });
      }
    }
    // }
  };

  // console.log('test', errors);
  // useEffect(() => {
  //   errors;
  // }, [errors]);

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
        <label>
          Name:
          <input type="text" ref={nameRef} />
        </label>
        <p>{errors.name ? errors.name : ''}</p>
        <label>
          Age:
          <input type="text" ref={ageRef} />
        </label>
        <p>{errors.age ? errors.age : ''}</p>
        <label>
          Email:
          <input type="text" ref={emailRef} autoComplete="username" />
        </label>
        <p>{errors.email ? errors.email : ''}</p>
        <label>
          Password:
          <input
            type="password"
            ref={passwordRef}
            autoComplete="new-password"
          />
        </label>
        <p>{errors.password ? errors.password : ''}</p>
        <label>
          Repeat:
          <input
            type="password"
            ref={passwordRepeatRef}
            autoComplete="new-password"
          />
        </label>
        <p>{errors.passwordRepeat ? errors.passwordRepeat : ''}</p>
        <label>
          Male:
          <input type="radio" name="gender" value="male" ref={genderMaleRef} />
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
        <p>{errors.gender ? errors.gender : ''}</p>
        <label>
          Accept:
          <input type="checkbox" ref={acceptRef} />
        </label>
        <p>{errors.accept ? errors.accept : ''}</p>
        <label>
          Your Image File
          <input
            type="file"
            name="myImage"
            accept="image/png,  image/jpeg"
            ref={imageRef}
          />
        </label>
        <label>
          Country:
          <input
            id="country"
            type="input"
            ref={countryRef}
            onChange={() => searchCountries(String(countryRef.current?.value))}
          />
        </label>
        {countryMatch.map((item) => (
          <label
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

        <button>Add User</button>
      </form>
    </>
  );
}
