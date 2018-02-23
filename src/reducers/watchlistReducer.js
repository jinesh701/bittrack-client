import * as actions from '../actions';

const initialState = [];

export default function watchlistReducer(state = initialState, action) {
  if (action.type === actions.FETCH_COIN_SUCCESS) {
    return [...state, Object.assign({}, action.cryptoData)];
  }
  return state;
}
