import SearchInput from '../search/SearchInput';
import PokemonList from '../itemList/PokemonList';
import PokeService from '../services/PokeService';
import './app.scss';
import { Component } from 'react';
import { PuffLoader } from 'react-spinners';

interface IPokemon {
  name: string;
  url: string;
}

class App extends Component<
  object,
  { pokemonList: IPokemon[]; inputValue: string; isLoading: boolean }
> {
  state = {
    pokemonList: [],
    inputValue: '',
    isLoading: true,
  };

  pokemonService = new PokeService();

  componentDidMount(): void {
    this.getAllPokemons();
  }

  getAllPokemons = async () => {
    console.time('Time to fetch');
    const result = await this.pokemonService.getAllPokemon();
    const allPokemons: IPokemon[] = [];
    await Promise.all(
      result.results.map(async (item: IPokemon) => {
        return this.pokemonService.getPokemonByName(item.name).then((res) => {
          allPokemons.push({ name: res.name, url: res.sprites.other.dream_world.front_default });
        });
      })
    );
    console.timeEnd('Time to fetch');
    this.setState({ isLoading: false, pokemonList: allPokemons });
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

    const res = await this.pokemonService.getPokemonByName(inputValue);
    this.setState(() => ({
      pokemonList: [{ name: res.name, url: res.sprites.other.dream_world.front_default }],
    }));
    console.log('test', res);
    console.log(this.state.isLoading);
    this.setState(() => ({
      isLoading: false,
    }));
  };

  render() {
    return (
      <div className="app">
        <SearchInput
          searchPokemon={this.searchPokemon}
          pokemonList={this.state.pokemonList}
          isLoading={this.state.isLoading}
        />
        {this.state.isLoading ? (
          <PuffLoader color="#ad5905" size={150} className="spinner" />
        ) : (
          <PokemonList pokemonList={this.state.pokemonList} />
        )}
      </div>
    );
  }
}

export default App;
