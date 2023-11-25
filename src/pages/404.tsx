import Link from 'next/link';

const Page404 = () => {
  return (
    <div data-testid="not-found-page">
      <div className="not-found">Not Found 404</div>
      <div className="not-found">
        <Link href="/">Back to main page</Link>
      </div>
    </div>
  );
};

export default Page404;
