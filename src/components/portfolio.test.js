import React from 'react';
import { shallow } from 'enzyme';
import store from '../store';

import Portfolio from './portfolio';

describe('<Portfolio />', () => {
  it('Renders without crashing and has access to store', () => {
    shallow(<Portfolio store={store} />);
  });

  it('Has an array of portfolios as props', () => {
    const portfolio = [];

    const wrapper = shallow(<Portfolio store={store} portfolio={portfolio} />);
    expect(wrapper.contains(portfolio)).toEqual(true);
  });
});
