import watchlistReducer from './watchlistReducer';
import {
  fetchCoinSuccess,
  fetchSavedCoins,
  selectedCurrency
} from '../actions/fetch-watchlist';

describe('Reducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = watchlistReducer(undefined, { type: '___UNKNOWN' });

    expect(state.coinData).toEqual([]);
  });

  it('Should return the current state on unknown action', () => {
    let currentState = {};
    const state = watchlistReducer(currentState, { type: '___UNKNOWN' });
    expect(state).toBe(currentState);
  });
});

describe('fetchCoinSuccess', () => {
  it('Should add a coin to watchlist', () => {
    let state = {
      coinData: []
    };

    const newItem = { test: '123' };
    const newItem2 = { test: '456' };

    // called twice to see if items add to array
    state = watchlistReducer(state, fetchCoinSuccess(newItem));
    state = watchlistReducer(state, fetchCoinSuccess(newItem2));
    expect(state.coinData).toEqual([newItem, newItem2]);
  });
});

describe('selectedCurrency', () => {
  let state = {
    selectedValue: ''
  };

  const testItem = 'bitcoin';

  state = watchlistReducer(state, selectedCurrency(testItem));
  expect(state.selectedValue).toEqual(testItem);
});
