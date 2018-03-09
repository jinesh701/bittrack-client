import React from 'react';
import { shallow } from 'enzyme';

import App from './app';
import PortfolioCardExpandable from './portfolio-card';
import WatchlistCardExpandable from './watchlist-card';

describe('<App />', () => {
  it('Renders without crashing and has access to store', () => {
    shallow(<App />);
  });
});

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
