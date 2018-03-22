import { API_BASE_URL } from '../config';

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

export const fetchSavedWatchlist = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}/watchlist`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(watchlists => dispatch(fetchSavedCoins(watchlists)));
};

export const fetchCoins = coinName => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}/watchlist/${coinName}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      coinName
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchCoinSuccess(data));
    });
};

export const deleteWatchlistCoinFromDb = (coinName, index) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}/watchlist/${coinName}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      coinName,
      index
    })
  })
    .then(dispatch(removeSavedCoin(index)));
};
