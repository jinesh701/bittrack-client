import {
  ADD_COIN_TO_PORTFOLIO,
  addCoinSuccess,
  addToPortfolio
} from './fetch-portfolio';
const topCoinsJson = require('../topCoinsJson.json');

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
      expect(dispatch).toHaveBeenCalledWith(
        dispatch.mock.calls[0].reduce((accumulator, currentValue) =>
          accumulator.concat(currentValue)
        )
      );
    });
  });
});
