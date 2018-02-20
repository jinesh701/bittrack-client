import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Watchlist from './components/watchlist';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Watchlist />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
