import { useContext } from 'react';

import { PokemonContext } from '../Context_/PokemonContextProvider';

export const SearchInput = ({
  searchPokemon,
}: {
  searchPokemon: CallableFunction;
}) => {
  const { setSearchParams, inputValue, setInputValue, currentPage } =
    useContext(PokemonContext) || {};

  return (
    <div className="search">
      <input
        data-testid="pokemon-search-input"
        value={inputValue}
        onChange={(e) => {
          setInputValue?.(e.target.value);
        }}
        className="search__input"
      />
      <div className="search__button">
        <button
          data-testid="pokemon-search-button"
          onClick={() => {
            searchPokemon(inputValue);
            if (inputValue) {
              setSearchParams?.({ search: inputValue });
            } else {
              setSearchParams?.({ page: currentPage });
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
