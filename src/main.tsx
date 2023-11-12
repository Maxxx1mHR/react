import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { PokemonContextProvider } from './components/Context/PokemonContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <PokemonContextProvider>
        <App />
      </PokemonContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
