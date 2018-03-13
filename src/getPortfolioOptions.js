const topCoinsJson = require('./topCoinsJson.json');

export default function getPortfolioOptions(portfolio) {
  const portfolioSymbols = portfolio.coinData.map(x => x.symbol);
  return topCoinsJson.filter(coin => portfolioSymbols.indexOf(coin.symbol) === -1);
}
