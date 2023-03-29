import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import '../index.css';

export default class App extends Component {
  state = {
    query: '',
    largeImage: '',
  };

  onSubmit = newQuery => {
    this.setState({ query: newQuery });
  };

  render() {
    const { query } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery query={query} />
      </div>
    );
  }
}
