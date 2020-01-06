import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from './components/App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import returnStoreAndPersistor from './store.js';
import { PersistGate } from 'redux-persist/integration/react'; //delays the rendering of the app's UI until the persisted state has been retrieved and saved to redux

import reloadMagic from './reload-magic-client.js'; // automatic reload
reloadMagic(); // automatic reload

//deconstruct object passed down from returnStoreAndPersistor
const { store } = returnStoreAndPersistor();
const { persistor } = returnStoreAndPersistor();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
