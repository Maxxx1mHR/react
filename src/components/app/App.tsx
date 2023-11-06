import MainPage from '../mainPage/MainPage';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { IPokemon } from '../../types';
import PokemonCardAdditional from '../pokemon/pokemonCardAdditional/PokemonCardAdditional';

const App = () => {
  const [pokemonFullInfo, setPokemonFullInfo] = useState<IPokemon>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                setPokemonFullInfo={setPokemonFullInfo}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                pokemonFullInfo={pokemonFullInfo}
              />
            }
          >
            <Route
              index
              element={
                <PokemonCardAdditional
                  pokemonFullInfo={pokemonFullInfo}
                  searchParams={searchParams}
                  isLoading={isLoading}
                  setSearchParams={setSearchParams}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
