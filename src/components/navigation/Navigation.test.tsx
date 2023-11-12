import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../app/App';
import { BrowserRouter } from 'react-router-dom';

describe('Tests for the Pagination component:', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(window.location.search).toBeNull;
    expect(await screen.findByTestId('navigation')).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId('next-page'));
    expect(window.location.search).toBe('?page=2');
    fireEvent.click(await screen.findByTestId('next-page'));
    expect(window.location.search).toBe('?page=3');
    fireEvent.click(await screen.findByTestId('next-page'));
    expect(window.location.search).toBe('?page=4');
    fireEvent.click(await screen.findByTestId('prev-page'));
    expect(window.location.search).toBe('?page=3');
    fireEvent.click(await screen.findByTestId('last-page'));
    expect(window.location.search).toBe('?page=162');
    fireEvent.click(await screen.findByTestId('prev-page'));
    expect(window.location.search).toBe('?page=161');
    fireEvent.click(await screen.findByTestId('first-page'));
    expect(window.location.search).toBe('?page=1');
  });
});
