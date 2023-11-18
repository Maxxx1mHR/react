import { useContext, useState } from 'react';

import { PokemonContext } from '../Context/PokemonContextProvider';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { setInputValue } from '../../state/slices/inputSlice';
import { pokemonsApi } from '../../state/slices/pokemonsApi';
import { setPokemon } from '../../state/slices/pokemonSlice';

export const SearchInput = () => {
  // const { setSearchParams, inputValue, setInputValue, currentPage } =
  //   useContext(PokemonContext) || {};

  const [input, setInput] = useState('');
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  // const inputValue = useSelector(
  //   (state: RootState) => state.inputValue.inputValue
  // );

  // const { data: pokemon } = pokemonsApi.useGetPokemonQuery('bulbasaur');

  return (
    <div className="search">
      <input
        data-testid="pokemon-search-input"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          // dispatch(setInputValue(e.target.value));
          // setInputValue?.(e.target.value);
        }}
        className="search__input"
      />
      <div className="search__button">
        <button
          data-testid="pokemon-search-button"
          onClick={() => {
            // searchPokemon(inputValue);
            dispatch(setInputValue(input));
            localStorage.setItem('pokemonQuery', input);
            // setLocalStorageSearchData(input);
            // if (pokemon) {
            //   dispatch(setPokemon(pokemon));
            // }

            if (input) {
              setSearchParams?.({ search: input });
            } else {
              setSearchParams?.({ page: '1' });
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
