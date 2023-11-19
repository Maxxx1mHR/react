import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setInputValue } from '../../state/slices/inputSlice';
import { setMainLoading } from '../../state/slices/loaderSlice';

export const SearchInput = () => {
  const [input, setInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  return (
    <div className="search">
      <input
        data-testid="pokemon-search-input"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="search__input"
      />
      <div className="search__button">
        <button
          data-testid="pokemon-search-button"
          onClick={() => {
            if (searchParams.get('search') === input) {
              return;
            } else if (!input && !searchParams.get('search')) {
              return;
            }
            dispatch(setInputValue(input));
            dispatch(setMainLoading(true));

            localStorage.setItem('pokemonQuery', input);
            if (input) {
              setSearchParams?.({ search: input });
            } else {
              setSearchParams?.({ page: '1' });
              dispatch(setMainLoading(false));
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
