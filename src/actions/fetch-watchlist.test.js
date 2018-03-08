import {
  FETCH_COIN_SUCCESS,
  FETCH_SAVED_COINS,
  SELECTED_CURRENCY,
  fetchCoinSuccess,
  fetchSavedCoins,
  selectedCurrency
} from './fetch-watchlist';

describe('fetchSavedCoins', () => {
  it('Should return the action', () => {
    const coins = [{ id: 'bitcoin' }, { id: 'litecoin' }];
    const action = fetchSavedCoins(coins);
    expect(action.type).toEqual(FETCH_SAVED_COINS);
    expect(action.savedCoins).toEqual(coins);
  });
});

describe('selectedCurrency', () => {
  it('Should return the action', () => {
    const coin = 'bitcoin';
    const action = selectedCurrency(coin);
    expect(action.type).toEqual(SELECTED_CURRENCY);
    expect(action.selectedValue).toEqual(coin);
  });
});

describe('fetchCoinSuccess', () => {
  it('Should return the action', () => {
    const coin = 'bitcoin';
    const action = fetchCoinSuccess(coin);
    expect(action.type).toEqual(FETCH_COIN_SUCCESS);
    expect(action.cryptoData).toEqual(coin);
  });
});

/* describe('fetchCoins', () => {
    it('Should dispatch fetchCoinSuccess', () => {
      const dispatch = jest.fn();

      const coin = 'bitcoin';

      return fetchCoins(coin)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            cryptoData: {
              '24h_volume_usd': '7526480000.0',
              available_supply: '16882975.0',
              id: 'bitcoin',
              last_updated: '1519453769',
              market_cap_usd: '178149152200',
              max_supply: '21000000.0',
              name: 'Bitcoin',
              percent_change_1h: '0.29',
              percent_change_24h: '5.53',
              percent_change_7d: '-0.7',
              price_btc: '1.0',
              price_usd: '10552.0',
              rank: '1',
              symbol: 'BTC',
              total_supply: '16882975.0'
            },
            type: FETCH_COIN_SUCCESS
          })
        );
      });
    });
  }); */
