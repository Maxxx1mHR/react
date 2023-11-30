import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUser } from '../../redux/features/FormSlice';
import { RootState } from '../../redux/store/store';

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

  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.user.id);

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

  const addNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef?.current?.value;
    const age = Number(ageRef?.current?.value);
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    const passwordRepeat = passwordRepeatRef?.current?.value;

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

    if (checkExistValue) {
      const image = await convertBase64(file[0]);
      console.log(accept);
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
        })
      );
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
        <label>
          Name:
          <input type="text" ref={nameRef} />
        </label>
        <label>
          Age:
          <input type="text" ref={ageRef} />
        </label>
        <label>
          Email:
          <input type="email" ref={emailRef} />
        </label>
        <label>
          Password:
          <input type="password" ref={passwordRef} />
        </label>
        <label>
          Repeat:
          <input type="password" ref={passwordRepeatRef} />
        </label>
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
        <label>
          Accept:
          <input type="checkbox" ref={acceptRef} />
        </label>
        <label>
          Your Image File
          <input
            type="file"
            name="myImage"
            accept="image/png,  image/jpeg"
            ref={imageRef}
          />
        </label>

        <button>Add User</button>
      </form>
    </>
  );
}
