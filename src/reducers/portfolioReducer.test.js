import portfolioReducer from './portfolioReducer';
import {
  addCoinSuccess,
  selectedPortfolioCurrency,
  addCoinFail
} from '../actions/fetch-portfolio';

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

describe('selectedCurrency', () => {
  it('Should return a string for a selected value', () => {
    let state = {
      selectedValue: ''
    };

    const testItem = 'bitcoin';

    state = portfolioReducer(state, selectedPortfolioCurrency(testItem));
    expect(state.selectedValue).toEqual(testItem);
  });
});

describe('addCoinFail', () => {
  it('Should return an error text', () => {
    let state = {
      errorText: ''
    };

    const errorText = 'this field is required';

    state = portfolioReducer(state, addCoinFail(errorText));
    expect(state.errorText).toEqual(errorText);
  });
});

