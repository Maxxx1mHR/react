import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Navigation = ({
  setOffset, // countAllPokemons,
}: {
  setOffset: CallableFunction;
  // countAllPokemons: number;
}) => {
  const [, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 6;
  const countAllPokemons = 648;
  const countsPage = Math.ceil(countAllPokemons / pokemonsPerPage);

  // const [offset, setOffset] = useState(0);

  // useEffect(() => {
  //   console.log(offset);
  //   console.log(page);
  // }, [offset, page]);

  const incrementPage = () => {
    if (currentPage === countsPage) {
      return;
    }
    setOffset((offset: number) => offset + pokemonsPerPage);
    setCurrentPage((currentPage) => currentPage + 1);
    // console.log('+', offset);
  };

  const decrementPage = () => {
    if (currentPage === 1) {
      return;
    }
    setOffset((offset: number) => offset - pokemonsPerPage);
    setCurrentPage((currentPage) => currentPage - 1);

    // console.log('-', offset);

    // setSearchParams({ page: offset.toString() });

    // setSearchParams((page) => page - 1);
  };

  const firstPage = () => {
    setOffset(0);
    setCurrentPage(1);
  };

  const lastPage = () => {
    setOffset(countAllPokemons - pokemonsPerPage);
    setCurrentPage(countsPage);
  };

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

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
