import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound/NotFound';
import mockRouter from 'next-router-mock';

describe('Tests for the 404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    render(<NotFound />);
    screen.debug();
    expect(screen.getByText('Pokemon Not Found')).toBeInTheDocument();
    const buttonSearch = await screen.findByTestId('not-found');
    fireEvent.click(buttonSearch);
    mockRouter.push('');
    expect(mockRouter.asPath).to.equal('/');
  });
});
