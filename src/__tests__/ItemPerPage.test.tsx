import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemPerPage from '../components/ItemPerPage/ItemPerPage';

describe('Tests for the 404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    render(<ItemPerPage />);
    expect(screen.getByText('Choose item per page')).toBeInTheDocument();
    fireEvent.change(await screen.getByTestId('select'), {
      target: { value: 2 },
    });
    expect((screen.getByText('16') as HTMLOptionElement).selected).toBeTruthy;
  });
});
