import { useContext, useEffect } from 'react';
import { getPokemon } from '../../Services/PokeService';
import PokemonBaseInfo from '../PokemonBaseInfo/PokemonBaseInfo';
import { IPokemon } from '../../../types';
import { pokemonsApi } from '../../../state/slices/pokemonsApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { useSearchParams } from 'react-router-dom';
import { setPokemonName } from '../../../state/slices/pokemonSlice';
import {
  setDetailsLoading,
  setMainLoading,
  setNotFound,
  setSearchLoading,
} from '../../../state/slices/loaderSlice';
import { PuffLoader } from 'react-spinners';
const PokemonCard = ({ pokemonName }: { pokemonName: string }) =>
  //   {
  //   pokemonFullInfo,
  //   setPokemonFullInfo,
  // }: {
  //   pokemonFullInfo: IPokemon | undefined;
  //   setPokemonFullInfo: CallableFunction;
  // }
  {
    const { isBreak } = useSelector((state: RootState) => state.loader);
    if (isBreak) {
      throw Error('error!');
    }
    // const { searchParams, setSearchParams } = useContext(PokemonContext) || {};

    const dispatch = useDispatch();

    // dispatch(setMainLoading(true));

    const [searchParams, setSearchParams] = useSearchParams();

    const getLocalStorageSearchData = localStorage.getItem('pokemonQuery');

    const inputValue = useSelector(
      (state: RootState) => state.inputValue.inputValue
    );

    const {
      data: pokemon,
      isSuccess,
      error,
    } = pokemonsApi.useGetPokemonQuery(
      pokemonName || inputValue || String(getLocalStorageSearchData)
    );

    // const pokemon = useSelector((state: RootState) => state.pokemon.pokemon);

    useEffect(() => {
      if (isSuccess) {
        console.log('test');
        dispatch(setMainLoading(false));
        // dispatch(setSearchLoading(false));
      }
      if (error) {
        console.log('er');
        dispatch(setNotFound(true));
      }
    }, [dispatch, error, isSuccess]);

    const { mainLoader } = useSelector((state: RootState) => state.loader);

    return (
      <>
        {mainLoader ? (
          <PuffLoader
            color="#ad5905"
            size={150}
            data-testid="spinner"
            className="spinner"
          />
        ) : (
          <li
            data-testid="pokemonTest"
            className="pokemon__item"
            onClick={async () => {
              if (pokemon) {
                dispatch(setPokemonName(pokemon.name));
                // dispatch(setSearchLoading(true));
                dispatch(setDetailsLoading(true));
              }
              if (searchParams.get('search')) {
                setSearchParams?.({
                  search: String(searchParams?.get('search')),
                  details: String(pokemon?.name),
                });
              } else {
                setSearchParams?.({
                  page: String(searchParams.get('page') || 1),
                  details: pokemonName,
                });
              }
            }}
          >
            <PokemonBaseInfo pokemonFullInfo={pokemon} />
          </li>
        )}
      </>
    );
  };

export default PokemonCard;
