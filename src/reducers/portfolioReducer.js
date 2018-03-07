import * as actions from '../actions/fetch-portfolio';

const initialState = [];

export default function portfolioReducer(state = initialState, action) {
  if (action.type === actions.ADD_COIN_TO_PORTFOLIO) {
    return [
      ...state,
      Object.assign({}, action.cryptoData, action.userHoldings)
    ];
  }
  return state;
}
