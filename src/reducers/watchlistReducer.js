import * as actions from '../actions/fetch-watchlist';

const initialState = [];

export default function watchlistReducer(state = initialState, action) {
  if (action.type === actions.FETCH_COIN_SUCCESS) {
    return [...state, Object.assign({}, action.cryptoData)];
  }
  if (action.type === actions.FETCH_SAVED_COINS) {
    return action.savedCoins;
  }
  return state;
}
