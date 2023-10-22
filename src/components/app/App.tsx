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
  constructor(props: object) {
    super(props);

    //   this.state = {
    //     pokemonList: [],
    //     inputValue: '',
    //     isLoading: true,
    //   };
  }

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
    const result = await this.pokemonService.getAllPokemon();
    console.log(result);

    result.results.map(async (item: IPokemon) => {
      this.pokemonService.getPokemonByName(item.name).then((res) => {
        this.setState((prev) => ({
          pokemonList: [
            ...prev.pokemonList,
            { name: res.name, url: res.sprites.other.dream_world.front_default },
          ],
          isLoading: false,
        }));
      });
    });
    // this.setState(() => ({ isLoading: false }));
  };

  // searchPokemon = async (inputValue: string) => {
  //   if (inputValue.length === 0) {
  //     this.setState(() => ({
  //       pokemonList: [],
  //     }));
  //     return this.getAllPokemons();
  //   }

  //   const res = await this.pokemonService.getPokemonByName(inputValue);
  //   this.setState(() => ({
  //     pokemonList: [{ name: res.name, url: res.sprites.other.dream_world.front_default }],
  //   }));
  //   console.log('test', res);
  // };

  render() {
    if (this.state.isLoading) return <PuffLoader color="#36d7b7" />;

    return (
      <div className="app">
        <SearchInput
          // searchPokemon={this.searchPokemon}
          pokemonList={this.state.pokemonList}
          isLoading={this.state.isLoading}
        />

        <PokemonList pokemonList={this.state.pokemonList} />
      </div>
    );
  }
}

export default App;
