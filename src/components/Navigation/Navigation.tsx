import { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import {
  decrementPage,
  incrementPage,
  setFirstPage,
  setLastPage,
} from '../../state/slices/pageSlice';
import { useSearchParams } from 'react-router-dom';

const POKEMON_PER_PAGE = 4;
const COUNT_ALL_POKEMONS = 648;

const Navigation = () => {
  // const {
  //   searchParams,
  //   setSearchParams,
  //   pokemonsPerPage,
  //   currentPage,
  //   setCurrentPage,
  //   setOffset,
  // } = useContext(PokemonContext) || {};

  const dispatch = useDispatch();

  const { limit, currentPage, countPokemons } = useSelector(
    (state: RootState) => state.pagination
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const countsPage = Math.ceil(countPokemons / limit);

  const details = searchParams?.get('details');

  const nextPage = () => {
    if (currentPage === countsPage) {
      return;
    }
    dispatch(incrementPage());
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

  // const countsPage = Math.ceil(
  //   COUNT_ALL_POKEMONS / (pokemonsPerPage || POKEMON_PER_PAGE)
  // );

  // const details = searchParams?.get('details');

  // const incrementPage = useCallback(() => {
  //   if (currentPage === countsPage) {
  //     return;
  //   }
  //   setOffset?.(
  //     (offset: number) => offset + (pokemonsPerPage || POKEMON_PER_PAGE)
  //   );
  //   setCurrentPage?.((currentPage: number) => (currentPage || 0) + 1);
  //   if (details) {
  //     setSearchParams?.({
  //       page: (currentPage || 0) + 1,
  //       details: details,
  //     });
  //   } else {
  //     setSearchParams?.({
  //       page: (currentPage || 0) + 1,
  //     });
  //   }
  // }, []);

  // const decrementPage = useCallback(() => {
  //   if (currentPage === 1) {
  //     return;
  //   }
  //   setOffset?.(
  //     (offset: number) => offset - (pokemonsPerPage || POKEMON_PER_PAGE)
  //   );
  //   setCurrentPage?.((currentPage: number) => (currentPage || 0) - 1);
  //   if (details) {
  //     setSearchParams?.({
  //       page: (currentPage || 0) - 1,
  //       details: details,
  //     });
  //   } else {
  //     setSearchParams?.({
  //       page: (currentPage || 0) - 1,
  //     });
  //   }
  // }, []);

  // const toFirstPage = useCallback(() => {
  //   setOffset?.(0);
  //   setCurrentPage?.(1);
  //   if (details) {
  //     setSearchParams?.({
  //       page: 1,
  //       details: details,
  //     });
  //   } else {
  //     setSearchParams?.({
  //       page: 1,
  //     });
  //   }
  // }, []);

  // const toLastPage = useCallback(() => {
  //   setOffset?.(COUNT_ALL_POKEMONS - (pokemonsPerPage || POKEMON_PER_PAGE));
  //   setCurrentPage?.(countsPage);
  //   if (details) {
  //     setSearchParams?.({
  //       page: countsPage,
  //       details: details,
  //     });
  //   } else {
  //     setSearchParams?.({
  //       page: countsPage,
  //     });
  //   }
  // }, []);

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
