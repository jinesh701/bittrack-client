const topCoinsJson = require('./topCoinsJson.json');

export default function getWatchlistOptions(watchlist) {
  const watchlistSymbols = watchlist.coinData.map(x => x.symbol);
  return topCoinsJson.filter(coin => watchlistSymbols.indexOf(coin.symbol) === -1);
}
