import { PuffLoader } from 'react-spinners';
import { SearchInput } from '../Search/SearchInput';
import logo from '../../assets/img/logo.png';
import { useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import { Outlet, useSearchParams } from 'react-router-dom';
import ItemPerPage from '../ItemPerPage/ItemPerPage';
import BreakApp from '../BreakApp/BreakApp';
import PokemonCard from '../Pokemon/PokemonCard/PokemonCard';
import NotFoundMessage from '../NotFound/NotFoundMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { pokemonsApi } from '../../state/slices/pokemonsApi';
import { setMainLoading } from '../../state/slices/loaderSlice';

export const MainPage = () => {
  const dispatch = useDispatch();

  const { limit, offset } = useSelector((state: RootState) => state.pagination);

  const { mainLoader, isNotFound } = useSelector(
    (state: RootState) => state.loader
  );
  const { currentPage } = useSelector((state: RootState) => state.pagination);

  const { data: pokemons } = pokemonsApi.useGetPokemonsQuery({
    limit,
    offset,
  });

  useEffect(() => {
    if (pokemons) {
      dispatch(setMainLoading(false));
    }
  }, [dispatch, pokemons]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('search') && !searchParams.get('details')) {
      setSearchParams({
        page: String(currentPage),
      });
    }
  }, [currentPage, searchParams, setSearchParams]);

  const notFound = Boolean(isNotFound) && <NotFoundMessage />;

  const loader = Boolean(mainLoader && !searchParams?.get('search')) && (
    <PuffLoader
      color="#ad5905"
      size={150}
      data-testid="spinner"
      className="spinner"
    />
  );

  const searchInput = Boolean(!isNotFound) && <SearchInput />;

  const singlePokemonView = Boolean(
    !isNotFound && searchParams?.get('search')
  ) && <PokemonCard pokemonName={''} />;
  const item = Boolean(!isNotFound && !searchParams?.get('search')) && (
    <ItemPerPage />
  );

  const pokemonView = Boolean(
    !mainLoader && !isNotFound && !searchParams?.get('search')
  ) && (
    <>
      <div className="pokemon">
        <ul className="pokemon__list">
          {pokemons?.results.map(
            (pokemonResponse: { url: string; name: string }) => {
              return (
                <PokemonCard
                  key={pokemonResponse.url}
                  pokemonName={pokemonResponse.name}
                ></PokemonCard>
              );
            }
          )}
        </ul>
      </div>
      <Navigation />
    </>
  );

  const additionInfo = Boolean(searchParams?.get('details')) && <Outlet />;
  const breakAppView = Boolean(!isNotFound || searchParams?.get('search')) && (
    <BreakApp />
  );

  return (
    <>
      <img src={logo} alt="pokemon logo" className="logo" />

      {notFound}

      <div>
        {breakAppView}
        {searchInput}
        {singlePokemonView}
        {item}
        {pokemonView}
        {loader}
      </div>
      {additionInfo}
    </>
  );
};
