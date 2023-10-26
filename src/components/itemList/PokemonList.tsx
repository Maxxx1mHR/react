import { Component } from 'react';
import { IPokemon } from '../../types/index';

import './pokemonList.scss';

export default class PokemonList extends Component<{
  pokemonList: IPokemon[];
  isBreak: boolean;
}> {
  render() {
    console.log(this.props.pokemonList);
    const { pokemonList, isBreak } = this.props;
    if (isBreak) throw Error('error!');
    return (
      <div className="pokemon">
        <ul className="pokemon__list">
          {pokemonList.map(({ abilities, name, url, types }, index) => (
            <li key={index} className="pokemon__item">
              <h2 className="pokemon__name">{name}</h2>
              <div className="pokemon__wrapper">
                <img src={url} alt={name} className="pokemon__img" />
              </div>
              <div className="pokemon__info">
                <ul className="pokemon-ability__list">
                  Abilities:
                  {abilities.map((item, index) => (
                    <li key={index}>
                      {index + 1 < abilities.length
                        ? item.ability.name + ','
                        : item.ability.name}
                    </li>
                  ))}
                </ul>
                <ul className="pokemon-type__list">
                  Types:
                  {types.map((item, index) => (
                    <li key={index}>
                      {index + 1 < types.length
                        ? item.type.name + ','
                        : item.type.name}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
