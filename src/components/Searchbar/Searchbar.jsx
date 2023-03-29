import React, { Component } from 'react';
import s from '../Searchbar/Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  inputChange = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  hendleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;

    if (query === '') {
      alert('Введите что-то');
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.hendleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.button_label}>Search</span>
          </button>

          <input
            className={s.input}
            name="query"
            onChange={this.inputChange}
            value={this.state.query}
            type="text"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
