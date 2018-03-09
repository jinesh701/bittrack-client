import getWatchlistOptions from './getWatchlistOptions';

describe('', () => {
  it('filters corerctly', () => {
    const watchlist = {
      coinData: [{
        symbol: 'BTC'
      }]
    };

    const options = getWatchlistOptions(watchlist);

    expect(options.map(x => x.symbol)).not.toContain('BTC');
  });
});

