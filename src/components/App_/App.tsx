import { MainPage } from '../MainPage_/MainPage';
import ErrorBoundary from '../ErrorBoundary_/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import Page404 from '../NotFound_/404';
import { PokemonContextProvider } from '../Context_/PokemonContextProvider';
import { useState } from 'react';
import { IPokemon } from '../../types';
import PokemonCardAdditional from '../Pokemon/PokemonCardAdditional/PokemonCardAdditional';

const App = () => {
  const [pokemonFullInfo, setPokemonFullInfo] = useState<IPokemon>();

  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <PokemonContextProvider>
                <MainPage
                  pokemonFullInfo={pokemonFullInfo}
                  setPokemonFullInfo={setPokemonFullInfo}
                />
              </PokemonContextProvider>
            }
          >
            <Route
              index
              element={
                <PokemonCardAdditional pokemonFullInfo={pokemonFullInfo} />
              }
            />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
