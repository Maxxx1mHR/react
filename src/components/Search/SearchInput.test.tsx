import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchInput } from './SearchInput';
import * as reduxHooks from 'react-redux';

vi.mock('react-redux');

const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');

describe('Tests for the Search component:', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    mockedDispatch.mockReturnValue(vi.fn());
    render(
      <BrowserRouter>
        <SearchInput></SearchInput>
      </BrowserRouter>
    );
    const inputSearch = (await screen.findByTestId(
      'pokemon-search-input'
    )) as HTMLInputElement;
    expect(localStorage.getItem('pokemonName')).toBeNull;
    fireEvent.change(inputSearch, { target: { value: 'bulbasaur' } });
    localStorage.setItem('pokemonName', inputSearch.value);
    expect(localStorage.getItem('pokemonName')).toBe(inputSearch.value);
  });
  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    mockedDispatch.mockReturnValue(vi.fn());
    render(
      <BrowserRouter>
        <SearchInput></SearchInput>
      </BrowserRouter>
    );
    const inputSearch = (await screen.findByTestId(
      'pokemon-search-input'
    )) as HTMLInputElement;
    localStorage.setItem('pokemonName', 'bulbasaur');
    fireEvent.change(inputSearch, {
      target: { value: localStorage.getItem('pokemonName') },
    });
    expect(localStorage.getItem('pokemonName')).toBe(inputSearch.value);
  });
});
