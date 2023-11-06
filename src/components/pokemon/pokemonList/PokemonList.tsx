import { IPokemon } from '../../../types/index';
import { getPokemon } from '../../services/PokeService';
import PokemonBaseInfo from '../pokemonBaseInfo/PokemonBaseInfo';

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
      <ul className="pokemon__list">
        {pokemonList.map((pokemon) => (
          <li
            key={pokemon.id}
            className="pokemon__item"
            onClick={async () => {
              setPokemonFullInfo(await getPokemon(pokemon.name));
              setSearchParams({
                page: searchParams.get('page') || 1,
                details: pokemon.name,
              });
            }}
          >
            <div className="pokemon__info">
              <PokemonBaseInfo pokemonFullInfo={pokemon} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
