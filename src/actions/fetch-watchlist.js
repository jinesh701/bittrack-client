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

export const SELECTED_CURRENCY = 'SELECTED_CURRENCY';
export const selectedCurrency = selectedValue => ({
  type: SELECTED_CURRENCY,
  selectedValue
});

export const fetchSavedWatchlist = () => dispatch =>
  axios
    .get('http://localhost:8080/api/watchlist')
    .then(res => res.data)
    .then(watchlist => dispatch(fetchSavedCoins(watchlist)));

export const fetchCoins = coinName => dispatch => {
  axios.defaults.withCredentials = true;
  axios('http://localhost:8080/login', {
    method: 'post',
    withCredentials: 'true',
  }).then(axios
    .post(`http://localhost:8080/api/watchlist/${coinName}`)
    .then(res => res.data)
    .then(coin => {
      dispatch(fetchCoinSuccess(coin));
    }));
};
