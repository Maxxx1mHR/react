import { MainPage } from '../MainPage/MainPage';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import PokemonCardAdditional from '../Pokemons/PokemonCardAdditional/PokemonCardAdditional';
import Page404 from '../NotFound/404';
import { PokemonContextProvider } from '../Context/PokemonContextProvider';
import { useState } from 'react';
import { IPokemon } from '../../types';

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
