class PokeService {
  getResource = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Error');
    }
    return await res.json();
  };

  getAllPokemon = () => {
    return this.getResource('https://pokeapi.co/api/v2/pokemon/');
  };

  getPokemonByName = (name: string) => {
    return this.getResource(`https://pokeapi.co/api/v2/pokemon/${name}`);
  };

  // getSinglePokemon = (name: string) => {
  //   return this.getResource(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // };
}

export default PokeService;
