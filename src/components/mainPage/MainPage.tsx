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

const pokemonService = new PokeService();

const MainPage = ({
  pokemonFullInfo,
  setPokemonFullInfo,
  setSearchParams,
}: {
  pokemonFullInfo: IPokemon | undefined;
  setPokemonFullInfo: CallableFunction;
  setSearchParams: CallableFunction;
}) => {
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isAdditionInfo, setAdditionInfo] = useState(false);
  const [pokemonsPerPage, setPokemonPerPage] = useState(4);
  const [offset, setOffset] = useState(0);

  const [isNotFound, setIsNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getLocalStorageSearchData = localStorage.getItem('pokemonQuery');
  const setLocalStorageSearchData = (localStorageValue: string = '') => {
    localStorage.setItem('pokemonQuery', localStorageValue);
  };

  const getPokemon = useCallback(async (name: string) => {
    // setIsLoading(true);
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
    // setIsLoading(false);
  }, []);

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
  }, [getPokemon, offset, pokemonsPerPage]);

  const searchPokemon = useCallback(
    async (inputValue: string) => {
      setIsNotFound(false);
      if (inputValue === '') {
        return getPokemons();
      }

      const input = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      setLocalStorageSearchData(input);

      try {
        const tmp = await getPokemon(inputValue.toLowerCase());
        if (tmp) {
          setPokemonList([tmp]);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsNotFound(true);
        setLocalStorageSearchData();
        console.error(err);
      }
    },
    [getPokemon, getPokemons]
  );

  useEffect(() => {
    getLocalStorageSearchData
      ? (searchPokemon(getLocalStorageSearchData),
        setInputValue(getLocalStorageSearchData?.toString() || ''))
      : getPokemons();
  }, [getLocalStorageSearchData, getPokemons, searchPokemon]);

  useEffect(() => {
    if (searchValue) {
      setSearchParams({ search: searchValue });
    } else if (pokemonList.length > 1 && !pokemonFullInfo) {
      setSearchParams({ page: currentPage.toString() });
    } else if (pokemonFullInfo) {
      setSearchParams({
        page: currentPage.toString(),
        details: pokemonFullInfo.name.toString(),
      });
    }
  }, [
    currentPage,
    inputValue.length,
    pokemonFullInfo,
    pokemonList.length,
    searchValue,
    setSearchParams,
  ]);

  // const countPage = <ItemPerPage setPokemonPerPage={setPokemonPerPage} />;

  const notFound = isNotFound ? <NotFound /> : null;

  const loading = isLoading ? (
    <PuffLoader color="#ad5905" size={150} className="spinner" />
  ) : null;

  const navigation = searchValue ? null : (
    <Navigation
      setOffset={setOffset}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pokemonsPerPage={pokemonsPerPage}
    />
  );
  const search = isNotFound ? null : (
    <>
      <SearchInput
        searchPokemon={searchPokemon}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setIsBreak={setIsBreak}
        setSearchValue={setSearchValue}
        setPokemonPerPage={setPokemonPerPage}
      />
      <ItemPerPage setPokemonPerPage={setPokemonPerPage} />;
    </>
  );

  const pokemon =
    !isLoading || !NotFound ? (
      <PokemonList
        pokemonList={pokemonList}
        isBreak={isBreak}
        getPokemon={getPokemon}
        setPokemonFullInfo={setPokemonFullInfo}
        setAdditionInfo={setAdditionInfo}
      />
    ) : null;

  const additionInfo = isAdditionInfo ? <Outlet /> : null;

  return (
    <>
      <img src={logo} alt="pokemon logo" className="logo" />

      {notFound}
      <div className={isAdditionInfo ? 'main-page' : ''}>
        <div>
          {loading}
          {search}
          {pokemon}
          {navigation}
        </div>
        {additionInfo}
      </div>

      {/* {isNotFound ? (
        <NotFound />
      ) : (
        <>
          <SearchInput
            searchPokemon={searchPokemon}
            inputValue={inputValue}
            setInputValue={setInputValue}
            setIsBreak={setIsBreak}
            setSearchValue={setSearchValue}
          />
          {isLoading ? (
            <PuffLoader color="#ad5905" size={150} className="spinner" />
          ) : (
            <PokemonList
              pokemonList={pokemonList}
              isBreak={isBreak}
              getPokemon={getPokemon}
            />
          )}
          {searchValue ? (
            ''
          ) : (
            <Navigation
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <Outlet></Outlet>
        </>
      )} */}
    </>
  );
};

export default MainPage;
