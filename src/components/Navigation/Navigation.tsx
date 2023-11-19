import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import {
  decrementPage,
  incrementPage,
  setFirstPage,
  setLastPage,
} from '../../state/slices/pageSlice';
import { useSearchParams } from 'react-router-dom';
import { setMainLoading } from '../../state/slices/loaderSlice';

const Navigation = () => {
  const dispatch = useDispatch();

  const limit = useSelector((state: RootState) => state.pagination.limit);
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const countPokemons = useSelector(
    (state: RootState) => state.pagination.countPokemons
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const countsPage = Math.ceil(countPokemons / limit);

  const details = searchParams?.get('details');

  const nextPage = () => {
    if (currentPage === countsPage) {
      return;
    }
    dispatch(incrementPage());
    dispatch(setMainLoading(true));

    if (details) {
      setSearchParams?.({
        page: String((currentPage || 0) + 1),
        details: details,
      });
    } else {
      setSearchParams?.({
        page: String((currentPage || 0) + 1),
      });
    }
  };

  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }
    dispatch(decrementPage());
    dispatch(setMainLoading(true));

    if (details) {
      setSearchParams?.({
        page: String((currentPage || 0) - 1),
        details: details,
      });
    } else {
      setSearchParams?.({
        page: String((currentPage || 0) - 1),
      });
    }
  };

  const toFirstPage = () => {
    if (currentPage === 1) {
      return;
    }
    dispatch(setFirstPage());
    dispatch(setMainLoading(true));

    if (details) {
      setSearchParams?.({
        page: '1',
        details: details,
      });
    } else {
      setSearchParams?.({
        page: '1',
      });
    }
  };

  const toLastPage = () => {
    if (currentPage === countsPage) {
      return;
    }
    dispatch(setLastPage());
    dispatch(setMainLoading(true));

    if (details) {
      setSearchParams?.({
        page: String(countsPage),
        details: details,
      });
    } else {
      setSearchParams?.({
        page: String(countsPage),
      });
    }
  };

  return (
    <div data-testid="navigation" className="navigation">
      <div className="navigation__buttons">
        <button
          data-testid="first-page"
          className="button"
          onClick={toFirstPage}
        >
          First
        </button>
        <button data-testid="prev-page" className="button" onClick={prevPage}>
          Prev
        </button>
        <button data-testid="next-page" className="button" onClick={nextPage}>
          Next
        </button>
        <button data-testid="last-page" className="button" onClick={toLastPage}>
          Last
        </button>
      </div>
      <div className="navigation__pages">
        {currentPage}/{countsPage}
      </div>
    </div>
  );
};

export default Navigation;
