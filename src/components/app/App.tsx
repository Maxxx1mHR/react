import { Component } from 'react';
import { PuffLoader } from 'react-spinners';

import SearchInput from '../search/SearchInput';
import PokemonList from '../itemList/PokemonList';
import PokeService from '../services/PokeService';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { IAppState, IPokemon } from '../../types/index';

import logo from '../../assets/img/logo.png';

class App extends Component<object, IAppState> {
  state = {
    pokemonList: [],
    inputValue: '',
    isLoading: true,
    isBreak: false,
  };

  componentDidMount(): void {
    this.getLocalStorageSearchData
      ? (this.searchPokemon(this.getLocalStorageSearchData),
        this.setState({
          inputValue: this.getLocalStorageSearchData?.toString() || '',
        }))
      : this.getPokemons();
  }

  pokemonService = new PokeService();
  getLocalStorageSearchData = localStorage.getItem('pokemonQuery');
  setLocalStorageSearchData = (localStorageValue: string = '') => {
    localStorage.setItem('pokemonQuery', localStorageValue);
  };

  getPokemon = async (name: string, arr: IPokemon[]) => {
    this.setState(() => ({
      isLoading: true,
    }));
    const res = await this.pokemonService.getPokemonByName(name);
    arr.push({
      name: res.name,
      url: res.sprites.other.dream_world.front_default,
      abilities: res.abilities,
      types: res.types,
    });
    this.setState({ isLoading: false, pokemonList: arr });
  };

  getPokemons = async () => {
    this.setLocalStorageSearchData();
    try {
      const result = await this.pokemonService.getAllPokemon();
      const allPokemons: IPokemon[] = [];
      await Promise.all(
        result.results.map(async (item: IPokemon) => {
          return this.getPokemon(item.name, allPokemons);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  searchPokemon = async (inputValue: string) => {
    if (!inputValue.length) {
      this.setState(() => ({
        pokemonList: [],
      }));
      return this.getPokemons();
    }
    this.setLocalStorageSearchData(inputValue);
    try {
      const Pokemon: IPokemon[] = [];
      this.getPokemon(inputValue, Pokemon);
    } catch (err) {
      console.log(err);
    }
  };

  setBreak = () => {
    this.setState(() => ({ isBreak: true }));
  };

  render() {
    const { pokemonList, isLoading, isBreak } = this.state;
    return (
      <ErrorBoundary>
        <div className="app">
          <img src={logo} alt="pokemon logo" className="logo" />
          <SearchInput
            searchPokemon={this.searchPokemon}
            pokemonList={pokemonList}
            isLoading={isLoading}
            inputValue={this.getLocalStorageSearchData?.toString() || ''}
            setBreak={this.setBreak}
          />
          {isLoading ? (
            <PuffLoader color="#ad5905" size={150} className="spinner" />
          ) : (
            <PokemonList pokemonList={pokemonList} isBreak={isBreak} />
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
