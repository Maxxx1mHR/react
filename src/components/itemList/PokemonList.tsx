import { Component } from 'react';
import { IPokemon } from '../../types/index';

import './pokemonList.scss';

export default class PokemonList extends Component<{
  pokemonList: IPokemon[];
  isBreak: boolean;
}> {
  render() {
    const { pokemonList, isBreak } = this.props;
    if (isBreak) throw Error('error!');
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
