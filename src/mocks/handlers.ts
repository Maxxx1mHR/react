import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=4', () => {
    return HttpResponse.json({
      results: [
        {
          name: 'spearow',
          url: 'https://pokeapi.co/api/v2/pokemon/21/',
        },
        {
          name: 'fearow',
          url: 'https://pokeapi.co/api/v2/pokemon/22/',
        },
        {
          name: 'spearow',
          url: 'https://pokeapi.co/api/v2/pokemon/21/',
        },
        {
          name: 'fearow',
          url: 'https://pokeapi.co/api/v2/pokemon/22/',
        },
      ],
    });
  }),
];
