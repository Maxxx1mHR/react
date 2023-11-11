import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=4', () => {
    return HttpResponse.json({
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
        {
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon/3/',
        },
        {
          name: 'charmander',
          url: 'https://pokeapi.co/api/v2/pokemon/4/',
        },
      ],
    });
  }),
];
