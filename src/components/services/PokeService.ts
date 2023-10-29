class PokeService {
  _api = 'https://pokeapi.co/api/v2/pokemon';

  getResource = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Error');
    }
    return await res.json();
  };

  getAllPokemon = () => {
    return this.getResource(this._api);
  };

  getPokemonByName = (name: string) => {
    return this.getResource(`${this._api}/${name}`);
  };
}

export default PokeService;
