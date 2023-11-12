import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../app/App';
import { MemoryRouter } from 'react-router-dom';

describe('Tests for the 404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/non-existentPage']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
