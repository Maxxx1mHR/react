import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import { Provider } from 'react-redux';
import { store } from '../../../state/store';
import { MainPage } from '../../MainPage/MainPage';
import PokemonCardAdditional from '../PokemonCardAdditional/PokemonCardAdditional';

describe('Tests for the Search component:', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );

    const pokemonList = await screen.findAllByTestId('pokemonTest');
    expect(pokemonList).toHaveLength(4);
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <PokemonCard pokemonName="bulbasaur"></PokemonCard>
        </Provider>
      </BrowserRouter>
    );
    const pokemonList = await screen.findByTestId('pokemonTest');
    expect(pokemonList).toBeInTheDocument;
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage></MainPage>
        </Provider>
      </BrowserRouter>
    );

    const pokemonMainInfo = await screen.findAllByTestId('pokemonTest');
    expect(pokemonMainInfo).toBeInTheDocument;
    const additionalInfo = render(
      <BrowserRouter>
        <Provider store={store}>
          <PokemonCardAdditional></PokemonCardAdditional>
        </Provider>
      </BrowserRouter>
    );
    expect(additionalInfo).toBeInTheDocument;
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage></MainPage>
        </Provider>
      </BrowserRouter>
    );

    const pokemonMainInfo = await screen.findAllByTestId('pokemonTest');
    expect(pokemonMainInfo).toBeInTheDocument;
    const additionalInfo = render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonCardAdditional></PokemonCardAdditional>
        </BrowserRouter>
      </Provider>
    );
    expect(additionalInfo).toBeInTheDocument;
  });
});
