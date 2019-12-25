import { createStore } from 'redux';

const initialState = {
  books: [],
  favorites: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCHED_BOOKS':
      return { ...state, books: action.books };
    case 'FAVORITE_BOOK':
      console.log('adding book to favorites!');
      return { ...state, favorites: [...state.favorites, action.book] };
    case 'REMOVE_BOOK':
      console.log('removing book to favorites!');
      let newFavorites = state.favorites.filter(
        book => action.book.id !== book.id
      );
      return {
        ...state,
        favorites: newFavorites,
      };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
