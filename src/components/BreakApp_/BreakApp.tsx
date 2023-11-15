import { useContext } from 'react';
import { PokemonContext } from '../Context_/PokemonContextProvider';

const BreakApp = () => {
  const { setIsBreak } = useContext(PokemonContext) || {};

  return (
    <button onClick={() => setIsBreak?.(true)} className="button button_danger">
      Break app
    </button>
  );
};

export default BreakApp;
