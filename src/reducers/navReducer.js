import { OPEN_MENU, CLOSE_MENU } from '../actions/nav';

const initialState = {
  open: false
};

export default function reducer(state = initialState, action) {
  if (action.type === OPEN_MENU) {
    return Object.assign({}, state, {
      open: true
    });
  }
  if (action.type === CLOSE_MENU) {
    return Object.assign({}, state, {
      open: false
    });
  }
  return state;
}
