import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import { store } from '../../state/store';

describe('Tests for the Pagination component:', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </BrowserRouter>
    );
    await vi.waitFor(() => expect(screen.findByTestId('navigation')));
    expect(window.location.search).toBeNull;
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
