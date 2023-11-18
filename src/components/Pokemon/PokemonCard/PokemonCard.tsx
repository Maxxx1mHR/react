import { useContext } from 'react';
import { getPokemon } from '../../Services/PokeService';
import PokemonBaseInfo from '../PokemonBaseInfo/PokemonBaseInfo';
import { IPokemon } from '../../../types';
import { pokemonsApi } from '../../../state/pokemon/pokemonsApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
const PokemonCard = ({ pokemonName }: { pokemonName: string }) =>
  //   {
  //   pokemonFullInfo,
  //   setPokemonFullInfo,
  // }: {
  //   pokemonFullInfo: IPokemon | undefined;
  //   setPokemonFullInfo: CallableFunction;
  // }
  {
    // const { searchParams, setSearchParams } = useContext(PokemonContext) || {};

    console.log('GELLO');
    const getLocalStorageSearchData = localStorage.getItem('pokemonQuery');

    const inputValue = useSelector(
      (state: RootState) => state.inputValue.inputValue
    );
    console.log('input', inputValue);

    const { data: pokemon } = pokemonsApi.useGetPokemonQuery(
      pokemonName || inputValue || String(getLocalStorageSearchData)
    );

    // const pokemon = useSelector((state: RootState) => state.pokemon.pokemon);

    console.log('mmmm', pokemon);

    return (
      <li
        data-testid="pokemonTest"
        className="pokemon__item"
        onClick={async () => {
          console.log('test');
          // setPokemonFullInfo?.(
          //   await getPokemon(String(pokemonFullInfo?.name))
          // );
          // setSearchParams?.({
          //   search: searchParams?.get('search'),
          //   details: pokemonFullInfo?.name,
          // });
        }}
      >
        <PokemonBaseInfo pokemonFullInfo={pokemon} />
      </li>
    );
  };

export default PokemonCard;
