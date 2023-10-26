export interface IPokemon {
  name: string;
  url: string;
  abilities: IAbility[];
  types: ITypes[];
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

interface IAbility {
  ability: {
    name: string;
  };
}

interface ITypes {
  type: {
    name: string;
  };
}
