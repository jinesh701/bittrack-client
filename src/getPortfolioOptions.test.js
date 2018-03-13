import getPortfolioOptions from './getPortfolioOptions';

describe('getPortfolioOptions function', () => {
  it('it filters correctly', () => {
    const portfolio = {
      coinData: [{ symbol: 'BTC' }]
    };

    const options = getPortfolioOptions(portfolio);


    expect(options.map(x => x.symbol)).not.toContain('BTC');
  });
});

