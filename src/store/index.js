import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './botler/reducer';
import taskReducer from './task/reducer';
import userReducer from './user/reducer';

const rootReducers = combineReducers({
  botlerState: reducer,
  taskState: taskReducer,
  userState: userReducer
});

const store = createStore(
  rootReducers,
  applyMiddleware(thunk, logger)
);

export default store;