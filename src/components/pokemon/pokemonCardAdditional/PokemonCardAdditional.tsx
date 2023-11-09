import { PuffLoader } from 'react-spinners';
import PokemonBaseInfo from '../pokemonBaseInfo/PokemonBaseInfo';

import { useContext } from 'react';
import { PokemonContext } from '../../context/PokemonContextProvider';

const PokemonCardAdditional = () => {
  const { pokemonFullInfo, searchParams, setSearchParams, isLoading } =
    useContext(PokemonContext) || {};

  const wrapperClass = searchParams?.get('details')
    ? 'pokemon-additional-info pokemon-additional-info_active'
    : 'pokemon-additional-info';

  const setUrlParams = () => {
    if (searchParams?.get('search')) {
      setSearchParams?.({
        search: searchParams.get('search'),
      });
    } else if (searchParams?.get('page')) {
      setSearchParams?.({ page: searchParams?.get('page') });
    }
  };

  return (
    <div className={wrapperClass}>
      <div className={'pokemon-additional__wrapper'}>
        {isLoading ? (
          <PuffLoader color="#ad5905" size={150} className="spinner" />
        ) : (
          <>
            <span
              className="pokemon__close-menu"
              onClick={() => setUrlParams()}
            >
              Close
            </span>

            <li className="pokemon__item">
              <div className="pokemon__info">
                <PokemonBaseInfo pokemonFullInfo={pokemonFullInfo} />
                <ul className="pokemon-stats__list">
                  <span className="pokemon__info-header">Stats:</span>
                  {pokemonFullInfo?.stats.map(({ base_stat, stat }, index) => (
                    <li key={index}>
                      {index + 1 < pokemonFullInfo?.stats.length
                        ? stat.name + ': ' + base_stat + ','
                        : stat.name + ': ' + base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </>
        )}
      </div>
      <div className="pokemon__overlay" onClick={() => setUrlParams()}></div>
    </div>
  );
};

export default PokemonCardAdditional;
