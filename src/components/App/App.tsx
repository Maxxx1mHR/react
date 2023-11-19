import { MainPage } from '../MainPage/MainPage';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import Page404 from '../NotFound/404';
import PokemonCardAdditional from '../Pokemon/PokemonCardAdditional/PokemonCardAdditional';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<PokemonCardAdditional />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
