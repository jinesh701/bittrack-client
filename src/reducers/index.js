import { combineReducers } from 'redux';
import watchlist from './watchlistReducer';

const rootReducer = combineReducers({
  watchlist
});

export default rootReducer;
