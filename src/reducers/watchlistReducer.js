import * as actions from '../actions';

const initialState = [];

export default function watchlistReducer(state = initialState, action) {
  if (action.type === actions.FETCH_COIN_SUCCESS) {
    return Object.assign([...state], action.cryptoData);
  } else if (action.type === actions.ADD_COIN_TO_WATCHLIST) {
    return [...state, Object.assign({}, action.coin)];
  }
  return state;
}
