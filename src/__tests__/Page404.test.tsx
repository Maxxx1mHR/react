import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page404 from '../pages/404';

describe('Tests for the 404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(<Page404 />);
    expect(screen.getByText('Not Found 404')).toBeInTheDocument();
  });
});
