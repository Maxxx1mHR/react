import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemPerPage from '../components/ItemPerPage/ItemPerPage';

describe('Tests for the Item Page component:', () => {
  it('Check that value change when user change count items per page', async () => {
    render(<ItemPerPage />);
    expect(screen.getByText('Choose item per page')).toBeInTheDocument();
    fireEvent.change(await screen.getByTestId('select'), {
      target: { value: 2 },
    });
    expect((screen.getByText('16') as HTMLOptionElement).selected).toBeTruthy;
  });
});
