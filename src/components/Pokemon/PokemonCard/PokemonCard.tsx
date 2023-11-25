import PokemonBaseInfo from '../PokemonBaseInfo/PokemonBaseInfo';
import { IPokemon } from '@/types';
import { useRouter } from 'next/router';
const PokemonCard = ({
  pokemonsFullInfo,
}: {
  pokemonsFullInfo: IPokemon[];
}) => {
  const router = useRouter();
  const pokemon = pokemonsFullInfo.map((pokemon) => {
    return (
      <li
        key={pokemon.id}
        className="pokemon__item"
        onClick={() => {
          router.query.details = `${pokemon?.name}`;
          router.push(router);
        }}
      >
        <PokemonBaseInfo key={pokemon.id} pokemonFullInfo={pokemon} />
      </li>
    );
  });

  return <>{pokemon}</>;
};

export default PokemonCard;
