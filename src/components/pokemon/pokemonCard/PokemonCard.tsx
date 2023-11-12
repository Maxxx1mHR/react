import { useContext } from 'react';
import { getPokemon } from '../../services/PokeService';
import PokemonBaseInfo from '../pokemonBaseInfo/PokemonBaseInfo';
import { PokemonContext } from '../../context/PokemonContextProvider';
import { IPokemon } from '../../../types';
const PokemonCard = ({
  pokemonFullInfo,
  setPokemonFullInfo,
}: {
  pokemonFullInfo: IPokemon | undefined;
  setPokemonFullInfo: CallableFunction;
}) => {
  const { searchParams, setSearchParams } = useContext(PokemonContext) || {};

  return (
    <div className="pokemon">
      <ul className="pokemon__list">
        <li
          data-testid="pokemonTest"
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
