export interface IPokemon {
  name: string;
  url: string;
}

export interface ISearchInputProps {
  searchPokemon: CallableFunction;
  pokemonList: IPokemon[];
  isLoading: boolean;
  inputValue: string;
  setBreak: CallableFunction;
}

export interface ISearchInputState {
  inputValue: string;
}

export interface IAppState {
  pokemonList: IPokemon[];
  inputValue: string;
  isLoading: boolean;
  isBreak: boolean;
}
