import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import authReducer from './reducers/authReducer';
import portfolioReducer from './reducers/portfolioReducer';
import watchlistReducer from './reducers/watchlistReducer';
import { setAuthToken, refreshAuthToken } from './actions/auth';

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    portfolio: portfolioReducer,
    watchlist: watchlistReducer
  }),
  compose(applyMiddleware(thunk, promise))
);

const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
