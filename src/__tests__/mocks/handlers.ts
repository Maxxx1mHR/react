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
  http.get('https://pokeapi.co/api/v2/pokemon/meowth', () => {
    return HttpResponse.json({
      id: 522,
      name: 'meowth',
      sprites: {
        other: {
          dream_world: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/52.svg',
          },
        },
      },
      abilities: {
        ability: [
          {
            name: 'pickup',
          },
          {
            name: 'technician',
          },
          {
            name: 'unnerve',
          },
        ],
      },
      types: {
        type: [
          {
            name: 'nornmal',
          },
        ],
      },
      stats: [
        {
          base_stat: 40,
          stat: {
            name: 'hp',
          },
        },
        {
          base_stat: 45,
          stat: {
            name: 'attack',
          },
        },
        {
          base_stat: 35,
          stat: {
            name: 'defense',
          },
        },
        {
          base_stat: 40,
          stat: {
            name: 'special-attack',
          },
        },
        {
          base_stat: 40,
          stat: {
            name: 'special-defense',
          },
        },
        {
          base_stat: 90,
          stat: {
            name: 'speed',
          },
        },
      ],
    });
  }),
];
