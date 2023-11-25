import Image from 'next/image';
import { IPokemon } from '../../../types';
import { useRouter } from 'next/router';

const PokemonBaseInfo = ({
  pokemonFullInfo,
}: {
  pokemonFullInfo: IPokemon | undefined;
}) => {
  return (
    <>
      <h2 className="pokemon__name">{pokemonFullInfo?.name}</h2>
      <div className="pokemon__wrapper">
        <Image
          src={pokemonFullInfo?.sprites.other.dream_world.front_default || ''}
          width={200}
          height={300}
          alt={pokemonFullInfo?.name || ''}
          className="pokemon__img"
        />
      </div>
      <ul className="pokemon-ability__list">
        <span className="pokemon__info-header">Abilities:</span>
        {pokemonFullInfo?.abilities.map(({ ability }, index) => (
          <li key={index}>
            {index < pokemonFullInfo?.abilities.length - 1
              ? ability.name + ','
              : ability.name}
          </li>
        ))}
      </ul>
      <ul className="pokemon-type__list">
        <span className="pokemon__info-header">Types:</span>
        {pokemonFullInfo?.types.map(({ type }, index) => (
          <li key={index}>
            {index + 1 < pokemonFullInfo.types.length
              ? type.name + ','
              : type.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PokemonBaseInfo;
