import React from 'react';
import PortfolioCardExpandable from './portfolio-card';
import WatchlistCardExpandable from './watchlist-card';

export default function ContentCards() {
  return (
    <div>
      <PortfolioCardExpandable />
      <WatchlistCardExpandable />
    </div>
  );
}
