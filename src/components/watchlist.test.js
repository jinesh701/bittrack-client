import React from 'react';
import { shallow } from 'enzyme';
import store from '../store';

import Watchlist from './watchlist';

describe('<Watchlist />', () => {
  it('Renders without crashing and has access to store', () => {
    shallow(<Watchlist store={store} />);
  });
});
