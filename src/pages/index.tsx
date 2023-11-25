import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { wrapper } from '@/state/store';
import {
  getPokemon,
  getPokemonAdditionalInfo,
  getPokemons,
  getRunningQueriesThunk,
} from '@/state/slices/pokemonsApi';
import { IPokemon, IPokemonsResponse } from '@/types';
import PokemonCard from '@/components/Pokemon/PokemonCard/PokemonCard';
import Navigation from '@/components/Navigation/Navigation';
import { SearchInput } from '@/components/Search/SearchInput';
import { useRouter } from 'next/router';
import PokemonCardAdditional from '@/components/Pokemon/PokemonCardAdditional/PokemonCardAdditional';

const POKEMON_PER_PAGE = 4;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // console.log('context', context);
    const limit = Number(context.query.limit) || POKEMON_PER_PAGE;
    const currentPage = Number(context.query.page) || 1;
    const offset = limit * (currentPage - 1);
    const inputValue = context.query.search?.toString() || '';
    const details = context.query.details?.toString() || '';

    const pokemons = await store.dispatch(
      getPokemons.initiate({ limit, offset })
    );

    const pokemon = await store.dispatch(getPokemon.initiate(inputValue));

    const pokemonAdditional = await store.dispatch(
      getPokemonAdditionalInfo.initiate(details)
    );

    const pokemonsFullInfo: IPokemon[] = [];
    const pokemonFullInfo: IPokemon[] = [];
    const pokemonFullInfoDetails: IPokemon[] = [];

    pokemons.data?.results.map(async (pokemon) => {
      const singlePokemon = await store.dispatch(
        getPokemon.initiate(pokemon.name)
      );
      const singlePokemonData = singlePokemon.data;
      if (singlePokemonData) {
        pokemonsFullInfo.push(singlePokemonData);
      }
    });

    //
    const singlePokemon = pokemon.data;
    if (singlePokemon) {
      pokemonFullInfo.push(singlePokemon);
    }

    const singlePokemonDetails = pokemonAdditional.data;
    if (singlePokemonDetails && context.query.details) {
      pokemonFullInfoDetails.push(singlePokemonDetails);
    }

    // const singlePokemonDetails = pokemonAdditional.data;
    // if (singlePokemonDetails && details) {
    //   pokemonFullInfoDetails.push(singlePokemonDetails);
    // }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        pokemonsFullInfo,
        limit,
        currentPage,
        inputValue,
        pokemonFullInfo,
        pokemonFullInfoDetails,
      },
    };
  }
);

export default function Home({
  pokemonsFullInfo,
  limit,
  currentPage,
  inputValue,
  pokemonFullInfo,
  pokemonFullInfoDetails,
}: {
  pokemonsFullInfo: IPokemon[];
  limit: number;
  currentPage: number;
  inputValue: string;
  pokemonFullInfo: IPokemon[];
  singlePokemonDetails: IPokemon[];
  pokemonFullInfoDetails: IPokemon[];
}) {
  const router = useRouter();

  const pokemons = (
    <>
      <div className="pokemon">
        <ul className="pokemon__list">
          <PokemonCard pokemonsFullInfo={pokemonsFullInfo} />
        </ul>
      </div>
      <Navigation limit={limit} currentPage={currentPage} />
    </>
  );
  const pokemon = <PokemonCard pokemonsFullInfo={pokemonFullInfo} />;

  const pokemonsView = router.query.search ? pokemon : pokemons;

  const additionInfo = (
    <PokemonCardAdditional pokemonsFullInfo={pokemonFullInfoDetails} />
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SearchInput inputValue={inputValue} />
        {pokemonsView}
        {additionInfo}
      </main>
    </>
  );
}
