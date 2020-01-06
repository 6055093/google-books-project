//Component for the Search box to search books. handleSubmit and handleSearch have been passed down as props from the Books component.

import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <div className="search-box">
        <form onSubmit={this.props.handleSubmit}>
          <input
            onChange={this.props.handleSearch}
            placeholder="Search books..."
            type="text"
            className="searchInput"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
