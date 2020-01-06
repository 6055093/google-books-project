//This componenet displays the book description, and allows users to add them to favorites.

import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookInfo extends Component {
  //add book to favorites, check if book is already there
  addToFavorites = () => {
    let bookInfo = this.props.bookInfo;
    if (this.props.favorites.some(book => book.id === bookInfo.id)) {
      return alert('Book already in favorites!');
    } else {
      alert('Added to favorites!');
      bookInfo.isFavorite = true;
      return this.props.dispatch({ type: 'FAVORITE_BOOK', book: bookInfo });
    }
  };

  render() {
    const { volumeInfo } = this.props.bookInfo;
    const { title, authors } = this.props.bookInfo.volumeInfo;

    // format properties from API to show the way they're intended
    const thumbNail =
      volumeInfo.hasOwnProperty('imageLinks') === false
        ? 'https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337'
        : volumeInfo.imageLinks.thumbnail;
    const publishYear =
      volumeInfo.hasOwnProperty('publishedDate') === false
        ? (volumeInfo['publishedDate'] = '0000')
        : volumeInfo.publishedDate;
    const description =
      volumeInfo.hasOwnProperty('description') === false
        ? 'No description'
        : volumeInfo.description;
    return (
      <div className="book-info-container">
        <div className="book-preview-container">
          <img className="book-info-image" src={thumbNail} alt="" />
          <div className="book-info-description">
            <h2>{title}</h2>
            <h3>Author: {authors.join(', ')}</h3>
            <p>
              Published:{' '}
              {publishYear === '0000'
                ? 'Not available'
                : publishYear.substring(0, 4)}
            </p>
          </div>
        </div>
        <div>
          <h3>Description</h3>
          <p>{description}</p>
        </div>
        <div className="book-card-button">
          <button onClick={this.addToFavorites}>Add to Favorites</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps)(BookInfo);
