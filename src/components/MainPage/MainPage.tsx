import { PuffLoader } from 'react-spinners';
import { SearchInput } from '../Search/SearchInput';
import { PokemonList } from '../Pokemon/PokemonList/PokemonList';
import logo from '../../assets/img/logo.png';
import { useCallback, useEffect, useContext, useState } from 'react';
import { IPokemon } from '../../types';
import { getAllPokemon, getPokemon } from '../Services/PokeService';
import Navigation from '../Navigation/Navigation';
import { Outlet, useSearchParams } from 'react-router-dom';
import ItemPerPage from '../ItemPerPage/ItemPerPage';
import BreakApp from '../BreakApp/BreakApp';
import PokemonCard from '../Pokemon/PokemonCard/PokemonCard';
// import { PokemonContext } from '../Context/PokemonContextProvider';
import NotFoundMessage from '../NotFound/NotFoundMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { setPokemonList } from '../../state/slices/pokemonSlice';
import {
  pokemonsApi,
  useGetPokemonQuery,
} from '../../state/slices/pokemonsApi';
import {
  setMainLoading,
  setSearchLoading,
} from '../../state/slices/loaderSlice';

export const MainPage = () =>
  //   {
  //   pokemonFullInfo,
  //   setPokemonFullInfo,
  // }: {
  //   pokemonFullInfo: IPokemon | undefined;
  //   setPokemonFullInfo: CallableFunction;
  // }
  {
    // const {
    //   searchParams,
    //   isLoading,
    //   setIsLoading,
    //   setPokemonList,
    //   setInputValue,
    //   isNotFound,
    //   setIsNotFound,
    //   pokemonsPerPage,
    //   offset,
    // } = useContext(PokemonContext) || {};

    // const { inputValue } = useContext(PokemonContext) || {};
    const dispatch = useDispatch();

    const { limit, offset } = useSelector(
      (state: RootState) => state.pagination
    );

    const { mainLoader, isNotFound } = useSelector(
      (state: RootState) => state.loader
    );

    const { data: pokemons, isSuccess } = pokemonsApi.useGetPokemonsQuery({
      limit,
      offset,
    });

    const pokemon = useSelector((state: RootState) => state.pokemon.pokemon);

    const { currentPage } = useSelector((state: RootState) => state.pagination);

    // console.log('Main');
    // if (mainLoader) {
    //   dispatch(setMainLoading(false));
    // }

    useEffect(() => {
      if (pokemons) {
        dispatch(setMainLoading(false));
      }
    }, [dispatch, pokemons]);

    // console.log(pokemonsNameResponse);
    // pokemonsNameResponse.forEach((pokemon) => {
    //   const { data: pokemons } = pokemonsApi.useGetPokemonQuery(pokemon);
    //   console.log(pokemons);
    // });

    // const dispatch = useDispatch();

    // const pokemonInfo = useSelector(
    //   (state: RootState) => state.pokemon.pokemon
    // );

    // const getLocalStorageSearchData = localStorage.getItem('pokemonQuery');
    // const setLocalStorageSearchData = (localStorageValue: string = '') => {
    //   localStorage.setItem('pokemonQuery', localStorageValue);
    // };

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      if (!searchParams.get('search') && !searchParams.get('details')) {
        setSearchParams({
          page: String(currentPage),
        });
      }
    }, [currentPage, searchParams, setSearchParams]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isNotFound, setIsNotFound] = useState(false);
    // const [pokemonsPerPage, setPokemonPerPage] = useState(4);
    // const [offset, setOffset] = useState(
    //   searchParams.get('page')
    //     ? (Number(searchParams.get('page')) - 1) * pokemonsPerPage
    //     : 0
    // );
    // const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
    // const [inputValue, setInputValue] = useState('');
    // const [isBreak, setIsBreak] = useState(false);

    // const { data: pokemonsSSS } = useGetPokemonQuery('');
    // console.log('DATA', pokemonsSSS);

    // const getPokemonAdditionalInfo = useCallback(async () => {
    //   if (searchParams?.get('details')) {
    //     setPokemonFullInfo?.(
    //       await getPokemon(String(searchParams?.get('details')))
    //     );
    //   }
    // }, [searchParams, setPokemonFullInfo]);

    // const getPokemons = useCallback(async () => {
    //   // setIsLoading?.(true);
    //   // setLocalStorageSearchData();
    //   try {
    //     const result = await getAllPokemon(offset || 0, pokemonsPerPage || 4);

    //     // const allPokemons: IPokemon[] = [];
    //     await Promise.all(
    //       result.results.map(async (item: IPokemon) => {
    //         const tmp = await getPokemon(item.name);
    //         if (tmp) {
    //           // allPokemons.push(tmp);
    //           // setPokemonAsync(tmp);
    //           dispatch(setPokemonList(tmp));
    //         } else {
    //           setIsNotFound?.(true);
    //         }
    //       })
    //     );
    //     // dispatch(setP(allPokemons));

    //     // console.log(allPokemons);
    //     // setPokemonList?.(allPokemons);
    //     // dispatch(setP(allPokemons));
    //     // dispatch(setPokemonAsync(allPokemons));
    //     // if (!allPokemons.length) {
    //     // setIsNotFound?.(true);
    //     // }
    //     // if (!pokemonsList.length) {
    //     //   console.log('kli', Boolean(!pokemonsList.length));
    //     //   setIsNotFound?.(true);
    //     // }

    //     setIsLoading?.(false);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }, [dispatch, offset, pokemonsPerPage]);

    // const searchPokemon = useCallback(
    //   async (inputValue: string | null | undefined) => {
    //     setIsLoading?.(true);
    //     setIsNotFound?.(false);
    //     if (inputValue === '' && !searchParams?.get('search')) {
    //       setIsLoading?.(false);
    //       return;
    //     } else if (inputValue === '' && searchParams?.get('search')) {
    //       setIsLoading?.(false);
    //       return getPokemons();
    //     }

    //     if (inputValue) {
    //       const input = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    //       setLocalStorageSearchData(input);
    //       try {
    //         const pokemon = await getPokemon(inputValue.toLowerCase());
    //         if (pokemon) {
    //           setPokemonFullInfo?.(pokemon);
    //         }
    //         setIsLoading?.(false);
    //       } catch (err) {
    //         setIsLoading?.(false);
    //         setIsNotFound?.(true);
    //         setLocalStorageSearchData();
    //         console.error(err);
    //       }
    //     }
    //   },
    //   [getPokemons, searchParams, setIsLoading, setIsNotFound, setPokemonFullInfo]
    // );

    // useEffect(() => {
    // getPokemons();
    // }, [getPokemons]);

    // useEffect(() => {
    // getPokemons();
    // getPokemonAdditionalInfo();
    // getLocalStorageSearchData || searchParams?.get('search')
    //   ? (searchPokemon(
    //       getLocalStorageSearchData || searchParams?.get('search')
    //     ),
    //     setInputValue?.(getLocalStorageSearchData?.toString() || ''))
    //   : getPokemons();
    // console.log(data);
    // console.log(inputValue);
    // }, []);

    const notFound = Boolean(isNotFound) && <NotFoundMessage />;

    const loader = Boolean(mainLoader && !searchParams?.get('search')) && (
      <PuffLoader
        color="#ad5905"
        size={150}
        data-testid="spinner"
        className="spinner"
      />
    );

    // const searchInput = Boolean(!isNotFound) && (
    //   <SearchInput searchPokemon={searchPokemon} />
    // );
    const searchInput = Boolean(!isNotFound) && <SearchInput />;

    const singlePokemonView = Boolean(
      !isNotFound && searchParams?.get('search')
    ) && (
      <PokemonCard
        pokemonName={''}
        // pokemonFullInfo={pokemonFullInfo}
        // setPokemonFullInfo={setPokemonFullInfo}
      />
    );
    const item = Boolean(!isNotFound && !searchParams?.get('search')) && (
      <ItemPerPage />
    );

    // const pokemon = Boolean(
    //   !isLoading && !isNotFound && !searchParams?.get('search')
    // ) && (
    //   <>
    //     <PokemonList
    //     // setPokemonFullInfo={setPokemonFullInfo}
    //     // searchParams={searchParams}
    //     // setSearchParams={setSearchParams}
    //     // pokemonList={pokemonList}
    //     // isBreak={isBreak}
    //     />
    //     {/* <Navigation /> */}
    //   </>
    // );

    const pokemonView = Boolean(
      !mainLoader && !isNotFound && !searchParams?.get('search')
    ) && (
      <>
        <div className="pokemon">
          <ul className="pokemon__list">
            {pokemons?.results.map((pokemonResponse) => {
              // pokemonsNameResponse.push(pokemonResponse.name);
              return (
                <PokemonCard
                  key={pokemonResponse.url}
                  pokemonName={pokemonResponse.name}
                ></PokemonCard>
              );
            })}
          </ul>
        </div>
        <Navigation />
      </>
    );

    // searchParams={searchParams}

    const additionInfo = Boolean(searchParams?.get('details')) && <Outlet />;
    const breakAppView = Boolean(
      !isNotFound || searchParams?.get('search')
    ) && <BreakApp />;

    return (
      <>
        <img src={logo} alt="pokemon logo" className="logo" />

        {notFound}

        <div>
          {breakAppView}
          {searchInput}
          {singlePokemonView}
          {item}
          {pokemonView}
          {loader}
        </div>
        {additionInfo}

        {/* <div className="pokemon">
          <ul className="pokemon__list">
            {pokemons?.results.map((pokemonResponse) => {
              // pokemonsNameResponse.push(pokemonResponse.name);
              return (
                <PokemonCard
                  key={pokemonResponse.url}
                  pokemonName={pokemonResponse.name}
                ></PokemonCard>
              );
            })}
          </ul>
        </div> */}
      </>
    );
  };
