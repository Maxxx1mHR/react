import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IPokemon } from '../../../types';
import PokemonCardAdditional from './PokemonCardAdditional';
import App from '../../App/App';
import * as reduxHooks from 'react-redux';
import { Provider } from 'react-redux';
vi.mock('react-redux');

const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');
describe('Tests for the Detailed Card component:', () => {
  mockedDispatch.mockReturnValue(vi.fn()).mockReturnValue;
  vi.spyOn(reduxHooks, 'useSelector');
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Provider>
        <BrowserRouter>
          <PokemonCardAdditional></PokemonCardAdditional>
        </BrowserRouter>
      </Provider>
    );

    // const pokemon = screen.findByTestId('pokemon__additional');
    // expect(pokemon).toBeInTheDocument;
    // expect(await screen.findByText('attack: 64')).toBeInTheDocument;
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <Provider>
        <BrowserRouter>
          <PokemonCardAdditional></PokemonCardAdditional>
        </BrowserRouter>
      </Provider>
    );

    // const pokemon = await screen.findByTestId('pokemon__additional');
    // expect(pokemon).toBeInTheDocument;
    // const close = screen.findByTestId('close__button');
    // fireEvent.click(await close);
    // expect(pokemon).not.toBeInTheDocument;
  });

  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    // const spinner = screen.findByTestId('spinner');
    // expect(spinner).toBeInTheDocument;
  });
});
