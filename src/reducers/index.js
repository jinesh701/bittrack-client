import { combineReducers } from 'redux';
import portfolio from './portfolioReducer';
import watchlist from './watchlistReducer';

const rootReducer = combineReducers({
  portfolio,
  watchlist
});

export default rootReducer;
