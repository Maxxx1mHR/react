import { MainPage } from '../mainPage/MainPage';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import PokemonCardAdditional from '../pokemon/pokemonCardAdditional/PokemonCardAdditional';
import Page404 from '../notFound/404';
import { PokemonContextProvider } from '../context/PokemonContextProvider';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <PokemonContextProvider>
                <MainPage />
              </PokemonContextProvider>
            }
          >
            <Route index element={<PokemonCardAdditional />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
