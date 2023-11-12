import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import { IPokemon } from '../../../types';
import PokemonCardAdditional from '../pokemonCardAdditional/PokemonCardAdditional';

describe('Tests for the Search component:', () => {
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
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <BrowserRouter>
        <PokemonCard
          pokemonFullInfo={pokemonObj}
          setPokemonFullInfo={vi.fn()}
        ></PokemonCard>
      </BrowserRouter>
    );
    const pokemonList = await screen.findByTestId('pokemonTest');
    expect(pokemonList).toBeInTheDocument;
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <BrowserRouter>
        <PokemonCard
          pokemonFullInfo={pokemonObj}
          setPokemonFullInfo={vi.fn()}
        ></PokemonCard>
      </BrowserRouter>
    );
    const pokemonList = await screen.findByTestId('pokemonTest');
    expect(pokemonList).toBeInTheDocument;
    fireEvent.click(pokemonList);
    render(
      <BrowserRouter>
        <PokemonCardAdditional
          pokemonFullInfo={pokemonObj}
        ></PokemonCardAdditional>
      </BrowserRouter>
    );
  });
});
