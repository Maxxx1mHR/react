import { PuffLoader } from 'react-spinners';
import { SearchInput } from '../search/SearchInput';
import { PokemonList } from '../pokemon/pokemonList/PokemonList';
import logo from '../../assets/img/logo.png';
import { useCallback, useEffect, useContext } from 'react';
import { IPokemon } from '../../types';
import { getAllPokemon, getPokemon } from '../services/PokeService';
import Navigation from '../navigation/Navigation';
import NotFound from '../notFound/NotFound';
import { Outlet } from 'react-router-dom';
import ItemPerPage from '../itemPerPage/ItemPerPage';
import BreakApp from '../breakApp/BreakApp';
import PokemonCard from '../pokemon/pokemonCard/PokemonCard';
import { PokemonContext } from '../context/PokemonContextProvider';

export const MainPage = () => {
  const {
    setPokemonFullInfo,
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

      setIsLoading?.(false);
    } catch (err) {
      console.error(err);
    }
  }, [offset, pokemonsPerPage, setIsLoading, setPokemonList]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notFound = isNotFound ? <NotFound /> : null;

  const loading = isLoading ? (
    <PuffLoader color="#ad5905" size={150} className="spinner" />
  ) : null;

  const search = isNotFound ? null : (
    <SearchInput searchPokemon={searchPokemon} />
  );

  const singlePokemonView =
    !isLoading && !isNotFound && searchParams?.get('search') ? (
      <PokemonCard />
    ) : null;

  const item = searchParams?.get('search') ? null : <ItemPerPage />;

  const pokemon =
    !isLoading && !isNotFound && !searchParams?.get('search') ? (
      <>
        <PokemonList />
        <Navigation />
      </>
    ) : null;

  const additionInfo = searchParams?.get('details') ? <Outlet /> : null;
  const breakAppView =
    isNotFound || searchParams?.get('search') ? null : <BreakApp />;

  return (
    <>
      <img src={logo} alt="pokemon logo" className="logo" />

      {notFound}
      <div>
        {breakAppView}
        {search}
        {singlePokemonView}
        {item}
        {pokemon}
        {loading}
      </div>
      {additionInfo}
    </>
  );
};
