import * as actions from '../actions/fetch-portfolio';

const initialState = {
  coinData: [],
  selectedValue: '',
  selectHoldings: '',
  errorText: ''
};

export default function reducer(state = initialState, action) {
  if (action.type === actions.ADD_COIN_TO_PORTFOLIO) {
    const mergedItems = Object.assign({}, ...state, action.cryptoData, {
      holdings: action.holdings
    });
    return Object.assign({}, state, {
      coinData: [...state.coinData, mergedItems]
    });
  } else if (action.type === actions.FETCH_SAVED_PORTFOLIO_COINS) {
    return Object.assign({}, state, {
      coinData: action.savedCoins
    });
  } else if (action.type === actions.SELECTED_PORTFOLIO_CURRENCY) {
    return Object.assign({}, state, {
      selectedValue: action.selectedValue
    });
  } else if (action.type === actions.ADD_COIN_FAIL) {
    return Object.assign({}, state, {
      errorText: action.error
    });
  } else if (action.type === actions.REMOVE_SAVED_PORTFOLIO_COIN) {
    return Object.assign({}, state, {
      coinData: [...state.coinData.filter((coin, i) => i !== action.index)]
    });
  } else if (action.type === actions.SELECT_HOLDINGS) {
    if (!isNaN(action.holdings)) {
      return Object.assign({}, state, {
        selectHoldings: action.holdings
      });
    }
  }
  return state;
}
