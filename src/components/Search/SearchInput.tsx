import { useRef } from 'react';
import { useRouter } from 'next/router';

export const SearchInput = ({ inputValue }: { inputValue: string }) => {
  const inputCurrentValue = useRef(inputValue);

  const router = useRouter();

  return (
    <form
      data-testid="searchForm"
      action="#"
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (inputCurrentValue.current === '') {
          localStorage.setItem(
            'pokemonQuery',
            inputCurrentValue.current.toLowerCase()
          );
          router.push('');
        } else {
          localStorage.setItem(
            'pokemonQuery',
            inputCurrentValue.current.toLowerCase()
          );
          router.push(`?search=${inputCurrentValue.current.toLowerCase()}`);
        }
      }}
    >
      <input
        defaultValue={inputValue}
        type="text"
        name="input"
        id="input"
        data-testid="pokemon-search-input"
        className="search__input"
        onChange={(e) => {
          e.target.value = e.target.value.trim();
          inputCurrentValue.current = e.target.value;
        }}
      />
      <div className="search__button">
        <button
          data-testid="pokemon-search-button"
          type="submit"
          className="button button_success"
        >
          Search
        </button>
      </div>
    </form>
  );
};
