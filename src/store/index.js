import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './botler/reducer';

const rootReducers = combineReducers({
  botlerState: reducer
})

const store = createStore(
  rootReducers,
  applyMiddleware(thunk, logger)
);

export default store;