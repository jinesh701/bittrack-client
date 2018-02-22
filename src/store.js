import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise';
import rootReducer from './reducers';

export default createStore(
  rootReducer,
  compose(applyMiddleware(thunk, promise, logger))
);
