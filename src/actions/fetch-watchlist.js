import axios from 'axios';
import API_BASE_URL from '../config';

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
    .get(`${API_BASE_URL}/watchlist`)
    .then(res => res.data)
    .then(watchlist => dispatch(fetchSavedCoins(watchlist)));

export const fetchCoins = coinName => dispatch => {
  axios
    .post(`${API_BASE_URL}/watchlist/${coinName}`)
    .then(res => res.data)
    .then(data => {
      dispatch(fetchCoinSuccess(data));
    });
};

export const deleteWatchlistCoinFromDb = (coinName, index) => dispatch => {
  axios
    .delete(`${API_BASE_URL}/watchlist/${coinName}`)
    .then(res => res.data)
    .then(dispatch(removeSavedCoin(index)));
};
