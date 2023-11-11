import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div data-testid="not-found-page">
      <div className="not-found">Not Found 404</div>
      <div className="not-found">
        <Link to="/">Back to main page</Link>
      </div>
    </div>
  );
};

export default Page404;
