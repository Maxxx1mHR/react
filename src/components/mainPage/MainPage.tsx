import { PuffLoader } from 'react-spinners';

import { SearchInput } from '../search/SearchInput';
import { PokemonList } from '../pokemon/pokemonList/PokemonList';

import logo from '../../assets/img/logo.png';
import { useCallback, useEffect, useState } from 'react';
import { IPokemon } from '../../types';
import { getAllPokemon, getPokemon } from '../services/PokeService';
import Navigation from '../navigation/Navigation';
import NotFound from '../notFound/NotFound';
import { Outlet } from 'react-router-dom';
import ItemPerPage from '../itemPerPage/ItemPerPage';
import BreakApp from '../breakApp/BreakApp';
import PokemonCard from '../pokemon/pokemonCard/PokemonCard';

const MainPage = ({
  setPokemonFullInfo,
  searchParams,
  setSearchParams,
  isLoading,
  setIsLoading,
  pokemonFullInfo,
}: {
  setPokemonFullInfo: CallableFunction;
  searchParams: URLSearchParams;
  setSearchParams: CallableFunction;
  isLoading: boolean;
  setIsLoading: CallableFunction;
  pokemonFullInfo: IPokemon | undefined;
}) => {
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [isBreak, setIsBreak] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const [pokemonsPerPage, setPokemonPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );
  const [offset, setOffset] = useState(
    searchParams.get('page')
      ? (Number(searchParams.get('page')) - 1) * pokemonsPerPage
      : 0
  );

  const getLocalStorageSearchData = localStorage.getItem('pokemonQuery');
  const setLocalStorageSearchData = (localStorageValue: string = '') => {
    localStorage.setItem('pokemonQuery', localStorageValue);
  };

  const getPokemonAdditionalInfo = useCallback(async () => {
    if (searchParams.get('details')) {
      setPokemonFullInfo(await getPokemon(String(searchParams.get('details'))));
    }
  }, [searchParams, setPokemonFullInfo]);

  const getPokemons = useCallback(async () => {
    setIsLoading(true);
    setLocalStorageSearchData();
    try {
      const result = await getAllPokemon(offset, pokemonsPerPage);
      const allPokemons: IPokemon[] = [];
      await Promise.all(
        result.results.map(async (item: IPokemon) => {
          const tmp = await getPokemon(item.name);
          if (tmp) {
            allPokemons.push(tmp);
          }
        })
      );
      setPokemonList(allPokemons);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [offset, pokemonsPerPage, setIsLoading]);

  const searchPokemon = useCallback(
    async (inputValue: string | null) => {
      setIsLoading(true);
      setIsNotFound(false);
      if (inputValue === '' && !searchParams.get('search')) {
        setIsLoading(false);
        return;
      } else if (inputValue === '' && searchParams.get('search')) {
        setIsLoading(false);
        return getPokemons();
      }

      if (inputValue) {
        const input = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        setLocalStorageSearchData(input);
        try {
          const pokemon = await getPokemon(inputValue.toLowerCase());
          if (pokemon) {
            setPokemonFullInfo(pokemon);
          }
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          setIsNotFound(true);
          setLocalStorageSearchData();
          console.error(err);
        }
      }
    },
    [getPokemons, searchParams, setIsLoading, setPokemonFullInfo]
  );

  useEffect(() => {
    getPokemonAdditionalInfo();
    getLocalStorageSearchData || searchParams.get('search')
      ? (searchPokemon(getLocalStorageSearchData || searchParams.get('search')),
        setInputValue(getLocalStorageSearchData?.toString() || ''))
      : getPokemons();
  }, [
    getLocalStorageSearchData,
    getPokemons,
    getPokemonAdditionalInfo,
    searchParams,
    searchPokemon,
  ]);

  const notFound = isNotFound ? <NotFound /> : null;

  const loading = isLoading ? (
    <PuffLoader color="#ad5905" size={150} className="spinner" />
  ) : null;

  const search = isNotFound ? null : (
    <SearchInput
      searchPokemon={searchPokemon}
      inputValue={inputValue}
      setInputValue={setInputValue}
      setPokemonPerPage={setPokemonPerPage}
      setSearchParams={setSearchParams}
      currentPage={currentPage}
    />
  );

  const singlePokemonView =
    (!isLoading || !NotFound) && searchParams.get('search') ? (
      <PokemonCard
        pokemonFullInfo={pokemonFullInfo}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setPokemonFullInfo={setPokemonFullInfo}
      />
    ) : null;

  const item = searchParams.get('search') ? null : (
    <ItemPerPage
      setPokemonPerPage={setPokemonPerPage}
      setSearchParams={setSearchParams}
      setCurrentPage={setCurrentPage}
      setOffset={setOffset}
    />
  );

  const pokemon =
    (!isLoading || !NotFound) && !searchParams.get('search') ? (
      <>
        <PokemonList
          pokemonList={pokemonList}
          isBreak={isBreak}
          setPokemonFullInfo={setPokemonFullInfo}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Navigation
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pokemonsPerPage={pokemonsPerPage}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </>
    ) : null;

  const additionInfo = searchParams.get('details') ? <Outlet /> : null;
  const breakAppView =
    isNotFound || searchParams.get('search') ? null : (
      <BreakApp setIsBreak={setIsBreak} />
    );

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

export default MainPage;
