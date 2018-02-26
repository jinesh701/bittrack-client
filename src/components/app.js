import React from 'react';
import WatchlistCardExpandable from './watchlist-card';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <WatchlistCardExpandable />
      </div>
    );
  }
}

export default connect()(App);
