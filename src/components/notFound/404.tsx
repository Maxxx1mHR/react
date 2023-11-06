import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <>
      <div className="not-found">Not Found 404</div>
      <div className="not-found">
        <Link to="/">Back to main page</Link>
      </div>
    </>
  );
};

export default Page404;
