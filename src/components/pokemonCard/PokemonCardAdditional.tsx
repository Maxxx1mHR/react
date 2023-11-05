import { PuffLoader } from 'react-spinners';
import { IPokemon } from '../../types';

const PokemonCardAdditional = ({
  pokemonFullInfo,
  searchParams,
  isLoading,
}: {
  pokemonFullInfo: IPokemon | undefined;
  searchParams: URLSearchParams;
  isLoading: boolean;
}) => {
  return (
    <>
      <div
        className={
          searchParams
            ? 'pokemon-additional-info pokemon-additional-info_active'
            : 'pokemon-additional-info'
        }
      >
        {isLoading ? (
          <PuffLoader color="#ad5905" size={150} className="spinner" />
        ) : (
          <>
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PokemonCardAdditional;
