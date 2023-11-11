import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../app/App';
import { BrowserRouter } from 'react-router-dom';

describe('Tests for the Search component:', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const inputSearch = (await screen.findByTestId(
      'pokemon-search-input'
    )) as HTMLInputElement;
    fireEvent.change(inputSearch, { target: { value: 'bulbasaur' } });
    const buttonSearch = await screen.findByTestId('pokemon-search-button');
    expect(localStorage.getItem('pokemonName')).toBeNull;
    fireEvent.click(buttonSearch);
    localStorage.setItem('pokemonName', inputSearch.value);
    expect(localStorage.getItem('pokemonName')).toBe(inputSearch.value);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    render(
      <BrowserRouter>
        <App />
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
