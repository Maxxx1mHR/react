import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../redux/store/store';

export default function Home() {
  const usersInfo = useSelector((state: RootState) => state.user.userInfo);
  return (
    <>
      <h1>Home page</h1>
      <div className="navigation">
        <u>
          <li>
            <Link to="/uncontrol-form">Uncontrol Form</Link>
          </li>
          <li>
            <Link to="/hook-form">Hook Form</Link>
          </li>
        </u>
      </div>
      <div className="user">
        <ul className="user__list">
          <li className="user__item">name</li>
          <li className="user__item">age</li>
          <li className="user__item">email</li>
          <li className="user__item">password</li>
          <li className="user__item">repeatPassword</li>
          <li className="user__item">Gender</li>
          <li className="user__item">Accept</li>
          <li className="user__item">Image</li>
        </ul>
        {usersInfo.map((user) => (
          <ul key={user.id} className="user__list">
            <li className="user__item">{user.name}</li>
            <li className="user__item">{user.age}</li>
            <li className="user__item">{user.email}</li>
            <li className="user__item">{user.password}</li>
            <li className="user__item">{user.passwordRepeat}</li>
            <li className="user__item">{user.gender}</li>
            <li className="user__item">{String(user.accept)}</li>
            <li className="user__item">
              <img src={String(user.image)} alt="image" height="100px" />
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
