import getWatchlistOptions from './getWatchlistOptions';

describe('getWatchlistOptions function', () => {
  it('filters correctly', () => {
    const watchlist = {
      coinData: [{
        symbol: 'BTC'
      }]
    };

    const options = getWatchlistOptions(watchlist);

    expect(options.map(x => x.symbol)).not.toContain('BTC');
  });
});

