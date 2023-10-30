// import { useEffect, useState } from 'react';
// import { PuffLoader } from 'react-spinners';

import MainPage from '../mainPage/MainPage';
// import { SearchInput } from '../search/SearchInput';
// import { PokemonList } from '../itemList/PokemonList';
// import PokeService from '../services/PokeService';
// import { useRouter } from 'next/router';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
// import { IPokemon } from '../../types/index';

// import logo from '../../assets/img/logo.png';
import { Route, Routes } from 'react-router-dom';

// const pokemonService = new PokeService();

const App = () => {
  // const { offset } = useParams();

  // const router = useRouter();

  // const [, setSearchParams] = useSearchParams();
  // const [currentPage, setCurrentPage] = useState(1);

  // // const page = searchParams.get('page');

  // const [offset, setOffset] = useState(0);

  // // useEffect(() => {
  // //   console.log(offset);
  // //   console.log(page);
  // // }, [offset, page]);

  // const incrementPage = () => {
  //   setOffset((offset: number) => offset + 6);
  //   setCurrentPage((currentPage) => currentPage + 1);
  //   // console.log('+', offset);
  // };

  // const decrementPage = () => {
  //   setOffset((offset: number) => offset - 6);
  //   setCurrentPage((currentPage) => currentPage - 1);

  //   // console.log('-', offset);

  //   // setSearchParams({ page: offset.toString() });

  //   // setSearchParams((page) => page - 1);
  // };

  // useEffect(() => {
  //   setSearchParams({ page: currentPage.toString() });
  // }, [currentPage, setSearchParams]);
  // const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  // const [inputValue, setInputValue] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  // const [isBreak, setIsBreak] = useState(false);

  // const getLocalStorageSearchData = localStorage.getItem('pokemonQuery');
  // const setLocalStorageSearchData = (localStorageValue: string = '') => {
  //   localStorage.setItem('pokemonQuery', localStorageValue);
  // };

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const getPokemon = useCallback(async (name: string, arr: IPokemon[]) => {
  //   setIsLoading(true);
  //   await pokemonService.getPokemonByName(name).then((res) => {
  //     arr?.push({
  //       id: res.id,
  //       name: res.name,
  //       url: res.sprites.other.dream_world.front_default,
  //       abilities: res.abilities,
  //       types: res.types,
  //     });
  //   });

  //   // }
  //   // setIsLoading(false);

  //   // console.log('arr', arr);
  //   // return arr;
  //   // if (arr.length <= 1) {
  //   // }
  //   // setIsLoading(false);
  // }, []);

  // const getPokemons = useCallback(async () => {
  //   setLocalStorageSearchData();
  //   try {
  //     const result = await pokemonService.getAllPokemon();
  //     console.log(result);
  //     const allPokemons: IPokemon[] = [];
  //     await Promise.all(
  //       result.results.map(async (item: IPokemon) => {
  //         return pokemonService.getPokemonByName(item.name).then((res) => {
  //           allPokemons.push({
  //             id: res.id,
  //             name: res.name,
  //             url: res.sprites.other.dream_world.front_default,
  //             abilities: res.abilities,
  //             types: res.types,
  //           });
  //         });
  //       })
  //     );
  //     setPokemonList(allPokemons);
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // const searchPokemon = useCallback(
  //   async (inputValue: string) => {
  //     if (!inputValue.length) {
  //       return getPokemons();
  //     }
  //     setLocalStorageSearchData(inputValue);
  //     try {
  //       const res = await pokemonService.getPokemonByName(inputValue);
  //       console.log(res);
  //       setPokemonList([
  //         {
  //           id: res.id,
  //           name: res.name,
  //           url: res.sprites.other.dream_world.front_default,
  //           abilities: res.abilities,
  //           types: res.types,
  //         },
  //       ]);
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  //   [getPokemons]
  // );

  // useEffect(() => {
  //   getLocalStorageSearchData
  //     ? (searchPokemon(getLocalStorageSearchData),
  //       setInputValue(getLocalStorageSearchData?.toString() || ''))
  //     : getPokemons();
  // }, [getLocalStorageSearchData, getPokemons, searchPokemon]);

  // console.log(page);
  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
              // searchPokemon={searchPokemon}
              // inputValue={inputValue}
              // setInputValue={setInputValue}
              // setIsBreak={setIsBreak}
              // isLoading={isLoading}
              // pokemonList={pokemonList}
              // isBreak={isBreak}
              // offset={offset}
              />
            }
          />
        </Routes>
        {/* <div className="navigation">
          <button className="button" onClick={() => decrementPage()}>
            Prev
          </button>
          <button className="button" onClick={() => incrementPage()}>
            Next
          </button>
        </div> */}

        {/* <img src={logo} alt="pokemon logo" className="logo" />
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
        )} */}
      </div>
    </ErrorBoundary>
  );
};

export default App;
