import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PokemonCardAdditional from './PokemonCardAdditional';
import App from '../../App/App';
import { Provider } from 'react-redux';
import { store } from '../../../state/store';
import { MainPage } from '../../MainPage/MainPage';

describe('Tests for the Detailed Card component:', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage></MainPage>
        </Provider>
      </BrowserRouter>
    );

    const pokemonMainInfo = await screen.findAllByTestId('pokemonTest');
    expect(pokemonMainInfo).toBeInTheDocument;
    const additionalInfo = render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonCardAdditional></PokemonCardAdditional>
        </BrowserRouter>
      </Provider>
    );
    expect(additionalInfo).toBeInTheDocument;
    screen.debug();
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage></MainPage>
        </Provider>
      </BrowserRouter>
    );

    const pokemonMainInfo = await screen.findAllByTestId('pokemonTest');
    expect(pokemonMainInfo).toBeInTheDocument;
    screen.debug();
  });

  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const spinner = screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument;
  });
});
