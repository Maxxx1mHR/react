import { useEffect } from 'react';
import PokemonBaseInfo from '../PokemonBaseInfo/PokemonBaseInfo';
import { pokemonsApi } from '../../../state/slices/pokemonsApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
// import { useSearchParams } from 'react-router-dom';
import { setPokemonName } from '../../../state/slices/pokemonSlice';
import {
  setDetailsLoading,
  setMainLoading,
  setNotFound,
} from '../../../state/slices/loaderSlice';
import { PuffLoader } from 'react-spinners';
import { IPokemon } from '@/types';
import { useRouter } from 'next/router';
const PokemonCard = ({
  pokemonsFullInfo,
}: {
  pokemonsFullInfo: IPokemon[];
}) => {
  const isBreak = useSelector((state: RootState) => state.loader.isBreak);
  if (isBreak) {
    throw Error('error!');
  }
  const router = useRouter();

  console.log('single Pok', pokemonsFullInfo);
  const pokemon = pokemonsFullInfo.map((pokemon) => {
    return (
      <li
        key={pokemon.id}
        className="pokemon__item"
        onClick={() => {
          // console.log(pokemon.name);
          router.query.details = `${pokemon?.name}`;
          router.push(router);
        }}
      >
        <PokemonBaseInfo key={pokemon.id} pokemonFullInfo={pokemon} />;
      </li>
    );
  });

  return <>{pokemon}</>;
};

export default PokemonCard;
