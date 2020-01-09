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
    request
      .get('https://www.googleapis.com/books/v1/volumes')
      .query({ q: this.state.searchInput })
      //send action to store books in redux for rendering in BooksList component
      .then(data => {
        this.props.dispatch({
          type: 'SEARCHED_BOOKS',
          books: data.body.items,
        });
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err.message, err.response);
      });
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
          <button disabled={this.state.loading} type="submit">
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
