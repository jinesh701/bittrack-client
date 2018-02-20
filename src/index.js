import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Watchlist from './components/watchlist';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Watchlist />
  </Provider>,
  document.getElementById('root')
);
