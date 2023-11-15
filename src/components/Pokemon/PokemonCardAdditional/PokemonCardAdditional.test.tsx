import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IPokemon } from '../../../types';
import PokemonCardAdditional from './PokemonCardAdditional';
import App from '../../App_/App';

describe('Tests for the Detailed Card component:', () => {
  const pokemonObj: IPokemon = {
    id: 5,
    name: 'charmeleon',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg',
    abilities: [
      {
        ability: {
          name: 'blaze',
        },
      },
      {
        ability: {
          name: 'solar-power',
        },
      },
    ],
    types: [
      {
        type: {
          name: 'fire',
        },
      },
    ],
    stats: [
      {
        base_stat: 64,
        stat: {
          name: 'attack',
        },
      },
    ],
  };
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <BrowserRouter>
        <PokemonCardAdditional
          pokemonFullInfo={pokemonObj}
        ></PokemonCardAdditional>
      </BrowserRouter>
    );

    const pokemon = screen.findByTestId('pokemon__additional');
    expect(pokemon).toBeInTheDocument;
    expect(await screen.findByText('attack: 64')).toBeInTheDocument;
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <BrowserRouter>
        <PokemonCardAdditional
          pokemonFullInfo={pokemonObj}
        ></PokemonCardAdditional>
      </BrowserRouter>
    );

    const pokemon = await screen.findByTestId('pokemon__additional');
    expect(pokemon).toBeInTheDocument;
    const close = screen.findByTestId('close__button');
    fireEvent.click(await close);
    expect(pokemon).not.toBeInTheDocument;
  });

  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const spinner = screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument;
  });
});
