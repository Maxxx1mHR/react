import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../app/App';
import { BrowserRouter } from 'react-router-dom';

describe('Tests for the Search component:', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(await screen.findByTestId('navigation')).toBeInTheDocument();
    expect(await screen.findByTestId('navigation')).toHaveTextContent('1');
    const nextButton = await screen.findByTestId('next-page');
    fireEvent.click(nextButton);

    expect(await screen.findByTestId('navigation')).toBeInTheDocument();
    expect(await screen.findByTestId('navigation')).toHaveTextContent('2');
    const prevButton = await screen.findByTestId('prev-page');
    fireEvent.click(prevButton);

    expect(await screen.findByTestId('navigation')).toBeInTheDocument();
    expect(await screen.findByTestId('navigation')).toHaveTextContent('1');
    const lastButton = await screen.findByTestId('last-page');
    fireEvent.click(lastButton);
    expect(await screen.findByTestId('navigation')).toBeInTheDocument();
    expect(await screen.findByTestId('navigation')).toHaveTextContent('162');

    const firstButton = await screen.findByTestId('first-page');
    fireEvent.click(firstButton);
    expect(await screen.findByTestId('navigation')).toBeInTheDocument();
    expect(await screen.findByTestId('navigation')).toHaveTextContent('1');
  });
});
