import React from 'react';
import { shallow } from 'enzyme';
import store from '../store';

import Portfolio from './portfolio';

describe('<Portfolio />', () => {
  it('Renders without crashing and has access to store', () => {
    const dispatch = jest.fn();
    shallow(<Portfolio store={store} portfolio={{}} dispatch={dispatch}/>);
  });
});
