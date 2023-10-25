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
    inputValue: string;
    setBreak: CallableFunction;
  },
  { inputValue: string }
> {
  constructor(props: {
    searchPokemon: CallableFunction;
    pokemonList: IPokemon[];
    isLoading: boolean;
    inputValue: string;
    setBreak: CallableFunction;
  }) {
    super(props);
    this.state = {
      inputValue: this.props.inputValue,
    };
  }

  render() {
    return (
      <div className="search-input">
        <input
          value={this.state.inputValue}
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
        <button
          onClick={() => {
            this.props.setBreak();
          }}
        >
          Break app
        </button>
      </div>
    );
  }
}
