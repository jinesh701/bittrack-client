import portfolioReducer from './portfolioReducer';
import { addCoinSuccess } from '../actions/fetch-portfolio';

describe('Reducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = portfolioReducer(undefined, { type: '___UNKNOWN' });

    expect(state.coinData).toEqual([]);
  });

  it('Should return the current state on unknown action', () => {
    const currentState = {};
    const state = portfolioReducer(currentState, { type: '___UNKNOWN' });
    expect(state).toBe(currentState);
  });
});

describe('addCoinSuccess', () => {
  it('Should add a coin to portfolio', () => {
    let state = {
      coinData: []
    };

    const newItem = { id: 'bitcoin' };
    const userHoldings = '3';

    state = portfolioReducer(state, addCoinSuccess(newItem, userHoldings));
    expect(state.coinData).toEqual([{ coinData: newItem, userHoldings }]);
  });
});
