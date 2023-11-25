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
const PokemonCard = ({
  pokemonsFullInfo,
}: {
  pokemonsFullInfo: IPokemon[];
}) => {
  const isBreak = useSelector((state: RootState) => state.loader.isBreak);
  if (isBreak) {
    throw Error('error!');
  }

  const inputValue = useSelector(
    (state: RootState) => state.inputValue.inputValue
  );

  const test = pokemonsFullInfo.map((pokemon) => {
    return <PokemonBaseInfo key={pokemon.id} pokemonFullInfo={pokemon} />;
  });

  return <>{test}</>;
};

export default PokemonCard;
