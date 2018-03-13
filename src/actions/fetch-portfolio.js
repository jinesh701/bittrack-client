import axios from 'axios';
import topCoinsJson from '../topCoinsJson.json';

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
export const addCoinSuccess = (cryptoData, userHoldings) => ({
  type: ADD_COIN_TO_PORTFOLIO,
  cryptoData,
  userHoldings
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
  axios
    .get('http://localhost:8080/api/portfolio')
    .then(res => res.data)
    .then(portfolios => dispatch(fetchSavedPortfolioCoins(portfolios)));

export const addToPortfolio = (coinName, userHoldings) => dispatch =>
  Promise.resolve(topCoinsJson.find(element => element.id === coinName)).then(coin => {
    dispatch(addCoinSuccess(coin, userHoldings));
  });
