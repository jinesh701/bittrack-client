import * as actions from '../actions/fetch-portfolio';

const initialState = {
  coinData: [],
  selectedValue: '',
  errorText: ''
};

export default function portfolioReducer(state = initialState, action) {
  if (action.type === actions.ADD_COIN_TO_PORTFOLIO) {
    return Object.assign({}, state, {
      coinData: [
        ...state.coinData,
        {
          coinData: action.cryptoData,
          userHoldings: action.userHoldings
        }
      ]
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
  }
  return state;
}
