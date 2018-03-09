import React from 'react';
import { shallow } from 'enzyme';

import { Portfolio } from './portfolio';

describe('<Portfolio />', () => {
  it('Renders without crashing', () => {
    shallow(<Portfolio />);
  });
});
