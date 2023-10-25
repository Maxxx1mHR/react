import SearchInput from '../search/SearchInput';
import PokemonList from '../itemList/PokemonList';
import PokeService from '../services/PokeService';
import './app.scss';
import { Component } from 'react';
import { PuffLoader } from 'react-spinners';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

interface IPokemon {
  name: string;
  url: string;
}

class App extends Component<
  object,
  {
    pokemonList: IPokemon[];
    inputValue: string;
    isLoading: boolean;
    isBreak: boolean;
  }
> {
  state = {
    pokemonList: [],
    inputValue: '',
    isLoading: true,
    isBreak: false,
  };

  pokemonService = new PokeService();

  componentDidMount(): void {
    const getLocalStorageData = localStorage.getItem('pokemonQuery');
    getLocalStorageData
      ? (this.searchPokemon(getLocalStorageData),
        this.setState({
          inputValue: localStorage.getItem('pokemonQuery')?.toString() || '',
        }))
      : this.getAllPokemons();
  }

  getAllPokemons = async () => {
    localStorage.setItem('pokemonQuery', '');

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

    localStorage.setItem('pokemonQuery', `${inputValue}`);

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
    // console.log(this.state.isBreak);
  };

  render() {
    return (
      <div className="app">
        <ErrorBoundary>
          <SearchInput
            searchPokemon={this.searchPokemon}
            pokemonList={this.state.pokemonList}
            isLoading={this.state.isLoading}
            inputValue={localStorage.getItem('pokemonQuery')?.toString() || ''}
            setBreak={this.setBreak}
          />
        </ErrorBoundary>
        {this.state.isLoading ? (
          <ErrorBoundary>
            <PuffLoader color="#ad5905" size={150} className="spinner" />
          </ErrorBoundary>
        ) : (
          <ErrorBoundary>
            <PokemonList
              pokemonList={this.state.pokemonList}
              isBreak={this.state.isBreak}
            />
          </ErrorBoundary>
        )}
      </div>
    );
  }
}

export default App;
