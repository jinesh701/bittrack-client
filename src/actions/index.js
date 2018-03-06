import axios from 'axios';

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
  return axios
    .get('https://floating-harbor-45364.herokuapp.com/api/watchlist')
    .then(res => res.data)
    .then(watchlist => dispatch(fetchSavedCoins(watchlist)));
};

export const fetchCoins = coinName => dispatch => {
  axios.defaults.withCredentials = true;
  axios('https://floating-harbor-45364.herokuapp.com/api/watchlist/login', {
    method: 'post',
    withCredentials: 'true'
  }).then(
    axios
      .post(
        `https://floating-harbor-45364.herokuapp.com/api/watchlist/${coinName}`
      )
      .then(res => res.data)
      .then(coin => {
        dispatch(fetchCoinSuccess(coin));
      })
  );
};
