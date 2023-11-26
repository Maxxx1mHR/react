import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../components/Search/SearchInput';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

describe('Tests for the Search component:', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage. Check that the component retrieves the value from the local storage', async () => {
    render(<SearchInput inputValue="" />, {
      wrapper: MemoryRouterProvider,
    });
    const inputSearch = (await screen.findByTestId(
      'pokemon-search-input'
    )) as HTMLInputElement;

    expect(inputSearch.value).toBe('');
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(localStorage.getItem('pokemonQuery')).toBe(null);
    mockRouter.push('');
    expect(mockRouter.asPath).to.equal('/');

    fireEvent.change(inputSearch, { target: { value: 'weedle' } });
    expect(inputSearch.value).toBe('weedle');

    fireEvent.submit(screen.getByTestId('searchForm'));
    expect(localStorage.setItem('pokemonQuery', inputSearch.value));
    expect(localStorage.getItem('pokemonQuery')).toBe('weedle');
    mockRouter.push(`?search=${inputSearch.value}`);
    expect(mockRouter.asPath).to.equal('/?search=weedle');
  });
});
