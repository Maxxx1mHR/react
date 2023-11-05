import { IPokemon } from '../../types/index';
import { getPokemon } from '../services/PokeService';

export const PokemonList = ({
  pokemonList,
  isBreak,
  setPokemonFullInfo,
  searchParams,
  setSearchParams,
}: {
  pokemonList: IPokemon[];
  isBreak: boolean;
  setPokemonFullInfo: CallableFunction;
  searchParams: URLSearchParams;
  setSearchParams: CallableFunction;
}) => {
  if (isBreak) throw Error('error!');

  return (
    <div className="pokemon">
      <ul
        className="pokemon__list"
        onClick={() => {
          setSearchParams({
            page: searchParams.get('page'),
          });
        }}
      >
        {pokemonList.map(({ id, abilities, name, url, types }) => (
          <li
            key={id}
            className="pokemon__item"
            onClick={async () => {
              setPokemonFullInfo(await getPokemon(name));
              setSearchParams({
                page: searchParams.get('page') || 1,
                details: name,
              });
            }}
          >
            <h2 className="pokemon__name">{name}</h2>
            <div className="pokemon__wrapper">
              <img src={url} alt={name} className="pokemon__img" />
            </div>
            <div className="pokemon__info">
              <ul className="pokemon-ability__list">
                <span className="pokemon__info-header">Abilities:</span>
                {abilities.map(({ ability }, index) => (
                  <li key={index}>
                    {index < abilities.length - 1
                      ? ability.name + ','
                      : ability.name}
                  </li>
                ))}
              </ul>
              <ul className="pokemon-type__list">
                <span className="pokemon__info-header">Types:</span>
                {types.map(({ type }, index) => (
                  <li key={index}>
                    {index + 1 < types.length ? type.name + ',' : type.name}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
