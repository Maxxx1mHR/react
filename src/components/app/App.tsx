import MainPage from '../mainPage/MainPage';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import PokemonCard from '../pokemonCard/PokemonCard';
import { useState } from 'react';
import { IPokemon } from '../../types';

const App = () => {
  const [pokemonFullInfo, setPokemonFullInfo] = useState<IPokemon>();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <ErrorBoundary>
      <div className="app">
        {/* <MainPage></MainPage> */}
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                pokemonFullInfo={pokemonFullInfo}
                setPokemonFullInfo={setPokemonFullInfo}
                setSearchParams={setSearchParams}
                searchParams={searchParams}
              />
            }
          >
            <Route
              index
              element={
                <PokemonCard
                  pokemonFullInfo={pokemonFullInfo}
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
