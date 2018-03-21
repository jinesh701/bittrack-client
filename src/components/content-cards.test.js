import React from 'react';
import { shallow } from 'enzyme';

import PortfolioCardExpandable from './portfolio-card';
import WatchlistCardExpandable from './watchlist-card';

describe('<PortfolioCardExpandable />', () => {
  it('Renders without crashing', () => {
    shallow(<PortfolioCardExpandable />);
  });
});

describe('<WatchlistCardExpandable />', () => {
  it('Renders without crashing', () => {
    shallow(<WatchlistCardExpandable />);
  });
});
