import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import {
  decrementPage,
  incrementPage,
  setFirstPage,
  setLastPage,
} from '../../state/slices/pageSlice';
import { useRouter } from 'next/router';
const COUNT_ALL_POKEMONS = 648;
import { setMainLoading } from '../../state/slices/loaderSlice';

const Navigation = ({
  limit,
  currentPage,
}: {
  limit: number;
  currentPage: number;
}) => {
  const countPokemons = COUNT_ALL_POKEMONS;

  const router = useRouter();

  const countsPage = Math.ceil(countPokemons / limit);

  const nextPage = () => {
    if (currentPage === countsPage) {
      return;
    }
    router.push(`?page=${currentPage + 1}&limit=${limit}`);
  };

  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }
    router.push(`?page=${currentPage - 1}&limit=${limit}`);
  };

  const toFirstPage = () => {
    if (currentPage === 1) {
      return;
    }
    router.push(`?page=1&limit=${limit}`);
  };

  const toLastPage = () => {
    if (currentPage === countsPage) {
      return;
    }
    router.push(`?page=${countsPage}&limit=${limit}`);
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
