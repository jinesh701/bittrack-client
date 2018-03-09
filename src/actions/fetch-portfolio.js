import topCoinsJson from '../topCoinsJson.json';

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

export const addToPortfolio = (coinName, userHoldings) => dispatch =>
  Promise.resolve(topCoinsJson.find(element => element.id === coinName)).then(coin => {
    dispatch(addCoinSuccess(coin, userHoldings));
  });
