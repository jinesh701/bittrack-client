import React from 'react';
import { shallow } from 'enzyme';
import store from '../store';

import App from './watchlist';
import PortfolioCardExpandable from './portfolio-card';
import WatchlistCardExpandable from './watchlist-card';

describe('<App />', () => {
  it('Renders without crashing and has access to store', () => {
    shallow(<App store={store} />);
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
