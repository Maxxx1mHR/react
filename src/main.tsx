import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { PokemonContextProvider } from './components/context/PokemonContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <PokemonContextProvider>
        <App />
      </PokemonContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
