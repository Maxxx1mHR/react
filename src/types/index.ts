export interface IPokemon {
  id: number;
  name: string;
  // url: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  abilities: IAbility[];
  types: ITypes[];
  stats: IStats[];
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
  isNotFound: boolean;
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

export interface IParams {
  search: string;
  page: number;
}

interface IStats {
  base_stat: number;
  stat: {
    name: string;
  };
}
