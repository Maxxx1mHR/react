import { Component } from 'react';
import { PuffLoader } from 'react-spinners';

import SearchInput from '../search/SearchInput';
import PokemonList from '../itemList/PokemonList';
import PokeService from '../services/PokeService';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { IAppState, IPokemon } from '../../types/index';

import logo from '../../assets/img/logo.png';
import './app.scss';

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
      : this.getAllPokemons();
  }

  pokemonService = new PokeService();
  getLocalStorageSearchData = localStorage.getItem('pokemonQuery');
  setLocalStorageSearchData = (localStorageValue: string = '') => {
    localStorage.setItem('pokemonQuery', localStorageValue);
  };

  getAllPokemons = async () => {
    this.setLocalStorageSearchData();
    try {
      const result = await this.pokemonService.getAllPokemon();
      const allPokemons: IPokemon[] = [];
      await Promise.all(
        result.results.map(async (item: IPokemon) => {
          return this.pokemonService.getPokemonByName(item.name).then((res) => {
            allPokemons.push({
              name: res.name,
              url: res.sprites.other.dream_world.front_default,
            });
          });
        })
      );
      this.setState({ isLoading: false, pokemonList: allPokemons });
    } catch (err) {
      console.log(err);
    }
  };

  searchPokemon = async (inputValue: string) => {
    if (inputValue.length === 0) {
      this.setState(() => ({
        pokemonList: [],
      }));
      return this.getAllPokemons();
    }

    this.setState(() => ({
      isLoading: true,
    }));

    this.setLocalStorageSearchData(inputValue);

    try {
      const res = await this.pokemonService.getPokemonByName(inputValue);
      this.setState(() => ({
        pokemonList: [
          { name: res.name, url: res.sprites.other.dream_world.front_default },
        ],
      }));
      this.setState(() => ({
        isLoading: false,
      }));
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
      <div className="app">
        <img src={logo} alt="pokemon logo" className="logo" />
        <ErrorBoundary>
          <SearchInput
            searchPokemon={this.searchPokemon}
            pokemonList={pokemonList}
            isLoading={isLoading}
            inputValue={this.getLocalStorageSearchData?.toString() || ''}
            setBreak={this.setBreak}
          />
        </ErrorBoundary>
        {isLoading ? (
          <ErrorBoundary>
            <PuffLoader color="#ad5905" size={150} className="spinner" />
          </ErrorBoundary>
        ) : (
          <ErrorBoundary>
            <PokemonList pokemonList={pokemonList} isBreak={isBreak} />
          </ErrorBoundary>
        )}
      </div>
    );
  }
}

export default App;
