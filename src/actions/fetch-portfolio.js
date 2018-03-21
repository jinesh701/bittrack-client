import { API_BASE_URL } from '../config';

export const FETCH_SAVED_PORTFOLIO_COINS = 'FETCH_SAVED_PORTFOLIO_COINS';
export const fetchSavedPortfolioCoins = savedCoins => ({
  type: FETCH_SAVED_PORTFOLIO_COINS,
  savedCoins
});

export const REMOVE_SAVED_PORTFOLIO_COIN = 'REMOVE_SAVED_PORTFOLIO_COIN';
export const removeSavedPortfolioCoin = index => ({
  type: REMOVE_SAVED_PORTFOLIO_COIN,
  index
});

export const ADD_COIN_TO_PORTFOLIO = 'ADD_COIN_TO_PORTFOLIO';
export const addCoinSuccess = (cryptoData, holdings) => ({
  type: ADD_COIN_TO_PORTFOLIO,
  cryptoData,
  holdings
});

export const ADD_COIN_FAIL = 'ADD_COIN_FAIL';
export const addCoinFail = error => ({
  type: ADD_COIN_FAIL,
  error
});

export const SELECTED_PORTFOLIO_CURRENCY = 'SELECTED_PORTFOLIO_CURRENCY';
export const selectedPortfolioCurrency = selectedValue => ({
  type: SELECTED_PORTFOLIO_CURRENCY,
  selectedValue
});

export const fetchSavedPortfolio = () => dispatch =>
  fetch(`${API_BASE_URL}/portfolio`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  })
    .then(res => res.json())
    .then(portfolios => dispatch(fetchSavedPortfolioCoins(portfolios)));

export const addToPortfolio = (coinName, holdings) => dispatch => {
  fetch(`${API_BASE_URL}/portfolio/${coinName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      coinName,
      holdings
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch(addCoinSuccess(data, holdings));
    });
};

export const deletePortfolioCoinFromDb = (coinName, index) => dispatch => {
  fetch(`${API_BASE_URL}/portfolio/${coinName}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      coinName,
      index
    })
  })
    .then(dispatch(removeSavedPortfolioCoin(index)));
};

