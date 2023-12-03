import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../redux/store/store';
export default function Home() {
  const usersInfo = useSelector((state: RootState) => state.user.userInfo);
  const addNewUser = useSelector((state: RootState) => state.user.addNewUser);
  return (
    <>
      <h1 className="title">Home page</h1>
      <div className="navigation">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link className="navigation__link" to="/uncontrol-form">
              Uncontrol Form
            </Link>
          </li>
          <li className="navigation__item">
            <Link className="navigation__link" to="/hook-form">
              Hook Form
            </Link>
          </li>
        </ul>
      </div>
      {Boolean(!usersInfo.length) && (
        <p className="user__empty">
          You have not added user information yet. List of users is empty (◕‿◕)
        </p>
      )}
      <div className="user">
        {usersInfo.map((user) => (
          <ul
            key={user.id}
            className={`user__list ${addNewUser ? 'new-user' : ''}`}
          >
            <li className="user__item">
              <img
                className="user__image"
                src={String(user.image)}
                alt="image"
              />
            </li>
            <div>
              <li className="user__item">Name: {user.name}</li>
              <li className="user__item">Age: {user.age}</li>
              <li className="user__item">Email: {user.email}</li>
              <li className="user__item">Password: {user.password}</li>
              <li className="user__item">
                Password repeat:{user.passwordRepeat}
              </li>
              <li className="user__item">Gender: {user.gender}</li>
              <li className="user__item">Accept:{String(user.accept)}</li>
              <li className="user__item">Country:{user.country}</li>
            </div>
          </ul>
        ))}
      </div>
    </>
  );
}
