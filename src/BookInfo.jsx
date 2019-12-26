import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class BookInfo extends Component {
  constructor(props) {
    super(props);
  }

  addToFavorites = () => {
    let book = this.props.bookInfo;
    book.isFavorite = true;
    this.props.dispatch({ type: 'FAVORITE_BOOK', book: book });
  };

  render() {
    const { volumeInfo } = this.props.bookInfo;
    const { title, authors } = this.props.bookInfo.volumeInfo;
    const thumbNail =
      volumeInfo.hasOwnProperty('imageLinks') == false
        ? 'https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337'
        : volumeInfo.imageLinks.thumbnail;
    const publishYear =
      volumeInfo.hasOwnProperty('publishedDate') == false
        ? (volumeInfo['publishedDate'] = '0000')
        : volumeInfo.publishedDate;
    const description =
      volumeInfo.hasOwnProperty('description') == false
        ? 'No description'
        : volumeInfo.description;
    return (
      <div className="book-info-container">
        <div className="book-preview-container">
          <img className="book-info-image" src={thumbNail} />
          <div className="book-info-description">
            <h2>{title}</h2>
            <h3>Author: {authors.join(', ')}</h3>
            <p>
              Published:{' '}
              {publishYear == '0000'
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

export default connect(null)(BookInfo);
