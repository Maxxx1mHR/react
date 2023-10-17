import SearchInput from '../search/SearchInput';
import PokemonList from '../itemList/PokemonList';
// import PokeService from '../services/PokeService';
import './app.scss';

// const pokeService = new PokeService();

// pokeService.getAllPokemon().then((res) => console.log(res));

function App() {
  return (
    <div className="app">
      <SearchInput />
      <PokemonList />
    </div>
  );
}

export default App;
