import { Component } from 'react';
import './Searchbar.modules.css';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  handleChange = e => {
    const userInput = e.currentTarget.value.toLowerCase().trim();
    this.setState({ query: userInput });
    // console.log(this.state.query);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
    // console.log(this.state.query);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <label
            className="SearchForm-button-label"
            htmlFor="text-search"
          ></label>
          <input
            name="text-search"
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
