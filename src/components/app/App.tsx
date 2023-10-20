import SearchInput from '../search/SearchInput';
import PokemonList from '../itemList/PokemonList';
import PokeService from '../services/PokeService';
import './app.scss';
import { Component } from 'react';

interface IPokemon {
  name: string;
  url: string;
}

class App extends Component<object, { pokemonList: IPokemon[]; inputValue: string }> {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemonList: [],
      inputValue: '',
    };
  }

  // state = {
  //   pokemonList: [],
  // };

  pokemonService = new PokeService();

  componentDidMount() {
    this.getAllPokemons();
  }

  getAllPokemons = async () => {
    const result = await this.pokemonService.getAllPokemon();

    result.results.map(async (item: IPokemon) => {
      await this.pokemonService.getPokemonByName(item.name).then((res) => {
        this.setState((prev) => ({
          pokemonList: [
            ...prev.pokemonList,
            { name: res.name, url: res.sprites.other.dream_world.front_default },
          ],
        }));
        // console.log(res);
      });
    });
  };

  searchPokemon = async (inputValue: string) => {
    if (inputValue.length === 0) {
      this.setState(() => ({
        pokemonList: [],
      }));
      return this.getAllPokemons();
    }

    const res = await this.pokemonService.getPokemonByName(inputValue);
    this.setState(() => ({
      pokemonList: [{ name: res.name, url: res.sprites.other.dream_world.front_default }],
    }));
    console.log('test', res);
  };

  // onSearchPokemon(inputValue: string) {
  //   this.setState({ inputValue });
  // }

  render() {
    // this.searchPokemon(this.state.pokemonList, 'metapod');

    // const { inputValue } = this.state;
    // console.log('list', this.state.pokemonList);
    // const { pokemonList } = this.state;
    return (
      <div className="app">
        <SearchInput searchPokemon={this.searchPokemon} pokemonList={this.state.pokemonList} />
        <PokemonList pokemonList={this.state.pokemonList} />
      </div>
    );
  }
}

export default App;
