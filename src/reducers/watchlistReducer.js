import * as actions from '../actions/fetch-watchlist';

const initialState = {
  coinData: [],
  selectedValue: ''
};

export default function watchlistReducer(state = initialState, action) {
  if (action.type === actions.FETCH_COIN_SUCCESS) {
    return Object.assign({}, state, {
      coinData: [...state.coinData, action.cryptoData],
    });
  } else if (action.type === actions.FETCH_SAVED_COINS) {
    return Object.assign({}, state, {
      coinData: action.savedCoins
    });
  } else if (action.type === actions.SELECTED_WATCHLIST_CURRENCY) {
    return Object.assign({}, state, {
      selectedValue: action.selectedValue,
    });
  } else if (action.type === actions.REMOVE_SAVED_COIN) {
    return Object.assign({}, state, {
      coinData: [...state.coinData.filter((coin, i) => i !== action.index)]
    });
  }
  return state;
}
