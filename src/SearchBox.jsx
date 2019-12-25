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
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
