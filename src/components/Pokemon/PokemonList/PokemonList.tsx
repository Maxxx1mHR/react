import { useContext } from 'react';

import { PokemonContext } from '../../Context_/PokemonContextProvider';
import { getPokemon } from '../../Services_/PokeService';
import PokemonBaseInfo from '../PokemonBaseInfo/PokemonBaseInfo';

export const PokemonList = ({
  setPokemonFullInfo,
}: {
  setPokemonFullInfo: CallableFunction;
}) => {
  const { searchParams, setSearchParams, pokemonList, isBreak } =
    useContext(PokemonContext) || {};

  if (isBreak) {
    throw Error('error!');
  }

  return (
    <div className="pokemon">
      <ul className="pokemon__list">
        {pokemonList?.map((pokemon) => (
          <li
            data-testid="card-list"
            key={pokemon.id}
            className="pokemon__item"
            onClick={async () => {
              try {
                setPokemonFullInfo?.(await getPokemon(pokemon.name));
              } catch (err) {
                console.error(err);
              }
              setSearchParams?.({
                page: searchParams?.get('page') || 1,
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
