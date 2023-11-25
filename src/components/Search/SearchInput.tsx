import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setInputValue } from '../../state/slices/inputSlice';
import { setMainLoading } from '../../state/slices/loaderSlice';
import { useRouter } from 'next/router';

export const SearchInput = ({ inputValue }: { inputValue: string }) => {
  const inputCurrentValue = useRef(inputValue);

  const router = useRouter();

  return (
    <form
      action="#"
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (inputCurrentValue.current === '') {
          router.push('');
        } else {
          router.push(`?search=${inputCurrentValue.current}`);
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
        <button type="submit" className="button button_success">
          Search
        </button>
      </div>
    </form>
  );
};
