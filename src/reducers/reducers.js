import { combineReducers } from 'redux';

const initialState = {
  favorites: [],
  loggedIn: false,
  username: '',
};
const otherState = {
  books: [],
};

function otherReducers(state = otherState, action) {
  switch (action.type) {
    case 'SEARCHED_BOOKS':
      return { ...state, books: action.books };
    default:
      return state;
  }
}
function generalReducers(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, loggedIn: true, username: action.username };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
        username: '',
      };

    case 'FAVORITE_BOOK':
      return { ...state, favorites: [...state.favorites, action.book] };
    case 'REMOVE_BOOK':
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

export default combineReducers({
  otherReducers,
  generalReducers,
});
