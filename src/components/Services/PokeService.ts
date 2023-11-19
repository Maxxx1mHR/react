// const _api = 'https://pokeapi.co/api/v2/pokemon';

// const getResource = async (url: string) => {
//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
//       throw new Error('Error');
//     }
//     return await res.json();
//   } catch (err) {
//     console.error(err);
//   }
// };

// const getAllPokemon = (offset: number, limit: number) => {
//   return getResource(`${_api}?limit=${limit}&offset=${offset}`);
// };

// const getPokemonByName = (name: string) => {
//   return getResource(`${_api}/${name}`);
// };

// const getPokemon = async (name: string) => {
//   try {
//     // return getPokemonByName(name).then((res) => {
//     //   return {
//     //     id: res.id,
//     //     name: res.name,
//     //     url: res.sprites.other.dream_world.front_default,
//     //     abilities: res.abilities,
//     //     types: res.types,
//     //     stats: res.stats,
//     //   };
//     // });
//     return getPokemonByName(name).then((res) => {
//       return res;
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// export { getAllPokemon, getPokemonByName, getPokemon };
