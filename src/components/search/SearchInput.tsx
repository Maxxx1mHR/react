import { Component } from 'react';
import './search.scss';

interface IPokemon {
  name: string;
  url: string;
}

export default class SearchInput extends Component<
  { searchPokemon: CallableFunction; pokemonList: IPokemon[] },
  { inputValue: string }
> {
  constructor(props: { searchPokemon: CallableFunction; pokemonList: IPokemon[] }) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  // onSearchPokemon = (e: { target: HTMLInputElement }) => {
  //   this.setState({ inputValue: e.target.value });
  // };

  render() {
    return (
      <div className="search-input">
        <input
          onChange={(e) => {
            this.setState({ inputValue: e.target.value });
          }}
        ></input>
        <button
          onClick={() => {
            this.props.searchPokemon(this.state.inputValue);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}
