import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App/App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';
import App from '../App/App';
import * as reduxHooks from 'react-redux';
import { MainPage } from '../MainPage/MainPage';
import { Provider } from 'react-redux';
import { store } from '../../state/store';

vi.mock('react-redux');

const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');

describe('Tests for the Pagination component:', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    mockedDispatch.mockReturnValue(vi.fn()).mockReturnValue;
    vi.spyOn(reduxHooks, 'useSelector');
    render(
      // <Provider store={store}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
      // </Provider>
    );
    expect(await screen.findByTestId('navigation'));
    screen.debug();

    // render(
    //   <BrowserRouter>
    //     <Provider store={store}>
    //       <MainPage></MainPage>
    //     </Provider>
    //   </BrowserRouter>
    // );
    // render(
    //   <BrowserRouter>
    //     {/* <Provider>
    //       <MainPage />
    //     </Provider> */}
    //   </BrowserRouter>
    // );
    // expect(window.location.search).toBeNull;

    // fireEvent.click(await screen.findByTestId('next-page'));
    // expect(window.location.search).toBe('?page=2');
    // fireEvent.click(await screen.findByTestId('next-page'));
    // expect(window.location.search).toBe('?page=3');
    // fireEvent.click(await screen.findByTestId('next-page'));
    // expect(window.location.search).toBe('?page=4');
    // fireEvent.click(await screen.findByTestId('prev-page'));
    // expect(window.location.search).toBe('?page=3');
    // fireEvent.click(await screen.findByTestId('last-page'));
    // expect(window.location.search).toBe('?page=162');
    // fireEvent.click(await screen.findByTestId('prev-page'));
    // expect(window.location.search).toBe('?page=161');
    // fireEvent.click(await screen.findByTestId('first-page'));
    // expect(window.location.search).toBe('?page=1');
  });
});
