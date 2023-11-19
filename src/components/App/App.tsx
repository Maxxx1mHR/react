import { MainPage } from '../MainPage/MainPage';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import Page404 from '../NotFound/404';
import { useState } from 'react';
import { IPokemon } from '../../types';
import PokemonCardAdditional from '../Pokemon/PokemonCardAdditional/PokemonCardAdditional';

const App = () => {
  // const [pokemonFullInfo, setPokemonFullInfo] = useState<IPokemon>();

  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
              // pokemonFullInfo={pokemonFullInfo}
              // setPokemonFullInfo={setPokemonFullInfo}
              />
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
