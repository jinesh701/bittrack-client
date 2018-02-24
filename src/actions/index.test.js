import { FETCH_COIN_SUCCESS, fetchCoinSuccess, fetchCoins } from './index';
const topCoinsJson = require('../topCoinsJson.json');

describe('fetchCoinSuccess', () => {
  it('Should return the action', () => {
    const coin = 'bitcoin';
    const action = fetchCoinSuccess(coin);
    expect(action.type).toEqual('FETCH_COIN_SUCCESS');
    expect(action.cryptoData).toEqual(coin);
  });
});
