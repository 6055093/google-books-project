//This componenet renders the home page with the searchbox and search results (books)

import React, { Component } from 'react';
import SearchBox from './SearchBox.jsx';
import { connect } from 'react-redux';
import BookList from './BookList.jsx';

class Books extends Component {
  render() {
    return (
      <div>
        <SearchBox />
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
