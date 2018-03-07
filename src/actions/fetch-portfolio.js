import topCoinsJson from '../topCoinsJson.json';

export const ADD_COIN_TO_PORTFOLIO = 'ADD_COIN_TO_PORTFOLIO';
export const addCoinSuccess = (cryptoData, userHoldings) => ({
  type: ADD_COIN_TO_PORTFOLIO,
  cryptoData,
  userHoldings
});

export const addToPortfolio = (coinName, userHoldings) => dispatch => {
  return Promise.resolve(
    topCoinsJson.find(element => {
      return element.id === coinName;
    })
  ).then(coin => {
    dispatch(addCoinSuccess(coin, userHoldings));
  });
};
