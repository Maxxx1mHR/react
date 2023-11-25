import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPokemon } from '../../types';
import { HYDRATE } from 'next-redux-wrapper';

const _api = 'https://pokeapi.co/api/v2/pokemon/';

interface IResponse {
  results: [{ name: string; url: string }];
}

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${_api}`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getPokemons: build.query<IResponse, { limit: number; offset: number }>({
      query: ({ limit, offset }) => `?limit=${limit}&offset=${offset}`,
    }),
    getPokemon: build.query<IPokemon, string>({
      query: (name: string = '') => `/${name}`,
    }),
    getPokemonAdditionalInfo: build.query<IPokemon, string>({
      query: (name: string = '') => `/${name}`,
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonQuery,
  useGetPokemonAdditionalInfoQuery,
  util: { getRunningQueriesThunk },
} = pokemonsApi;

export const { getPokemons, getPokemon } = pokemonsApi.endpoints;
