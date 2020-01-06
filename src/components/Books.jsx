//This componenet renders the home page with the searchbox and search results (books)

import React, { Component } from 'react';
import SearchBox from './SearchBox.jsx';
import request from 'superagent'; //Used Superagent since the http library is very simple and userfriendly
import { connect } from 'react-redux';
import BookList from './BookList.jsx';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  handleSubmit = e => {
    //prevent form submit
    e.preventDefault();
    //superagent makes the request to the api with the query from searchInput
    request
      .get('https://www.googleapis.com/books/v1/volumes')
      .query({ q: this.state.searchInput })
      .then(data => {
        this.props.dispatch({ type: 'SEARCHED_BOOKS', books: data.body.items });
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
      <div>
        <SearchBox
          handleSubmit={this.handleSubmit}
          handleSearch={this.handleSearch}
        />
        <BookList books={this.props.books} />
      </div>
    );
  }
}

//get state from store
const mapStateToProps = state => {
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps)(Books);
