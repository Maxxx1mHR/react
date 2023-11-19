import { useDispatch } from 'react-redux';
import { setNotFound } from '../../state/slices/loaderSlice';
import { useSearchParams } from 'react-router-dom';

const NotFoundMessage = () => {
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="not-found">Pokemon Not Found</div>;
      <div className="not-found">
        <button
          className="button"
          onClick={() => {
            dispatch(setNotFound(false));
            setSearchParams();
          }}
        >
          Back to main page
        </button>
      </div>
    </>
  );
};
export default NotFoundMessage;
