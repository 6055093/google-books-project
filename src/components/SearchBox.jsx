//Component for the Search box to search books. handleSubmit and handleSearch have been passed down as props from the Books component.

import React, { Component } from 'react';
import request from 'superagent'; //Used Superagent since the http library is very simple and userfriendly
import { connect } from 'react-redux';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      loading: false,
    };
  }

  handleSubmit = e => {
    //prevent form submit
    e.preventDefault();
    this.setState({ loading: true });
    //superagent makes the request to the api with the query from searchInput
    setTimeout(() => {
      request
        .get('https://www.googleapis.com/books/v1/volumes')
        .query({ q: this.state.searchInput })
        .then(data => {
          this.props.dispatch({
            type: 'SEARCHED_BOOKS',
            books: data.body.items,
          });
        })
        .catch(err => {
          console.log(err.message, err.response);
        });
      this.setState({ loading: false });
    }, 1500);
  };

  //modify the state with the user searchInput
  handleSearch = event => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    return (
      <div className="search-box">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleSearch}
            placeholder="Search books..."
            type="text"
            className="searchInput"
          />
          <button
            onClick={this.handleSubmit}
            disabled={this.state.loading}
            type="submit"
          >
            {this.state.loading && <i className="fa fa-refresh fa-spin"></i>}
            {this.state.loading && <span>Getting books...</span>}
            {!this.state.loading && <span>Search</span>}
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null)(SearchBox);
