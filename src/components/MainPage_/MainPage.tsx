import { PuffLoader } from 'react-spinners';
import { SearchInput } from '../Search_/SearchInput';
import { PokemonList } from '../Pokemon/PokemonList/PokemonList';
import logo from '../../assets/img/logo.png';
import { useCallback, useEffect, useContext } from 'react';
import { IPokemon } from '../../types';
import { getAllPokemon, getPokemon } from '../Services_/PokeService';
import Navigation from '../Navigation_/Navigation';
import { Outlet } from 'react-router-dom';
import ItemPerPage from '../ItemPerPage_/ItemPerPage';
import BreakApp from '../BreakApp_/BreakApp';
import PokemonCard from '../Pokemon/PokemonCard/PokemonCard';
import { PokemonContext } from '../Context_/PokemonContextProvider';
import NotFoundMessage from '../NotFound_/NotFoundMessage';

export const MainPage = ({
  pokemonFullInfo,
  setPokemonFullInfo,
}: {
  pokemonFullInfo: IPokemon | undefined;
  setPokemonFullInfo: CallableFunction;
}) => {
  const {
    searchParams,
    isLoading,
    setIsLoading,
    setPokemonList,
    setInputValue,
    isNotFound,
    setIsNotFound,
    pokemonsPerPage,
    offset,
  } = useContext(PokemonContext) || {};

  const getLocalStorageSearchData = localStorage.getItem('pokemonQuery');
  const setLocalStorageSearchData = (localStorageValue: string = '') => {
    localStorage.setItem('pokemonQuery', localStorageValue);
  };

  const getPokemonAdditionalInfo = useCallback(async () => {
    if (searchParams?.get('details')) {
      setPokemonFullInfo?.(
        await getPokemon(String(searchParams?.get('details')))
      );
    }
  }, [searchParams, setPokemonFullInfo]);

  const getPokemons = useCallback(async () => {
    setIsLoading?.(true);
    setLocalStorageSearchData();
    try {
      const result = await getAllPokemon(offset || 0, pokemonsPerPage || 4);
      const allPokemons: IPokemon[] = [];
      await Promise.all(
        result.results.map(async (item: IPokemon) => {
          const tmp = await getPokemon(item.name);
          if (tmp) {
            allPokemons.push(tmp);
          }
        })
      );
      setPokemonList?.(allPokemons);
      if (!allPokemons.length) {
        setIsNotFound?.(true);
      }

      setIsLoading?.(false);
    } catch (err) {
      console.error(err);
    }
  }, [offset, pokemonsPerPage, setIsLoading, setIsNotFound, setPokemonList]);

  const searchPokemon = useCallback(
    async (inputValue: string | null | undefined) => {
      setIsLoading?.(true);
      setIsNotFound?.(false);
      if (inputValue === '' && !searchParams?.get('search')) {
        setIsLoading?.(false);
        return;
      } else if (inputValue === '' && searchParams?.get('search')) {
        setIsLoading?.(false);
        return getPokemons();
      }

      if (inputValue) {
        const input = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        setLocalStorageSearchData(input);
        try {
          const pokemon = await getPokemon(inputValue.toLowerCase());
          if (pokemon) {
            setPokemonFullInfo?.(pokemon);
          }
          setIsLoading?.(false);
        } catch (err) {
          setIsLoading?.(false);
          setIsNotFound?.(true);
          setLocalStorageSearchData();
          console.error(err);
        }
      }
    },
    [getPokemons, searchParams, setIsLoading, setIsNotFound, setPokemonFullInfo]
  );

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  useEffect(() => {
    getPokemonAdditionalInfo();
    getLocalStorageSearchData || searchParams?.get('search')
      ? (searchPokemon(
          getLocalStorageSearchData || searchParams?.get('search')
        ),
        setInputValue?.(getLocalStorageSearchData?.toString() || ''))
      : getPokemons();
  }, []);

  const notFound = Boolean(isNotFound) && <NotFoundMessage />;

  const loader = Boolean(isLoading) && (
    <PuffLoader
      color="#ad5905"
      size={150}
      data-testid="spinner"
      className="spinner"
    />
  );

  const searchInput = Boolean(!isNotFound) && (
    <SearchInput searchPokemon={searchPokemon} />
  );
  const singlePokemonView = Boolean(
    !isLoading && !isNotFound && searchParams?.get('search')
  ) && (
    <PokemonCard
      pokemonFullInfo={pokemonFullInfo}
      setPokemonFullInfo={setPokemonFullInfo}
    />
  );
  const item = Boolean(!searchParams?.get('search')) && <ItemPerPage />;

  const pokemon = Boolean(
    !isLoading && !isNotFound && !searchParams?.get('search')
  ) && (
    <>
      <PokemonList setPokemonFullInfo={setPokemonFullInfo} />
      <Navigation />
    </>
  );

  const additionInfo = Boolean(searchParams?.get('details')) && <Outlet />;
  const breakAppView = Boolean(!isNotFound || searchParams?.get('search')) && (
    <BreakApp />
  );

  return (
    <>
      <img src={logo} alt="pokemon logo" className="logo" />

      {notFound}
      <div>
        {breakAppView}
        {searchInput}
        {singlePokemonView}
        {item}
        {pokemon}
        {loader}
      </div>
      {additionInfo}
    </>
  );
};
