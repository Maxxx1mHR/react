import { ReactElement, createContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IPokemon } from '../../types';
interface IAppContext {
  searchParams: URLSearchParams;
  setSearchParams: CallableFunction;
  isLoading: boolean;
  setIsLoading: CallableFunction;
  pokemonList: IPokemon[];
  inputValue: string;
  setInputValue: CallableFunction;
  isBreak: boolean;
  setIsBreak: CallableFunction;
  isNotFound: boolean;
  setIsNotFound: CallableFunction;
  pokemonsPerPage: number;
  setPokemonList: CallableFunction;
  setPokemonPerPage: CallableFunction;
  currentPage: number;
  setCurrentPage: CallableFunction;
  offset: number;
  setOffset: CallableFunction;
}
const PokemonContext = createContext<IAppContext | null>(null);
const PokemonContextProvider = ({ children }: { children: ReactElement }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
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

  const value = {
    searchParams,
    setSearchParams,
    isLoading,
    setIsLoading,
    pokemonList,
    setPokemonList,
    inputValue,
    setInputValue,
    isBreak,
    setIsBreak,
    isNotFound,
    setIsNotFound,
    pokemonsPerPage,
    setPokemonPerPage,
    currentPage,
    setCurrentPage,
    offset,
    setOffset,
  };
  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
export { PokemonContextProvider, PokemonContext };
