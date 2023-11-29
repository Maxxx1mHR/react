import { Link } from 'react-router-dom';

export default function HookForm() {
  return (
    <>
      <h1>Hook form</h1>
      <div className="navigation">
        <u>
          <li>
            <Link to="/">Main page</Link>
          </li>
          <li>
            <Link to="/uncontrol-form">Uncontrol Form</Link>
          </li>
        </u>
      </div>
    </>
  );
}
