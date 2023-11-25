import { PuffLoader } from 'react-spinners';
import PokemonBaseInfo from '../PokemonBaseInfo/PokemonBaseInfo';
import { pokemonsApi } from '../../../state/slices/pokemonsApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { setDetailsLoading } from '../../../state/slices/loaderSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { IPokemon } from '@/types';

const PokemonCardAdditional = ({
  pokemonsFullInfo,
}: {
  pokemonsFullInfo: IPokemon[];
}) => {
  const router = useRouter();

  const setUrlParams = () => {
    if (router.query.search) {
      router.push(`?search=${String(router.query.search)}`);
    } else if (router.query.page) {
      router.push(String(`?page=${router.query.page}`));
    } else {
      router.push('');
    }
  };

  const wrapperClass = router.query.details
    ? 'pokemon-additional-info pokemon-additional-info_active'
    : 'pokemon-additional-info';

  console.log('___+++', pokemonsFullInfo);

  return (
    <div className={wrapperClass}>
      <div
        data-testid="pokemon__additional"
        className={'pokemon-additional__wrapper'}
      >
        <>
          <span
            data-testid="close__button"
            className="pokemon__close-menu"
            onClick={() => setUrlParams()}
          >
            Close
          </span>

          {
            <li className="pokemon__item">
              <div className="pokemon__info">
                {pokemonsFullInfo.map((pokemon) => {
                  return (
                    <PokemonBaseInfo
                      key={pokemon.id}
                      pokemonFullInfo={pokemon}
                    />
                  );
                })}
                <ul className="pokemon-stats__list">
                  <span data-testid="stats" className="pokemon__info-header">
                    Stats:
                  </span>
                  {pokemonsFullInfo[0]?.stats.map(
                    ({ base_stat, stat }, index) => (
                      <li key={index}>
                        {index + 1 < pokemonsFullInfo[0]?.stats.length
                          ? stat.name + ': ' + base_stat + ','
                          : stat.name + ': ' + base_stat}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </li>
          }
        </>
      </div>
      <div className="pokemon__overlay" onClick={() => setUrlParams()}></div>
    </div>
  );
};

export default PokemonCardAdditional;
