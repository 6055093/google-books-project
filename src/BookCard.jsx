import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class BookCard extends Component {
  constructor(props) {
    super(props);
  }

  removeBook = () => {
    let book = this.props.bookInfo;
    book.isFavorite = false;
    this.props.dispatch({ type: 'REMOVE_BOOK', book: book });
  };

  render() {
    const { volumeInfo } = this.props.bookInfo;
    const { title } = this.props.bookInfo.volumeInfo;
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
        : volumeInfo.description.substring(0, 150) + '...';
    const authors =
      volumeInfo.hasOwnProperty('authors') === false
        ? 'Not available'
        : volumeInfo.authors[0];
    return (
      <div className="book-card-container">
        <img className="book-card-image" src={thumbNail} />
        <div className="book-card-description">
          <h2>{title}</h2>
          <h3>Author: {authors}</h3>
          <p>
            Published:
            {publishYear === '0000'
              ? 'Not available'
              : publishYear.substring(0, 4)}
          </p>
          <p>{description}</p>
        </div>
        <div className="book-card-button">
          <Link to={`/book/${this.props.bookInfo.id}`}>
            <button>More info</button>
          </Link>
          {this.props.bookInfo.isFavorite === true && (
            <button onClick={this.removeBook}>Remove from Favorites</button>
          )}
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

export default connect(mapStateToProps)(BookCard);
