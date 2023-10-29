export const SearchInput = ({
  searchPokemon,
  inputValue,
  setInputValue,
  setIsBreak,
}: {
  searchPokemon: CallableFunction;
  inputValue: string;
  setInputValue: CallableFunction;
  setIsBreak: CallableFunction;
}) => {
  return (
    <div className="search">
      <input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className="search__input"
      ></input>
      <div className="search__button">
        <button
          onClick={() => {
            searchPokemon(inputValue.toLocaleLowerCase());
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
