const Navigation = ({
  setOffset,
  currentPage,
  setCurrentPage,
  pokemonsPerPage,
}: {
  setOffset: CallableFunction;
  currentPage: number;
  setCurrentPage: CallableFunction;
  pokemonsPerPage: number;
}) => {
  const countAllPokemons = 648;
  const countsPage = Math.ceil(countAllPokemons / pokemonsPerPage);

  const incrementPage = () => {
    if (currentPage === countsPage) {
      return;
    }
    setOffset((offset: number) => offset + pokemonsPerPage);
    setCurrentPage(() => currentPage + 1);
  };

  const decrementPage = () => {
    if (currentPage === 1) {
      return;
    }
    setOffset((offset: number) => offset - pokemonsPerPage);
    setCurrentPage(() => currentPage - 1);
  };

  const firstPage = () => {
    setOffset(0);
    setCurrentPage(1);
  };

  const lastPage = () => {
    setOffset(countAllPokemons - pokemonsPerPage);
    setCurrentPage(countsPage);
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
