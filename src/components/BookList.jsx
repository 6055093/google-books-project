//This componenet maps out through the books or favorites array in store and returns a BookCard for each book.

import React, { Component } from 'react';
import BookCard from './BookCard.jsx';

class BookList extends Component {
  render() {
    return (
      <div className="book-list">
        {this.props.books.map((book, i) => {
          return <BookCard key={i} bookInfo={book} />;
        })}
      </div>
    );
  }
}

export default BookList;
