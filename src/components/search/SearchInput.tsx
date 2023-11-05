export const SearchInput = ({
  searchPokemon,
  inputValue,
  setInputValue,
  setSearchParams,
  currentPage,
}: {
  searchPokemon: CallableFunction;
  inputValue: string;
  setInputValue: CallableFunction;
  setPokemonPerPage: CallableFunction;
  setSearchParams: CallableFunction;
  currentPage: number;
}) => {
  return (
    <div className="search">
      <input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className="search__input"
      />
      <div className="search__button">
        <button
          onClick={() => {
            searchPokemon(inputValue);
            if (inputValue) {
              setSearchParams({ search: inputValue });
            } else {
              setSearchParams({ page: currentPage });
            }
          }}
          className="button button_success"
        >
          Search
        </button>
      </div>
    </div>
  );
};
