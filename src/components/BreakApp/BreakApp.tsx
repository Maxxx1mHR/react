import { useDispatch } from 'react-redux';
import { setBreak } from '../../state/slices/loaderSlice';

const BreakApp = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="button button_danger"
      onClick={() => dispatch(setBreak(true))}
    >
      Break app
    </button>
  );
};

export default BreakApp;
