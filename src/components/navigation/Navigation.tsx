import { useCallback, useContext } from 'react';
import { PokemonContext } from '../Context/PokemonContextProvider';

const POKEMON_PER_PAGE = 4;
const COUNT_ALL_POKEMONS = 648;

const Navigation = () => {
  const {
    searchParams,
    setSearchParams,
    pokemonsPerPage,
    currentPage,
    setCurrentPage,
    setOffset,
  } = useContext(PokemonContext) || {};

  const countsPage = Math.ceil(
    COUNT_ALL_POKEMONS / (pokemonsPerPage || POKEMON_PER_PAGE)
  );

  const details = searchParams?.get('details');

  const incrementPage = useCallback(() => {
    if (currentPage === countsPage) {
      return;
    }
    setOffset?.(
      (offset: number) => offset + (pokemonsPerPage || POKEMON_PER_PAGE)
    );
    setCurrentPage?.((currentPage: number) => (currentPage || 0) + 1);
    if (details) {
      setSearchParams?.({
        page: (currentPage || 0) + 1,
        details: details,
      });
    } else {
      setSearchParams?.({
        page: (currentPage || 0) + 1,
      });
    }
  }, []);

  const decrementPage = useCallback(() => {
    if (currentPage === 1) {
      return;
    }
    setOffset?.(
      (offset: number) => offset - (pokemonsPerPage || POKEMON_PER_PAGE)
    );
    setCurrentPage?.((currentPage: number) => (currentPage || 0) - 1);
    if (details) {
      setSearchParams?.({
        page: (currentPage || 0) - 1,
        details: details,
      });
    } else {
      setSearchParams?.({
        page: (currentPage || 0) - 1,
      });
    }
  }, []);

  const toFirstPage = useCallback(() => {
    setOffset?.(0);
    setCurrentPage?.(1);
    if (details) {
      setSearchParams?.({
        page: 1,
        details: details,
      });
    } else {
      setSearchParams?.({
        page: 1,
      });
    }
  }, []);

  const toLastPage = useCallback(() => {
    setOffset?.(COUNT_ALL_POKEMONS - (pokemonsPerPage || POKEMON_PER_PAGE));
    setCurrentPage?.(countsPage);
    if (details) {
      setSearchParams?.({
        page: countsPage,
        details: details,
      });
    } else {
      setSearchParams?.({
        page: countsPage,
      });
    }
  }, []);

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
        <button
          data-testid="prev-page"
          className="button"
          onClick={decrementPage}
        >
          Prev
        </button>
        <button
          data-testid="next-page"
          className="button"
          onClick={incrementPage}
        >
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
