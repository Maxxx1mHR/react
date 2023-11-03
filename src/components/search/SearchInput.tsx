export const SearchInput = ({
  searchPokemon,
  inputValue,
  setInputValue,
  setIsBreak,
  setSearchValue,
}: {
  searchPokemon: CallableFunction;
  inputValue: string;
  setInputValue: CallableFunction;
  setIsBreak: CallableFunction;
  setSearchValue: CallableFunction;
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
            setSearchValue(inputValue);
          }}
          className="button button_success"
        >
          Search
        </button>
        <button
          onClick={() => {
            setIsBreak(true);
          }}
          className="button button_danger"
        >
          Break app
        </button>
      </div>
    </div>
  );
};
