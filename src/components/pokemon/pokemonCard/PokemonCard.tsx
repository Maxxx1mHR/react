import { IPokemon } from '../../../types';
import { getPokemon } from '../../services/PokeService';
import PokemonBaseInfo from '../pokemonBaseInfo/PokemonBaseInfo';
const PokemonCard = ({
  pokemonFullInfo,
  searchParams,
  setSearchParams,
  setPokemonFullInfo,
}: {
  pokemonFullInfo: IPokemon | undefined;
  searchParams: URLSearchParams;
  setSearchParams: CallableFunction;
  setPokemonFullInfo: CallableFunction;
}) => {
  return (
    <div className="pokemon">
      <ul className="pokemon__list">
        <li
          className="pokemon__item"
          onClick={async () => {
            setPokemonFullInfo(await getPokemon(String(pokemonFullInfo?.name)));
            setSearchParams({
              search: searchParams.get('search'),
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
