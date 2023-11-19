import { PuffLoader } from 'react-spinners';
import PokemonBaseInfo from '../PokemonBaseInfo/PokemonBaseInfo';
import { useSearchParams } from 'react-router-dom';
import { pokemonsApi } from '../../../state/slices/pokemonsApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { setDetailsLoading } from '../../../state/slices/loaderSlice';
import { useEffect } from 'react';

const PokemonCardAdditional = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const wrapperClass = searchParams?.get('details')
    ? 'pokemon-additional-info pokemon-additional-info_active'
    : 'pokemon-additional-info';

  const setUrlParams = () => {
    if (searchParams?.get('search')) {
      setSearchParams?.({
        search: String(searchParams.get('search')),
      });
    } else if (searchParams?.get('page')) {
      setSearchParams?.({ page: String(searchParams?.get('page')) });
    }
  };

  const dispatch = useDispatch();

  const detailsLoader = useSelector(
    (state: RootState) => state.loader.detailsLoader
  );

  const pokemonChosenName = useSelector(
    (state: RootState) => state.pokemon.pokemonChosenName
  );

  const { data: pokemon, isSuccess } =
    pokemonsApi.useGetPokemonAdditionalInfoQuery(pokemonChosenName);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setDetailsLoading(false));
    }
  }, [dispatch, isSuccess]);

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

          {detailsLoader ? (
            <PuffLoader color="#ad5905" size={150} className="spinner" />
          ) : (
            <li className="pokemon__item">
              <div className="pokemon__info">
                <PokemonBaseInfo pokemonFullInfo={pokemon} />
                <ul className="pokemon-stats__list">
                  <span data-testid="stats" className="pokemon__info-header">
                    Stats:
                  </span>
                  {pokemon?.stats.map(({ base_stat, stat }, index) => (
                    <li key={index}>
                      {index + 1 < pokemon?.stats.length
                        ? stat.name + ': ' + base_stat + ','
                        : stat.name + ': ' + base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )}
        </>
      </div>
      <div className="pokemon__overlay" onClick={() => setUrlParams()}></div>
    </div>
  );
};

export default PokemonCardAdditional;
