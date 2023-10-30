import { PuffLoader } from 'react-spinners';

import { SearchInput } from '../search/SearchInput';
import { PokemonList } from '../itemList/PokemonList';

import logo from '../../assets/img/logo.png';
import { useCallback, useEffect, useState } from 'react';
import { IPokemon } from '../../types';
import PokeService from '../services/PokeService';
import Navigation from '../navigation/Navigation';

const pokemonService = new PokeService();
// let countAllPokemons = 0;

const MainPage = () =>
  // { offset }: { offset: number }
  {
    const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isBreak, setIsBreak] = useState(false);
    const [offset, setOffset] = useState(0);
    // let countAllPokemons = 0;

    const getLocalStorageSearchData = localStorage.getItem('pokemonQuery');
    const setLocalStorageSearchData = (localStorageValue: string = '') => {
      localStorage.setItem('pokemonQuery', localStorageValue);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getPokemon = useCallback(async (name: string, arr: IPokemon[]) => {
      setIsLoading(true);
      await pokemonService.getPokemonByName(name).then((res) => {
        arr?.push({
          id: res.id,
          name: res.name,
          url: res.sprites.other.dream_world.front_default,
          abilities: res.abilities,
          types: res.types,
        });
      });

      // }
      // setIsLoading(false);

      // console.log('arr', arr);
      // return arr;
      // if (arr.length <= 1) {
      // }
      // setIsLoading(false);
    }, []);

    const getPokemons = useCallback(async () => {
      setLocalStorageSearchData();
      try {
        const result = await pokemonService.getAllPokemon(offset);
        // countAllPokemons = result.count;
        // console.log(result.count);
        const allPokemons: IPokemon[] = [];
        await Promise.all(
          result.results.map(async (item: IPokemon) => {
            return pokemonService.getPokemonByName(item.name).then((res) => {
              allPokemons.push({
                id: res.id,
                name: res.name,
                url: res.sprites.other.dream_world.front_default,
                abilities: res.abilities,
                types: res.types,
              });
            });
          })
        );
        setPokemonList(allPokemons);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }, [offset]);

    const searchPokemon = useCallback(
      async (inputValue: string) => {
        if (!inputValue.length) {
          return getPokemons();
        }
        setLocalStorageSearchData(inputValue);
        try {
          const res = await pokemonService.getPokemonByName(inputValue);
          // console.log(res);
          setPokemonList([
            {
              id: res.id,
              name: res.name,
              url: res.sprites.other.dream_world.front_default,
              abilities: res.abilities,
              types: res.types,
            },
          ]);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      },
      [getPokemons]
    );

    useEffect(() => {
      getLocalStorageSearchData
        ? (searchPokemon(getLocalStorageSearchData),
          setInputValue(getLocalStorageSearchData?.toString() || ''))
        : getPokemons();
    }, [getLocalStorageSearchData, getPokemons, searchPokemon]);

    return (
      <>
        <img src={logo} alt="pokemon logo" className="logo" />
        <SearchInput
          searchPokemon={searchPokemon}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setIsBreak={setIsBreak}
        />
        {isLoading ? (
          <PuffLoader color="#ad5905" size={150} className="spinner" />
        ) : (
          <PokemonList pokemonList={pokemonList} isBreak={isBreak} />
        )}
        <Navigation setOffset={setOffset} />
      </>
    );
  };

export default MainPage;
