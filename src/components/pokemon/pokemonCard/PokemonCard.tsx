import { useContext } from 'react';
import { getPokemon } from '../../services/PokeService';
import PokemonBaseInfo from '../pokemonBaseInfo/PokemonBaseInfo';
import { PokemonContext } from '../../context/PokemonContextProvider';
const PokemonCard = () => {
  const { pokemonFullInfo, setPokemonFullInfo, searchParams, setSearchParams } =
    useContext(PokemonContext) || {};

  return (
    <div className="pokemon">
      <ul className="pokemon__list">
        <li
          className="pokemon__item"
          onClick={async () => {
            setPokemonFullInfo?.(
              await getPokemon(String(pokemonFullInfo?.name))
            );
            setSearchParams?.({
              search: searchParams?.get('search'),
              details: pokemonFullInfo?.name,
            });
          }}
        >
          <PokemonBaseInfo pokemonFullInfo={pokemonFullInfo} />
        </li>
      </ul>
    </div>
  );
};

export default PokemonCard;
