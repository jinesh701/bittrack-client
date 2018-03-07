import React from 'react';
import PortfolioCardExpandable from './portfolio-card';
import WatchlistCardExpandable from './watchlist-card';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <PortfolioCardExpandable />
        <WatchlistCardExpandable />
      </div>
    );
  }
}

export default connect()(App);
