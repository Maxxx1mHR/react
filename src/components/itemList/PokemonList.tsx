import { Component } from 'react';
import { IPokemon } from '../../types/index';

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
          {pokemonList.map(({ abilities, name, url, types }, index) => (
            <li key={index} className="pokemon__item">
              <h2 className="pokemon__name">{name}</h2>
              <div className="pokemon__wrapper">
                <img src={url} alt={name} className="pokemon__img" />
              </div>
              <div className="pokemon__info">
                <ul className="pokemon-ability__list">
                  Abilities:
                  {abilities.map(({ ability }, index) => (
                    <li key={index}>
                      {index + 1 < abilities.length
                        ? ability.name + ','
                        : ability.name}
                    </li>
                  ))}
                </ul>
                <ul className="pokemon-type__list">
                  Types:
                  {types.map(({ type }, index) => (
                    <li key={index}>
                      {index + 1 < types.length ? type.name + ',' : type.name}
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
