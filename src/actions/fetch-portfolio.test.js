import {
  ADD_COIN_TO_PORTFOLIO,
  SELECTED_PORTFOLIO_CURRENCY,
  ADD_COIN_FAIL,
  addCoinSuccess,
  addToPortfolio,
  selectedPortfolioCurrency,
  addCoinFail
} from './fetch-portfolio';

describe('selectedPortfolioCurrency', () => {
  it('Should return the action', () => {
    const coin = 'bitcoin';
    const action = selectedPortfolioCurrency(coin);
    expect(action.type).toEqual(SELECTED_PORTFOLIO_CURRENCY);
    expect(action.selectedValue).toEqual(coin);
  });
});

describe('addCoinSuccess', () => {
  it('Should return the action', () => {
    const coin = 'bitcoin';
    const userHoldings = '1';
    const action = addCoinSuccess(coin, userHoldings);
    expect(action.type).toEqual(ADD_COIN_TO_PORTFOLIO);
    expect(action.cryptoData).toEqual(coin);
    expect(action.userHoldings).toEqual(userHoldings);
  });
});


describe('addToPortfolio', () => {
  it('Should dispatch addCoinSuccess', () => {
    const dispatch = jest.fn();

    const coin = 'litecoin';
    const holdings = '1';

    return addToPortfolio(coin, holdings)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith(dispatch.mock.calls[0]
        .reduce((accumulator, currentValue) =>
          accumulator.concat(currentValue)));
    });
  });
});

describe('addCoinFail', () => {
  it('Should return the action', () => {
    const error = 'this field is required';
    const action = addCoinFail(error);
    expect(action.type).toEqual(ADD_COIN_FAIL);
    expect(action.error).toEqual(error);
  });
});
