import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PokemonList } from './PokemonList';

describe('Pokemon list', () => {
  it('Count renders', () => {
    render(<PokemonList />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Testing vite'
    );
  });
});
