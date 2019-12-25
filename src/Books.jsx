import React, { Component } from 'react';
import SearchBox from './SearchBox';
import request from 'superagent';
import { connect } from 'react-redux';
import BookList from './BookList';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
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

const mapStateToProps = state => {
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps)(Books);
