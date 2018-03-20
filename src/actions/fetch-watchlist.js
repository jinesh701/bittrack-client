import axios from 'axios';

export const FETCH_SAVED_COINS = 'FETCH_SAVED_COINS';
export const fetchSavedCoins = savedCoins => ({
  type: FETCH_SAVED_COINS,
  savedCoins
});

export const REMOVE_SAVED_COIN = 'REMOVE_SAVED_COIN';
export const removeSavedCoin = index => ({
  type: REMOVE_SAVED_COIN,
  index
});

export const FETCH_COIN_SUCCESS = 'FETCH_COIN_SUCCESS';
export const fetchCoinSuccess = cryptoData => ({
  type: FETCH_COIN_SUCCESS,
  cryptoData
});

export const SELECTED_WATCHLIST_CURRENCY = 'SELECTED_WATCHLIST_CURRENCY';
export const selectedCurrency = selectedValue => ({
  type: SELECTED_WATCHLIST_CURRENCY,
  selectedValue
});

export const fetchSavedWatchlist = () => dispatch =>
  axios
    .get('https://floating-harbor-45364.herokuapp.com/api/watchlist')
    .then(res => res.data)
    .then(watchlist => dispatch(fetchSavedCoins(watchlist)));

export const fetchCoins = coinName => dispatch => {
  axios.defaults.withCredentials = true;
  axios('https://floating-harbor-45364.herokuapp.com/login', {
    method: 'post',
    withCredentials: 'true'
  }).then(axios
    .post(`https://floating-harbor-45364.herokuapp.com/api/watchlist/${coinName}`)
    .then(res => res.data)
    .then(data => {
      dispatch(fetchCoinSuccess(data));
    }));
};

export const deleteWatchlistCoinFromDb = (coinName, index) => dispatch => {
  axios
    .delete(`https://floating-harbor-45364.herokuapp.com/api/watchlist/${coinName}`)
    .then(res => res.data)
    .then(dispatch(removeSavedCoin(index)));
};
