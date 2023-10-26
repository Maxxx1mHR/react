import { Component } from 'react';
import { ISearchInputProps, ISearchInputState } from '../../types/index';
import './search.scss';

export default class SearchInput extends Component<
  ISearchInputProps,
  ISearchInputState
> {
  constructor(props: ISearchInputProps) {
    super(props);
    this.state = {
      inputValue: this.props.inputValue,
    };
  }

  render() {
    return (
      <div className="search">
        <input
          value={this.state.inputValue}
          onChange={(e) => {
            this.setState({ inputValue: e.target.value });
          }}
          className="search__input"
        ></input>
        <div className="search__button">
          <button
            onClick={() => {
              this.props.searchPokemon(
                this.state.inputValue.toLocaleLowerCase()
              );
            }}
            className="button button_success"
          >
            Search
          </button>
          <button
            onClick={() => {
              this.props.setBreak();
            }}
            className="button button_danger"
          >
            Break app
          </button>
        </div>
      </div>
    );
  }
}
