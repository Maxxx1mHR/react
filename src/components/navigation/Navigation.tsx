import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContextProvider';

const Navigation = () => {
  const {
    searchParams,
    setSearchParams,
    pokemonsPerPage,
    currentPage,
    setCurrentPage,
    setOffset,
  } = useContext(PokemonContext) || {};

  const countAllPokemons = 648;
  const countsPage = Math.ceil(countAllPokemons / (pokemonsPerPage || 4));

  const details = searchParams?.get('details');

  const incrementPage = () => {
    if (currentPage === countsPage) {
      return;
    }
    setOffset?.((offset: number) => offset + (pokemonsPerPage || 4));
    setCurrentPage?.(() => (currentPage || 0) + 1);
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
  };

  const decrementPage = () => {
    if (currentPage === 1) {
      return;
    }
    setOffset?.((offset: number) => offset - (pokemonsPerPage || 4));
    setCurrentPage?.(() => (currentPage || 0) - 1);
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
  };

  const firstPage = () => {
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
  };

  const lastPage = () => {
    setOffset?.(countAllPokemons - (pokemonsPerPage || 4));
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
  };

  return (
    <div className="navigation">
      <div className="navigation__buttons">
        <button className="button" onClick={() => firstPage()}>
          First
        </button>
        <button className="button" onClick={() => decrementPage()}>
          Prev
        </button>
        <button className="button" onClick={() => incrementPage()}>
          Next
        </button>
        <button className="button" onClick={() => lastPage()}>
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
