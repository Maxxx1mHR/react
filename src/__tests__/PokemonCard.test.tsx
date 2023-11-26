import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import PokemonCard from '../components/Pokemon/PokemonCard/PokemonCard';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { pokemons } from './mocks/__mocks';
import PokemonCardAdditional from '../components/Pokemon/PokemonCardAdditional/PokemonCardAdditional';

describe('Tests for the Card List component:', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    render(<PokemonCard pokemonsFullInfo={pokemons} />, {
      wrapper: MemoryRouterProvider,
    });
    const pokemonList = await screen.findAllByTestId('pokemon__item');
    expect(pokemonList).toHaveLength(2);
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    render(<PokemonCard pokemonsFullInfo={pokemons} />, {
      wrapper: MemoryRouterProvider,
    });
    const pokemonList = await screen.findAllByTestId('pokemon__item');
    expect(pokemonList).toBeInTheDocument;
    expect(screen.findByText('Abilities:')).toBeInTheDocument;
    expect(screen.findByText('Types:')).toBeInTheDocument;
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(<PokemonCard pokemonsFullInfo={pokemons} />, {
      wrapper: MemoryRouterProvider,
    });
    const pokemonList = await screen.findAllByTestId('pokemon__item');
    fireEvent.click(pokemonList[0]);
    expect(screen.findByTestId('pokemon__additional')).toBeInTheDocument;
  });

  it('Ensure that clicking the close button hides the component.', async () => {
    render(<PokemonCardAdditional pokemonsFullInfo={[pokemons[1]]} />, {
      wrapper: MemoryRouterProvider,
    });
    expect(screen.findByTestId('pokemon__additional')).toBeInTheDocument;
    const closeButton = await screen.findByTestId('close__button');
    fireEvent.click(closeButton);
    expect(await screen.findByTestId('pokemon__additional')).not
      .toBeInTheDocument;
  });
});
