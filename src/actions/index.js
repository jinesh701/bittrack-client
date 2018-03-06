export const FETCH_SAVED_COINS = 'FETCH_SAVED_COINS';
export const fetchSavedCoins = savedCoins => ({
  type: FETCH_SAVED_COINS,
  savedCoins
});

export const FETCH_COIN_SUCCESS = 'FETCH_COIN_SUCCESS';
export const fetchCoinSuccess = cryptoData => ({
  type: FETCH_COIN_SUCCESS,
  cryptoData
});

export const fetchSavedWatchlist = () => dispatch => {
  return fetch('https://floating-harbor-45364.herokuapp.com/api/watchlist')
    .then(res => res.json())
    .then(watchlist => dispatch(fetchSavedCoins(watchlist)));
};

export const fetchCoins = coinName => dispatch => {
  return fetch(`https://api.coinmarketcap.com/v1/ticker/`)
    .then(res => res.json())
    .then(result =>
      result.find(element => {
        return element.id === coinName;
      })
    )
    .then(coin => {
      dispatch(fetchCoinSuccess(coin));
    });
};
