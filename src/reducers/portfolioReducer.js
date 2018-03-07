import * as actions from '../actions/fetch-portfolio';

const initialState = {
  coinData: [],
  selectedValue: ''
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
  }
  return state;
}
