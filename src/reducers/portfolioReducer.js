import * as actions from '../actions/fetch-portfolio';

const initialState = [];

export default function portfolioReducer(state = initialState, action) {
  if (action.type === actions.ADD_COIN_TO_PORTFOLIO) {
    return [
      ...state,
      Object.assign(
        {},
        {
          coinData: action.cryptoData,
          userHoldings: action.userHoldings
        }
      )
    ];
  }
  return state;
}
