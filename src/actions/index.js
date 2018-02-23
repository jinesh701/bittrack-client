import topCoinsJson from '../topCoinsJson.json';

export const FETCH_COIN_SUCCESS = 'FETCH_COIN_SUCCESS';
export const fetchCoinSuccess = cryptoData => ({
  type: FETCH_COIN_SUCCESS,
  cryptoData
});

export const fetchCoins = coinName => dispatch => {
  return Promise.resolve(
    topCoinsJson.find(function(element) {
      return element.id === coinName;
    })
  ).then(coin => {
    console.log(coin);
    dispatch(fetchCoinSuccess(coin));
  });
};
