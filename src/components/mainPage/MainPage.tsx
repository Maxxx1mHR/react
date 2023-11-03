import { PuffLoader } from 'react-spinners';

import { SearchInput } from '../search/SearchInput';
import { PokemonList } from '../itemList/PokemonList';

import logo from '../../assets/img/logo.png';
import { useCallback, useEffect, useState } from 'react';
import { IPokemon } from '../../types';
import PokeService from '../services/PokeService';
import Navigation from '../navigation/Navigation';
import NotFound from '../notFound/NotFound';
import { useSearchParams } from 'react-router-dom';

const pokemonService = new PokeService();

const MainPage = () => {
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isNotFound, setIsNotFound] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const getLocalStorageSearchData = localStorage.getItem('pokemonQuery');
  const setLocalStorageSearchData = (localStorageValue: string = '') => {
    localStorage.setItem('pokemonQuery', localStorageValue);
  };

  const getPokemon = useCallback(async (name: string) => {
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
  }, []);

  const getPokemons = useCallback(async () => {
    setLocalStorageSearchData();
    try {
      const result = await pokemonService.getAllPokemon(offset);
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
  }, [getPokemon, offset]);

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
        console.log('in', inputValue);
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
    } else if (pokemonList.length > 1) {
      setSearchParams({ page: currentPage.toString() });
    }
  }, [
    currentPage,
    inputValue.length,
    pokemonList.length,
    searchValue,
    setSearchParams,
  ]);

  return (
    <>
      <img src={logo} alt="pokemon logo" className="logo" />
      {isNotFound ? (
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
            <PokemonList pokemonList={pokemonList} isBreak={isBreak} />
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
        </>
      )}
    </>
  );
};

export default MainPage;
