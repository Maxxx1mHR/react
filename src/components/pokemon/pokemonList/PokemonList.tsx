import { useContext } from 'react';

import { PokemonContext } from '../../context/PokemonContextProvider';
import { getPokemon } from '../../services/PokeService';
import PokemonBaseInfo from '../pokemonBaseInfo/PokemonBaseInfo';

export const PokemonList = () => {
  const {
    setPokemonFullInfo,
    searchParams,
    setSearchParams,
    pokemonList,
    isBreak,
  } = useContext(PokemonContext) || {};

  if (isBreak) throw Error('error!');

  return (
    <div className="pokemon">
      <h1 className="test">Test</h1>
      <ul className="pokemon__list">
        {pokemonList?.map((pokemon) => (
          <li
            data-testid="card-list"
            key={pokemon.id}
            className="pokemon__item"
            onClick={async () => {
              setPokemonFullInfo?.(await getPokemon(pokemon.name));
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
