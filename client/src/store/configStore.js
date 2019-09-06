import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import auth from '../reducers/auth';
import authError from '../reducers/authError';
import todos from '../reducers/todoReducer';
import todoError from '../reducers/todoError';
import admin from '../reducers/adminReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// create store
export default () => {
  const store = createStore(
    combineReducers({
      auth,
      authError,
      todos,
      todoError,
      admin
    }),
    composeEnhancer(applyMiddleware(thunk))
  );
  return store;
};
