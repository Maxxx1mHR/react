import { PuffLoader } from 'react-spinners';

import { SearchInput } from '../search/SearchInput';
import { PokemonList } from '../itemList/PokemonList';

import logo from '../../assets/img/logo.png';
import { useCallback, useEffect, useState } from 'react';
import { IPokemon } from '../../types';
import PokeService from '../services/PokeService';
import Navigation from '../navigation/Navigation';
import NotFound from '../notFound/NotFound';
import { Outlet } from 'react-router-dom';
import ItemPerPage from '../itemPerPage/ItemPerPage';
import PokemonCard from '../pokemonCard/PokemonCard';
import BreakApp from '../breakApp/BreakApp';

const pokemonService = new PokeService();

const MainPage = ({
  // pokemonFullInfo,
  setPokemonFullInfo,
  searchParams,
  setSearchParams,
  isLoading,
  setIsLoading,
}: {
  pokemonFullInfo: IPokemon | undefined;
  setPokemonFullInfo: CallableFunction;
  searchParams: URLSearchParams;
  setSearchParams: CallableFunction;
  isLoading: boolean;
  setIsLoading: CallableFunction;
}) => {
  const [singlePokemon, setSinglePokemon] = useState<IPokemon>();
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);

  const [inputValue, setInputValue] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  // const [searchParams, setSearchParams] = useSearchParams();
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

  const getPokemon = useCallback(
    async (name: string) => {
      setIsLoading(true);
      try {
        return pokemonService.getPokemonByName(name).then((res) => {
          return {
            id: res.id,
            name: res.name,
            url: res.sprites.other.dream_world.front_default,
            abilities: res.abilities,
            types: res.types,
          };
        });
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    },
    [setIsLoading]
  );

  const getPokemons = useCallback(async () => {
    setLocalStorageSearchData();
    try {
      const result = await pokemonService.getAllPokemon(
        offset,
        pokemonsPerPage
      );
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
  }, [getPokemon, offset, pokemonsPerPage, setIsLoading]);

  const searchPokemon = useCallback(
    async (inputValue: string | null) => {
      setIsNotFound(false);
      if (inputValue === '' && !searchParams.get('search')) {
        return;
      } else if (inputValue === '' && searchParams.get('search')) {
        return getPokemons();
      }

      if (inputValue) {
        const input = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        setLocalStorageSearchData(input);

        try {
          const tmp = await getPokemon(inputValue.toLowerCase());

          if (tmp) {
            setSinglePokemon(tmp);
            // setPokemonList([tmp]);
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
    [getPokemon, getPokemons, searchParams, setIsLoading]
  );

  useEffect(() => {
    getLocalStorageSearchData || searchParams.get('search')
      ? (searchPokemon(getLocalStorageSearchData || searchParams.get('search')),
        setInputValue(getLocalStorageSearchData?.toString() || ''))
      : getPokemons();
  }, [getLocalStorageSearchData, getPokemons, searchParams, searchPokemon]);

  const notFound = isNotFound ? <NotFound /> : null;

  const loading = isLoading ? (
    <PuffLoader color="#ad5905" size={150} className="spinner" />
  ) : null;

  const navigation = searchParams.get('search') ? null : (
    <Navigation
      setOffset={setOffset}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pokemonsPerPage={pokemonsPerPage}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
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
        pokemonFullInfo={singlePokemon}
        searchParams={searchParams}
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
      <PokemonList
        pokemonList={pokemonList}
        isBreak={isBreak}
        getPokemon={getPokemon}
        setPokemonFullInfo={setPokemonFullInfo}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
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
      {/* <div className={searchParams.get('details') ? 'main-page' : ''}> */}
      <div>
        {breakAppView}
        {search}
        {loading}
        {singlePokemonView}
        {item}
        {pokemon}
        {navigation}
      </div>
      {additionInfo}
      {/* </div> */}
    </>
  );
};

export default MainPage;
