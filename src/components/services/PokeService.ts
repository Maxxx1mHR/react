class PokeService {
  _api = 'https://pokeapi.co/api/v2/pokemon';

  getResource = async (url: string) => {
    try {
      const res = await fetch(url);
      // if (!res.ok) {
      // throw new Error('Error');
      // }
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  getAllPokemon = (offset: number, limit: number) => {
    return this.getResource(`${this._api}?limit=${limit}&offset=${offset}`);
  };

  getPokemonByName = (name: string) => {
    return this.getResource(`${this._api}/${name}`);
  };
}

export default PokeService;
