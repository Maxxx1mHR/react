import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon?offset=4&limit=4', () => {
    return HttpResponse.json({
      results: [
        {
          name: 'bulbasaur',
        },
        {
          name: 'ivysaur',
        },
        {
          name: 'venusaur',
        },
        {
          name: 'charmander',
        },
      ],
    });
  }),
];
