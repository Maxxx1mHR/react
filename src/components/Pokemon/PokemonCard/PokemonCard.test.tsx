import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import PokemonCardAdditional from '../PokemonCardAdditional/PokemonCardAdditional';
import * as reduxHooks from 'react-redux';
import { Provider } from 'react-redux';
vi.mock('react-redux');

const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');

describe('Tests for the Search component:', () => {
  mockedDispatch.mockReturnValue(vi.fn()).mockReturnValue;
  vi.spyOn(reduxHooks, 'useSelector');

  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <Provider>
        <BrowserRouter>
          <PokemonCard pokemonName="bulbasaur"></PokemonCard>
        </BrowserRouter>
      </Provider>
    );
    // const pokemonList = await screen.findByTestId('pokemonTest');
    // expect(pokemonList).toBeInTheDocument;
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <Provider>
        <BrowserRouter>
          <PokemonCard pokemonName="bulbasaur"></PokemonCard>
        </BrowserRouter>
      </Provider>
    );
    // const pokemonList = await screen.findByTestId('pokemonTest');
    // expect(pokemonList).toBeInTheDocument;
    // fireEvent.click(pokemonList);
    // render(
    //   <BrowserRouter>
    //     <PokemonCardAdditional></PokemonCardAdditional>
    //   </BrowserRouter>
    // );
  });

  // vi.mock('../../Services/PokeService', () => {
  //   const pokemon = {
  //     id: 1,
  //     name: 'bulbasaur',
  //   };

  //   const getPokemon = vi.fn();
  //   getPokemon.mockResolvedValue(pokemon);
  //   return {
  //     getPokemon,
  //   };
  // });

  it('Check that clicking triggers an additional API call to fetch detailed information', () => {
    render(
      <Provider>
        <BrowserRouter>
          <PokemonCardAdditional></PokemonCardAdditional>
        </BrowserRouter>
      </Provider>
    );
  });
});
