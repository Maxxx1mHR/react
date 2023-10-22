import { Component } from 'react';
import './search.scss';

interface IPokemon {
  name: string;
  url: string;
}

export default class SearchInput extends Component<
  {
    searchPokemon: CallableFunction;
    pokemonList: IPokemon[];
    isLoading: boolean;
  },
  { inputValue: string }
> {
  constructor(props: {
    searchPokemon: CallableFunction;
    pokemonList: IPokemon[];
    isLoading: boolean;
  }) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

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
