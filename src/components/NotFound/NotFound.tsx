import { useDispatch } from 'react-redux';
import { setNotFound } from '../../state/slices/loaderSlice';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <div className="not-found">Pokemon Not Found</div>;
      <div className="not-found">
        <button
          className="button"
          onClick={() => {
            router.push('');
          }}
        >
          Back to main page
        </button>
      </div>
    </>
  );
};
export default NotFound;
