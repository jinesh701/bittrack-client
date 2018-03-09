import watchlistReducer from './watchlistReducer';
import {
  fetchCoinSuccess,
  selectedCurrency,
  fetchSavedCoins,
  removeSavedCoin
} from '../actions/fetch-watchlist';

describe('Reducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = watchlistReducer(undefined, { type: '___UNKNOWN' });

    expect(state.coinData).toEqual([]);
  });

  it('Should return the current state on unknown action', () => {
    const currentState = {};
    const state = watchlistReducer(currentState, { type: '___UNKNOWN' });
    expect(state).toBe(currentState);
  });
});

describe('fetchSavedCoins', () => {
  it('Should fetch a list of saved coins', () => {
    let state = {
      coinData: []
    };

    const coinList = [{ id: 'bitcoin' }, { id: 'litecoin' }];
    state = watchlistReducer(state, fetchSavedCoins(coinList));
    expect(state.coinData).toEqual(coinList);
  });
});

describe('fetchCoinSuccess', () => {
  it('Should add a coin to watchlist', () => {
    let state = {
      coinData: []
    };

    const newItem = { id: 'bitcoin' };
    const newItem2 = { id: 'litecoin' };

    // called twice to see if items add to array
    state = watchlistReducer(state, fetchCoinSuccess(newItem));
    state = watchlistReducer(state, fetchCoinSuccess(newItem2));
    expect(state.coinData).toEqual([newItem, newItem2]);
  });
});

describe('selectedCurrency', () => {
  it('Should return a string for selectedCurrency value', () => {
    let state = {
      selectedValue: ''
    };

    const testItem = 'bitcoin';

    state = watchlistReducer(state, selectedCurrency(testItem));
    expect(state.selectedValue).toEqual(testItem);
  });
});

describe('removeSavedCoin', () => {
  it('Should remove a coin', () => {
    let state = {
      coinData: [{ id: 'bitcoin' }, { id: 'litecoin' }]
    };

    state = watchlistReducer(state, removeSavedCoin(1));
    expect(state.coinData).toEqual([{ id: 'bitcoin' }]);
  });
});
