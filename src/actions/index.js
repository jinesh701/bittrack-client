import topCoinsJson from '../topCoinsJson.json';

export const ADD_COIN_TO_WATCHLIST = 'ADD_COIN_TO_WATCHLIST';
export const addCoinToWatchlist = coin => ({
  type: ADD_COIN_TO_WATCHLIST,
  coin
});

export const FETCH_COIN_SUCCESS = 'FETCH_COIN_SUCCESS';
export const fetchCoinSuccess = cryptoData => ({
  type: FETCH_COIN_SUCCESS,
  cryptoData
});

export const fetchCoins = coinName => dispatch => {
  return Promise.resolve(
    topCoinsJson.find(function(element) {
      return element.id === coinName;
    })
  ).then(coin => {
    dispatch(fetchCoinSuccess(coin));
  });
};
