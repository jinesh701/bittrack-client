import * as actions from '../actions/fetch-watchlist';

const initialState = {
  coinData: [],
  selectedValue: '',
  errorMessage: ''
};

export default function watchlistReducer(state = initialState, action) {
  if (action.type === actions.FETCH_COIN_SUCCESS) {
    return Object.assign({}, state, {
      coinData: [...state.coinData, action.cryptoData],
      errorMessage: ''
    });
  } else if (action.type === actions.FETCH_COIN_FAIL) {
    return Object.assign({}, state, {
      errorMessage: action.errorMessage
    });
  } else if (action.type === actions.FETCH_SAVED_COINS) {
    return Object.assign({}, state, {
      coinData: action.savedCoins
    });
  } else if (action.type === actions.SELECTED_CURRENCY) {
    return Object.assign({}, state, {
      selectedValue: action.selectedValue,
      errorMessage: ''
    });
  }
  return state;
}
