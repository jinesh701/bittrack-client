import React from 'react';
import Watchlist from './watchlist';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return <Watchlist />;
  }
}

export default connect()(App);
