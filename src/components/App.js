import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Books from './Books.jsx';
import BookInfo from './BookInfo.jsx';
import BookList from './BookList.jsx';

class App extends Component {
  //Check to see if user already logged in
  async componentDidMount() {
    const response = await fetch('/session');
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({ type: 'LOGIN_SUCCESS', username: body.username });
    }
  }

  renderLogin = () => {
    return <Login />;
  };
  renderSignup = routerData => {
    return <Signup history={routerData.history} />;
  };
  renderBookList = () => {
    return <Books />;
  };

  renderBookInfo = routerData => {
    const bookId = routerData.match.params.bookId;
    //render book info from stored Favorites, instead of API
    if (this.props.favorites.find(book => book.id === bookId)) {
      const book = this.props.favorites.find(book => book.id === bookId);
      return <BookInfo bookInfo={book} />;
      //else, render it from the API (if not stored in favorites)
    } else {
      const book = this.props.books.find(book => book.id === bookId);
      return <BookInfo bookInfo={book} />;
    }
  };

  renderFavorites = () => {
    return <BookList books={this.props.favorites} />;
  };

  render() {
    console.log(this.props);
    //if user is logged in already, render home, if not, render login/signup page
    return (
      <div className="app">
        <BrowserRouter>
          {this.props.lgin ? (
            <>
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
            </>
          ) : (
            <div className="formPage">
              <div className="fillerPage">
                SEARCH BOOKS
                <p className="slogan">Keep track of your favorite books!</p>
              </div>
              <div className="form">
                <Route path="/" exact render={this.renderLogin} />
                <Route path="/login" exact render={this.renderLogin} />
                <Route path="/signup" exact render={this.renderSignup} />
                <Route path="/logout" exact render={this.renderLogin} />
              </div>
            </div>
          )}
        </BrowserRouter>
      </div>
    );
  }
}
//get state from store
const mapStateToProps = state => {
  return {
    books: state.otherReducers.books,
    favorites: state.generalReducers.favorites,
    lgin: state.generalReducers.loggedIn,
  };
};

export default connect(mapStateToProps)(App);
