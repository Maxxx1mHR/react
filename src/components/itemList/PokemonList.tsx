import { Component } from 'react';
import PokeService from '../services/PokeService';

import './pokemonList.scss';

interface IPokemon {
  name: string;
  url: string;
}

export default class PokemonList extends Component<object, { pokemonList: IPokemon[] }> {
  state = {
    pokemonList: [],
  };

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
        console.log(res);
      });
    });
  };

  render() {
    const { pokemonList } = this.state;
    return (
      <div className="pokemon">
        <ul className="pokemon__list">
          {pokemonList.map(({ name, url }, index) => (
            <li key={index} className="pokemon__item">
              <h2 className="pokemon__name">{name}</h2>
              <img src={url} alt={name} className="pokemon__img" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
