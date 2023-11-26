import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound/NotFound';
import mockRouter from 'next-router-mock';

describe('Tests for the NotFound Page component:', () => {
  it('Ensure that the NotFound page is displayed', async () => {
    render(<NotFound />);
    expect(screen.getByText('Pokemon Not Found')).toBeInTheDocument();
    const buttonSearch = await screen.findByTestId('not-found');
    fireEvent.click(buttonSearch);
    mockRouter.push('');
    expect(mockRouter.asPath).to.equal('/');
  });
});
