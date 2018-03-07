import * as actions from '../actions/fetch-portfolio';

const initialState = {
  coinData: []
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
  }
  return state;
}
