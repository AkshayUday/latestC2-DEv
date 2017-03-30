import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers';


const middleware = process.env.NODE_ENV === 'production' ?
  [thunk] :
  [thunk]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

export default store;
