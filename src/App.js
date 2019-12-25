import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Books from './Books';
import BookInfo from './BookInfo';
import BookList from './BookList';

class App extends Component {
  renderBookList = () => {
    return <Books />;
  };

  renderBookInfo = routerData => {
    const bookId = routerData.match.params.bookId;
    if (this.props.favorites.find(book => book.id === bookId)) {
      const book = this.props.favorites.find(book => book.id === bookId);
      return <BookInfo bookInfo={book} />;
    } else {
      const book = this.props.books.find(book => book.id === bookId);
      return <BookInfo bookInfo={book} />;
    }
  };

  renderFavorites = () => {
    return <BookList books={this.props.favorites} />;
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <div>
            <Route exact={true} path="/" render={this.renderBookList} />
            <Route
              exact={true}
              path="/book/:bookId"
              render={this.renderBookInfo}
            />
            <Route
              exact={true}
              path="/favorites"
              render={this.renderFavorites}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps)(App);
