import { ADD_COIN_TO_WATCHLIST, addCoinToWatchlist } from './index';

describe('addCoinToWatchList', () => {
  it('Should return the action', () => {
    const coin = 'btc';
    const action = addCoinToWatchlist(coin);
    expect(action.type).toEqual(ADD_COIN_TO_WATCHLIST);
    expect(action.coin).toEqual('btc');
  });
});
