import { PuffLoader } from 'react-spinners';
import { IPokemon } from '../../types';

const PokemonCardAdditional = ({
  pokemonFullInfo,
  searchParams,
  isLoading,
  setSearchParams,
}: {
  pokemonFullInfo: IPokemon | undefined;
  searchParams: URLSearchParams;
  isLoading: boolean;
  setSearchParams: CallableFunction;
}) => {
  const wrapperClass = searchParams.get('details')
    ? 'pokemon-additional-info pokemon-additional-info_active'
    : 'pokemon-additional-info';

  return (
    <div className={searchParams.get('details') ? wrapperClass : ''}>
      <div
        className={
          searchParams.get('details') ? 'pokemon-additional__wrapper' : ''
        }
      >
        {isLoading ? (
          <PuffLoader color="#ad5905" size={150} className="spinner" />
        ) : (
          <>
            {searchParams.get('details') ? (
              <span
                className="pokemon__close-menu"
                onClick={() =>
                  setSearchParams({ page: searchParams.get('page') })
                }
              >
                Close
              </span>
            ) : null}
            <li className="pokemon__item">
              <h2 className="pokemon__name">{pokemonFullInfo?.name}</h2>
              <div className="pokemon__wrapper">
                <img
                  src={pokemonFullInfo?.url}
                  alt={pokemonFullInfo?.name}
                  className="pokemon__img"
                />
              </div>
              <div className="pokemon__info">
                <ul className="pokemon-ability__list">
                  <span className="pokemon__info-header">Abilities:</span>
                  {pokemonFullInfo?.abilities.map(({ ability }, index) => (
                    <li key={index}>
                      {index < pokemonFullInfo?.abilities.length - 1
                        ? ability.name + ','
                        : ability.name}
                    </li>
                  ))}
                </ul>
                <ul className="pokemon-type__list">
                  <span className="pokemon__info-header">Types:</span>
                  {pokemonFullInfo?.types.map(({ type }, index) => (
                    <li key={index}>
                      {index + 1 < pokemonFullInfo?.types.length
                        ? type.name + ','
                        : type.name}
                    </li>
                  ))}
                </ul>
                {searchParams.get('details') ? (
                  <ul className="pokemon-stats__list">
                    <span className="pokemon__info-header">Stats:</span>
                    {pokemonFullInfo?.stats.map(
                      ({ base_stat, stat }, index) => (
                        <li key={index}>
                          {index + 1 < pokemonFullInfo?.stats.length
                            ? stat.name + ': ' + base_stat + ','
                            : stat.name + ': ' + base_stat}
                        </li>
                      )
                    )}
                  </ul>
                ) : null}
              </div>
            </li>
          </>
        )}
      </div>
      <div
        className={searchParams.get('details') ? 'pokemon__overlay' : ''}
        onClick={() => setSearchParams({ page: searchParams.get('page') })}
      ></div>
    </div>
  );
};

export default PokemonCardAdditional;
