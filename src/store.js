import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'; // persists data after refresh, so favorites don't disappear
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import reducer from './reducers/reducers.js';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  let store = createStore(
    persistedReducer,
    undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
